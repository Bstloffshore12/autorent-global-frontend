import { BsArrowRight } from 'react-icons/bs'
import { getTranslations } from 'next-intl/server'

import routes from '@/routes'
import Container from '@/components/common/Container'
import BlogSlider from '@/components/blog/BlogSlider'
import LinkButton from '@/components/common/LinkButton'
import getBlogsAction from '@/actions/blog/getBlogsAction'
import HeadingSection from '@/components/common/HeadingSection'
import getCustomContentAction from '@/actions/cms/getCustomContentAction'

const BlogsSliderSection = async () => {
  const t = await getTranslations()

  const [blogsRes, headingRes] = await Promise.all([
    getBlogsAction(),
    getCustomContentAction('blogs-heading'),
  ])

  const heading = (headingRes.success && headingRes.data?.title) || ''
  const subTitle = (headingRes.success && headingRes.data?.subtitle) || ''

  if (blogsRes.success && blogsRes.data?.length)
    return (
      <section>
        <Container className="space-y-6">
          <HeadingSection
            title={heading}
            subTitle={subTitle}
            className="text-center"
          />

          <BlogSlider blogs={blogsRes.data} />

          <LinkButton
            size="small"
            theme="primaryLight"
            href={routes.blogs}
            className="mx-auto block max-w-min"
          >
            {t('View All')} <BsArrowRight />
          </LinkButton>
        </Container>
      </section>
    )

  return null
}

export default BlogsSliderSection
