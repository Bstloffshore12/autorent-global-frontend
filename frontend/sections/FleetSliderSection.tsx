import FleetSlider from '@/components/FleetSlider'
import Container from '@/components/common/Container'
import HeadingSection from '@/components/common/HeadingSection'
import getBodyTypesAction from '@/actions/car/getBodyTypesAction'
import getCustomContentAction from '@/actions/cms/getCustomContentAction'

const FleetSection = async () => {
  const [bodyTypesRes, headingRes] = await Promise.all([
    getBodyTypesAction(),
    getCustomContentAction('fleets-slider-heading'),
  ])

  const heading = (headingRes.success && headingRes.data?.title) || ''
  const subTitle = (headingRes.success && headingRes.data?.subtitle) || ''

  if (bodyTypesRes.success && bodyTypesRes.data.length) {
    const { data } = bodyTypesRes

    return (
      <section>
        <Container className="space-y-6">
          <HeadingSection
            title={heading}
            headingLevel={1}
            subTitle={subTitle}
            className="text-center"
          />

          <FleetSlider fleets={data} />
        </Container>
      </section>
    )
  }

  return null
}

export default FleetSection
