import Image from 'next/image'

import routes from '@/routes'
import Card from '@/components/common/Card'
import Container from '@/components/common/Container'
import SectionHeading from '@/components/common/SectionHeading'
import getTrustContentAction from '@/actions/cms/getTrustContentAction'

const TrustSection = async () => {
  const res = await getTrustContentAction()

  if (res.success && res.data.length) {
    const { data } = res

    return (
      <Container className="space-y-6">
        <SectionHeading className="text-center">
          <span className="text-primary">Why Choose </span>
          <span className="text-secondary">AUTORENT</span>
          <span className="text-primary"> as Your Service Provider? </span>
        </SectionHeading>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {data.map(({ id, content, title, media }) => (
            <Card
              key={id}
              className="flex flex-col items-center gap-2 bg-primary-light text-center"
            >
              <Image
                width={64}
                height={64}
                title={media?.title}
                alt={media?.alt || title}
                src={
                  media?.path
                    ? `${routes.bucketUrl}${media?.path}`
                    : '/assets/images/placeholder.svg'
                }
                className="mb-2 h-full max-h-16 w-full object-contain opacity-80"
              />

              <h3 className="text-xl font-medium text-primary">{title}</h3>
              {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
            </Card>
          ))}
        </div>
      </Container>
    )
  }

  return null
}

export default TrustSection
