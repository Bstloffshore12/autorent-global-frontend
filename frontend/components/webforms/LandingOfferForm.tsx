'use client'

import { toast } from 'react-toastify'
import { useTranslations } from 'next-intl'
import { Form } from 'react-aria-components'
import { FaWhatsapp } from 'react-icons/fa6'
import { useMutation } from '@tanstack/react-query'
import { type FormEvent, useEffect, useState } from 'react'

import routes from '@/routes'
import { toastErrors } from '@/futils'
import { useRouter } from '@/i18n/routing'
import { useAppStore } from '@/store/provider'
import Button from '@/components/common/Button'
import InputField from '@/components/common/InputField'
import LinkButton from '@/components/common/LinkButton'
import carEnquiryFormAction from '@/actions/webforms/carEnquiryFormAction'

interface ContactFormProps {
  source: string
  campaign: string
}
const ContactForm = ({ source, campaign }: ContactFormProps) => {
  const t = useTranslations()

  const router = useRouter()
  const {
    user: { userData },
    general: { contact },
  } = useAppStore((state) => state)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [message, setMessage] = useState('')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await carEnquiryFormAction({
      name,
      phone,
      email,
      source,
      message,
      campaign,
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
      setName(`${userData.first_name} ${userData.last_name}`)
    }
  }, [userData])

  return (
    <Form className="space-y-2" onSubmit={mutate}>
      <InputField
        isRequired
        name="name"
        size="small"
        value={name}
        onChange={setName}
        placeholder={t('Your Name')}
      />
      <InputField
        isRequired
        type="email"
        name="email"
        size="small"
        value={email}
        onChange={setEmail}
        placeholder={t('Your Email')}
      />

      <InputField
        isRequired
        size="small"
        name="phone"
        value={phone}
        onChange={setPhone}
        placeholder={t('Your Phone')}
      />
      <InputField
        isRequired
        size="small"
        name="address"
        value={address}
        onChange={setAddress}
        placeholder={t('Your Address')}
      />

      <InputField
        rows={5}
        isTextAria
        isRequired
        size="small"
        name="message"
        value={message}
        onChange={setMessage}
        placeholder={t('Enter your remarks')}
      />
      <div className="flex items-center justify-between gap-4">
        <Button
          size="small"
          theme="primary"
          type="submit"
          isDisabled={isPending}
        >
          {t('Submit')}
        </Button>

        <LinkButton
          size="small"
          target="_blank"
          theme="primary"
          ariaLabel="WhatsApp Share Link"
          className="!border-green-600 !bg-green-600"
          href={`https://wa.me/${contact.whatsapp.number}?text=${contact.whatsapp.text}`}
        >
          <FaWhatsapp size={20} /> {t('Connect on WhatsApp')}
        </LinkButton>
      </div>
    </Form>
  )
}

export default ContactForm
