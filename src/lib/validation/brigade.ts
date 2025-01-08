import { z } from 'zod'

export const createBrigadeSchema = z.object({
  name: z.string().min(1, { message: 'Не может быть пустым' })
})

export const joinBrigadeSchema = z.object({
  inviteCode: z.string().length(6, { message: 'Длина кода 6 символов' })
})
