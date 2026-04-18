import { createBrowserRouter, Outlet } from 'react-router'
import { AppSidebar } from './components/app-sidebar'
import {
  BetterScrollAreaContent,
  BetterScrollAreaProvider,
} from './components/ui/better-scroll-area'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { Label } from './components/ui/label'
import { Switch } from './components/ui/switch'
import { useConfigStore } from './store/config-store'

function HomePage() {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Your application is ready. Start building your features here.
        </p>
      </CardContent>
    </Card>
  )
}

function SettingsPage() {
  const { settings, updateSettings } = useConfigStore()

  return (
    <div className="flex flex-col gap-6">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="start-on-login">Start on Login</Label>
            <Switch
              id="start-on-login"
              checked={settings.startOnLogin}
              onCheckedChange={(checked) => updateSettings({ startOnLogin: checked })}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <div className="grid size-full grid-cols-[auto_1fr] overflow-hidden">
        <AppSidebar />

        <BetterScrollAreaProvider>
          <BetterScrollAreaContent>
            <div className="p-6 pb-8">
              <Outlet />
            </div>
          </BetterScrollAreaContent>
        </BetterScrollAreaProvider>
      </div>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
    ],
  },
])