'use server'

import { z } from 'zod'
import { redirect } from 'next/navigation'
import { db } from '../db'
import {
  createSession,
  generateSessionToken,
  setSessionTokenCookie
} from '../auth'
import { verifyPasswordHash } from '../password'
import { loginSchema } from '@/lib/validation/auth'

export const login = async (values: z.infer<typeof loginSchema>) => {
  // TODO: Delete this
  await new Promise((res) => setTimeout(res, 1000))

  const result = await loginSchema.safeParseAsync(values)
  if (!result.success) {
    return {
      error: {
        root: 'Ошибка валидации данных'
      }
    }
  }

  const { email, password } = result.data

  const existingUser = await db.query.user.findFirst({
    where: (t, { eq }) => eq(t.email, email)
  })
  if (!existingUser) {
    return {
      error: {
        email: 'Пользователя не существует'
      }
    }
  }

  const validPassword = await verifyPasswordHash(
    existingUser.passwordHash,
    password
  )
  if (!validPassword) {
    return {
      error: {
        password: 'Неверный пароль'
      }
    }
  }

  const sessionToken = generateSessionToken()
  const session = await createSession(sessionToken, existingUser.id)
  await setSessionTokenCookie(sessionToken, session.expiresAt)

  return redirect('/profile')
}
