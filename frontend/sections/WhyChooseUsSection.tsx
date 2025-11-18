import Image from 'next/image'
import { FaCheck } from 'react-icons/fa'
import { getTranslations } from 'next-intl/server'

import routes from '@/routes'
import Card from '@/components/common/Card'
import Container from '@/components/common/Container'
import SectionHeading from '@/components/common/SectionHeading'
import getWhyChooseUsContentAction from '@/actions/cms/getWhyChooseUsContentAction'

const TagLine = ({ text }: { text: string }) => {
  return (
    <p className="flex items-center gap-2 rounded-full bg-white px-4 py-3 shadow-md shadow-primary/10 duration-300 hover:shadow-primary/20">
      <FaCheck className="rounded-full bg-primary p-[5px] text-xl text-white" />
      {text}
    </p>
  )
}

const WhyChooseUsSection = async () => {
  const t = await getTranslations()

  const res = await getWhyChooseUsContentAction()

  if (res.success && res.data.length) {
    const { data } = res

    return (
      <section>
        <Container className="grid gap-4 lg:grid-cols-2">
          <div className="relative mb-32">
            <Image
              height={600}
              width={500}
              className="w-full sm:w-2/3"
              alt="Why Choose AUTORENT"
              src="/assets/images/why-choose-us.webp"
            />
            <div className="absolute left-4 top-4 space-y-4 text-base font-normal text-black sm:left-1/3 sm:top-14 sm:text-lg">
              <TagLine text={t('Customer-centric Approach')} />
              <TagLine text={t('Emphasis on Long-term Relationships')} />
              <TagLine text={t('Commitment to Honouring Promises')} />
              <TagLine text={t('Transparent Operations')} />
              <TagLine text={t('Flexibility')} />
            </div>
            <Image
              width={1000}
              height={1000}
              alt="Why Choose AUTORENT"
              className="absolute -bottom-14 sm:-bottom-32"
              src="/assets/images/why-choose-us-car.webp"
            />
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <SectionHeading brandColoured>{data[0].title}</SectionHeading>
              {data[0]?.content && (
                <div dangerouslySetInnerHTML={{ __html: data[0].content }} />
              )}
            </div>
            {data
              .slice(1, data.length)
              .map(({ id, media, title, subtitle }) => (
                <Card
                  key={id}
                  className="grid grid-cols-[80px_auto] gap-6 shadow-lg shadow-primary/10"
                >
                  <Image
                    width={110}
                    height={110}
                    title={media?.title}
                    alt={media?.alt || title}
                    className="h-full max-h-full w-full max-w-20 object-contain"
                    src={
                      media?.path
                        ? `${routes.bucketUrl}${media?.path}`
                        : '/assets/images/placeholder.svg'
                    }
                  />
                  <div className="space-y-1">
                    <h3 className="text-balance text-lg font-normal text-primary">
                      {title}
                    </h3>
                    <p>{subtitle || ''}</p>
                  </div>
                </Card>
              ))}
          </div>
        </Container>
      </section>
    )
  }
  return null
}

export default WhyChooseUsSection
