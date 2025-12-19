'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { toast } from 'react-toastify'

import { useAppStore } from '@/store/provider'
import { useRecaptchaV2 } from '@/hooks/useRecaptcha'
import { Honeypot } from '@/lib/forms/Honeypot'
import { useZodValidation } from '@/lib/forms/useZodValidation'
import { PopupEnquirySchema } from '@/lib/forms/schemas/popUpEnquiry.schema'

const PopupForm = ({ locale }: { locale: string }) => {
  const [isOpen, setIsOpen] = useState(false)

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    city: '',
    honeypot: '',
  })

  const {
    contact: {
      whatsapp: { number, text },
    },
  } = useAppStore((state) => state.general)

  const { token, isVerified, reset, Recaptcha } = useRecaptchaV2()
  const { validate } = useZodValidation(PopupEnquirySchema)

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // 0️⃣ Honeypot (silent block)
    if (formData.honeypot) return

    // 1️⃣ Build payload (city optional for bh)
    const payload = {
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      city: locale === 'bh' ? undefined : formData.city,
      honeypot: formData.honeypot,
    }

    // 2️⃣ Validate
    const result = validate(payload)
    if (!result.valid) {
      Object.values(result.errors).forEach((errs) =>
        errs.forEach((msg) => toast.error(msg))
      )
      return
    }

    // 3️⃣ Captcha
    if (!isVerified || !token) {
      toast.error('Please verify that you are not a robot')
      return
    }

    // 4️⃣ Build WhatsApp message
    const cityLine =
      locale === 'bh' || !result.data.city
        ? ''
        : `*City:* ${result.data.city}\n\n`

    const heading =
      locale === 'bh'
        ? `*New Year Offer Lead*\n\n`
        : `*Summer Offers - New Lead*\n\n`

    const message =
      heading +
      `*Name:* ${result.data.username}\n` +
      `*Email:* ${result.data.email}\n` +
      `*Phone:* ${result.data.phone}\n` +
      cityLine +
      `${text}`

    const whatsappUrl = `https://wa.me/${number}?text=${encodeURIComponent(message)}`

    reset()
    toast.success('Form submitted! Redirecting to WhatsApp...')
    setIsOpen(false)
    window.open(whatsappUrl, '_blank')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <h2 className="mb-2 text-center text-xl font-bold text-green-700">
          Fill the Form & Book Instantly!
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={formData.username}
            onChange={(e) => handleInputChange('username', e.target.value)}
            placeholder="Username"
            className="w-full rounded border px-3 py-2"
          />

          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="Email"
            className="w-full rounded border px-3 py-2"
          />

          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="Phone"
            className="w-full rounded border px-3 py-2"
          />

          {locale !== 'bh' && (
            <input
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              placeholder="City"
              className="w-full rounded border px-3 py-2"
            />
          )}

          {/* Honeypot */}
          <Honeypot
            value={formData.honeypot}
            onChange={(v) => handleInputChange('honeypot', v)}
          />

          <div>{Recaptcha}</div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="w-full rounded bg-green-700 py-2 font-semibold text-white hover:bg-green-800"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full rounded bg-red-500 py-2 font-semibold text-white hover:bg-red-600"
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
