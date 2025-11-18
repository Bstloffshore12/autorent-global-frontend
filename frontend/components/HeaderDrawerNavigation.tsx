'use client'

import Image from 'next/image'
import { MdEmail } from 'react-icons/md'
import { FaPhoneAlt } from 'react-icons/fa'
import { useTranslations } from 'next-intl'

import routes from '@/routes'
import { Link } from '@/i18n/routing'
import Menu from '@/components/common/Menu'
import Drawer from '@/components/common/Modal'
import { useAppStore } from '@/store/provider'
import OperatingCountrySelector from '@/components/OperatingCountrySelector'
import { type GetOperatingCountriesData } from '@/model/OperatingCountryModel'
import LanguageButtonSelector from '@/components/language/LanguageButtonSelector'

type HeaderDrawerNavigationProps = {
  activeLanguage: string
  activeCountry: GetOperatingCountriesData
}

const HeaderDrawerNavigation = ({
  activeCountry,
  activeLanguage,
}: HeaderDrawerNavigationProps) => {
  const t = useTranslations()

  const {
    general: { contact },
    setUi: { setIsNavigationDrawerActive },
    ui: { navLinks, isNavigationDrawerActive },
  } = useAppStore((state) => state)

  const closeModal = () => setIsNavigationDrawerActive(false)

  return (
    <Drawer
      drawer
      setOpen={closeModal}
      isOpen={isNavigationDrawerActive}
      className="min-w-80 max-w-40 !p-0"
    >
      <div className="flex w-full items-center justify-between p-2 shadow-lg shadow-primary/10">
        <Link href={routes.home}>
          <Image
            width={112}
            height={40}
            alt="AutoRent"
            src="/assets/images/logo.svg"
          />
        </Link>
        <OperatingCountrySelector activeCountry={activeCountry} />
      </div>

      <nav className="mt-8 px-2">
        {Object.keys(navLinks).map((key) => (
          <Menu text={t(key)} key={key} appropriateHeight={128}>
            <div className="grid gap-2 rounded bg-primary/5 p-4">
              {navLinks[key].map(({ link, text }) => (
                <Link
                  key={text}
                  href={link}
                  onClick={closeModal}
                  className="text-black duration-150 hover:text-primary"
                >
                  {t(text)}
                </Link>
              ))}
            </div>
          </Menu>
        ))}
      </nav>

      <div className="m-4 space-y-3 border-t border-slate-200 pt-4">
        <p className="text-lg font-semibold">{t('Contact Us')}</p>
        <div className="flex items-center gap-4">
          <FaPhoneAlt className="text-xl text-neutral-600" />
          <div className="space-y-2 text-base">
            <p>{t('Call us')}:</p>
            <Link
              href={`tel:+${contact.phoneNumber}`}
              className="font-medium text-primary"
            >
              {contact.phoneNumber}
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <MdEmail className="text-2xl text-neutral-600" />
          <div className="space-y-2 text-base">
            <p>{t('Email')}:</p>
            <Link
              href={`mailto:${contact.email}`}
              className="font-medium text-primary"
            >
              {contact.email}
            </Link>
          </div>
        </div>
      </div>

      {/* Language selector */}
      <div className="m-4 space-y-3 border-t border-slate-200 pt-4">
        <p className="flex items-center justify-between text-lg font-semibold">
          <span>Select Language</span>
          <span>حدد اللغة</span>
        </p>

        <LanguageButtonSelector
          activeLanguage={activeLanguage}
          languages={activeCountry.languages}
        />
      </div>
    </Drawer>
  )
}

export default HeaderDrawerNavigation
