import { QueryCache, QueryClient } from '@tanstack/react-query'
import { Toast, ToastType } from 'utils/toast'

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.meta?.errorMessage) {
        const message = `Error in query ${query.queryKey}: ${query.meta.errorMessage} - ${error}`
        Toast({ message, type: ToastType.Error })
        console.log(message)
      }
    },
  }),
})
