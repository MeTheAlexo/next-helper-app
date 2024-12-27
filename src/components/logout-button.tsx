'use client'

import { useActionState } from 'react'
import { logout } from '@/server/actions/logout'

import { Button } from './ui/button'

export function LogoutButton() {
  const [_, action, isPending] = useActionState(logout, {})
  return (
    <form action={action}>
      <Button variant="destructive" className="w-full" disabled={isPending}>
        Выйти
      </Button>
    </form>
  )
}
