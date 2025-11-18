import Image from 'next/image'

import routes from '@/routes'
import Container from '@/components/common/Container'
import SectionHeading from '@/components/common/SectionHeading'
import getAboutTransparencyContentAction from '@/actions/cms/getAboutTransparencyContentAction'

const AboutTransparencySection = async () => {
  const res = await getAboutTransparencyContentAction()

  if (res.success && res.data.length) {
    const data = res.data[0]

    return (
      <section id="AboutTransparencySection">
        <Container className="grid items-center justify-around gap-8 lg:grid-cols-2">
          <Image
            width={500}
            height={500}
            alt={data.media?.alt || data.title}
            title={data.media?.title || data.title}
            src={
              data.media?.path
                ? `${routes.bucketUrlClient}${data.media?.path}`
                : '/assets/images/placeholder.svg'
            }
            className="ml-auto h-full w-full max-w-[500px] object-contain duration-300"
          />

          <div className="space-y-6">
            <div className="space-y-2">
              <SectionHeading>{data.title}</SectionHeading>
              {data?.content && (
                <div dangerouslySetInnerHTML={{ __html: data.content }} />
              )}
            </div>
          </div>
        </Container>
      </section>
    )
  }
  return null
}

export default AboutTransparencySection
