import Image from 'next/image'
import { type ReactNode } from 'react'
import { MdEmail } from 'react-icons/md'
import { FaPhoneAlt } from 'react-icons/fa'
import { type IconType } from 'react-icons'
import { FaLocationDot } from 'react-icons/fa6'
import { getTranslations } from 'next-intl/server'
import { AiOutlineCopyright } from 'react-icons/ai'

import SocialLInkBlocks, {
  type SocialLinksType,
} from '@/components/SocialLInkBlocks'
import routes from '@/routes'
import { Link } from '@/i18n/routing'
import Container from '@/components/common/Container'
import NewsletterBarForm from '@/components/webforms/NewsletterBarForm'
import getCustomContentAction from '@/actions/cms/getCustomContentAction'
import SupportWidgetsContainer from '@/components/SupportWidgetsContainer'
import { type GetOperatingCountriesData } from '@/model/OperatingCountryModel'
import RequestACallbackWidget from '@/components/webforms/RequestACallbackWidget'

interface List {
  link: string
  Icon?: IconType
  text: string
}

const List = ({ link, text, Icon }: List) => (
  <li>
    <Link prefetch href={link} className="flex items-center gap-2">
      {Icon && <Icon />} {text}
    </Link>
  </li>
)

const Heading = ({ children }: { children: ReactNode }) => (
  <h4 className="mt-2 text-xl font-medium md:mt-8">{children}</h4>
)
const socialLinks: SocialLinksType = {
  x: '',
  tiktok: '',
  youtube: '',
  facebook: '',
  linkedIn: '',
  instagram: '',
}

type FooterWithBlueThemeProps = {
  activeCountry?: GetOperatingCountriesData
}

const FooterWithBlueTheme = async ({
  activeCountry,
}: FooterWithBlueThemeProps) => {
  const [t, aboutDataRes] = await Promise.all([
    getTranslations(),
    getCustomContentAction('footer-content'),
  ])

  const aboutContent =
    (aboutDataRes.success && aboutDataRes.data?.content) || ''

  const data = activeCountry

  if (!data) return null

  socialLinks.x = data.social_links.t || ''
  socialLinks.youtube = data.social_links.y || ''
  socialLinks.facebook = data.social_links.f || ''
  socialLinks.linkedIn = data.social_links.l || ''
  socialLinks.tiktok = data.social_links.tik || ''
  socialLinks.instagram = data.social_links.i || ''

  return (
    <footer className="bg-blue-950">
      <RequestACallbackWidget />

      <div className="bg-primary-light py-2">
        <Container className="mx-auto !max-w-6xl">
          <NewsletterBarForm />
        </Container>
      </div>

      <Container className="!pt-10 text-white">
        <div className="mb-4 grid gap-4 md:grid-cols-4">
          <div className="space-y-4">
            <Link href={routes.home}>
              <Image
                height="56"
                width="160"
                className="h-14"
                alt={t('AutoRent')}
                src="/assets/images/logo-white.svg"
              />
            </Link>
            {!!(aboutContent || data.footer_content) && (
              <div
                className="space-y-4 leading-[30px] text-neutral-200"
                dangerouslySetInnerHTML={{
                  __html: aboutContent || data.footer_content,
                }}
              />
            )}
          </div>
          <div className="space-y-4">
            <Heading>{t('Explore')}</Heading>
            <ul className="space-y-2 text-neutral-200">
              <List text={t('About')} link={routes.about} />
              <List text={t('Blog')} link={routes.blogs} />
              <List text={t('Contact Us')} link={routes.webform.contact} />
              <List text={t('Rental Guide')} link={routes.rentalGuides} />
            </ul>
          </div>
          <div className="space-y-4">
            <Heading>{t('Customer Care')}</Heading>
            <ul className="space-y-2 text-neutral-200">
              <List text={t('FAQs')} link={routes.faqs} />
              <List text={t('Careers')} link={routes.webform.careers} />
              <List text={t('Privacy Policy')} link={routes.privacyPolicy} />
              <List
                text={t('Terms & Conditions')}
                link={routes.termsAndConditions}
              />
            </ul>
          </div>
          <div className="space-y-4">
            <Heading>{t('Contact')}</Heading>
            <ul className="space-y-2 text-neutral-200">
              <List Icon={FaLocationDot} text={t(data?.name)} link="#" />
              {data?.phone_number && (
                <List
                  Icon={FaPhoneAlt}
                  text={data.phone_number}
                  link={`tel:${data.phone_number}`}
                />
              )}
              <List
                Icon={MdEmail}
                text={data.email}
                link={`mailto:${data.email}`}
              />
            </ul>
            <div className="flex gap-2">
              <Link target="_blank" href={activeCountry.apple_link}>
                <Image
                  width={300}
                  height={300}
                  className="w-32"
                  alt={t('App Store')}
                  src="/assets/images/apps/app-store-light.svg"
                />
              </Link>
              <Link target="_blank" href={activeCountry.android_link}>
                <Image
                  width={300}
                  height={300}
                  className="w-32"
                  alt={t('Google Play')}
                  src="/assets/images/apps/google-play-light.svg"
                />
              </Link>
            </div>
            <SocialLInkBlocks
              socialLinks={socialLinks}
              containerClassName="justify-center md:justify-start"
              className="size-9 border-0 text-white"
            />
          </div>
        </div>
        <p className="text-center text-sm opacity-80">
          {t('Copyright')} <AiOutlineCopyright className="inline" />{' '}
          {new Date().getFullYear()} {t('AutoRent')}. {t('All rights reserved')}
          .
        </p>
      </Container>

      <SupportWidgetsContainer />
    </footer>
  )
}

export default FooterWithBlueTheme
