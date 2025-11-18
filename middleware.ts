import { NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import { routing } from '@/i18n/routing'
import { getCountryDetailByIp } from '@/futils'
import OperatingCountryModel from '@/model/OperatingCountryModel'

export default async function middleware(request: NextRequest) {
  // get locale from domain
  const [, locale] = request.nextUrl.pathname.split('/')

  // if locale is not defined or defined locale is not from out operating countries
  if (!locale || !OperatingCountryModel.isValidLocale(locale)) {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || '' // get user ip

    // if we able to get ip
    if (ip) {
      const countryDetail = await getCountryDetailByIp(ip) // get countries details
      const actualLocale = countryDetail.country?.toLowerCase() // get user actial locale from country details

      // if user locale is from our operating countries
      if (OperatingCountryModel.isValidLocale(actualLocale)) {
        const newUrl = new URL(request.nextUrl)
        newUrl.pathname = `/${actualLocale}`
        return Response.redirect(newUrl)
      }
    }
  }

  const handleI18nRouting = createMiddleware(routing)
  const response = handleI18nRouting(request)
  return response
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ae|sa|bh|om)/:path*'],
}
