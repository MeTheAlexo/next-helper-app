import dynamic from 'next/dynamic'

import { GuestOnly } from '@/components/guest-only'

const LoginForm = dynamic(() => import('@/components/login-form'))

export default function Login() {
  return (
    <GuestOnly>
      <LoginForm />
    </GuestOnly>
  )
}
