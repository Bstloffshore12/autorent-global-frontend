import { redirect } from 'next/navigation'

import routes from '@/routes'
import { type GetOperatingCountriesData } from '@/model/OperatingCountryModel'

interface CarDetailPageProps {
  params: Promise<{ locale: GetOperatingCountriesData['iso2'] }>
}

const CarDetailPage = async ({ params }: CarDetailPageProps) => {
  const { locale } = await params

  return redirect(`/${locale}/${routes.listing}`)
}

export default CarDetailPage
