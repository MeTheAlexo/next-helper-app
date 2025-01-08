import { Metadata } from 'next'
import { getCurrentSession } from '@/server/auth'

import { AuthGate } from '@/components/auth-gate'
import { LogoutButton } from '@/components/logout-button'
import { BrigadeWidget } from '@/components/brigade-widget'

export const metadata: Metadata = {
  title: 'Профиль'
}

export default async function Profile() {
  const { user } = await getCurrentSession()

  return (
    <AuthGate>
      <div className="flex flex-col space-y-4">
        <LogoutButton />
        <BrigadeWidget brigade={user?.brigade} />
      </div>
    </AuthGate>
  )
}
