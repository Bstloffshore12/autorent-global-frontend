import Image from 'next/image'
import { type ResolvedMetadata } from 'next'
import { getTranslations } from 'next-intl/server'

import ListingSideFilter2, {
  type ListingSideFilter2Props,
} from '@/components/carListing/ListingSideFilter2'
import Container from '@/components/common/Container'
import Breadcrumb from '@/components/common/Breadcrumb'
import PageHeading from '@/components/common/PageHeading'
import getMakesAction from '@/actions/car/getMakesAction'
import getDoorsAction from '@/actions/car/getDoorsAction'
import CarListing from '@/components/carListing/CarListing'
import getModelsAction from '@/actions/car/getModelsAction'
import getBodyTypesAction from '@/actions/car/getBodyTypesAction'
import OperatingCountryModel from '@/model/OperatingCountryModel'
import getFuelTypesAction from '@/actions/car/getFuelTypesAction'
import getRentalCarsAction from '@/actions/car/getRentalCarsAction'
import getPriceRangeAction from '@/actions/car/getPriceRangeAction'
import getCategoriesAction from '@/actions/car/getCategoriesAction'
import getCustomContentAction from '@/actions/cms/getCustomContentAction'
import getTransmissionsAction from '@/actions/car/getTransmissionsAction'
import type { CarData, CarPagination, ModelData } from '@/model/CarModel'
import CmsModel, { type OfficeLocationDropdownData } from '@/model/CmsModel'
import ListingFilterDrawer from '@/components/carListing/ListingFilterDrawer'
import getRentalCarsPageContentAction from '@/actions/pages/getRentalCarsPageContentAction'
import getOfficeLocationsDropdownAction from '@/actions/cms/getOfficeLocationsDropdownAction'

interface CarListingPageProps {
  searchParams: Promise<ListingSideFilter2Props['selectedOptions']>
}

// seo meta
export async function generateMetadata(
  {},
  metaData: Promise<ResolvedMetadata>
) {
  const parentMeta = await metaData
  const res = await getRentalCarsPageContentAction()

  return CmsModel.setSeoMeta(res, parentMeta)
}

interface CarListingSectionProps {
  cars: CarData[]
  pagination: CarPagination
  officeLocationsContent: OfficeLocationDropdownData
}

// This component is responsible for rendering the car listings section
// It fetches the active operating country to determine Global Pricing Modes
// and later we combine it with the individual pricing mode to determine
// the actual pricing modes for each car.
const CarListingSection = async ({
  cars,
  pagination,
  officeLocationsContent,
}: CarListingSectionProps) => {
  const activeCountry = await OperatingCountryModel.getActiveOperatingCountry()

  if (activeCountry) {
    const {
      daily_price_active: isGlobalDailyPriceActive,
      weekly_price_active: isGlobalWeeklyPriceActive,
      monthly_price_active: isGlobalMonthlyPriceActive,
    } = activeCountry

    return (
      <CarListing
        cars={cars}
        pagination={pagination}
        officeLocationsContent={officeLocationsContent}
        isGlobalDailyPriceActive={isGlobalDailyPriceActive}
        isGlobalWeeklyPriceActive={isGlobalWeeklyPriceActive}
        isGlobalMonthlyPriceActive={isGlobalMonthlyPriceActive}
      />
    )
  }
}

const CarListingPage = async ({ searchParams }: CarListingPageProps) => {
  const [
    t,
    selectedOptions,
    makesRes,
    doorsRes,
    fuelTypesRes,
    bodyTypesRes,
    priceRangeRes,
    categoriesRes,
    transmissionsRes,
    rentalCarsContentRes,
    officeLocationsContentRes,
    headingRes,
  ] = await Promise.all([
    getTranslations(),
    searchParams,
    getMakesAction(),
    getDoorsAction(),
    getFuelTypesAction(),
    getBodyTypesAction(),
    getPriceRangeAction(),
    getCategoriesAction(),
    getTransmissionsAction(),
    getRentalCarsPageContentAction(),
    getOfficeLocationsDropdownAction(),
    getCustomContentAction('rent-cars-bullet-points'),
  ])

  const pointsHeading = (headingRes.success && headingRes.data?.title) || ''
  const pointsContent = (headingRes.success && headingRes.data?.content) || ''

  const makes = makesRes.success ? makesRes.data : []
  const doors = doorsRes.success ? doorsRes.data : []
  const fuelTypes = fuelTypesRes.success ? fuelTypesRes.data : []
  const bodyTypes =
    bodyTypesRes.success && Array.isArray(bodyTypesRes.data)
      ? bodyTypesRes.data
      : []
  const categories = categoriesRes.success ? categoriesRes.data : []
  const transmissions = transmissionsRes.success ? transmissionsRes.data : []
  const models: { [key: string]: ModelData[] } = {}

  const getAllModels = async (makeId: string) => {
    const res = await getModelsAction({ makeId })
    if (res.success) models[makeId] = res.data
  }

  makes.forEach(({ id }) => getAllModels(id.toString()))
  for (const make of makes) await getAllModels(make.id.toString())

  const priceRange = priceRangeRes.success
    ? priceRangeRes.data
    : {
        daily: { min: 0, max: 0 },
        weekly: { min: 0, max: 0 },
        monthly: { min: 0, max: 20000 },
      }

  const res = await getRentalCarsAction(selectedOptions)
  const componentProps: ListingSideFilter2Props = {
    makes,
    doors,
    models,
    fuelTypes,
    bodyTypes,
    categories,
    priceRange,
    transmissions,
    selectedOptions,
  }

  const officeLocationsContent = officeLocationsContentRes.success
    ? officeLocationsContentRes.data
    : {}

  const content = rentalCarsContentRes.success
    ? rentalCarsContentRes.data
    : null

  return (
    <>
      <Breadcrumb path={[{ name: t('Car Listings') }]} />

      <main className="mb-8 mt-2 md:mt-8">
        <Container className="space-y-6">
          {content && <PageHeading>{content.title}</PageHeading>}

          {content?.content && (
            <div dangerouslySetInnerHTML={{ __html: content.content }} />
          )}

          <div className="grid gap-6 lg:grid-cols-[300px_auto]">
            <div className="space-y-4">
              <aside className="hidden h-fit rounded-2xl border border-neutral-200 p-4 font-normal shadow-lg shadow-primary/10 lg:block">
                <ListingSideFilter2 {...componentProps} />
              </aside>

              <div className="hidden h-fit space-y-2 rounded-2xl p-4 font-normal shadow-lg shadow-primary/10 lg:block">
                {pointsHeading && (
                  <p className="font-medium">{pointsHeading}</p>
                )}
                {pointsContent && (
                  <div
                    className="pl-4 text-sm font-light [&_li]:list-disc [&_ul]:space-y-2"
                    dangerouslySetInnerHTML={{ __html: pointsContent }}
                  />
                )}
              </div>
            </div>

            <ListingFilterDrawer {...componentProps} />

            {res.success && res.data.cars.length ? (
              <CarListingSection
                cars={res.data.cars}
                pagination={res.data.pagination}
                officeLocationsContent={officeLocationsContent}
              />
            ) : (
              <div>
                <Image
                  width={240}
                  height={240}
                  alt="Car not found"
                  src="/assets/images/listing-not-found.svg"
                  className="mx-auto mt-6 h-60 w-60 max-w-full object-contain"
                />
                <p className="text-center text-2xl font-semibold">
                  {t('No Car Listing Found')}
                </p>
              </div>
            )}
          </div>
        </Container>
      </main>
    </>
  )
}

export default CarListingPage
