import { Toast, ToastType } from './toast'

interface ErrorProps extends Error {
  message: string
  code?: string
}

export const handleError = (message: string, err: ErrorProps) => {
  console.error(message, err.message, err.code)
  Toast({ message: `${message}: ${err.message}`, type: ToastType.Error })
}
