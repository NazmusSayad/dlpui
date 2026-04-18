import { createBrowserRouter, Outlet } from 'react-router'
import { AppSidebar } from './components/app-sidebar'
import { ErrorPage } from './components/error-page'
import {
  BetterScrollAreaContent,
  BetterScrollAreaProvider,
} from './components/ui/better-scroll-area'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'

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

export const appRouter = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    element: (
      <div className="grid size-full h-screen grid-cols-[auto_1fr] overflow-hidden">
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
    ],
  },
])
