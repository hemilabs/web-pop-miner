import { RouterProvider } from 'react-router-dom'

import './styles/index.css'
import 'react-loading-skeleton/dist/skeleton.css'
import { router } from './router'
import { queryClient } from 'services/queryClient'
import { QueryClientProvider } from '@tanstack/react-query'
import { PopminerProvider } from 'context/popminerContext'

export const App = () => (
  <div className="bg-neutral-50">
    <PopminerProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </PopminerProvider>
  </div>
)
