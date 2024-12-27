import dynamic from 'next/dynamic'

import { GuestOnly } from '@/components/guest-only'

const RegisterForm = dynamic(() => import('@/components/register-form'))

export default function Register() {
  return (
    <GuestOnly>
      <RegisterForm />
    </GuestOnly>
  )
}
