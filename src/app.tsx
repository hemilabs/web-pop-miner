import { RouterProvider } from 'react-router-dom'

import './styles/index.css'
import 'react-loading-skeleton/dist/skeleton.css'
import { router } from './router'
import { queryClient } from 'services/queryClient'
import { QueryClientProvider } from '@tanstack/react-query'
import { PopminerProvider } from 'context/popminerContext'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

/**
 * It overrides the console.log function to dispatch an event
 * the custom event is used on explorer page to extract the transaction hash
 * This is temporary until we have the issue below done
 * https://github.com/hemilabs/heminetwork/issues/150
 */
;(function () {
  const originalLog = console.log

  console.log = function (...args) {
    const event = new CustomEvent('logEvent', { detail: args.join(' ') })
    document.dispatchEvent(event)
    originalLog.apply(console, args)
  }
})()

export const App = () => (
  <div className="bg-neutral-50">
    <PopminerProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </PopminerProvider>
    <ToastContainer />
  </div>
)
