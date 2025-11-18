'use client'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Toast = () => {
  return (
    <ToastContainer
      draggable
      newestOnTop
      closeOnClick
      hideProgressBar
      autoClose={3000}
      className="mb-16"
      pauseOnHover={false}
      position="bottom-right"
      pauseOnFocusLoss={false}
      toastClassName={() =>
        'border z-50 mb-4 flex min-h-14 min-w-64 cursor-pointer items-center rounded-lg bg-white px-4 py-2 text-left text-sm text-black shadow-lg shadow-primary/10'
      }
    />
  )
}

export default Toast
