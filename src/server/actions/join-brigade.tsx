'use server'

import { z } from 'zod'
import { joinBrigadeSchema } from '@/lib/validation/brigade'
import { db, table } from '../db'
import { getCurrentSession } from '../auth'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export const joinBrigade = async (
  values: z.infer<typeof joinBrigadeSchema>
) => {
  // TODO: Delete this
  await new Promise((res) => setTimeout(res, 1000))

  const result = await joinBrigadeSchema.safeParseAsync(values)
  if (!result.success) {
    return {
      error: {
        root: 'Ошибка валидации данных'
      }
    }
  }

  const { user } = await getCurrentSession()
  if (!user) {
    return {
      error: {
        root: 'Пользователь не авторизован'
      }
    }
  }

  let { inviteCode } = result.data
  inviteCode = inviteCode.toUpperCase()

  const brigade = await db.query.brigade.findFirst({
    where: (t, { eq }) => eq(t.inviteCode, inviteCode)
  })
  if (!brigade) {
    return {
      error: {
        inviteCode: 'Неверный пригласительный код'
      }
    }
  }

  const workersCount = await db.query.user.findMany({
    where: (t, { eq }) => eq(t.brigadeId, brigade.id)
  })
  if (workersCount.length >= 2) {
    return {
      error: {
        root: 'Достигнут лимит людей в бригаде'
      }
    }
  }

  await db
    .update(table.user)
    .set({ brigadeId: brigade.id })
    .where(eq(table.user.id, user.id))

  revalidatePath('/profile')
}
