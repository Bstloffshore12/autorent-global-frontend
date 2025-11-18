import Container from '@/components/common/Container'
import HeadingSection from '@/components/common/HeadingSection'
import OperatingCountryModel from '@/model/OperatingCountryModel'
import LinstingSlider from '@/components/carListing/ListingSlider'
import getRentalCarsAction from '@/actions/car/getRentalCarsAction'
import getCustomContentAction from '@/actions/cms/getCustomContentAction'

interface ListingSliderSectionProps {
  rows?: number
  heading?: string
  subTitle?: string
  leadMode?: boolean
  isFeatured?: boolean
  enquiryLink?: string
}

const ListingSliderSection = async ({
  rows,
  heading,
  subTitle,
  leadMode,
  isFeatured,
  enquiryLink,
}: ListingSliderSectionProps) => {
  const [rentalCarsRes, headingRes, activeCountry] = await Promise.all([
    getRentalCarsAction({
      isFeatured,
      perPage: '10',
      sortBy: 'price_low_high',
    }),
    getCustomContentAction('rental-cars-slider-heading'),
    OperatingCountryModel.getActiveOperatingCountry(),
  ])

  const headingDefault = (headingRes.success && headingRes.data?.title) || ''
  const subTitleDefault =
    (headingRes.success && headingRes.data?.subtitle) || ''

  if (
    activeCountry &&
    rentalCarsRes.success &&
    rentalCarsRes.data.cars.length
  ) {
    const { data } = rentalCarsRes

    // Determine global pricing modes based on the active operating country
    const {
      daily_price_active: isGlobalDailyPriceActive,
      weekly_price_active: isGlobalWeeklyPriceActive,
      monthly_price_active: isGlobalMonthlyPriceActive,
    } = activeCountry

    return (
      <section>
        <Container className="space-y-6">
          <HeadingSection
            className="text-center"
            title={heading || headingDefault}
            subTitle={subTitle || subTitleDefault}
          />

          <LinstingSlider
            rows={rows}
            cars={data.cars}
            leadMode={leadMode}
            enquiryLink={enquiryLink}
            isGlobalDailyPriceActive={isGlobalDailyPriceActive}
            isGlobalWeeklyPriceActive={isGlobalWeeklyPriceActive}
            isGlobalMonthlyPriceActive={isGlobalMonthlyPriceActive}
          />
        </Container>
      </section>
    )
  }

  return null
}

export default ListingSliderSection
