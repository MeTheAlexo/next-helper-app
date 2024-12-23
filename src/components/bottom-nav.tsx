'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

import { Home, Search, Bell, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Search, label: 'Search', href: '/search' },
  { icon: Bell, label: 'Notifications', href: '/notifications' },
  { icon: User, label: 'Profile', href: '/profile' }
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-4 left-0 right-0 mx-auto w-[calc(100%-8rem)] max-w-md">
      <nav className="rounded-full bg-background p-2 shadow-lg">
        <ul className="flex justify-around">
          {navItems.map((item) => (
            <li key={item.label}>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  'rounded-full transition-colors',
                  pathname === item.href
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-primary/10 hover:text-primary'
                )}
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="h-6 w-6" />
                  <span className="sr-only">{item.label}</span>
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
