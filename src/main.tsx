import './styles/fonts.css'
import './styles/index.css'

import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { appRouter } from './app'
import { Toaster } from './components/ui/sonner'

const root = document.getElementById('root')

if (!root) {
  throw new Error('Root element not found')
}

ReactDOM.createRoot(root).render(
  <>
    <RouterProvider router={appRouter} />
    <Toaster />
  </>
)
