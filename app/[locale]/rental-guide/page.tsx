import { redirect } from 'next/navigation'

import routes from '@/routes'
import { type GetOperatingCountriesData } from '@/model/OperatingCountryModel'

interface RentalGUidePageProps {
  params: Promise<{ locale: GetOperatingCountriesData['iso2'] }>
}

const RentalGUidePage = async ({ params }: RentalGUidePageProps) => {
  const { locale } = await params
  return redirect(`/${locale}/${routes.rentalGuides}`)
}

export default RentalGUidePage
