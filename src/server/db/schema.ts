import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { nanoid } from 'nanoid'

export const brigade = pgTable('brigades', {
  id: text('id')
    .notNull()
    .primaryKey()
    .$default(() => nanoid()),
  name: text('name').notNull(),
  inviteCode: text('invite_code').notNull().unique(),
  createdAt: timestamp('created_at', {
    withTimezone: true,
    mode: 'date'
  })
    .notNull()
    .$default(() => new Date())
})

export const brigadeRelations = relations(brigade, ({ many }) => ({
  workers: many(user)
}))

export const user = pgTable('users', {
  id: text('id')
    .notNull()
    .primaryKey()
    .$default(() => nanoid()),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  brigadeId: text('brigade_id'),
  createdAt: timestamp('created_at', {
    withTimezone: true,
    mode: 'date'
  })
    .notNull()
    .$default(() => new Date())
})

export const userRelations = relations(user, ({ one }) => ({
  brigade: one(brigade, { fields: [user.brigadeId], references: [brigade.id] })
}))

export const session = pgTable('sessions', {
  id: text('id').notNull().primaryKey(),
  userId: text('user_id').notNull(),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'date'
  }).notNull()
})

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, { fields: [session.userId], references: [user.id] })
}))
