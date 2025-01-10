import { Bounce, toast } from 'react-toastify';

export enum ToastType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
  Warning = 'warning',
}

interface Props {
  message: string;
  type: ToastType;
}

/**
 * To be able to have some feedback to the user, we set the react-toastify library for now
 * we can always change it later.
 * Displays a toast message.
 * @param {Props} props - The properties for the toast message.
 * @param {string} message - The message to be displayed in the toast.
 * @param {ToastType} type - The type of the toast message (e.g., "success", "error", "warning").
 */
export function toastNotify({ message, type }: Props) {
  toast(message, {
    autoClose: 5000,
    closeOnClick: true,
    hideProgressBar: true,
    pauseOnHover: true,
    position: 'bottom-left',
    progress: undefined,
    theme: 'light',
    transition: Bounce,
    type,
  });
}
