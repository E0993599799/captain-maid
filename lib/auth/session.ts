import 'server-only'

import { createHmac, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'
import { captainAuthConfig } from './config'

export type CaptainIdentity = { sub: string; sid?: string; email?: string; name?: string }
type SessionPayload = CaptainIdentity & { exp: number }

const SESSION_COOKIE = '__Host-captain_session'
export const TX_COOKIE = '__Host-captain_oidc_tx'

function sign(encoded: string): string {
  return createHmac('sha256', captainAuthConfig.sessionSecret()).update(encoded).digest('base64url')
}

export function encodeSigned(value: unknown): string {
  const encoded = Buffer.from(JSON.stringify(value)).toString('base64url')
  return `${encoded}.${sign(encoded)}`
}

export function decodeSigned<T>(token: string | undefined): T | null {
  if (!token) return null
  const [encoded, signature] = token.split('.')
  if (!encoded || !signature) return null
  const expected = sign(encoded)
  const a = Buffer.from(signature)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null
  try { return JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8')) as T } catch { return null }
}

export async function createCaptainSession(identity: CaptainIdentity): Promise<void> {
  const ttl = captainAuthConfig.sessionTtlSeconds()
  const payload: SessionPayload = { ...identity, exp: Math.floor(Date.now() / 1000) + ttl }
  const jar = await cookies()
  jar.set(SESSION_COOKIE, encodeSigned(payload), {
    httpOnly: true,
    sameSite: 'lax',
    secure: captainAuthConfig.cookieSecure(),
    path: '/',
    maxAge: ttl,
  })
}

export async function getCaptainSession(): Promise<CaptainIdentity | null> {
  const jar = await cookies()
  const payload = decodeSigned<SessionPayload>(jar.get(SESSION_COOKIE)?.value)
  if (!payload?.sub || payload.exp <= Math.floor(Date.now() / 1000)) return null
  return { sub: payload.sub, sid: payload.sid, email: payload.email, name: payload.name }
}

export async function clearCaptainSession(): Promise<void> {
  const jar = await cookies()
  jar.delete(SESSION_COOKIE)
}
