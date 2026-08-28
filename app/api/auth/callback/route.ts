import { NextRequest, NextResponse } from 'next/server'
import { captainAuthConfig } from '../../../../lib/auth/config'
import { decideCaptainAccess } from '../../../../lib/auth/require-access'
import { verifyIdToken } from '../../../../lib/auth/oidc'
import { createCaptainSession, decodeSigned, TX_COOKIE } from '../../../../lib/auth/session'

type Transaction = { state: string; nonce: string; verifier: string; returnTo: string; exp: number }

export async function GET(request: NextRequest) {
  const transaction = decodeSigned<Transaction>(request.cookies.get(TX_COOKIE)?.value)
  const state = request.nextUrl.searchParams.get('state')
  const code = request.nextUrl.searchParams.get('code')
  if (!transaction || transaction.exp < Date.now() || !state || state !== transaction.state || !code) {
    return new NextResponse('AUTH_CALLBACK_INVALID', { status: 400 })
  }

  const redirectUri = new URL('/api/auth/callback', captainAuthConfig.baseUrl()).toString()
  const tokenResponse = await fetch(captainAuthConfig.tokenEndpoint(), {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: captainAuthConfig.clientId(),
      redirect_uri: redirectUri,
      code,
      code_verifier: transaction.verifier,
    }),
    cache: 'no-store',
  })
  if (!tokenResponse.ok) return new NextResponse('AUTH_CALLBACK_INVALID', { status: 400 })
  const tokens = await tokenResponse.json() as { id_token?: string }
  if (!tokens.id_token) return new NextResponse('AUTH_CALLBACK_INVALID', { status: 400 })

  let identity
  try { identity = await verifyIdToken(tokens.id_token, transaction.nonce) }
  catch { return new NextResponse('AUTH_CALLBACK_INVALID', { status: 400 }) }

  const decision = await decideCaptainAccess(identity.sub)
  if (!decision.allowed) return new NextResponse(`ACCESS_NOT_GRANTED:${decision.reason}`, { status: 403 })
  await createCaptainSession(identity)
  const response = NextResponse.redirect(new URL(transaction.returnTo, captainAuthConfig.baseUrl()))
  response.cookies.delete(TX_COOKIE)
  return response
}
