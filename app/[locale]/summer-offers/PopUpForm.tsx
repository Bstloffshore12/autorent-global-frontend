'use client'

import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useAppStore } from '@/store/provider'

const PopupForm = ({ locale }: { locale: string }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    city: '',
  })

  const {
    contact: {
      whatsapp: { number, text },
    },
  } = useAppStore((state) => state.general)

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 500) // delay popup
    return () => clearTimeout(timer)
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Build message parts conditionally — do not include city for bh locale
    const cityLine =
      locale === 'bh' || !formData.city ? '' : `*City:* ${formData.city}\n\n`

    const heading =
      locale === 'bh'
        ? `*New Year Offer Lead*\n\n`
        : `*Summer Offers - New Lead*\n\n`

    const message =
      heading +
      `*Name:* ${formData.username}\n` +
      `*Email:* ${formData.email}\n` +
      `*Phone:* ${formData.phone}\n` +
      (cityLine ? cityLine : '') +
      `${text}`

    // Encode the message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${number}?text=${encodedMessage}`

    // Show success message
    toast.success('Form Submitted! Redirecting to WhatsApp...')

    // Close popup
    setIsOpen(false)

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="animate-fade-in relative w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <h2 className="mb-2 text-center text-xl font-bold text-green-700">
          Fill the Form & Book Instantly!
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="mb-1 block font-medium">
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              required
              className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter Your Username"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block font-medium">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
              className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter Your Email"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phone" className="mb-1 block font-medium">
              Phone Number:
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              required
              className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter Your Phone Number"
            />
          </div>

          {/* City (only show when locale !== 'bh') */}
          {locale !== 'bh' && (
            <div>
              <label htmlFor="city" className="mb-1 block font-medium">
                City:
              </label>
              <input
                type="text"
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                required={locale !== 'bh'} // redundant since field hidden for 'bh', but kept for clarity
                className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter Your City"
              />
            </div>
          )}

          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <button
              type="submit"
              className="w-full rounded-md bg-green-700 py-2 font-semibold text-white hover:bg-green-800"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full rounded-md bg-red-500 py-2 font-semibold text-white hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PopupForm
