'use client'

import { useTranslations } from 'next-intl'

import routes from '@/routes'
import { Link } from '@/i18n/routing'
import { useAppStore } from '@/store/provider'
import SocialLInkBlocks from '@/components/SocialLInkBlocks'

interface CLinkProps {
  text: string
  href: string
  target?: string
}

const CLink = ({ text, href, target }: CLinkProps) => (
  <Link target={target} className="font-medium text-primary" href={href}>
    {text}
  </Link>
)
const ContactFormThanks = () => {
  const t = useTranslations()
  const tw = useTranslations('webform')

  const {
    general: { contact },
  } = useAppStore((state) => state)

  return (
    <div className="space-y-2 text-center text-lg">
      <p>{tw('appreciation')}</p>
      <p>{tw('next step:')}</p>
      <ul className="font-medium">
        <li>{tw('step 1')}</li>
        <li>{tw('step 2')}</li>
      </ul>

      <p className="!mt-8">
        {tw('explore our Blogs')}{' '}
        <CLink href={routes.blogs} text="Blogs Center" />{' '}
        {tw('connect Social Media')}
      </p>

      <div className="mx-auto w-fit py-4">
        <SocialLInkBlocks />
      </div>

      <p>
        {tw('if inquiry')}
        <CLink
          target="_blank"
          href={`tel:+${contact.phoneNumber}`}
          text={contact.phoneNumber}
        />
        .
      </p>
      <p>
        {t('Thank you for choosing')} <Link href={routes.home}>AutoRent</Link>.
        {t('We look forward to assisting you!')}
      </p>
      <p>
        <CLink href={routes.home} text={t('Return to Home Page')} />
      </p>
    </div>
  )
}

export default ContactFormThanks
