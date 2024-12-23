import type { Metadata, Viewport } from 'next'
import { fontMono, fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'

import { BottomNav } from '@/components/bottom-nav'

export const metadata: Metadata = {
  title: {
    default: 'IPBoom Helper',
    template: '%s - IPBoom Helper'
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
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
        <div className="flex min-h-screen flex-col">
          <main className="flex-1 p-4">
            {children}
            <div className="h-16" /> {/* Spacer for bottom navigation */}
          </main>
          <BottomNav />
        </div>
      </body>
    </html>
  )
}
