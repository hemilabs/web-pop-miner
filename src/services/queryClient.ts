import { QueryCache, QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.meta?.errorMessage) {
        // We can improve this by using a toast component
        // Example: toast.error(query.meta.errorMessage)
        console.log(
          `Error in query ${query.queryKey}: ${query.meta.errorMessage} - ${error}`,
        )
      }
    },
  }),
})
