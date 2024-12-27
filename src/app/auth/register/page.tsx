import { Metadata } from 'next'

import { GuestOnly } from '@/components/guest-only'
import { RegisterForm } from '@/components/register-form'

export const metadata: Metadata = {
  title: 'Регистрация'
}

export default function Register() {
  return (
    <GuestOnly>
      <RegisterForm />
    </GuestOnly>
  )
}
