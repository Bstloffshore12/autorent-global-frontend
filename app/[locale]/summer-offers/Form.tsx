'use client'

import { toast } from 'react-toastify'
import { type FormEvent, useState } from 'react'
import { useMutation } from '@tanstack/react-query'

import routes from '@/routes'
import { toastErrors } from '@/futils'
import { useRouter } from '@/i18n/routing'
import carEnquiryFormAction from '@/actions/webforms/carEnquiryFormAction'

const Form = ({ source, campaign }: { source: string; campaign: string }) => {
  const router = useRouter()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [carType, setCarType] = useState('')
  const [message, setMessage] = useState('')
  const [rentalDuration, setRentalDuration] = useState('')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await carEnquiryFormAction({
      name,
      phone,
      email,
      source,
      message,
      campaign,
      car_type: carType,
      rental_duration: rentalDuration,
    })

    if (res.success) {
      toast.success(res.message)
      return router.push(routes.webform.success)
    }

    return toastErrors(res.errors)
  }

  const { mutate, isPending } = useMutation({ mutationFn: onSubmit })

  return (
    <form id="rentalForm" onSubmit={mutate}>
      <div className="mb-4">
        <label htmlFor="name" className="mb-1 block font-medium">
          Name:
        </label>
        <input
          id="name"
          value={name}
          placeholder="Your Name"
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full rounded border border-gray-300 px-3 py-2"
        />
        <div id="nameError" className="mt-1 text-sm text-red-500"></div>
      </div>

      <div className="mb-4">
        <label htmlFor="phone" className="mb-1 block font-medium">
          Phone:
        </label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter phone number with country code"
          required
          className="w-full rounded border border-gray-300 px-3 py-2"
        />
        <div id="phoneError" className="mt-1 text-sm text-red-500"></div>
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="mb-1 block font-medium">
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          className="w-full rounded border border-gray-300 px-3 py-2"
        />
        <div id="emailError" className="mt-1 text-sm text-red-500"></div>
      </div>

      <div className="mb-4">
        <label htmlFor="rentalDuration" className="mb-1 block font-medium">
          Rental Duration:
        </label>
        <select
          id="rentalDuration"
          value={rentalDuration}
          required
          onChange={(e) => setRentalDuration(e.target.value)}
          className="w-full rounded border border-gray-300 px-3 py-2"
        >
          <option value="">Choose...</option>
          <option>Daily</option>
          <option>Weekly</option>
          <option>Monthly</option>
        </select>
        <div
          id="rentalDurationError"
          className="mt-1 text-sm text-red-500"
        ></div>
      </div>

      <div className="mb-4">
        <label htmlFor="carType" className="mb-1 block font-medium">
          Car Type:
        </label>
        <select
          id="carType"
          value={carType}
          required
          onChange={(e) => setCarType(e.target.value)}
          className="w-full rounded border border-gray-300 px-3 py-2"
        >
          <option value="">Choose...</option>
          <option>Economy</option>
          <option>Sedan</option>
          <option>SUV</option>
          <option>Luxury</option>
        </select>
        <div id="carTypeError" className="mt-1 text-sm text-red-500"></div>
      </div>

      <div className="mb-4">
        <label htmlFor="notes" className="mb-1 block font-medium">
          Special Notes / Requirements:
        </label>
        <textarea
          id="notes"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder="Enter any special requirements"
          className="w-full rounded border border-gray-300 px-3 py-2"
        ></textarea>
        <div id="notesError" className="mt-1 text-sm text-red-500"></div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  )
}

export default Form
