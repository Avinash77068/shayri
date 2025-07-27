import { toast, ToastOptions } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type ToastVariant = 'success' | 'error' | 'info' | 'warning'

interface ShowToastParams {
  message: string
  type?: ToastVariant
  options?: ToastOptions
}

/**
 * Show a toast notification.
 *
 * @param message - The text to display inside the toast
 * @param type - Type of toast: success | error | warning | info (default: info)
 * @param options - Additional ToastOptions from react-toastify
 *
 * Example usage:
 * Toaster({
 *   message: 'Logged out successfully!',
 *   type: 'success',
 *   options: { autoClose: 4000 }
 * })
 */
const isMobile = window.innerWidth < 768;

export function Toaster({
  message,
  type,
  options = {}
}: ShowToastParams) {
  const baseOptions: ToastOptions = {
    position: isMobile ? 'bottom-center' : 'top-right',
    autoClose: 3000,
    pauseOnHover: true,
    closeOnClick: true,
    draggable: true,
    theme: 'colored',
    ...options
  }

  switch (type) {
    case 'success':
      toast.success(message, baseOptions)
      break
    case 'error':
      toast.error(message, baseOptions)
      break
    case 'warning':
      toast.warning(message, baseOptions)
      break
    default:
      toast.info(message, baseOptions)
      break
  }
}
