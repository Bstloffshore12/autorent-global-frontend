import MonthlyLeaseListing from '@/components/monthlyLease/MonthlyLeaseListing'
import { getMonthlyLeaseCarsAction } from '@/actions/car/getMonthlyLeaseCarAction'
import type { MonthlyLeaseCarData as CarData } from '@/model/MonthlyLeaseModel' // ✅ import type
import Breadcrumb from '@/components/common/Breadcrumb'
import { getTranslations } from 'next-intl/server'
import routes from '@/routes'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations()

  const title = `${t('Monthly Lease Cars')} | 'Affordable Car Leasing'}`
  const description = t(
    'Explore flexible and affordable monthly car leasing options with a variety of vehicles to choose from.'
  )

  return {
    title,
    description,
  }
}
export default async function PersonalLeaseListingPage() {
  const [t, leaseCarsRes] = await Promise.all([
    getTranslations(),
    getMonthlyLeaseCarsAction(),
  ])

  const cars: CarData[] = leaseCarsRes.success
    ? leaseCarsRes.data.map((car) => ({
        ...car,
        dailysale: car.dailysale ?? '',
        weeklysale: car.weeklysale ?? '',
        monthlysale: car.monthlysale ?? '',
      }))
    : []

  return (
    <main>
      <Breadcrumb
        path={[
          { name: t('Monthly Lease Cars'), link: routes.monthlyLeaseCars },
        ]}
      />
      <MonthlyLeaseListing cars={cars} />
    </main>
  )
}
