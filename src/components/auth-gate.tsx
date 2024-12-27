import { getCurrentSession } from '@/server/auth'
import { redirect } from 'next/navigation'

interface AuthGateProps {
  children: React.ReactNode
}

export async function AuthGate({ children }: AuthGateProps) {
  const { user } = await getCurrentSession()
  if (!user) {
    return redirect('/auth/login')
  }

  return <>{children}</>
}
