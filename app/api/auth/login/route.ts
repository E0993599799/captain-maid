import { NextRequest, NextResponse } from 'next/server'
import { captainAuthConfig } from '../../../../lib/auth/config'
import { pkceChallenge, randomUrlSafe } from '../../../../lib/auth/crypto'
import { encodeSigned, TX_COOKIE } from '../../../../lib/auth/session'

function safeReturnTo(value: string | null): string {
  return value && value.startsWith('/') && !value.startsWith('//') ? value : '/management'
}

export async function GET(request: NextRequest) {
  const state = randomUrlSafe(24)
  const nonce = randomUrlSafe(24)
  const verifier = randomUrlSafe(48)
  const returnTo = safeReturnTo(request.nextUrl.searchParams.get('returnTo'))
  const redirectUri = new URL('/api/auth/callback', captainAuthConfig.baseUrl()).toString()
  const url = new URL(captainAuthConfig.authorizationEndpoint())
  url.searchParams.set('client_id', captainAuthConfig.clientId())
  url.searchParams.set('redirect_uri', redirectUri)
  url.searchParams.set('response_type', 'code')
  url.searchParams.set('scope', captainAuthConfig.scopes())
  url.searchParams.set('state', state)
  url.searchParams.set('nonce', nonce)
  url.searchParams.set('code_challenge', pkceChallenge(verifier))
  url.searchParams.set('code_challenge_method', 'S256')

  const response = NextResponse.redirect(url)
  response.cookies.set(TX_COOKIE, encodeSigned({ state, nonce, verifier, returnTo, exp: Date.now() + 10 * 60_000 }), {
    httpOnly: true,
    sameSite: 'lax',
    secure: captainAuthConfig.cookieSecure(),
    path: '/',
    maxAge: 600,
  })
  return response
}
