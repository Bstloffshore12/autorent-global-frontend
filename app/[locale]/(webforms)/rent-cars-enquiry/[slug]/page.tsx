import { notFound } from 'next/navigation'
import { type ResolvedMetadata } from 'next'
import { getTranslations } from 'next-intl/server'

import CmsModel from '@/model/CmsModel'
import { type CarDetail } from '@/model/CarModel'
import Container from '@/components/common/Container'
import Breadcrumb from '@/components/common/Breadcrumb'
import PageHeading from '@/components/common/PageHeading'
import ContactAside from '@/components/webforms/ContactAside'
import CarEnquiryForm from '@/components/webforms/CarEnquiryForm'
import getCarDetailAction from '@/actions/car/getCarDetailAction'
import CarAttributesSection from '@/components/carDetail/CarAttributesSection'
import getRentalCarsEnquiryPageContentAction from '@/actions/pages/getRentalCarsEnquiryPageContentAction'

interface LocaleLayoutProps {
  params: Promise<{ slug: string }>
}

let car: CarDetail | undefined

// seo meta
export async function generateMetadata(
  {},
  metaData: Promise<ResolvedMetadata>
) {
  const parentMeta = await metaData
  const res = await getRentalCarsEnquiryPageContentAction()

  return CmsModel.setSeoMeta(res, parentMeta)
}

const RentCarsEnquiry = async ({ params }: LocaleLayoutProps) => {
  const { slug } = await params

  const [t, carRes, pageRes] = await Promise.all([
    getTranslations(),
    getCarDetailAction({ slug }),
    getRentalCarsEnquiryPageContentAction(),
  ])

  if (carRes.success) car = carRes.data

  if (pageRes.success && pageRes.data) {
    const data = pageRes.data

    return (
      <>
        <Breadcrumb path={[{ name: t('Rent Cars Enquiry') }]} />

        <main className="mb-8 mt-2 md:mt-8">
          <Container className="grid gap-6 md:grid-cols-[auto_400px]">
            <div className="">
              <section className="space-y-4">
                <PageHeading>{data.title}</PageHeading>

                <CarEnquiryForm car={car} />
              </section>

              {car && (
                <section>
                  <div className="mt-8 space-y-4 border-b border-neutral-300 pb-4">
                    <p className="text-lg font-semibold">{car.title}</p>

                    <CarAttributesSection
                      make={car.make}
                      door={car.door}
                      seat={car.seat}
                      year={car.year}
                      color={car.color}
                      model={car.model}
                      warranty={car.warranty}
                      bodyType={car.bodytype}
                      fuelType={car.fueltype}
                      cylinder={car.cylinder}
                      transmission={car.transmission}
                      bodyCondition={car.body_condition}
                      regionalSpecification={car.regional_specification}
                    />
                  </div>
                </section>
              )}
            </div>
            <ContactAside />
          </Container>
        </main>
      </>
    )
  }

  return notFound()
}

export default RentCarsEnquiry
