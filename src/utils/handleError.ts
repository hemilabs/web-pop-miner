import { toastNotify, ToastType } from './toast';

interface ErrorProps extends Error {
  message: string;
  code?: string;
}

export function handleError(message: string, err: ErrorProps) {
  toastNotify({ message: `${message}: ${err.message}`, type: ToastType.Error });
}
