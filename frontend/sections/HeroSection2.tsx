import { getTranslations } from 'next-intl/server'

import routes from '@/routes'
import { Link } from '@/i18n/routing'
import { addCountInMakes } from '@/futils'
import Chip from '@/components/common/Chip'
import HomeSlider2 from '@/components/HomeSlider2'
import Container from '@/components/common/Container'
import getDoorsAction from '@/actions/car/getDoorsAction'
import getMakesAction from '@/actions/car/getMakesAction'
import CarBarSearchForm2 from '@/components/CarBarSearchForm2'
import getBodyTypesAction from '@/actions/car/getBodyTypesAction'
import getCategoriesAction from '@/actions/car/getCategoriesAction'
import getHomeBannersAction from '@/actions/cms/getHomeBannersAction'
import getOfficeLocationsContentAction from '@/actions/cms/getOfficeLocationsContentAction'

const Form = async ({ className }: { className?: string }) => {
  const t = await getTranslations()

  const slug = ''
  const media = ''

  const [
    makesRes,
    doorsRes,
    bodyTypesRes,
    categoriesRes,
    officeLocationsContentRes,
  ] = await Promise.all([
    getMakesAction(),
    getDoorsAction(),
    getBodyTypesAction(),
    getCategoriesAction(),
    getOfficeLocationsContentAction(),
  ])

  if (
    doorsRes.success &&
    makesRes.success &&
    bodyTypesRes.success &&
    categoriesRes.success &&
    officeLocationsContentRes.success
  ) {
    const bodyTypes = [
      { id: 0, title: t('All Body Types'), slug, media },
      ...bodyTypesRes.data,
    ]
    const categories = [
      { id: 0, title: t('All Categories'), slug, media },
      ...categoriesRes.data,
    ]
    const makes = addCountInMakes(makesRes.data)
    const officeLocationsContent = officeLocationsContentRes.data
    const doors = [
      { id: 0, title: t('All Doors'), slug, media },
      ...doorsRes.data,
    ]

    return (
      <CarBarSearchForm2
        makes={makes}
        doors={doors}
        className={className}
        bodyTypes={bodyTypes}
        categories={categories}
        officeLocationsContent={officeLocationsContent}
      />
    )
  }
}

const FormContent = async () => {
  const categoriesRes = await getCategoriesAction()

  if (categoriesRes.success)
    return (
      <Container className="space-y-6">
        {/* Booking Form - Always visible */}
        <Form className="block" />

        {/* Category Chips - Below the booking form */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categoriesRes.data.map(({ title, id }) => (
            <Link href={`${routes.listing}?category[]=${id}`} key={id}>
              <Chip className="w-max bg-white !text-primary shadow">
                {title}
              </Chip>
            </Link>
          ))}
        </div>
      </Container>
    )
}

const HeroSection = async () => {
  const res = await getHomeBannersAction()

  if (res.success && res.data.length)
    return (
      <section className="z-10 -mt-4">
        {/* Banner Section */}
        <HomeSlider2 banners={res.data} />

        {/* Booking Panel Section - Now below the banner */}
        <div className="bg-gray-50 pb-8">
          <FormContent />
        </div>
      </section>
    )

  return null
}

export default HeroSection
