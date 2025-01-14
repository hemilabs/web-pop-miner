import { QueryCache, QueryClient } from '@tanstack/react-query';
import { toastNotify, ToastType } from 'utils/toast';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) =>
      query.meta?.errorMessage &&
      toastNotify({
        message: `Error in query ${query.queryKey}: ${query.meta.errorMessage} - ${error}`,
        type: ToastType.Error,
      }),
  }),
});
