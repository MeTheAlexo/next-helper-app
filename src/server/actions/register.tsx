'use server'

import { z } from 'zod'
import { redirect } from 'next/navigation'
import { db, table } from '../db'
import {
  createSession,
  generateSessionToken,
  setSessionTokenCookie
} from '../auth'
import { hashPassword } from '../password'
import { registerSchema } from '@/lib/validation/auth'

export const register = async (values: z.infer<typeof registerSchema>) => {
  // TODO: Delete this
  await new Promise((res) => setTimeout(res, 1000))

  const result = await registerSchema.safeParseAsync(values)
  if (!result.success) {
    return {
      error: {
        root: 'Ошибка валидации данных'
      }
    }
  }

  const { name, email, password } = result.data

  const existingUser = await db.query.user.findFirst({
    where: (t, { eq }) => eq(t.email, email)
  })
  if (existingUser) {
    return {
      error: {
        email: 'Пользователь уже существует'
      }
    }
  }

  const passwordHash = await hashPassword(password)
  const [user] = await db
    .insert(table.user)
    .values({
      name,
      email,
      passwordHash
    })
    .returning()

  const sessionToken = generateSessionToken()
  const session = await createSession(sessionToken, user.id)
  await setSessionTokenCookie(sessionToken, session.expiresAt)

  return redirect('/profile')
}
