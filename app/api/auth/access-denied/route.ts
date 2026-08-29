import { NextResponse } from 'next/server'

export async function GET() {
  return new NextResponse('ACCESS_NOT_GRANTED', {
    status: 403,
    headers: { 'cache-control': 'no-store' },
  })
}
