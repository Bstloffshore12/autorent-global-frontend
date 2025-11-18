import { redirect } from 'next/navigation'

import routes from '@/routes'
import { type GetOperatingCountriesData } from '@/model/OperatingCountryModel'

interface InvoicePageProps {
  params: Promise<{ locale: GetOperatingCountriesData['iso2'] }>
}

const InvoicePage = async ({ params }: InvoicePageProps) => {
  const { locale } = await params

  return redirect(`/${locale}/${routes.user.bookings}`)
}

export default InvoicePage
