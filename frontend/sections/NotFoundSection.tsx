import Image from 'next/image'
import { type ResolvedMetadata } from 'next'
import { getTranslations } from 'next-intl/server'

import routes from '@/routes'
import CmsModel from '@/model/CmsModel'
import Container from '@/components/common/Container'
import LinkButton from '@/components/common/LinkButton'
import SectionHeading from '@/components/common/SectionHeading'
import get404PageContentAction from '@/actions/pages/get404PageContentAction'

// seo meta
export async function generateMetadata(
  {},
  metaData: Promise<ResolvedMetadata>
) {
  const parentMeta = await metaData
  const res = await get404PageContentAction()

  return CmsModel.setSeoMeta(res, parentMeta)
}

const NotFoundSection = async () => {
  const t = await getTranslations()

  const res = await get404PageContentAction()

  const data = {
    title: '404',
    subTitle: '404',
  }

  if (res.success && res.data) {
    data.title = res.data.title
    data.subTitle = res.data.subtitle || data.subTitle
  }

  return (
    <Container>
      <SectionHeading className="mb-6 text-8xl font-bold text-primary lg:text-9xl">
        <Image
          width={400}
          height={400}
          alt="Not found"
          src="/assets/images/not-found.svg"
          className="mx-auto h-96 w-96 max-w-full object-contain"
        />
      </SectionHeading>
      <p className="mb-2 text-3xl font-medium lg:text-4xl">{data.title}</p>
      <p className="mb-6 text-lg">{data.subTitle}</p>
      <LinkButton
        href={routes.home}
        theme="primaryLight"
        className="mx-auto block max-w-max"
      >
        {t('Back to Homepage')}
      </LinkButton>
    </Container>
  )
}

export default NotFoundSection
