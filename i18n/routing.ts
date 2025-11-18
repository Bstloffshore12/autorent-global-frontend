import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'

import { type GetOperatingCountriesData } from '@/model/OperatingCountryModel'

export const locales: GetOperatingCountriesData['iso2'][] = [
  'ae',
  'sa',
  'bh',
  'om',
]

// Define the routing configuration
export const routing = defineRouting({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: locales[0],

  // cookie name for locale
  // localeCookie: { name: 'locale' },
  localeDetection: false,
})

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)
