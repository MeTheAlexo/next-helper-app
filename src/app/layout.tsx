import type { Metadata } from 'next'
import { fontMono, fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: {
    default: 'IPBoom Helper',
    template: '%s - IPBoom Helper'
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'font-sans antialiased',
          fontSans.variable,
          fontMono.variable
        )}
      >
        {children}
      </body>
    </html>
  )
}
