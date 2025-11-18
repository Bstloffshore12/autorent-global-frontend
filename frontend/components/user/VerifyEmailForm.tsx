'use client'

import OTPInput from 'react-otp-input'
import { toast } from 'react-toastify'
import { type FormEvent, useState } from 'react'
import { Form, Label } from 'react-aria-components'
import { useMutation } from '@tanstack/react-query'

import routes from '@/routes'
import { toastErrors } from '@/futils'
import { useRouter } from '@/i18n/routing'
import { useAppStore } from '@/store/provider'
import Button from '@/components/common/Button'
import InputField from '@/components/common/InputField'
import resendOtpAction from '@/actions/auth/resendOtpAction'
import getProfileAction from '@/actions/user/getProfileAction'
import SectionHeading from '@/components/common/SectionHeading'
import verifyEmailAction from '@/actions/auth/verifyEmailAction'

const VerifyEmailForm = () => {
  const router = useRouter()

  const {
    setUser: { setUserData, setIsVerified },
  } = useAppStore((state) => state)

  const [otp, setOtp] = useState('')

  const resendOtp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await resendOtpAction()

    if (res.success) {
      // setOtp(res.data.pin)
      toast.success(res.message)
    } else toastErrors(res.errors)
  }

  const verifyEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await verifyEmailAction({ token: otp })
    if (res.success) {
      setIsVerified(true)
      toast.success(res.message)

      const profileRes = await getProfileAction()

      if (profileRes.success) {
        setUserData(profileRes.data)
        router.push(routes.user.profile)
      } else toastErrors(profileRes.errors)
    } else toastErrors(res.errors)
  }

  const { mutate: mutateResendOtp, isPending: resendOtpIsPending } =
    useMutation({ mutationFn: resendOtp })

  const { mutate: mutateVerifyEmail, isPending: verifyEmailIsPending } =
    useMutation({ mutationFn: verifyEmail })

  return (
    <div className="grid gap-6 rounded-lg border border-primary-light p-6 shadow-md shadow-primary/10 md:grid-cols-2">
      <Form onSubmit={mutateResendOtp} className="space-y-6">
        <SectionHeading className="!text-2xl">Submit Email</SectionHeading>
        <InputField
          isRequired
          isReadOnly
          isDisabled
          label="Email"
          type="password"
          placeholder="Email"
          value="***************"
        />

        <Button
          type="submit"
          theme="primary"
          isPending={resendOtpIsPending}
          isDisabled={resendOtpIsPending}
        >
          Send Otp
        </Button>
      </Form>

      <Form onSubmit={mutateVerifyEmail} className="space-y-6">
        <SectionHeading className="!text-2xl">Verify Email</SectionHeading>

        <div>
          <Label className="mb-2 block font-normal">Submit OTP</Label>

          <OTPInput
            value={otp}
            numInputs={6}
            inputType="tel"
            onChange={setOtp}
            renderSeparator={<span className="opacity-0">-</span>}
            skipDefaultStyles
            renderInput={(props) => (
              <input
                {...props}
                className="grid size-12 items-center justify-center rounded-lg border bg-primary-light text-center font-normal duration-300 placeholder:text-neutral-500"
              />
            )}
          />
        </div>

        <Button
          type="submit"
          theme="primary"
          isPending={verifyEmailIsPending}
          isDisabled={verifyEmailIsPending}
        >
          Verify Email
        </Button>
      </Form>
    </div>
  )
}

export default VerifyEmailForm
