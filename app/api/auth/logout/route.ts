import { NextResponse } from 'next/server'
import { captainAuthConfig } from '../../../../lib/auth/config'
import { clearCaptainSession } from '../../../../lib/auth/session'

export async function GET() {
  await clearCaptainSession()
  return NextResponse.redirect(new URL('/', captainAuthConfig.baseUrl()))
}
