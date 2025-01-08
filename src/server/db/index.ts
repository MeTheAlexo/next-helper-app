import { env } from '@/env'
import { drizzle } from 'drizzle-orm/neon-http'
import type { InferSelectModel } from 'drizzle-orm'
import * as schema from './schema'

export const db = drizzle(env.DATABASE_URL, { schema })
export const table = schema

export type User = InferSelectModel<typeof table.user>
export type Brigade = InferSelectModel<typeof table.brigade>
export type Session = InferSelectModel<typeof table.session>
