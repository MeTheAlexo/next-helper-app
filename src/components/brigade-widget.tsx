'use client'

import { Brigade } from '@/server/db'
import { AlertCircle } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { BrigadeCreateForm } from './brigade-create-form'
import { BrigadeJoinForm } from './brigade-join-form'
import { BrigadeLeaveButton } from './brigade-leave-button'

interface BrigadeWidgetProps {
  brigade:
    | (Brigade & { workers: { name: string; email: string }[] })
    | null
    | undefined
}

export function BrigadeWidget({ brigade }: BrigadeWidgetProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Управление бригадой</CardTitle>
      </CardHeader>
      <CardContent>
        {brigade ? (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Состав</AccordionTrigger>
              <AccordionContent>
                <ul className="flex flex-col space-y-4">
                  {brigade.workers.map((worker, i) => (
                    <li key={i} className="flex flex-col space-y-1">
                      <span className="text-lg font-medium">{worker.name}</span>
                      <span>{worker.email}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Пригласить</AccordionTrigger>
              <AccordionContent>
                <span className="text-xl font-medium tracking-wide">
                  {brigade.inviteCode}
                </span>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Покинуть</AccordionTrigger>
              <AccordionContent>
                <BrigadeLeaveButton />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : (
          <>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Ошибка!</AlertTitle>
              <AlertDescription>Вы ещё не состоите в бригаде.</AlertDescription>
            </Alert>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Войти</AccordionTrigger>
                <AccordionContent>
                  <BrigadeJoinForm />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Создать</AccordionTrigger>
                <AccordionContent>
                  <BrigadeCreateForm />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </>
        )}
      </CardContent>
    </Card>
  )
}
