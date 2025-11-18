'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

import Modal from '@/components/common/Modal'
import { useAppStore } from '@/store/provider'
import CallbackForm from '@/components/webforms/CallbackForm'
import SectionHeading from '@/components/common/SectionHeading'

const RequestACallbackModal = () => {
  const t = useTranslations()
  const tw = useTranslations('webform')

  const {
    webForm: { isRequestACallbackModalOpen },
    setWebForm: { setIsRequestACallbackModalOpen },
  } = useAppStore((state) => state)

  const closeModal = () => setIsRequestACallbackModalOpen(false)

  return (
    <Modal
      setOpen={closeModal}
      className="w-full max-w-3xl !p-0"
      isOpen={isRequestACallbackModalOpen}
    >
      <div className="grid md:grid-cols-[auto_360px]">
        <div className="p-6">
          <SectionHeading className="!text-2xl">
            {t('Request A Callback')}
          </SectionHeading>
          <p className="mt-4">{tw('requestForCallbackPara')}</p>

          <CallbackForm />
        </div>

        <Image
          width={340}
          height={600}
          alt="Login Signup"
          src="/assets/images/auth.webp"
          className="hidden h-full w-full object-cover md:block"
        />
      </div>
    </Modal>
  )
}

export default RequestACallbackModal
