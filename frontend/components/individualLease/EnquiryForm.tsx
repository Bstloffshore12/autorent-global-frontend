'use client'

import { Button } from 'react-aria-components'
import { useState, useEffect } from 'react'
import { classnames } from '@/futils'
import { useAppStore } from '@/store/provider'
import LoadingSpinner from '@/icons/LoadingSpinner'
import customerVehicleRequestAction from '@/actions/webforms/customerVehicleRequestAction'
import { toast } from 'react-toastify'

const EnquiryForm = () => {
  const {
    user: { userData },
  } = useAppStore((state) => state)
  const [yourName, setYourName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [model, setModel] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // ✅ When userData arrives → update fields
  useEffect(() => {
    if (userData) {
      setYourName(`${userData.first_name} ${userData.last_name}`)
      setPhone(userData.phone || '')
      setEmail(userData.email || '')
    }
  }, [userData])
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const payload = {
      name: yourName,
      email,
      phone,
      vehicle_name: model,
      message,
    }

    try {
      const apiResponse = await customerVehicleRequestAction(payload)

      if (!apiResponse.success) {
        if (apiResponse.errors) {
          Object.values(apiResponse.errors).forEach((msgs) => {
            if (Array.isArray(msgs)) {
              msgs.forEach((msg) => toast.error(msg))
            } else {
              toast.error(String(msgs))
            }
          })
        } else {
          toast.error(apiResponse.message)
        }

        setIsSubmitting(false)
        return
      }

      toast.success('Inquiry submitted successfully!')
      setModel('')
      setMessage('')
    } catch (e) {
      console.error(e)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto max-w-xl space-y-5 rounded-2xl border bg-white p-6 shadow-md"
    >
      {/* Name */}
      <div>
        <label className="mb-1 block text-left text-sm font-medium">
          Your Name
        </label>
        <input
          type="text"
          value={yourName}
          onChange={(e) => setYourName(e.target.value)}
          className="w-full rounded-lg border px-3 py-2 focus:border-primary focus:ring-primary"
          placeholder="Enter your name"
          required
        />
      </div>

      {/* Phone */}
      <div>
        <label className="mb-1 block text-left text-sm font-medium">
          Phone Number
        </label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-lg border px-3 py-2 focus:border-primary focus:ring-primary"
          placeholder="Enter your phone"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label className="mb-1 block text-left text-sm font-medium">
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border px-3 py-2 focus:border-primary focus:ring-primary"
          placeholder="Enter your email"
        />
      </div>

      {/* Model */}
      <div>
        <label className="mb-1 block text-left text-sm font-medium">
          Vehicle Name
        </label>
        <input
          type="text"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="w-full rounded-lg border px-3 py-2 focus:border-primary focus:ring-primary"
          placeholder="Example: Nissan Sunny / Toyota Corolla"
        />
      </div>

      {/* Message */}
      <div>
        <label className="mb-1 block text-left text-sm font-medium">
          Message (Optional)
        </label>
        <textarea
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-lg border px-3 py-2 focus:border-primary focus:ring-primary"
          placeholder="Any specific requirements?"
        ></textarea>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className={classnames(
          'flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary py-3 font-semibold text-white shadow hover:opacity-90'
        )}
        isDisabled={isSubmitting}
      >
        {isSubmitting && <LoadingSpinner className="h-5 w-5" />}
        {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
      </Button>
    </form>
  )
}

export default EnquiryForm
