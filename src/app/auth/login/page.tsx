import { Metadata } from 'next'

import { GuestOnly } from '@/components/guest-only'
import { LoginForm } from '@/components/login-form'

export const metadata: Metadata = {
  title: 'Вход'
}

export default function Login() {
  return (
    <GuestOnly>
      <LoginForm />
    </GuestOnly>
  )
}
