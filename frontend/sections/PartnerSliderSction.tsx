import Container from '@/components/common/Container'
import PartnerSlider from '@/components/PartnerSlider'
import HeadingSection from '@/components/common/HeadingSection'
import getCustomContentAction from '@/actions/cms/getCustomContentAction'
import getPartnersContentAction from '@/actions/cms/getPartnersContentAction'

const PartnerSliderSction = async () => {
  const [partnersContentRes, headingRes] = await Promise.all([
    getPartnersContentAction(),
    getCustomContentAction('partner-heading'),
  ])

  const heading = (headingRes.success && headingRes.data?.title) || ''
  const subTitle = (headingRes.success && headingRes.data?.subtitle) || ''

  if (partnersContentRes.success && partnersContentRes.data?.length)
    return (
      <Container className="space-y-6">
        <HeadingSection
          title={heading}
          subTitle={subTitle}
          className="text-center"
        />

        <PartnerSlider partners={partnersContentRes.data} />
      </Container>
    )

  return null
}

export default PartnerSliderSction
