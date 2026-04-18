import { Button } from '@/components/ui/button'
import {
  HomeIcon,
  Settings02Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Link, useLocation } from 'react-router'

const navItems = [
  {
    title: 'Home',
    icon: HomeIcon,
    href: '/',
  },
  {
    title: 'Settings',
    icon: Settings02Icon,
    href: '/settings',
  },
]

export function AppSidebar() {
  const pathname = useLocation()

  return (
    <div className="flex h-full w-48 flex-col items-start gap-4 overflow-hidden border-r p-2">
      <div className="flex flex-col gap-2 w-full">
        {navItems.map((item) => (
          <Button
            key={item.title}
            asChild
            className="w-full shrink-0 justify-start"
            variant={pathname.pathname === item.href ? 'default' : 'ghost'}
          >
            <Link to={item.href}>
              <HugeiconsIcon icon={item.icon} className="size-4" /> {item.title}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  )
}