import { getRequestConfig } from 'next-intl/server'

import { routing } from '@/i18n/routing'
import LanguageModel from '@/model/LanguageModel'
import { type GetOperatingCountriesData } from '@/model/OperatingCountryModel'

export default getRequestConfig(async ({ requestLocale }) => {
  const language = (await LanguageModel.getActive()) || LanguageModel.default

  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale

  // Ensure that a valid locale is used
  if (
    !locale ||
    !routing.locales.includes(locale as GetOperatingCountriesData['iso2'])
  ) {
    locale = routing.defaultLocale
  }

  return {
    locale,
    messages: (await import(`@/i18n/messages/${language}.json`)).default,
  }
})
