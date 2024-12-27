import { getCurrentSession } from '@/server/auth'

import { AuthGate } from '@/components/auth-gate'
import { LogoutButton } from '@/components/logout-button'

export default async function Profile() {
  const { user } = await getCurrentSession()

  return (
    <AuthGate>
      <div className="flex flex-col space-y-4">
        <p>Привет, {user?.name}!</p>
        <LogoutButton />
      </div>
    </AuthGate>
  )
}
