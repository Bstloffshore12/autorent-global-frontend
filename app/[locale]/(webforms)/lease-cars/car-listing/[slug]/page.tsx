import { PersonalLeaseCarDetail } from '@/components/individualLease/PersonalLeaseCarDetail'
import { getPersonalLeaseCarDetailAction } from '@/actions/car/getPersonalLeaseCarAction'
import type { PersonalLeaseCarDetail as CarData } from '@/model/PersonalLeaseModel'
import Breadcrumb from '@/components/common/Breadcrumb'
import { getTranslations } from 'next-intl/server'
import routes from '@/routes'
import Image from 'next/image'
import LinkButton from '@/components/common/LinkButton'
import Container from '@/components/common/Container'
import PickUpDropOffSelector2 from '@/components/carListing/PickUpDropOffSelector2'
import getPaymentOptionsAction from '@/actions/getPaymentOptionsAction'
import getOfficeLocationsDropdownAction from '@/actions/cms/getOfficeLocationsDropdownAction'
import SetLeaseTypeClient from '@/components/individualLease/SetLeaseTypeClient'

interface LocaleLayoutProps {
  params: Promise<{ slug: string }>
}

export default async function PersonalLeaseCarDetailPage({
  params,
}: LocaleLayoutProps) {
  const { slug } = await params
  // Fetch translations and car data in parallel
  const [t, res, officeLocationsContentRes, getPaymentOptionsRes] =
    await Promise.all([
      getTranslations(),
      getPersonalLeaseCarDetailAction({ slug }),
      getOfficeLocationsDropdownAction(),
      getPaymentOptionsAction(),
    ])
  const paymentOptions = getPaymentOptionsRes.success
    ? getPaymentOptionsRes.data
    : []

  const officeLocationsContent = officeLocationsContentRes.success
    ? officeLocationsContentRes.data
    : {}

  // Handle if no data is returned
  if (!res.success || !res.data) {
    return (
      <>
        <Breadcrumb
          path={[
            { name: t('Lease Cars'), link: routes.webform.leaseCars },
            { name: t('Car Listings'), link: routes.personalLeaseCars },
          ]}
        />

        <Container className="my-8 space-y-4">
          <Image
            width={400}
            height={400}
            alt="Car not found"
            src="/assets/images/not-found.svg"
            className="mx-auto h-96 w-96 max-w-full object-contain"
          />

          <LinkButton
            theme="primaryLight"
            href={routes.personalLeaseCars}
            className="mx-auto block w-max"
          >
            {t('Back To Listing')}
          </LinkButton>
        </Container>
      </>
    )
  }

  const carData: CarData = res.data

  return (
    <div className="min-h-screen">
      <Breadcrumb
        path={[
          { name: t('Lease Cars'), link: routes.webform.leaseCars },
          { name: t('Car Listings'), link: routes.personalLeaseCars },
          {
            name: carData.title,
            link: routes.personalLeaseCarDetail(carData.slug),
          },
        ]}
      />
      <Container className="z-30 mt-8">
        <PickUpDropOffSelector2
          officeLocationsContent={officeLocationsContent}
        />
      </Container>
      <PersonalLeaseCarDetail
        carData={carData}
        paymentOptions={paymentOptions}
      />
      <SetLeaseTypeClient type="personal" />
    </div>
  )
}
