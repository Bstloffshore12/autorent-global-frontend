import { ReactLenis } from 'lenis/react'
import { Outfit } from 'next/font/google'
import { redirect } from 'next/navigation'
import { getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'

import '../globals.css'

import routes from '@/routes'
import { classnames } from '@/futils'
import Toast from '@/components/Toast'
import CmsModel from '@/model/CmsModel'
import { routing } from '@/i18n/routing'
import Providers from '@/query/Providers'
import LanguageModel from '@/model/LanguageModel'
import { AppStoreProvider } from '@/store/provider'
import { type GetOperatingCountriesData } from '@/model/OperatingCountryModel'
import getOperatingCountriesAction from '@/actions/operatingCountry/getOperatingCountriesAction'

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: GetOperatingCountriesData['iso2'] }>
}

const outfit = Outfit({
  display: 'swap',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export async function generateMetadata({ params }: LocaleLayoutProps) {
  const { locale } = await params

  return {
    title: CmsModel.metaTitle,
    keywords: CmsModel.metaKeywords,
    description: CmsModel.metaDescription,
    metadataBase: routes.baseUrl ? new URL(`${routes.baseUrl}/${locale}`) : '/',
    appleWebApp: {
      capable: true,
      title: CmsModel.metaTitle,
      statusBarStyle: 'default',
    },
    openGraph: {
      locale,
      type: 'website',
      url: routes.baseUrl ? new URL(`${routes.baseUrl}/${locale}`) : '/',
    },
    twitter: {
      card: 'summary',
    },
  }
}

const layout = async ({ children, params }: LocaleLayoutProps) => {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params
  if (!routing.locales.includes(locale)) redirect(`/${routing.locales[0]}`)

  const language = (await LanguageModel.getActive()) || LanguageModel.default

  const { data: operatingCountries } = await getOperatingCountriesAction()

  const localeCountryIndexMap: Record<string, number> = {
    ae: 0,
    bh: 1,
    om: 2,
    sa: 3,
  }

  const operatingCountry =
    locale in localeCountryIndexMap
      ? operatingCountries?.[localeCountryIndexMap[locale]]
      : operatingCountries?.[0]

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html
      lang={language}
      dir={['ar', 'he', 'fa', 'ur'].includes(language) ? 'rtl' : 'ltr'}
    >
      <head>
        {operatingCountry?.header_script && (
          <script
            dangerouslySetInnerHTML={{
              __html: operatingCountry.header_script,
            }}
          />
        )}
      </head>
      <body className={classnames(outfit.className, 'antialiased')}>
        <ReactLenis root options={{ duration: 1 }} />
        <AppStoreProvider>
          <Providers>
            <NextIntlClientProvider messages={messages}>
              {children}
              <Toast />
            </NextIntlClientProvider>
          </Providers>
        </AppStoreProvider>
      </body>
    </html>
  )
}

export default layout
