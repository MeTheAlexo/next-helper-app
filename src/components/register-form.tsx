'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { register } from '@/server/actions/register'
import { registerSchema } from '@/lib/validation/auth'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FormWrapper } from './form-wrapper'
import { AlertError } from './alert-error'

export function RegisterForm() {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    const { error } = await register(values)
    if (error.root) {
      form.setError('root', { message: error.root })
    }
    if (error.email) {
      form.setError('email', { message: error.email })
    }
  }

  return (
    <FormWrapper
      label="Создать аккаунт"
      linkLabel="Уже есть аккаунт?"
      linkHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Иван" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="ivan@email.ru" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <AlertError message={form.formState.errors.root?.message} />

          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            Создать
          </Button>
        </form>
      </Form>
    </FormWrapper>
  )
}
