'use server'

import { z } from 'zod'
import { createBrigadeSchema } from '@/lib/validation/brigade'
import { generateInviteCode } from '@/lib/utils'
import { db, table } from '../db'
import { getCurrentSession } from '../auth'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export const createBrigade = async (
  values: z.infer<typeof createBrigadeSchema>
) => {
  // TODO: Delete this
  await new Promise((res) => setTimeout(res, 1000))

  const result = await createBrigadeSchema.safeParseAsync(values)
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

  const { name } = result.data
  const inviteCode = generateInviteCode()

  try {
    const [brigade] = await db
      .insert(table.brigade)
      .values({
        name,
        inviteCode
      })
      .returning()

    await db
      .update(table.user)
      .set({ brigadeId: brigade.id })
      .where(eq(table.user.id, user.id))

    revalidatePath('/profile')
  } catch {
    return {
      error: {
        root: 'Ошибка на стороне сервера'
      }
    }
  }
}
