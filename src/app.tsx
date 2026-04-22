import { createBrowserRouter } from 'react-router'
import { ErrorPage } from './components/error-page'
import { BetterScrollArea } from './components/ui/better-scroll-area'
import { AddNewDownloadButton } from './features/downloads/add-new-download-button'
import { DownloadsTable } from './features/downloads/downloads-table'

export const appRouter = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <>
            <div className="grid h-screen">
              <BetterScrollArea>
                <DownloadsTable />
              </BetterScrollArea>
            </div>

            <AddNewDownloadButton />
          </>
        ),
      },
    ],
  },
])
