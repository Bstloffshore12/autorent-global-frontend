'use client'

import { BiSupport } from 'react-icons/bi'
import { useTranslations } from 'next-intl'
import { Button as AriaButton } from 'react-aria-components'

import { useAppStore } from '@/store/provider'
import LinkButton from '@/components/common/LinkButton'
import SectionHeading from '@/components/common/SectionHeading'

const SupportPage = () => {
  const t = useTranslations()

  const {
    setWebForm: { setIsRequestACallbackModalOpen },
    general: { contact },
  } = useAppStore((state) => state)

  const oepnRequestACallbackModal = () => {
    setIsRequestACallbackModalOpen(true)
  }

  return (
    <div className="space-y-8 rounded-lg border border-primary-light p-6 text-center shadow-md shadow-primary/10">
      <div className="space-y-4">
        <AriaButton
          onPress={oepnRequestACallbackModal}
          className="drop mx-auto flex size-24 items-center justify-center rounded-full bg-primary-light p-2 text-primary shadow-lg shadow-primary/20"
        >
          <BiSupport size={60} />
        </AriaButton>

        <SectionHeading className="!text-2xl">
          {t('How To Get In Touch')}
        </SectionHeading>

        <p className="mx-auto max-w-2xl">
          {t(
            'You may call us on our toll free number below during office hours for new bookings, concern & inquiries, One of our advisors will be more than happy to help you, Your happiness and saftey is our number one priority'
          )}
        </p>
      </div>

      <div className="space-y-4">
        <LinkButton
          size="big"
          theme="primaryLight"
          href={`mailto:${contact.email}`}
          className="mx-auto block max-w-max"
        >
          {contact.email}
        </LinkButton>
        <LinkButton
          size="big"
          theme="primaryLight"
          className="mx-auto block max-w-max"
          href={`tel:+${contact.phoneNumber}`}
        >
          {contact.phoneNumber}
        </LinkButton>
      </div>
    </div>
  )
}

export default SupportPage
