'use client'

import { toast } from 'react-toastify'
import { useTranslations } from 'next-intl'
import { Form } from 'react-aria-components'
import { FiPhoneIncoming } from 'react-icons/fi'
import { useMutation } from '@tanstack/react-query'
import { type FormEvent, useEffect, useState } from 'react'

import routes from '@/routes'
import { toastErrors } from '@/futils'
import { useRouter } from '@/i18n/routing'
import { useAppStore } from '@/store/provider'
import Button from '@/components/common/Button'
import InputField from '@/components/common/InputField'
import requestACallbackFormAction from '@/actions/webforms/requestACallbackFormAction'

const CallbackForm = () => {
  const t = useTranslations()

  const {
    user: { userData },
    setWebForm: { setIsRequestACallbackModalOpen },
  } = useAppStore((state) => state)

  const closeModal = () => setIsRequestACallbackModalOpen(false)

  const router = useRouter()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement

    const res = await requestACallbackFormAction({
      name,
      phone,
      email,
      message,
    })

    if (res.success) {
      closeModal()
      toast.success(res.message)
      router.push(routes.webform.success)
      return form.reset()
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
    <Form onSubmit={mutate} className="mt-4 space-y-4">
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

      <Button
        type="submit"
        theme="primary"
        isPending={isPending}
        isDisabled={isPending}
        className="!mt-8 w-full"
      >
        <FiPhoneIncoming size={14} />
        {isPending ? t('Sending Request') : t('Request A Callback')}
      </Button>
    </Form>
  )
}

export default CallbackForm
