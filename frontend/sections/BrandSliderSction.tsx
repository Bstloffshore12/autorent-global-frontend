import BrandSlider from '@/components/BrandSlider'
import Container from '@/components/common/Container'
import getMakesAction from '@/actions/car/getMakesAction'
import HeadingSection from '@/components/common/HeadingSection'
import getCustomContentAction from '@/actions/cms/getCustomContentAction'

const BrandSliderSction = async () => {
  const [makesRes, headingRes] = await Promise.all([
    getMakesAction(),
    getCustomContentAction('brands-slider-heading'),
  ])

  const heading = (headingRes.success && headingRes.data?.title) || ''
  const subTitle = (headingRes.success && headingRes.data?.subtitle) || ''

  if (makesRes.success)
    return (
      <Container className="space-y-6">
        <HeadingSection
          title={heading}
          subTitle={subTitle}
          className="text-center"
        />

        <BrandSlider
          brands={makesRes.data.filter(({ car_count }) => car_count)}
        />
      </Container>
    )

  return null
}

export default BrandSliderSction
