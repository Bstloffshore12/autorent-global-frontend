import Image from 'next/image'

import routes from '@/routes'
import Card from '@/components/common/Card'
import Container from '@/components/common/Container'
import HeadingSection from '@/components/common/HeadingSection'
import getCustomContentAction from '@/actions/cms/getCustomContentAction'
import getAdvantagesContentAction from '@/actions/cms/getAdvantagesContentAction'

const AdvantagesSction = async () => {
  const [advantagesContentRes, headingRes] = await Promise.all([
    getAdvantagesContentAction(),
    getCustomContentAction('advantages-heading'),
  ])

  const heading = (headingRes.success && headingRes.data?.title) || ''
  const subTitle = (headingRes.success && headingRes.data?.subtitle) || ''

  if (advantagesContentRes.success && advantagesContentRes.data?.length) {
    const { data } = advantagesContentRes

    return (
      <Container className="space-y-6">
        <HeadingSection
          title={heading}
          subTitle={subTitle}
          className="text-center"
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {data.map(({ id, content, title, media }) => (
            <Card className="flex flex-col gap-4" key={id}>
              <Image
                width={40}
                height={40}
                title={media?.title}
                alt={media?.alt || title}
                src={
                  media?.path
                    ? `${routes.bucketUrl}${media?.path}`
                    : '/assets/images/placeholder.svg'
                }
              />

              <h3 className="text-xl font-medium">{title}</h3>
              <p>{content}</p>
            </Card>
          ))}
        </div>
      </Container>
    )
  }

  return null
}

export default AdvantagesSction
