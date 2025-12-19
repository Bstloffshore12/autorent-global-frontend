'use client'

import { toast } from 'react-toastify'
import { useTranslations } from 'next-intl'
import { Form } from 'react-aria-components'
import { useSearchParams } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { type FormEvent, useEffect, useState } from 'react'
import { useRecaptchaV2 } from '@/hooks/useRecaptcha'
import routes from '@/routes'
import { toastErrors } from '@/futils'
import { useRouter } from '@/i18n/routing'
import { useAppStore } from '@/store/provider'
import Button from '@/components/common/Button'
import InputField from '@/components/common/InputField'
import roadSideAssistanceFormAction from '@/actions/webforms/roadSideAssistanceFormAction'
import { useZodValidation } from '@/lib/forms/useZodValidation'
import { Honeypot } from '@/lib/forms/Honeypot'
import { roadSideAssistanceSchema } from '@/lib/forms/schemas/roadSideAssistance.schema'

const Heading = ({ text }: { text: string }) => (
  <h2 className="text-2xl font-medium">{text}</h2>
)

const RoadSideAssistanceForm = () => {
  const t = useTranslations()

  const router = useRouter()

  //  Get search parameters for campaign and source
  const searchParams = useSearchParams()
  const source = searchParams.get('utm_source') || 'website'
  const campaign = searchParams.get('utm_campaign') || 'website'

  const { userData } = useAppStore((state) => state.user)

  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [breakdownLocation, setBreakdownLocation] = useState('')
  const [causeForBreakdown, setCauseForBreakdown] = useState('')
  const [bookingReferenceNumber, setBookingReferenceNumber] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const { token, isVerified, reset, Recaptcha } = useRecaptchaV2()
  const { validate } = useZodValidation(roadSideAssistanceSchema)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isVerified || !token) {
      toast.error('Please verify that you are not a robot')
      return
    }
    if (honeypot) return
    const payload = {
    first_name: firstName,
    last_name: lastName,
    email,
    phone,
    booking_ref_no: bookingReferenceNumber,
    breakdown_location: breakdownLocation,
    message: causeForBreakdown,
    honeypot,
  }

  const result = validate(payload)
    if (!result.valid) {
      toastErrors(result.errors)
      return
    }
    const res = await roadSideAssistanceFormAction({
      // search parameters fields
      source,
      campaign,

      // form fields
      email,
      phone,
      last_name: lastName,
      first_name: firstName,
      message: causeForBreakdown,
      breakdown_location: breakdownLocation,
      booking_ref_no: bookingReferenceNumber,
      captcha_token: token,
      middle_name2: honeypot, 
    })

    if (res.success) {
      toast.success(res.message)
      reset()
      return router.push(routes.webform.success)
    }
    reset()
    return toastErrors(res.errors)
  }

  const { mutate, isPending } = useMutation({ mutationFn: onSubmit })

  useEffect(() => {
    if (userData) {
      setPhone(userData.phone)
      setEmail(userData.email)
      setLastName(userData.last_name)
      setFirstName(userData.first_name)
    }
  }, [userData])

  return (
    <Form onSubmit={mutate} className="space-y-5 pt-5">
      <Heading text={t('Enter Details')} />

      <div className="grid gap-5 md:grid-cols-2">
        <InputField
          isRequired
          name="firstName"
          value={firstName}
          label={t('First Name')}
          onChange={setFirstName}
          placeholder={t('Your First Name')}
        />
        <InputField
          isRequired
          name="lastName"
          value={lastName}
          label={t('Last Name')}
          onChange={setLastName}
          placeholder={t('Your Last Name')}
        />
        <InputField
          isRequired
          type="email"
          name="email"
          value={email}
          label={t('Email')}
          onChange={setEmail}
          placeholder={t('Your Email')}
        />
        <InputField
          isRequired
          name="phone"
          value={phone}
          label={t('Phone')}
          onChange={setPhone}
          placeholder={t('Your Phone')}
        />
      </div>

      <div className="border-b" />

      <Heading text={t('About Your Breakdown')} />

      <div className="grid grid-cols-2 gap-5">
        <InputField
          isRequired
          name="bookingReferenceNumber"
          value={bookingReferenceNumber}
          onChange={setBookingReferenceNumber}
          label={t('Booking Reference Number')}
          placeholder={t('Booking Reference Number')}
        />
        <InputField
          isRequired
          name="breakdownLocation"
          value={breakdownLocation}
          label={t('Breakdown Location')}
          onChange={setBreakdownLocation}
          placeholder={t('Breakdown Location')}
        />
      </div>

      <InputField
        rows={5}
        isTextAria
        isRequired
        name="causeForBreakdown"
        value={causeForBreakdown}
        onChange={setCauseForBreakdown}
        label={t('Cause For Breakdown')}
        placeholder={t('Cause For Breakdown')}
      />
      <Honeypot
        value={honeypot}
        onChange={setHoneypot}
      />
      <div className="mb-4">{Recaptcha}</div>
      <Button isDisabled={isPending} size="big" theme="primary" type="submit">
        {isPending ? t('Submitting…') : t('Send Message')}
      </Button>
    </Form>
  )
}

export default RoadSideAssistanceForm
