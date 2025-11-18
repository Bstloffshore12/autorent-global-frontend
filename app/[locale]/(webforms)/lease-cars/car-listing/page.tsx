import PersonalLeaseListing from '@/components/individualLease/PersonalLeaseListing'
import { getPersonalLeaseCarsAction } from '@/actions/car/getPersonalLeaseCarAction'
import type { PersonalLeaseCarData as CarData } from '@/model/PersonalLeaseModel' // ✅ import type
import Breadcrumb from '@/components/common/Breadcrumb'
import { getTranslations } from 'next-intl/server'
import routes from '@/routes'

export default async function PersonalLeaseListingPage() {
  const [t, leaseCarsRes] = await Promise.all([
    getTranslations(),
    getPersonalLeaseCarsAction(),
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
          { name: t('Lease Cars'), link: routes.webform.leaseCars },
          { name: t('Car Listings'), link: routes.personalLeaseCars },
        ]}
      />
      <PersonalLeaseListing cars={cars} />
    </main>
  )
}
