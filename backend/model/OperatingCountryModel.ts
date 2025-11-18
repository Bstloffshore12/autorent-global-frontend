import 'server-only'

import { cookies } from 'next/headers'
import { getLocale } from 'next-intl/server'

import { routing } from '@/i18n/routing'
import NetworkModel from '@/model/NetworkModel'
import type { Language } from '@/model/LanguageModel'
import { filterOperatingCountriesBySlug } from '@/futils'
import getOperatingCountriesAction from '@/actions/operatingCountry/getOperatingCountriesAction'

type Media = {
  title: string
  alt: string
  path: string
}

interface SocialLinks {
  f?: string
  t?: string
  y?: string
  i?: string
  l?: string
  tik?: string
}

export type GetOperatingCountriesData = {
  id: number
  iso3: string
  name: string
  email: string
  media?: Media
  tax_rate: number
  pay_at_counter_percentage: number
  currency: string
  tax_label: string
  phonecode: string
  share_text: string
  conversion: number
  apple_link: string
  phonelength: number
  booking_note: string
  android_link: string
  tax_status: 'Y' | 'N'
  languages: Language[]
  support_email: string
  phone_number?: string
  whatsapp_text: string
  currency_name: string
  header_script?: string
  footer_content: string
  whatsapp_number: string
  display_after_vat: 0 | 1
  currency_position: string
  social_links: SocialLinks
  tax_effectivedate: string
  sale_price_active: 0 | 1
  daily_price_active: 0 | 1
  weekly_price_active: 0 | 1
  monthly_price_active: 0 | 1
  iso2: 'ae' | 'sa' | 'bh' | 'om'
}

class OperatingCountryModel {
  static slugKey = 'x-next-intl-locale'

  static idBySlug = { ae: '1', bh: '2', om: '3', sa: '4' }
  static slugById = { '1': 'ae', '2': 'bh', '3': 'om', '4': 'sa' }
  static nameBySlug = { ae: 'UAE', bh: 'Bahrain', om: 'Oman', sa: 'KSA' }

  static getOperatingCountries = async () => {
    return NetworkModel.fetch(NetworkModel.apiRoutes.getOperatingCountries)
  }

  static getIdBySlug_Static = async (
    locale?: GetOperatingCountriesData['iso2']
  ) => {
    if (locale) return this.idBySlug[locale]

    const slug = await OperatingCountryModel.getSlugFromCookies()
    if (slug) return this.idBySlug[slug]
    return this.idBySlug[routing.defaultLocale]
  }

  static getSlugFromCookies = async (): Promise<
    GetOperatingCountriesData['iso2'] | undefined
  > => {
    const cookieStore = await cookies()
    const slug = cookieStore.get(this.slugKey)?.value as
      | GetOperatingCountriesData['iso2']
      | undefined
    return slug
  }

  static getActiveCountryName = async (): Promise<string> => {
    const locale = (await getLocale()) as GetOperatingCountriesData['iso2']
    return this.nameBySlug[locale]
  }

  static getActiveOperatingCountry = async (
    operatingCountries: GetOperatingCountriesData[] = []
  ): Promise<GetOperatingCountriesData | undefined> => {
    const locale = (await getLocale()) as GetOperatingCountriesData['iso2']
    let list = operatingCountries

    if (!list.length) {
      const { data } = await getOperatingCountriesAction()
      list = data
    }

    return filterOperatingCountriesBySlug(locale, list)
  }

  static isValidLocale = (locale: string) =>
    routing.locales.includes(locale as GetOperatingCountriesData['iso2'])
}

export default OperatingCountryModel
