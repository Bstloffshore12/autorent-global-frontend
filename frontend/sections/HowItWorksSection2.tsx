import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

import routes from '@/routes'
import Container from '@/components/common/Container'
import HeadingSection from '@/components/common/HeadingSection'
import getCustomContentAction from '@/actions/cms/getCustomContentAction'
import getHowItWorksContentAction from '@/actions/cms/getHowItWorksContentAction'

const HowItWorksSection2 = async () => {
  const t = await getTranslations()

  const [howItWorksContentRes, headingRes] = await Promise.all([
    getHowItWorksContentAction(),
    getCustomContentAction('how-it-works-heading'),
  ])

  const heading = (headingRes.success && headingRes.data?.title) || ''
  const subTitle = (headingRes.success && headingRes.data?.subtitle) || ''

  if (howItWorksContentRes.success && howItWorksContentRes.data.length) {
    const { data } = howItWorksContentRes

    return (
      <section>
        <Container className="space-y-6">
          <HeadingSection
            title={heading}
            subTitle={subTitle}
            className="text-center"
          />
          <div className="grid gap-2 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {data.map(({ id, media, title, content }, i) => (
              <div
                key={id}
                className="grid grid-cols-[96px_auto] gap-4 md:gap-6"
              >
                <div className="relative flex size-24 items-center justify-center rounded-full border-6 border-primary md:border-8">
                  <Image
                    src={
                      media?.path
                        ? `${routes.bucketUrl}${media?.path}`
                        : '/assets/images/placeholder.svg'
                    }
                    width={50}
                    height={50}
                    alt={title}
                  />
                  <div className="absolute -right-[20px] bottom-0 top-0 my-auto inline-block h-min w-4 overflow-hidden md:-right-[22px]">
                    <div className="h-6 origin-top-left rotate-45 transform bg-primary"></div>
                  </div>
                </div>
                <div>
                  <p className="flex h-12 items-center justify-center gap-2 border-b-2 border-primary text-center text-lg font-medium">
                    <span className="hidden text-primary md:block">
                      {t('STEP')} {i + 1}
                    </span>
                    <span className="block text-secondary md:hidden">
                      {title}
                    </span>
                  </p>
                  <p className="mt-2 hidden rounded-full border-2 border-primary px-6 py-2 text-center text-sm font-semibold text-secondary md:block">
                    <span>{title}</span>
                  </p>
                  <p className="text-center">{content}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    )
  }

  return null
}

export default HowItWorksSection2
