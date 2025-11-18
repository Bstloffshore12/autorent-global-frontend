'use client'

import { toast } from 'react-toastify'
import { useTranslations } from 'next-intl'
import { Form } from 'react-aria-components'
import { useSearchParams } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { type FormEvent, useEffect, useState } from 'react'

import routes from '@/routes'
import { toastErrors } from '@/futils'
import { useAppStore } from '@/store/provider'
import Button from '@/components/common/Button'
import { Link, useRouter } from '@/i18n/routing'
import { type CarDetail } from '@/model/CarModel'
import InputField from '@/components/common/InputField'
import carEnquiryFormAction from '@/actions/webforms/carEnquiryFormAction'

const CarEnquiryForm = ({ car }: { car?: CarDetail }) => {
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
  const [company, setCompany] = useState('')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await carEnquiryFormAction({
      // search parameters fields
      source,
      campaign,

      // form fields
      name,
      phone,
      email,
      message,
      company,
      vehicle: car?.id,
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
      setName(`${userData.first_name} ${userData.last_name}`)
    }
  }, [userData])

  return (
    <Form onSubmit={mutate} className="space-y-5 pt-5">
      <h2 className="text-2xl font-medium">
        {t('Send us your enquiry for')}{' '}
        {car ? (
          <Link className="text-primary" href={routes.carDetail(car.slug)}>
            {car.title}
          </Link>
        ) : (
          'dream car'
        )}
      </h2>

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
          name="company"
          value={company}
          onChange={setCompany}
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

export default CarEnquiryForm
