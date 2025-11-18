import Container from '@/components/common/Container'
import HeadingSection from '@/components/common/HeadingSection'
import CustomerReviewsSlider from '@/components/CustomerReviewsSlider'
import getTesttimonialAction from '@/actions/cms/getTesttimonialAction'
import getCustomContentAction from '@/actions/cms/getCustomContentAction'

const CustomerReviewSliderSection = async () => {
  const [testtimonialRes, headingRes] = await Promise.all([
    getTesttimonialAction(),
    getCustomContentAction('customers-reviews-heading'),
  ])

  const heading = (headingRes.success && headingRes.data?.title) || ''
  const subTitle = (headingRes.success && headingRes.data?.subtitle) || ''

  if (testtimonialRes.success && testtimonialRes.data?.length) {
    const { data } = testtimonialRes
    return (
      <section>
        <Container className="space-y-6">
          <HeadingSection
            title={heading}
            subTitle={subTitle}
            className="text-center"
          />

          <CustomerReviewsSlider reviews={data} />
        </Container>
      </section>
    )
  }

  return null
}

export default CustomerReviewSliderSection
