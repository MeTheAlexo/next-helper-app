'use client'

import { useActionState } from 'react'
import { leaveBrigade } from '@/server/actions/leave-brigade'

import { Button } from './ui/button'

export function BrigadeLeaveButton() {
  const [_, action, isPending] = useActionState(leaveBrigade, {})
  return (
    <form action={action}>
      <Button variant="destructive" className="w-full" disabled={isPending}>
        Покинуть бригаду
      </Button>
    </form>
  )
}
