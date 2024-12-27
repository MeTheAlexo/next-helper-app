import { AlertCircle } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface AlertErrorProps {
  message?: string
}

export function AlertError({ message }: AlertErrorProps) {
  if (!message) return null

  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Ошибка!</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}
