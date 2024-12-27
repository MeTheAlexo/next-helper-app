'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { login } from '@/server/actions/login'
import { loginSchema } from '@/lib/validation/auth'

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

export function LoginForm() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    const { error } = await login(values)
    if (error.root) {
      form.setError('root', { message: error.root })
    }
    if (error.email) {
      form.setError('email', { message: error.email })
    }
    if (error.password) {
      form.setError('password', { message: error.password })
    }
  }

  return (
    <FormWrapper
      label="Вход в аккаунт"
      linkLabel="Ещё нет аккаунта?"
      linkHref="/auth/register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            Войти
          </Button>
        </form>
      </Form>
    </FormWrapper>
  )
}
