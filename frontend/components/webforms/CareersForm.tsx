'use client'

import { toast } from 'react-toastify'
import { useTranslations } from 'next-intl'
import { Form } from 'react-aria-components'
import { type FormEvent, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { useRecaptchaV2 } from '@/hooks/useRecaptcha'
import routes from '@/routes'
import { toastErrors } from '@/futils'
import { useRouter } from '@/i18n/routing'
import Button from '@/components/common/Button'
import InputField from '@/components/common/InputField'
import FileDropZone from '@/components/common/FileDropZone'
import careerFormAction from '@/actions/webforms/careerFormAction'
import { Honeypot } from '@/lib/forms/Honeypot'
import { useZodValidation } from '@/lib/forms/useZodValidation'
import { CareersEnquirySchema } from '@/lib/forms/schemas/careersEnquiry.schema'

const CareersForm = () => {
  const t = useTranslations()

  const router = useRouter()

  //  Get search parameters for campaign and source
  const searchParams = useSearchParams()
  const source = searchParams.get('utm_source') || 'website'
  const campaign = searchParams.get('utm_campaign') || 'website'

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const { token, isVerified, reset, Recaptcha } = useRecaptchaV2()
  const { validate } = useZodValidation(CareersEnquirySchema)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (honeypot) return

    const payload = { name, email, phone, honeypot }
    const result = validate(payload)

    if (!result.valid) {
      toastErrors(result.errors)
      return
    }
    if (!isVerified || !token) {
      toast.error('Please verify that you are not a robot')
      return
    }

    const target = e.target as FormEvent<HTMLFormElement>['currentTarget']
    const formData = new FormData(target)
    formData.append('source', source)
    formData.append('campaign', campaign)
    formData.append('captcha_token', token)
    formData.append('middle_name2', honeypot)
    const res = await careerFormAction(formData)

    if (res.success) {
      toast.success(res.message)
      reset()
      return router.push(routes.webform.success)
    }
    reset()
    return toastErrors(res.errors)
  }

  const { mutate, isPending } = useMutation({ mutationFn: onSubmit })

  return (
    <Form className="space-y-5 pt-5" onSubmit={mutate}>
      <div className="grid grid-cols-2 gap-5">
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
      </div>

      <FileDropZone
        isRequired
        id="resume"
        name="resume"
        label={t('Resume')}
        onChange={() => {}}
        accept=".PDF , .DOCX"
      />
      <Honeypot value={honeypot} onChange={setHoneypot} />
      <div className="mb-4">{Recaptcha}</div>

      <Button isDisabled={isPending} size="big" theme="primary" type="submit">
        {isPending ? t('Submitting…') : t('Send Message')}
      </Button>
    </Form>
  )
}

export default CareersForm
