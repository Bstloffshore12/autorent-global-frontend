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
import conatctFormAction from '@/actions/webforms/conatctFormAction'
import { useZodValidation } from '@/lib/forms/useZodValidation'
import { Honeypot } from '@/lib/forms/Honeypot'
import { ContactFormSchema } from '@/lib/forms/schemas/contact.schema'

const ContactForm = () => {
  const t = useTranslations()

  const router = useRouter()

  //  Get search parameters for campaign and source
  const searchParams = useSearchParams()
  const source = searchParams.get('utm_source') || 'website'
  const campaign = searchParams.get('utm_campaign') || 'website'

  const { userData } = useAppStore((state) => state.user)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [message, setMessage] = useState('')
  const [subject, setSubject] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const { token, isVerified, reset, Recaptcha } = useRecaptchaV2()
  const { validate } = useZodValidation(ContactFormSchema)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (honeypot) return

    const payload = {
      name,
      email,
      phone,
      address,
      subject,
      message,
      honeypot,
    }

    // ✅ Zod validation
    const result = validate(payload)
    if (!result.valid) {
      toastErrors(result.errors)
      return
    }
    if (!isVerified || !token) {
      toast.error('Please verify that you are not a robot')
      return
    }
    const res = await conatctFormAction({
      // search parameters fields
      source,
      campaign,

      // form fields
      name,
      email,
      phone,
      subject,
      address,
      message,
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
      setAddress(userData.address)
      setName(`${userData.first_name} ${userData.last_name}`)
    }
  }, [userData])

  return (
    <Form className="space-y-5 pt-5" onSubmit={mutate}>
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
        <InputField
          isRequired
          name="address"
          value={address}
          label={t('Address')}
          onChange={setAddress}
          placeholder={t('Your Address')}
        />
      </div>
      <InputField
        isRequired
        name="subject"
        value={subject}
        label={t('Subject')}
        onChange={setSubject}
        placeholder={t('Subject')}
      />
      <InputField
        rows={5}
        isTextAria
        isRequired
        name="message"
        value={message}
        onChange={setMessage}
        label={t('Your Message')}
        placeholder={t('Message')}
      />
      <Honeypot value={honeypot} onChange={setHoneypot} />
      <div className="mb-4">{Recaptcha}</div>
      <Button isDisabled={isPending} size="big" theme="primary" type="submit">
        {isPending ? t('Submitting…') : t('Send Message')}
      </Button>
    </Form>
  )
}

export default ContactForm
