import Image from 'next/image'

import routes from '@/routes'
import Card from '@/components/common/Card'
import Container from '@/components/common/Container'
import HeadingSection from '@/components/common/HeadingSection'
import getCustomContentAction from '@/actions/cms/getCustomContentAction'
import getRentalDocumentsAction from '@/actions/cms/getRentalDocumentsAction'

const RentalDocumentSection = async () => {
  const [res, headingRes] = await Promise.all([
    getRentalDocumentsAction(),
    getCustomContentAction('rental-documents-heading'),
  ])

  const heading = (headingRes.success && headingRes.data?.title) || ''
  const subTitle = (headingRes.success && headingRes.data?.subtitle) || ''

  if (res.success && res.data.length) {
    const { data } = res

    return (
      <section>
        <Container className="space-y-6">
          <HeadingSection
            title={heading}
            subTitle={subTitle}
            className="text-center"
          />

          <div className="grid gap-6 lg:grid-cols-2">
            {data.map(({ id, media, title, content }) => (
              <Card
                key={id}
                className="grid items-center gap-4 md:grid-cols-[240px_auto]"
              >
                <Image
                  width={300}
                  height={300}
                  title={media?.title}
                  alt={media?.alt || title}
                  className="m-auto w-44 md:m-0 md:w-full"
                  src={
                    media?.path
                      ? `${routes.bucketUrl}${media?.path}`
                      : '/assets/images/placeholder.svg'
                  }
                />
                <div>
                  <h3 className="mb-1 text-lg font-medium text-primary">
                    {title}
                  </h3>
                  {content && (
                    <div
                      className="rental-documents-content space-y-2"
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                  )}
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

export default RentalDocumentSection
