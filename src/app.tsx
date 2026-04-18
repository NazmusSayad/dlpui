import { createBrowserRouter, Navigate, Outlet } from 'react-router'
import { AppSidebar } from './components/app-sidebar'
import { ErrorPage } from './components/error-page'
import {
  BetterScrollAreaContent,
  BetterScrollAreaProvider,
} from './components/ui/better-scroll-area'
import { SessionNewPage } from './features/session/session-new-page'
import { SessionPage } from './features/session/session-page'

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
        element: <Navigate to="/session/new" replace />,
      },
      {
        path: 'session/new',
        element: <SessionNewPage />,
      },
      {
        path: 'session/:sessionId',
        element: <SessionPage />,
      },
    ],
  },
])
