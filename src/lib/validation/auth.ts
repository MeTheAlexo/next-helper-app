import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().trim().min(1, { message: 'Не может быть пустым' }),
  email: z.string().trim().email({ message: 'Неверный формат email' }),
  password: z.string().min(6, { message: 'Не менее 6 символов' })
})

export const loginSchema = z.object({
  email: z.string().email({ message: 'Неверный формат email' }),
  password: z.string().min(1, { message: 'Не может быть пустым' })
})
