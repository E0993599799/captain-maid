import 'server-only'

import { createPublicKey, verify } from 'node:crypto'
import { captainAuthConfig } from './config'
import type { CaptainIdentity } from './session'

type JwtHeader = { alg?: string; kid?: string }
type JwtClaims = { iss?: string; aud?: string | string[]; exp?: number; nonce?: string; sub?: string; sid?: string; email?: string; name?: string }

const decodeJson = <T>(part: string): T => JSON.parse(Buffer.from(part, 'base64url').toString('utf8')) as T

export async function verifyIdToken(idToken: string, expectedNonce: string): Promise<CaptainIdentity> {
  const parts = idToken.split('.')
  if (parts.length !== 3) throw new Error('AUTH_CALLBACK_INVALID: malformed id_token')
  const [headerPart, claimsPart, signaturePart] = parts
  const header = decodeJson<JwtHeader>(headerPart)
  const claims = decodeJson<JwtClaims>(claimsPart)
  if (header.alg !== 'RS256' || !header.kid) throw new Error('AUTH_CALLBACK_INVALID: unsupported signing key')

  const jwksResponse = await fetch(captainAuthConfig.jwksUri(), { cache: 'no-store' })
  if (!jwksResponse.ok) throw new Error('AUTH_CALLBACK_INVALID: jwks unavailable')
  const jwks = await jwksResponse.json() as { keys?: Array<Record<string, unknown> & { kid?: string }> }
  const jwk = jwks.keys?.find((key) => key.kid === header.kid)
  if (!jwk) throw new Error('AUTH_CALLBACK_INVALID: signing key not found')
  const key = createPublicKey({ key: jwk as never, format: 'jwk' })
  const valid = verify('RSA-SHA256', Buffer.from(`${headerPart}.${claimsPart}`), key, Buffer.from(signaturePart, 'base64url'))
  if (!valid) throw new Error('AUTH_CALLBACK_INVALID: signature')

  const issuer = captainAuthConfig.issuer().replace(/\/$/, '')
  if (claims.iss?.replace(/\/$/, '') !== issuer) throw new Error('AUTH_CALLBACK_INVALID: issuer')
  const audience = claims.aud
  if (!(audience === captainAuthConfig.clientId() || (Array.isArray(audience) && audience.includes(captainAuthConfig.clientId())))) throw new Error('AUTH_CALLBACK_INVALID: audience')
  if (!claims.exp || claims.exp <= Math.floor(Date.now() / 1000)) throw new Error('AUTH_CALLBACK_INVALID: expired')
  if (claims.nonce !== expectedNonce) throw new Error('AUTH_CALLBACK_INVALID: nonce')
  if (!claims.sub) throw new Error('AUTH_CALLBACK_INVALID: sub')
  return { sub: claims.sub, sid: claims.sid, email: claims.email, name: claims.name }
}
