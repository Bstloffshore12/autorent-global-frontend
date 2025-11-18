'use client'

import Image from 'next/image'
import OtpInput from 'react-otp-input'
import { toast } from 'react-toastify'
import { GiCarKey } from 'react-icons/gi'
import { GoShieldLock } from 'react-icons/go'
import { MdOutlineMailLock } from 'react-icons/md'
import { useMutation } from '@tanstack/react-query'
import { type FormEvent, useEffect, useState } from 'react'
import { Form, Button as AriaButton, Label } from 'react-aria-components'

import Modal from '@/components/common/Modal'
import { useAppStore } from '@/store/provider'
import Button from '@/components/common/Button'
import { classnames, toastErrors } from '@/futils'
import getOtpAction from '@/actions/auth/getOptAction'
import InputField from '@/components/common/InputField'
import verifyOtpAction from '@/actions/auth/verifyOtpAction'
import SectionHeading from '@/components/common/SectionHeading'
import resetPasswordAction from '@/actions/auth/resetPasswordAction'

type OtpSent =
  | 'emailNotVarified'
  | 'otpSend'
  | 'otpVarified'
  | 'passwordUpdated'

const OtpStateIcon = ({ otpState }: { otpState: OtpSent }) => {
  if (otpState === 'emailNotVarified') return <MdOutlineMailLock size={60} />
  if (otpState === 'otpSend') return <GoShieldLock size={60} />
  return <GiCarKey size={60} />
}

const SubmitButton = ({
  otpState,
  isPending,
}: {
  otpState: OtpSent
  isPending: boolean
}) => {
  const [text, setText] = useState('')

  useEffect(() => {
    if (otpState === 'emailNotVarified')
      setText(isPending ? 'Sending OTP' : 'Send OTP')
    else if (otpState === 'otpSend')
      setText(isPending ? 'Submitting OTP' : 'Submit OTP')
    else if (otpState === 'otpVarified')
      setText(isPending ? 'Setting New Password' : 'Reset Password')
  }, [otpState, isPending])

  return (
    <Button
      type="submit"
      theme="primary"
      className="w-full"
      isPending={isPending}
      isDisabled={isPending}
    >
      {text}
    </Button>
  )
}

const ResetPasswordModal = () => {
  const {
    auth: { isResetPasswordModalOpen },
    setAuth: { setIsResetPasswordModalOpen, setIsAuthModalOpen },
  } = useAppStore((state) => state)

  const [otpState, setOtpState] = useState<OtpSent>('emailNotVarified')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [otp, setOtp] = useState('')

  const getOtp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await getOtpAction({ email })

    if (res.success) {
      setOtpState('otpSend')
      toast.success(res.message)
      // setOtp(res.data.pin)
    } else toastErrors(res.errors)
  }

  const verifyOtp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await verifyOtpAction({ email, token: otp })

    if (res.success) {
      setOtp('')
      setOtpState('otpVarified')
      toast.success(res.message)
    } else toastErrors(res.errors)
  }

  const resetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await resetPasswordAction({
      email,
      password,
      c_password: confirmPassword,
    })

    if (res.success) {
      setOtpState('emailNotVarified')
      toast.success(res.message)

      setPassword('')
      setConfirmPassword('')
      setIsAuthModalOpen(true)
      setIsResetPasswordModalOpen(false)
    } else toastErrors(res.errors)
  }

  const { mutate, isPending } = useMutation({
    mutationFn: (e: FormEvent<HTMLFormElement>) => {
      if (otpState === 'emailNotVarified') return getOtp(e)
      if (otpState === 'otpSend') return verifyOtp(e)
      return resetPassword(e)
    },
  })

  const openAuthModal = () => {
    setIsResetPasswordModalOpen(false)
    setIsAuthModalOpen(true)
  }

  return (
    <Modal
      className="w-full max-w-3xl !p-0"
      isOpen={isResetPasswordModalOpen}
      setOpen={() => setIsResetPasswordModalOpen(false)}
    >
      <div className="grid md:grid-cols-[340px_auto]">
        <Image
          width={340}
          height={600}
          alt="Reset Password"
          src="/assets/images/auth.webp"
          className="hidden h-full w-full object-cover md:block"
        />
        <div>
          <Form onSubmit={mutate} className="space-y-6 p-6">
            <SectionHeading className="text-center !text-2xl font-medium text-primary">
              Reset Password
            </SectionHeading>

            <div className="drop mx-auto flex size-24 items-center justify-center rounded-full bg-primary-light p-2 text-primary shadow-lg shadow-primary/20">
              <OtpStateIcon otpState={otpState} />
            </div>

            <div>
              <InputField
                isRequired
                name="email"
                type="email"
                value={email}
                label="Email"
                className="mt-6"
                placeholder="Email"
                onChange={setEmail}
                isDisabled={otpState !== 'emailNotVarified'}
              />

              <div
                className={classnames(
                  'overflow-hidden duration-300',
                  otpState === 'otpSend'
                    ? 'mt-6 h-20 opacity-100'
                    : 'mt-0 h-0 opacity-0'
                )}
              >
                <Label className="mb-2 block font-normal">Enter OTP Code</Label>

                <OtpInput
                  value={otp}
                  inputType="tel"
                  onChange={setOtp}
                  numInputs={6}
                  renderSeparator={<span className="opacity-0">-</span>}
                  skipDefaultStyles
                  containerStyle={{ justifyContent: 'center' }}
                  renderInput={(props) => (
                    <input
                      {...props}
                      className="grid size-10 items-center justify-center rounded-lg border bg-primary-light text-center font-normal duration-300 placeholder:text-neutral-500"
                    />
                  )}
                />
              </div>

              <InputField
                isRequired
                type="password"
                value={password}
                label="Password"
                isDisabled={otpState !== 'otpVarified'}
                placeholder="Password"
                onChange={setPassword}
                className={classnames(
                  'overflow-hidden duration-300',
                  otpState === 'otpVarified'
                    ? 'mt-6 h-20 opacity-100'
                    : 'mt-0 h-0 opacity-0'
                )}
              />
              <InputField
                isRequired
                type="password"
                isDisabled={otpState !== 'otpVarified'}
                value={confirmPassword}
                label="Confirm Password"
                placeholder="Confirm Password"
                onChange={setConfirmPassword}
                className={classnames(
                  'overflow-hidden duration-300',
                  otpState === 'otpVarified'
                    ? 'mt-6 h-20 opacity-100'
                    : 'mt-0 h-0 opacity-0'
                )}
              />
            </div>

            <AriaButton
              onPress={openAuthModal}
              className="ml-auto block cursor-pointer text-right underline duration-300 hover:text-primary"
            >
              Back to login{' '}
            </AriaButton>

            <SubmitButton isPending={isPending} otpState={otpState} />
          </Form>
        </div>
      </div>
    </Modal>
  )
}

export default ResetPasswordModal
