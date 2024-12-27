'use server'

import { redirect } from 'next/navigation'
import {
  deleteSessionTokenCookie,
  getCurrentSession,
  invalidateSession
} from '../auth'

export const logout = async () => {
  // TODO: Delete this
  await new Promise((res) => setTimeout(res, 1000))

  const { session } = await getCurrentSession()

  await invalidateSession(session!.id)
  await deleteSessionTokenCookie()

  return redirect('/')
}
