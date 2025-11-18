'use client'

import { toast } from 'react-toastify'
import { useTranslations } from 'next-intl'
import { Form } from 'react-aria-components'
import { type FormEvent, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { MdOutlineNotificationsActive } from 'react-icons/md'

import Button from '@/components/common/Button'
import { classnames, toastErrors } from '@/futils'
import InputField from '@/components/common/InputField'
import newsletterFormAction from '@/actions/webforms/newsletterFormAction'

interface NewsletterBarFormProps {
  fieldClassName?: string
  buttonClassName?: string
}

const NewsletterBarForm = ({
  fieldClassName,
  buttonClassName,
}: NewsletterBarFormProps) => {
  const t = useTranslations()
  const tw = useTranslations('webform')

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
    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
      <div className="text-center md:text-left">
        <h3 className="text-xl font-semibold text-primary">
          {tw('newsletterTitle')}
        </h3>
        <p>{tw('newsletterDescription')}</p>
      </div>

      <Form
        className="flex rounded-lg shadow shadow-primary/20"
        onSubmit={onSubmit}
      >
        <InputField
          isRequired
          type="email"
          value={email}
          name="newsletter"
          onChange={setEmail}
          aria-label={t('Newsletter Email')}
          placeholder={t('Enter your email')}
          inputClassName={`rounded-e-none md:w-60 md:focus:w-80 ${fieldClassName}`}
        />
        <Button
          size="big"
          type="submit"
          theme="primary"
          isDisabled={isPending}
          className={classnames('max-w-min rounded-s-none', buttonClassName)}
        >
          <MdOutlineNotificationsActive />{' '}
          {isPending ? t('Submitting') : t('Subscribe')}
        </Button>
      </Form>
    </div>
  )
}

export default NewsletterBarForm
