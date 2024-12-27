import { getCurrentSession } from '@/server/auth'
import { redirect } from 'next/navigation'

interface GuestOnlyProps {
  children: React.ReactNode
}

export async function GuestOnly({ children }: GuestOnlyProps) {
  const { user } = await getCurrentSession()
  if (user) {
    return redirect('/profile')
  }

  return <>{children}</>
}
