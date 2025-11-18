'use client'

import Image from 'next/image'
import { useState } from 'react'

import Modal from '@/components/common/Modal'
import LoginForm from '@/components/LoginForm'
import { useAppStore } from '@/store/provider'
import RegisterForm from '@/components/RegisterForm'

const AuthModal = () => {
  const {
    auth: { isAuthModalOpen },
    setAuth: { setIsAuthModalOpen },
  } = useAppStore((state) => state)

  const [activeForm, setActiveForm] = useState<'login' | 'signup'>('login')

  return (
    <Modal
      isOpen={isAuthModalOpen}
      className="w-full max-w-3xl !p-0"
      setOpen={() => setIsAuthModalOpen(false)}
    >
      <div className="grid md:grid-cols-[340px_auto]">
        <Image
          width={340}
          height={600}
          alt="Login Signup"
          src="/assets/images/auth.webp"
          className="hidden h-full w-full object-cover md:block"
        />
        <div>
          {activeForm === 'login' ? (
            <LoginForm toRegister={() => setActiveForm('signup')} />
          ) : (
            <RegisterForm toLogin={() => setActiveForm('login')} />
          )}
          {/* <div className="h-3 border-b border-neutral-200 text-center">
            <span className="z-10 inline-block bg-white px-2 text-neutral-500">
              or login with
            </span>
          </div> */}
        </div>
      </div>
    </Modal>
  )
}

export default AuthModal
