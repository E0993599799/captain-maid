function required(name: string): string {
  const value = process.env[name]?.trim()
  if (!value) throw new Error(`Missing required environment variable: ${name}`)
  return value
}

export const captainAuthConfig = {
  appId: 'captain-maid',
  centralPortalUrl: 'https://auth.arigeo.com',
  baseUrl: () => required('CAPTAIN_BASE_URL'),
  issuer: () => required('OIDC_ISSUER'),
  clientId: () => required('OIDC_CLIENT_ID'),
  authorizationEndpoint: () => required('OIDC_AUTHORIZATION_ENDPOINT'),
  tokenEndpoint: () => required('OIDC_TOKEN_ENDPOINT'),
  jwksUri: () => required('OIDC_JWKS_URI'),
  scopes: () => process.env.OIDC_SCOPES?.trim() || 'openid profile email',
  sessionSecret: () => required('CAPTAIN_SESSION_SECRET'),
  entitlementEndpoint: () => process.env.ARIGEO_ENTITLEMENT_ENDPOINT?.trim() || 'https://auth.arigeo.com/api/access/decision',
  entitlementApiKey: () => required('ARIGEO_ACCESS_API_KEY'),
  membershipsJson: () => process.env.CAPTAIN_MEMBERSHIPS_JSON?.trim() || '[]',
  cookieSecure: () => process.env.COOKIE_SECURE !== 'false',
  sessionTtlSeconds: () => Number(process.env.SESSION_TTL_SECONDS || '28800'),
} as const
