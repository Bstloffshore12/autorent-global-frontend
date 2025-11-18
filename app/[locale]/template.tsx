import { cookies, headers } from 'next/headers'

import Header from '@/sections/Header'
import AuthModal from '@/modal/AuthModal'
import LanguageModel from '@/model/LanguageModel'
import ScrollToTop from '@/components/common/ScrollToTop'
import LoadingModal from '@/components/modal/LoadingModal'
import ResetPasswordModal from '@/modal/ResetPasswordModal'
import HeaderNavigation from '@/components/HeaderNavigation'
import FooterWithBlueTheme from '@/sections/FooterWithBlueTheme'
import OperatingCountryModel from '@/model/OperatingCountryModel'
import HeaderDrawerNavigation from '@/components/HeaderDrawerNavigation'
import OperatingCountrySelectorModal from '@/modal/OperatingCountrySelectorModal'
import getOperatingCountriesAction from '@/actions/operatingCountry/getOperatingCountriesAction'

const Template = async ({ children }: { children: React.ReactNode }) => {
  const headerList = await headers()
  const cookieStore = await cookies()

  const token = cookieStore.get('token')?.value

  const [{ data: operatingCountries }, activeCountry, activeLanguage] =
    await Promise.all([
      getOperatingCountriesAction(), // operating countries list
      OperatingCountryModel.getActiveOperatingCountry(), // active country
      (await LanguageModel.getActive()) || LanguageModel.default, // active language
    ])

  const currentUr = headerList.get('link') || headerList.get('referer') || ''
  const isPromotionPage =
    currentUr.includes('/summer-offers') || currentUr.includes('/landing')

  if (activeCountry)
    return (
      <>
        <Header isLoggedIn={!!token}>
          {!isPromotionPage && (
            <>
              <HeaderDrawerNavigation
                activeCountry={activeCountry}
                activeLanguage={activeLanguage}
              />
              <HeaderNavigation
                isLoggedIn={!!token}
                activeCountry={activeCountry}
                activeLanguage={activeLanguage}
              />
            </>
          )}
        </Header>
        {children}
        {!isPromotionPage ? (
          <FooterWithBlueTheme activeCountry={activeCountry} />
        ) : (
          <ScrollToTop />
        )}
        <AuthModal />
        <ResetPasswordModal />
        <LoadingModal />
        <OperatingCountrySelectorModal
          operatingCountries={operatingCountries}
        />
      </>
    )

  return null
}

export default Template
