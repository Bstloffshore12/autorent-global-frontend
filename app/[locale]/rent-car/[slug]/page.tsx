import Image from 'next/image'
import { type ResolvedMetadata } from 'next'
import { BsSpeedometer } from 'react-icons/bs'
import { getTranslations } from 'next-intl/server'

import routes from '@/routes'
import CmsModel from '@/model/CmsModel'
import Coupons from '@/components/Coupons'
import { getAvailablePricingMode } from '@/futils'
import Container from '@/components/common/Container'
import Breadcrumb from '@/components/common/Breadcrumb'
import LinkButton from '@/components/common/LinkButton'
import PageHeading from '@/components/common/PageHeading'
import PriceChips2 from '@/components/carDetail/PriceChips2'
import FeaturesChips from '@/components/carDetail/FeaturesChips'
import OperatingCountryModel from '@/model/OperatingCountryModel'
import getCarDetailAction from '@/actions/car/getCarDetailAction'
import CarImageSlider from '@/components/carDetail/CarImageSlider'
import AuthWarningMessage from '@/components/user/AuthWarningMessage'
import ProceedToPayment from '@/components/carDetail/ProceedToPayment'
import getPaymentOptionsAction from '@/actions/getPaymentOptionsAction'
import getCustomContentAction from '@/actions/cms/getCustomContentAction'
import CarAttributesSection2 from '@/components/carDetail/CarAttributesSection2'
import PickUpDropOffSelector2 from '@/components/carListing/PickUpDropOffSelector2'
import getOfficeLocationsDropdownAction from '@/actions/cms/getOfficeLocationsDropdownAction'
import AdditionalServicesFormMobile from '@/components/carDetail/AdditionalServicesForMobile'
import SetLeaseTypeClient from '@/components/individualLease/SetLeaseTypeClient'
import DropoffChargeDisplay from '@/components/carDetail/DropOffChargeDisplay'

// seo meta
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  metaData: Promise<ResolvedMetadata>
) {
  const { slug } = await params
  const parentMeta = await metaData
  const res = await getCarDetailAction({ slug })

  return CmsModel.setSeoMeta(res, parentMeta)
}

interface CarDetailPageProps {
  params: Promise<{ slug: string }>
}

const CarDetailPage = async ({ params }: CarDetailPageProps) => {
  const { slug } = await params

  const [
    t,
    getPaymentOptionsRes,
    carDetailRes,
    officeLocationsContentRes,
    bookingMessageRes,
    activeCountry, //active operating country
  ] = await Promise.all([
    getTranslations(),
    getPaymentOptionsAction(),
    getCarDetailAction({ slug }),
    getOfficeLocationsDropdownAction(),
    getCustomContentAction('booking-content'),
    OperatingCountryModel.getActiveOperatingCountry(), // get active operating country to handle Global Pricing Modes
  ])

  const bookingMessage =
    (bookingMessageRes.success && bookingMessageRes.data?.content) || ''

  const officeLocationsContent = officeLocationsContentRes.success
    ? officeLocationsContentRes.data
    : {}

  const paymentOptions = getPaymentOptionsRes.success
    ? getPaymentOptionsRes.data
    : []

  if (carDetailRes.success && carDetailRes.data && activeCountry) {
    const {
      id,
      door,
      seat,
      make,
      year,
      title,
      media,
      model,
      color,
      daily,
      weekly,
      summary,
      monthly,
      warranty,
      cylinder,
      transmission,
      book_now: bookNow,
      bodytype: bodyType,
      fueltype: fuelType,
      dailysale: dailySale,
      weeklysale: weeklySale,
      car_category: category,
      monthlysale: monthlySale,
      dailyactive: isDailyActive,
      weeklyactive: isWeeklyActive,
      body_condition: bodyCondition,
      monthlyactive: isMonthlyActive,
      rental_additional: rentalAdditional,
      carattributes_attr: carAttributesAttr,
      regional_specification: regionalSpecification,
    } = carDetailRes.data

    // Global Pricing Modes to disable to restricted pricing modes
    const {
      daily_price_active: isGlobalDailyPriceActive,
      weekly_price_active: isGlobalWeeklyPriceActive,
      monthly_price_active: isGlobalMonthlyPriceActive,
    } = activeCountry

    // combine Global Pricing Modes with Car Detail Pricing Modes
    // to determine which pricing modes are active
    // and available for the user to select
    const isDailyPriceActive = !!(isDailyActive && isGlobalDailyPriceActive)
    const isWeeklyPriceActive = !!(isWeeklyActive && isGlobalWeeklyPriceActive)
    const isMonthlyPriceActive = !!(
      isMonthlyActive && isGlobalMonthlyPriceActive
    )

    // get available pricing modes based on the active pricing modes
    // [daily, weekly, monthly]
    const availableModes = getAvailablePricingMode({
      isDailyPriceActive,
      isWeeklyPriceActive,
      isMonthlyPriceActive,
    })

    return (
      <>
        <Breadcrumb
          path={[
            { name: t('Car Listings'), link: routes.listing },
            { name: title },
          ]}
        />

        <main className="mb-8">
          <Container className="z-30 mt-8">
            <PickUpDropOffSelector2
              officeLocationsContent={officeLocationsContent}
            />
          </Container>

          <AuthWarningMessage />

          <Container className="grid gap-8 duration-300 md:grid-cols-2">
            <div className="min-w-full">
              {media ? (
                <CarImageSlider media={media} />
              ) : (
                <Image
                  width={600}
                  height={600}
                  title={title}
                  alt="No car Image"
                  src="/assets/images/placeholder.svg"
                  className="w-9h-96 mx-auto h-96 rounded-lg object-contain opacity-55"
                />
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <PageHeading>{title}</PageHeading>
                {category && (
                  <span className="flex h-6 items-center rounded-xl bg-secondary px-2 text-sm font-normal text-secondary-light">
                    {category}
                  </span>
                )}
              </div>
              <div className="my-2 grid gap-4 border-b pb-4 md:grid-cols-2">
                <CarAttributesSection2
                  make={make}
                  door={door}
                  seat={seat}
                  year={year}
                  color={color}
                  model={model}
                  warranty={warranty}
                  bodyType={bodyType}
                  fuelType={fuelType}
                  cylinder={cylinder}
                  transmission={transmission}
                  bodyCondition={bodyCondition}
                  regionalSpecification={regionalSpecification}
                />

                <PriceChips2
                  interactive
                  daily={daily}
                  weekly={weekly}
                  monthly={monthly}
                  dailySale={dailySale}
                  weeklySale={weeklySale}
                  monthlySale={monthlySale}
                  availableModes={availableModes} // to hide inactive pricing modes
                />
              </div>

              {carAttributesAttr && carAttributesAttr.features && (
                <FeaturesChips features={carAttributesAttr.features} />
              )}

              <AdditionalServicesFormMobile
                className="my-4"
                rentalAdditional={rentalAdditional}
              />
              <DropoffChargeDisplay />

              {summary && (
                <p className="flex items-center gap-2 rounded bg-primary-light px-2 py-1 text-sm font-normal text-primary">
                  <BsSpeedometer />
                  {summary}
                </p>
              )}

              <Coupons
                carId={id}
                bookNow={bookNow}
                className="my-4 border-b pb-4"
                isDailyPriceActive={isDailyPriceActive} // to determine if car is rentable for daily mode
                isWeeklyPriceActive={isWeeklyPriceActive} // to determine if car is rentable for daily mode
                isMonthlyPriceActive={isMonthlyPriceActive} // to determine if car is rentable for daily mode
              />

              <ProceedToPayment
                basePrices={{
                  daily: dailySale || daily,
                  weekly: weeklySale || weekly,
                  monthly: monthlySale || monthly,
                }}
                carId={id}
                bookNow={bookNow}
                message={bookingMessage}
                paymentOptions={paymentOptions}
                isDailyPriceActive={isDailyPriceActive} // to determine if car is rentable for daily mode
                isWeeklyPriceActive={isWeeklyPriceActive} // to determine if car is rentable for daily mode
                isMonthlyPriceActive={isMonthlyPriceActive} // to determine if car is rentable for daily mode
              />
            </div>
          </Container>
        </main>
        <SetLeaseTypeClient type="regular" />
      </>
    )
  }

  return (
    <>
      <Breadcrumb path={[{ name: t('Car Listings'), link: routes.listing }]} />

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
          href={routes.listing}
          className="mx-auto block w-max"
        >
          {t('Back To Listing')}
        </LinkButton>
      </Container>
    </>
  )
}
export default CarDetailPage
