import { redirect } from 'next/navigation'

import routes from '@/routes'
import { type GetOperatingCountriesData } from '@/model/OperatingCountryModel'

interface BookingPageProps {
  params: Promise<{ locale: GetOperatingCountriesData['iso2'] }>
}

const BookingPage = async ({ params }: BookingPageProps) => {
  const { locale } = await params

  return redirect(`/${locale}/${routes.user.bookings}`)
}

export default BookingPage
