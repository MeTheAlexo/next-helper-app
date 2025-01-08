'use server'

import { db, table } from '../db'
import { getCurrentSession } from '../auth'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export const leaveBrigade = async () => {
  // TODO: Delete this
  await new Promise((res) => setTimeout(res, 1000))

  const { user } = await getCurrentSession()

  await db
    .update(table.user)
    .set({ brigadeId: null })
    .where(eq(table.user.id, user!.id))

  revalidatePath('/profile')
  return {}
}
