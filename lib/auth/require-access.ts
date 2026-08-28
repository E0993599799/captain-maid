import 'server-only'

import { redirect } from 'next/navigation'
import { captainAuthConfig } from './config'
import { getCaptainSession } from './session'

export async function decideCaptainAccess(sub: string): Promise<{ allowed: boolean; reason: string }> {
  const response = await fetch(captainAuthConfig.entitlementEndpoint(), {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${captainAuthConfig.entitlementApiKey()}`,
    },
    body: JSON.stringify({ appId: captainAuthConfig.appId, sub }),
    cache: 'no-store',
  })
  if (!response.ok) return { allowed: false, reason: 'ACCESS_DECISION_UNAVAILABLE' }
  const result = await response.json() as { allowed?: boolean; reason?: string }
  return result.allowed
    ? { allowed: true, reason: result.reason || 'ACTIVE_ENTITLEMENT' }
    : { allowed: false, reason: result.reason || 'APP_ACCESS_NOT_GRANTED' }
}

export async function requireCaptainAccess() {
  const session = await getCaptainSession()
  if (!session) redirect('/api/auth/login?returnTo=/management')
  const decision = await decideCaptainAccess(session.sub)
  if (!decision.allowed) throw new Error(`ACCESS_NOT_GRANTED:${decision.reason}`)
  return session
}
