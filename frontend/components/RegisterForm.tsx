'use client'

import { toast } from 'react-toastify'
import OTPInput from 'react-otp-input'
import { useTranslations } from 'next-intl'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState, type FormEvent } from 'react'
import { Form, type Key, Label } from 'react-aria-components'
import { useRecaptchaV2 } from '@/hooks/useRecaptcha'
import { useAppStore } from '@/store/provider'
import Button from '@/components/common/Button'
import Dropdown from '@/components/common/Select'
import usePhoneCodes from '@/hooks/usePhoneCodes'
import { classnames, toastErrors } from '@/futils'
import signUpAction from '@/actions/auth/signUpAction'
import InputField from '@/components/common/InputField'
import getProfileAction from '@/actions/user/getProfileAction'
import SectionHeading from '@/components/common/SectionHeading'
import verifyEmailAction from '@/actions/auth/verifyEmailAction'
import { useZodValidation } from '@/lib/forms/useZodValidation'
import { RegisterSchema } from '@/lib/forms/schemas/register.schema'
import { VerifyOtpSchema } from '@/lib/forms/schemas/verifyOtp.schema'


type FormState = 'NotRegistered' | 'otpSent'

type SubmitButtonProps = {
  formState: FormState
  isPending: boolean
}

const SubmitButton = ({ formState, isPending }: SubmitButtonProps) => {
  const t = useTranslations()

  const [text, setText] = useState('')

  useEffect(() => {
    if (formState === 'NotRegistered')
      setText(isPending ? t('Registering') : t('Register'))
    else if (formState === 'otpSent')
      setText(isPending ? t('Submitting OTP') : t('Submit OTP'))
  }, [formState, isPending, t])

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

const RegisterForm = ({ toLogin }: { toLogin: VoidFunction }) => {
  const t = useTranslations()

  const {
    setUser: { setUserData, setIsVerified },
    setAuth: { setIsLoggedIn, setIsAuthModalOpen },
  } = useAppStore((state) => state)
  const phoneCodes = usePhoneCodes()
  const { validate: validateRegister } = useZodValidation(RegisterSchema)
  const { validate: validateOtp } = useZodValidation(VerifyOtpSchema)
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [phoneCode, setPhoneCode] = useState<Key>('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [formState, setFormState] = useState<FormState>('NotRegistered')

  const [otp, setOtp] = useState('')
  const { token, isVerified, reset, Recaptcha } = useRecaptchaV2()

  const register = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const payload1 = {
      firstName,
      lastName,
      email,
      phone,
      phoneCode: phoneCode.toString() || phoneCodes.default,
      password,
      confirmPassword,
    }

    const result = validateRegister(payload1)
    if (!result.valid) {
      toastErrors(result.errors)
      return
    }

    if (!isVerified || !token) {
      toast.error('Please verify that you are not a robot')
      return
    }

    const payload = {
      email,
      password,
      last_name: lastName,
      first_name: firstName,
      c_password: confirmPassword,
      phone: `${phoneCode.toString().split('-')[0] || phoneCodes.default.split('-')[0]}${phone}`,
      captcha_token: token,
    }

    const res = await signUpAction(payload)

    if (res.success) {
      setIsLoggedIn(true)
      // setOtp(res.data.otp)
      setIsVerified(false)
      setFormState('otpSent')

      return toast.success(res.message)
    }
      reset()
    return toastErrors(res.errors)
  }

  const verifyEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = validateOtp({ otp })
    if (!result.valid) {
      toastErrors(result.errors)
      return
    }
    const res = await verifyEmailAction({ token: otp })

    if (res.success) {
      setIsVerified(true)
      setIsAuthModalOpen(false)
      toast.success(res.message)

      const profileRes = await getProfileAction()
      if (profileRes.success) setUserData(profileRes.data)
      else toastErrors(profileRes.errors)
    } else toastErrors(res.errors)
  }

  const { mutate, isPending } = useMutation({
    mutationFn: (e: FormEvent<HTMLFormElement>) => {
      if (formState === 'NotRegistered') return register(e)
      return verifyEmail(e)
    },
  })

  return (
    <Form onSubmit={mutate} className="space-y-4 p-6">
      <SectionHeading className="!text-2xl font-medium text-primary">
        {t('Register')}
      </SectionHeading>
      <InputField
        value={firstName}
        label={t('First Name')}
        onChange={setFirstName}
        placeholder={t('First Name')}
        isDisabled={formState !== 'NotRegistered'}
      />
      <InputField
        value={lastName}
        label={t('Last Name')}
        onChange={setLastName}
        placeholder={t('Last Name')}
        isDisabled={formState !== 'NotRegistered'}
      />
      <InputField
        type="email"
        name="email"
        value={email}
        label={t('Email')}
        onChange={setEmail}
        placeholder={t('Email')}
        isDisabled={formState !== 'NotRegistered'}
      />
      <div className="grid grid-cols-[120px_auto] gap-2">
        <Dropdown
          bordered
          isRequired
          label={t('Code')}
          placeholder={phoneCodes.default}
          onSelectionChange={setPhoneCode}
          options={phoneCodes.globalOptions}
          isLoading={phoneCodes.isCountriesLoading}
          selectedKeys={phoneCode || phoneCodes.default}
        />
        <InputField
          type="tel"
          name="phone"
          value={phone}
          label={t('Phone')}
          onChange={setPhone}
          placeholder={t('Phone')}
          isDisabled={formState !== 'NotRegistered'}
        />
      </div>
      <div>
        <InputField
          value={password}
          type="password"
          label={t('Password')}
          onChange={setPassword}
          placeholder={t('Password')}
          className={classnames(
            'overflow-hidden duration-300',
            formState === 'NotRegistered'
              ? 'mt-4 h-20 opacity-100'
              : 'mt-0 h-0 opacity-0'
          )}
        />
        <InputField
          type="password"
          value={confirmPassword}
          label={t('Confirm Password')}
          onChange={setConfirmPassword}
          placeholder={t('Confirm Password')}
          className={classnames(
            'overflow-hidden duration-300',
            formState === 'NotRegistered'
              ? 'mt-4 h-20 opacity-100'
              : 'mt-0 h-0 opacity-0'
          )}
        />
        <div className="mb-4">{Recaptcha}</div>

        <div
          className={classnames(
            'overflow-hidden duration-300',
            formState === 'otpSent' ? 'h-20 opacity-100' : 'h-0 opacity-0'
          )}
        >
          <Label className="mb-2 block font-normal">
            {t('Enter OTP Code')}
          </Label>

          <OTPInput
            value={otp}
            numInputs={6}
            inputType="tel"
            onChange={setOtp}
            skipDefaultStyles
            containerStyle={{ justifyContent: 'center' }}
            renderSeparator={<span className="opacity-0">-</span>}
            renderInput={(props) => (
              <input
                {...props}
                className="grid size-10 items-center justify-center rounded-lg border bg-primary-light text-center font-normal duration-300 placeholder:text-neutral-500"
              />
            )}
          />
        </div>
      </div>

      <div className="space-y-4">
        <SubmitButton isPending={isPending} formState={formState} />

        <p className="text-center text-neutral-500">
          {t('Already have an account')}?{' '}
          <button className="text-primary" onClick={toLogin} type="button">
            {t('Login')}
          </button>
          .
        </p>
      </div>
    </Form>
  )
}

export default RegisterForm
