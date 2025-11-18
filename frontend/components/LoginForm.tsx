'use client'

import { toast } from 'react-toastify'
import { useTranslations } from 'next-intl'
import { type FormEvent, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Form, Button as AriaButton } from 'react-aria-components'

import { toastErrors } from '@/futils'
import { useAppStore } from '@/store/provider'
import Button from '@/components/common/Button'
import Checkbox from '@/components/common/Checkbox'
import loginAction from '@/actions/auth/loginAction'
import InputField from '@/components/common/InputField'
import getProfileAction from '@/actions/user/getProfileAction'
import SectionHeading from '@/components/common/SectionHeading'

const LoginForm = ({ toRegister }: { toRegister: VoidFunction }) => {
  const t = useTranslations()

  const {
    setUser: { setUserData, setIsVerified },
    setAuth: { setIsLoggedIn, setIsAuthModalOpen, setIsResetPasswordModalOpen },
  } = useAppStore((state) => state)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await loginAction({ email, password, remember_me: rememberMe })

    if (res.success) {
      setIsLoggedIn(true)
      setIsAuthModalOpen(false)
      toast.success(res.message)
      setIsVerified(res.data.isVerified)

      const res1 = await getProfileAction()
      if (res1.success) setUserData(res1.data)
      else toastErrors(res1.errors)
    } else toastErrors(res.errors)
  }

  const { mutate, isPending } = useMutation({
    mutationFn: onSubmit,
  })

  const openResetPasswordModal = () => {
    setIsAuthModalOpen(false)
    setIsResetPasswordModalOpen(true)
  }

  return (
    <Form onSubmit={mutate} className="space-y-6 p-6">
      <SectionHeading className="!text-2xl font-medium text-primary">
        {t('Login')}
      </SectionHeading>

      <InputField
        type="email"
        value={email}
        label={t('Email')}
        placeholder={t('Email')}
        onChange={setEmail}
      />
      <InputField
        type="password"
        value={password}
        label={t('Password')}
        placeholder={t('Password')}
        onChange={setPassword}
      />
      <Checkbox
        label={t('Remember Me')}
        isSelected={rememberMe}
        onChange={setRememberMe}
      />

      <AriaButton
        onPress={openResetPasswordModal}
        className="ml-auto block cursor-pointer text-right underline duration-300 hover:text-primary"
      >
        {t('Forgot password')}
      </AriaButton>

      <div className="space-y-4">
        <Button
          type="submit"
          theme="primary"
          className="w-full"
          isPending={isPending}
          isDisabled={isPending}
        >
          {isPending ? t('Logging in') : t('Login')}
        </Button>
        <p className="text-center text-neutral-500">
          {t("Don't you have an account")}?{' '}
          <button className="text-primary" onClick={toRegister} type="button">
            {t('Register')}
          </button>
          .
        </p>
      </div>
    </Form>
  )
}

export default LoginForm
