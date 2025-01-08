'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { joinBrigade } from '@/server/actions/join-brigade'
import { joinBrigadeSchema } from '@/lib/validation/brigade'

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
import { AlertError } from './alert-error'

export function BrigadeJoinForm() {
  const form = useForm<z.infer<typeof joinBrigadeSchema>>({
    resolver: zodResolver(joinBrigadeSchema),
    defaultValues: {
      inviteCode: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof joinBrigadeSchema>) => {
    const result = await joinBrigade(values)
    if (result?.error.root) {
      form.setError('root', { message: result.error.root })
    }
    if (result?.error.inviteCode) {
      form.setError('inviteCode', { message: result.error.inviteCode })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="inviteCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground">
                Код приглашения
              </FormLabel>
              <FormControl>
                <Input type="text" placeholder="XXXXXX" {...field} />
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
  )
}
