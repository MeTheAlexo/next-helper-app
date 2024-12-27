import { env } from '@/env'
import { eq } from 'drizzle-orm'
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase
} from '@oslojs/encoding'
import { sha256 } from '@oslojs/crypto/sha2'
import { db, Session, table } from './db'
import { cookies } from 'next/headers'
import { cache } from 'react'

export function generateSessionToken() {
  const bytes = new Uint8Array(20)
  crypto.getRandomValues(bytes)
  const token = encodeBase32LowerCaseNoPadding(bytes)
  return token
}

export async function createSession(token: string, userId: string) {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
  const session: Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
  }
  await db.insert(table.session).values(session)
  return session
}

export async function validateSessionToken(token: string) {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
  const result = await db.query.session.findFirst({
    where: (t, { eq }) => eq(t.id, sessionId),
    with: {
      user: {
        columns: {
          id: true,
          name: true,
          email: true,
          createdAt: true
        },
        with: {
          brigade: true
        }
      }
    }
  })
  if (!result) {
    return { session: null, user: null }
  }
  const { user, ...session } = result
  if (Date.now() >= session.expiresAt.getTime()) {
    await db.delete(table.session).where(eq(table.session.id, session.id))
    return { session: null, user: null }
  }
  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    await db
      .update(table.session)
      .set({
        expiresAt: session.expiresAt
      })
      .where(eq(table.session.id, session.id))
  }
  return { session, user }
}

export async function invalidateSession(sessionId: string) {
  await db.delete(table.session).where(eq(table.session.id, sessionId))
}

export async function setSessionTokenCookie(token: string, expiresAt: Date) {
  const cookieStore = await cookies()
  cookieStore.set('session', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: env.NODE_ENV === 'production',
    expires: expiresAt,
    path: '/'
  })
}

export async function deleteSessionTokenCookie() {
  const cookieStore = await cookies()
  cookieStore.set('session', '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: env.NODE_ENV === 'production',
    maxAge: 0,
    path: '/'
  })
}

type SessionValidationResult = Awaited<ReturnType<typeof validateSessionToken>>

export const getCurrentSession = cache(
  async (): Promise<SessionValidationResult> => {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value ?? null
    if (token === null) {
      return { session: null, user: null }
    }
    const result = await validateSessionToken(token)
    return result
  }
)
