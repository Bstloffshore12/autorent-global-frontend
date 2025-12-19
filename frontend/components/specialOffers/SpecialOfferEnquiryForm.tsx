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
import carEnquiryFormAction from '@/actions/webforms/carEnquiryFormAction'

interface SpecialOfferEnquiryFormProps {
  slug: string
  stateId: string | null
}

const SpecialOfferEnquiryForm = ({
  slug,
  stateId,
}: SpecialOfferEnquiryFormProps) => {
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
  const { token, isVerified, reset, Recaptcha } = useRecaptchaV2()

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isVerified || !token) {
      toast.error('Please verify that you are not a robot')
      return
    }

    const res = await carEnquiryFormAction({
      // search parameters fields
      source,
      campaign,

      // form fields
      name,
      phone,
      email,
      state_id: stateId,
      type: `Special Offer | ${slug}`,
      captcha_token: token,
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
    <Form onSubmit={mutate} className="space-y-2">
      <InputField
        isRequired
        size="small"
        name="name"
        value={name}
        label={t('Name')}
        onChange={setName}
        labelClassName="!mb-1"
        placeholder={t('Your Name')}
      />
      <InputField
        isRequired
        size="small"
        name="email"
        value={email}
        label={t('Email')}
        onChange={setEmail}
        labelClassName="!mb-1"
        placeholder={t('Your Address')}
      />
      <InputField
        isRequired
        size="small"
        name="phone"
        value={phone}
        label={t('Phone')}
        onChange={setPhone}
        labelClassName="!mb-1"
        placeholder={t('Your Phone')}
      />
      <div className="mb-4">{Recaptcha}</div>

      <Button
        size="small"
        type="submit"
        theme="primary"
        className="!mt-4"
        isDisabled={isPending}
      >
        {isPending ? t('Submitting') : t('Submit')}
      </Button>
    </Form>
  )
}

export default SpecialOfferEnquiryForm
