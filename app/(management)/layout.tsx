import type { ReactNode } from 'react'
import { requireCaptainAccess } from '../../lib/auth/require-access'

export default async function ManagementLayout({ children }: { children: ReactNode }) {
  await requireCaptainAccess()
  return children
}
