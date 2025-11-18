'use client'

import { toast } from 'react-toastify'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { Form, type Key } from 'react-aria-components'
import { type FormEvent, useEffect, useState } from 'react'

import routes from '@/routes'
import { toastErrors } from '@/futils'
import { useRouter } from '@/i18n/routing'
import { useAppStore } from '@/store/provider'
import Button from '@/components/common/Button'
import Dropdown from '@/components/common/Select'
import InputField from '@/components/common/InputField'
import carLeasFormAction from '@/actions/webforms/carLeaseFormAction'

type CarLeaseFormProps = {
  countries: {
    id: string
    title: string
  }[]
}

const CarLeaseForm = ({ countries }: CarLeaseFormProps) => {
  const t = useTranslations()

  const router = useRouter()

  //  Get search parameters for campaign and source
  const searchParams = useSearchParams()
  const source = searchParams.get('utm_source') || 'website'
  const campaign = searchParams.get('utm_campaign') || 'website'

  const { userData } = useAppStore((state) => state.user)

  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [vehicle, setVehicle] = useState('')
  const [message, setMessage] = useState('')
  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [country, setCountry] = useState<Key>('')

  const onCountryChange = (key: Key) => {
    setCountry(key)
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await carLeasFormAction({
      // search parameters fields
      source,
      campaign,

      // form fields
      email,
      phone,
      vehicle,
      message,
      city: address,
      type: 'individual',
      last_name: lastName,
      first_name: firstName,
      country: country.toString(),
    })

    if (res.success) {
      toast.success(res.message)
      return router.push(routes.webform.success)
    }

    return toastErrors(res.errors)
  }

  const { mutate, isPending } = useMutation({ mutationFn: onSubmit })

  useEffect(() => {
    if (userData) {
      setPhone(userData.phone)
      setEmail(userData.email)
      setAddress(userData.address)
      setCountry(userData.country)
      setLastName(userData.last_name)
      setFirstName(userData.first_name)
    }
  }, [userData])

  return (
    <Form onSubmit={mutate} className="space-y-5 pt-5">
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
        <Dropdown
          bordered
          isRequired
          options={countries}
          selectedKeys={country}
          label={t('Nationality')}
          placeholder={t('Select Country')}
          onSelectionChange={onCountryChange}
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
          placeholder={t('Your Phone Number')}
        />
        <InputField
          isRequired
          name="vehicle"
          value={vehicle}
          onChange={setVehicle}
          label={t('Preferred Vehicle')}
          placeholder={t('Your Preferred Vehicle')}
        />
      </div>
      <InputField
        isRequired
        name="Address"
        value={address}
        label={t('Address')}
        onChange={setAddress}
        placeholder={t('Current Address')}
      />
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
      <Button size="big" theme="primary" type="submit" isDisabled={isPending}>
        {t('Send Message')}
      </Button>
    </Form>
  )
}

export default CarLeaseForm
