import { Button } from '@/components/ui/button'
import { Alert02Icon, ReloadIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

export function ErrorPage() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-6">
      <div className="bg-destructive/10 flex size-20 items-center justify-center rounded-full">
        <HugeiconsIcon
          icon={Alert02Icon}
          className="text-destructive size-10"
        />
      </div>
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Something went wrong
        </h1>
        <p className="text-muted-foreground text-sm">
          An unexpected error occurred. Please try again.
        </p>
      </div>

      <Button onClick={() => window.location.replace('/')}>
        <HugeiconsIcon icon={ReloadIcon} /> Restart
      </Button>
    </div>
  )
}
