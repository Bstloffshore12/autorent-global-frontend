import { redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

import routes from '@/routes'
import Container from '@/components/common/Container'
import Breadcrumb from '@/components/common/Breadcrumb'
import OrderSuccess from '@/components/order/OrderSuccess'
import getBookingDetailAction from '@/actions/user/getBookingDetailAction'
import { type GetOperatingCountriesData } from '@/model/OperatingCountryModel'

interface OrderSuccessProps {
  params: Promise<{
    locale: GetOperatingCountriesData['iso2']
    id: string
  }>
}

const OrderSuccessPage = async ({ params }: OrderSuccessProps) => {
  const { locale, id } = await params

  const [t, res] = await Promise.all([
    getTranslations(),
    getBookingDetailAction(id),
  ])

  if (res.success && res.data && !Array.isArray(res.data)) {
    return (
      <>
        <Breadcrumb
          path={[
            { name: t('Bookings'), link: routes.user.bookings },
            { name: t('Success') },
          ]}
        />

        <main className="mb-8 mt-2 md:mt-8">
          <Container>
            <OrderSuccess bookingData={res.data} />
          </Container>
        </main>
      </>
    )
  }

  return redirect(`/${locale}/${routes.user.bookings}`)
}

export default OrderSuccessPage
