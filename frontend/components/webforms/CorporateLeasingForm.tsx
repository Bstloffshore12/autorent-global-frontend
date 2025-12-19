'use client'

import { toast } from 'react-toastify'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { CheckboxGroup, Form } from 'react-aria-components'
import { type FormEvent, useEffect, useState } from 'react'
import { useRecaptchaV2 } from '@/hooks/useRecaptcha'
import routes from '@/routes'
import { toastErrors } from '@/futils'
import { useRouter } from '@/i18n/routing'
import { useAppStore } from '@/store/provider'
import Button from '@/components/common/Button'
import Checkbox from '@/components/common/Checkbox'
import InputField from '@/components/common/InputField'
import corporateLeasingFormAction from '@/actions/webforms/corporateLeasingFormAction'
import { Honeypot } from '@/lib/forms/Honeypot'
import { useZodValidation } from '@/lib/forms/useZodValidation'
import { CorporateLeasingEnquirySchema } from '@/lib/forms/schemas/corporateLeasingEnquiry.schema'

const Heading = ({ text }: { text: string }) => (
  <h2 className="text-2xl font-medium">{text}</h2>
)

const CorporateLeasingForm = () => {
  const t = useTranslations()

  const router = useRouter()

  //  Get search parameters for campaign and source
  const searchParams = useSearchParams()
  const source = searchParams.get('utm_source') || 'website'
  const campaign = searchParams.get('utm_campaign') || 'website'

  const { userData } = useAppStore((state) => state.user)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [numberOfVehicles, setNumberOfVehicles] = useState('')
  const [vehicleInterestedIn, setVehicleInterestedIn] = useState('')
  const [vehicleCategory, setVehicleCategory] = useState<string[]>([])
  const [honeypot, setHoneypot] = useState('')
  const { token, isVerified, reset, Recaptcha } = useRecaptchaV2()
  const { validate } = useZodValidation(CorporateLeasingEnquirySchema)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (honeypot) return

    const payload = {
      name,
      phone,
      email,
      companyName,
      vehicleInterestedIn,
      numberOfVehicles,
      vehicleCategory,
      message,
      honeypot,
    }

    const result = validate(payload)
    if (!result.valid) {
      toastErrors(result.errors)
      return
    }
    if (!isVerified || !token) {
      toast.error('Please verify that you are not a robot')
      return
    }
    const res = await corporateLeasingFormAction({
      // search parameters fields
      source,
      campaign,

      // form fields
      name,
      phone,
      email,
      message,
      company_name: companyName,
      number_vehicles: numberOfVehicles,
      vehicle_interested_in: vehicleInterestedIn,
      vehicle_category: vehicleCategory.join(','),
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
      setName(`${userData.first_name} ${userData.last_name}`)
    }
  }, [userData])

  return (
    <Form onSubmit={mutate} className="space-y-5 pt-5">
      <Heading text={t('Send Us Your Enquiry')} />
      <div className="grid gap-5 md:grid-cols-2">
        <InputField
          isRequired
          name="name"
          value={name}
          label={t('Name')}
          onChange={setName}
          placeholder={t('Your Name')}
        />
        <InputField
          isRequired
          name="companyName"
          value={companyName}
          onChange={setCompanyName}
          label={t('Company Name')}
          placeholder={t('Company Name')}
        />
        <InputField
          isRequired
          name="email"
          value={email}
          label={t('Email')}
          onChange={setEmail}
          placeholder={t('Your Address')}
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

      <Heading text={t('Requirement')} />
      <div className="grid grid-cols-2 gap-5">
        <InputField
          isRequired
          name="vehicleInterestedIn"
          value={vehicleInterestedIn}
          onChange={setVehicleInterestedIn}
          label={t('Vehicle Interested In')}
          placeholder={t('Vehicle Interested In')}
        />
        <InputField
          isRequired
          name="numberOfVehicles"
          value={numberOfVehicles}
          onChange={setNumberOfVehicles}
          label={t('Number of Vehicles')}
          placeholder={t('Number of Vehicles')}
        />
      </div>

      <div className="border-b" />

      <Heading text={t('Vehicle Category')} />

      <CheckboxGroup
        isRequired
        value={vehicleCategory}
        onChange={setVehicleCategory}
        aria-labelledby="Vehicle Category"
        className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <Checkbox value="bus" label={t('Bus')} />
        <Checkbox value="commercial" label={t('Commercial')} />
        <Checkbox value="hatchback" label={t('Hatchback')} />
        <Checkbox value="luxury" label={t('Luxury')} />
        <Checkbox value="pickups" label={t('Pickups')} />
        <Checkbox value="sedan" label={t('Sedan')} />
        <Checkbox value="suv" label={t('SUV')} />
      </CheckboxGroup>

      <InputField
        rows={5}
        isRequired
        isTextAria
        name="message"
        value={message}
        onChange={setMessage}
        label={t('Your Message')}
        placeholder={t('Specific Requirement')}
      />
      <Honeypot value={honeypot} onChange={setHoneypot} />

      <div className="mb-4">{Recaptcha}</div>

      <Button size="big" theme="primary" type="submit" isDisabled={isPending}>
        {isPending ? t('Submitting…') : t('Send Message')}
      </Button>
    </Form>
  )
}

export default CorporateLeasingForm
