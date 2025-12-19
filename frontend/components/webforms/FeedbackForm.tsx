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
import feedbackFormAction from '@/actions/webforms/feedbackFormAction'
import { useZodValidation } from '@/lib/forms/useZodValidation'
import { Honeypot } from '@/lib/forms/Honeypot'
import { feedbackSchema } from '@/lib/forms/schemas/feedback.schema'

const Heading = ({ text }: { text: string }) => (
  <h2 className="text-2xl font-medium">{text}</h2>
)

const FeedbackForm = () => {
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
  const [message, setFeedback] = useState('')
  const [firstName, setFirstName] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const { token, isVerified, reset, Recaptcha } = useRecaptchaV2()
  const { validate } = useZodValidation(feedbackSchema)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (honeypot) return
    const payload = {
    first_name: firstName,
    last_name: lastName,
    email,
    phone,
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
    const res = await feedbackFormAction({
      // search parameters fields
      source,
      campaign,

      // form fields
      email,
      phone,
      message,
      last_name: lastName,
      first_name: firstName,
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
          label={t('Email')}
          value={email}
          onChange={setEmail}
          placeholder={t('Your Email')}
        />
        <InputField
          isRequired
          name="phone"
          label={t('Phone')}
          value={phone}
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
        onChange={setFeedback}
        placeholder={t('Your Feedback')}
        label={t('Your Feedback is valuable to us')}
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

export default FeedbackForm
