'use client'

import Link from 'next/link'

import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardFooter } from './ui/card'

interface FormWrapperProps {
  children: React.ReactNode
  label: string
  linkLabel: string
  linkHref: string
}

export const FormWrapper = ({
  children,
  label,
  linkLabel,
  linkHref
}: FormWrapperProps) => {
  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <h1 className="text-3xl font-semibold">🔐 {label}</h1>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <Button variant="link" className="w-full" size="sm" asChild>
          <Link href={linkHref} className="underline">
            {linkLabel}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
