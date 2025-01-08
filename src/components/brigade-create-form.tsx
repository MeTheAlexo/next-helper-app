'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { createBrigade } from '@/server/actions/create-brigade'
import { createBrigadeSchema } from '@/lib/validation/brigade'

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

export function BrigadeCreateForm() {
  const form = useForm<z.infer<typeof createBrigadeSchema>>({
    resolver: zodResolver(createBrigadeSchema),
    defaultValues: {
      name: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof createBrigadeSchema>) => {
    const result = await createBrigade(values)
    if (result?.error.root) {
      form.setError('root', { message: result.error.root })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground">Название</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Иванов Светлаков" {...field} />
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
  )
}
