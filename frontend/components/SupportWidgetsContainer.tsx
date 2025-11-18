'use client'

import Script from 'next/script'
import { useEffect } from 'react'
import { useLocale } from 'next-intl'

import { usePathname } from '@/i18n/routing'
import WhatsAppContact from '@/components/webforms/WhatsAppContact'
import { type GetOperatingCountriesData } from '@/model/OperatingCountryModel'

const SupportWidgetsContainer = () => {
  const pathname = usePathname()
  const locale = useLocale() as GetOperatingCountriesData['iso2']

  useEffect(() => {
    if (locale !== 'om') {
      document.getElementById('myAliceWebChat')?.classList.add('hidden')
      document.getElementById('fc_frame')?.classList.remove('hidden')
    } else {
      document.getElementById('myAliceWebChat')?.classList.remove('hidden')
      document.getElementById('fc_frame')?.classList.add('hidden')
    }
  }, [locale])

  if (pathname !== '/summer-offers')
    return (
      <>
        <WhatsAppContact />

        {locale === 'om' ? (
          <Script src="/scripts/omanChat.js" />
        ) : (
          <Script src="//uae.fw-cdn.com/40179370/110372.js" />
        )}
      </>
    )

  return null
}

export default SupportWidgetsContainer
