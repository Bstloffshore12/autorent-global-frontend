'use client'

import { toast } from 'react-toastify'
import { useTranslations } from 'next-intl'
import { Form } from 'react-aria-components'
import { type FormEvent, useState } from 'react'
import { useMutation } from '@tanstack/react-query'

import Button from '@/components/common/Button'
import { classnames, toastErrors } from '@/futils'
import InputField from '@/components/common/InputField'
import newsletterFormAction from '@/actions/webforms/newsletterFormAction'

interface NewsletterFormProps {
  fieldClassName?: string
  buttonClassName?: string
}

const NewsletterForm = ({
  fieldClassName,
  buttonClassName,
}: NewsletterFormProps) => {
  const t = useTranslations()

  const [email, setEmail] = useState('')

  const submitNewsletterForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await newsletterFormAction({ email })

    if (!res.success) return toastErrors(res.errors)

    setEmail('')
    return toast.success(res.message)
  }

  const { mutate: onSubmit, isPending } = useMutation({
    mutationFn: submitNewsletterForm,
  })

  return (
    <Form className="space-y-4" onSubmit={onSubmit}>
      <InputField
        isRequired
        type="email"
        value={email}
        name="newsletter"
        onChange={setEmail}
        aria-label="Newsletter"
        inputClassName={fieldClassName}
        placeholder={t('Enter you email')}
      />
      <Button
        type="submit"
        theme="primary"
        className={classnames('w-full', buttonClassName)}
        isDisabled={isPending}
      >
        {isPending ? t('Submitting') : t('Get Deals')}
      </Button>
    </Form>
  )
}

export default NewsletterForm
