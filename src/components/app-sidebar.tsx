import { Button } from '@/components/ui/button'
import { PlusSignIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Link, useParams } from 'react-router'
import { BetterScrollArea } from './ui/better-scroll-area'

const SESSIONS = ['Session 1', 'Session 2', 'Session 3']

export function AppSidebar() {
  const params = useParams()

  return (
    <div className="flex h-full w-48 flex-col items-start overflow-hidden border-r">
      <div className="border-border/80 w-full border-b p-2">
        <Button asChild variant="outline" className="w-full">
          <Link to="/session/new">
            <HugeiconsIcon icon={PlusSignIcon} className="size-4" /> New
            Download
          </Link>
        </Button>
      </div>

      <BetterScrollArea>
        <div className="flex w-full flex-col gap-1 p-2">
          {SESSIONS.map((session) => {
            const isActive = params.sessionId === session

            return (
              <Button
                asChild
                key={session}
                variant={isActive ? 'default' : 'ghost'}
                className="w-full justify-start"
              >
                <Link to={`/session/${session}`}>{session}</Link>
              </Button>
            )
          })}
        </div>
      </BetterScrollArea>
    </div>
  )
}
