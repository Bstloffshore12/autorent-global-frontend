import Image from 'next/image'

import routes from '@/routes'
import Container from '@/components/common/Container'
import SectionHeading from '@/components/common/SectionHeading'
import getAboutPhilosophiesContentAction from '@/actions/cms/getAboutPhilosophiesContentAction'

const AboutPhilosophiesdataSection = async () => {
  const res = await getAboutPhilosophiesContentAction()

  if (res.success && res.data.length) {
    const { data } = res

    return (
      <section>
        <Container className="space-y-6">
          <SectionHeading className="text-center">
            <span className="text-primary">Our </span>
            <span className="text-secondary">Philosophy</span>
          </SectionHeading>

          <div className="flex flex-wrap items-center justify-evenly gap-x-4 gap-y-8">
            {data.map(({ id, media, content, title }) => (
              <div
                key={id}
                className="relative flex items-center justify-center rounded-full p-6"
              >
                <div
                  className="absolute h-full w-full rounded-full bg-primary"
                  style={{
                    clipPath: 'polygon(0 0, 50% 0, 50% 50%, 0 50%)',
                  }}
                />
                <div
                  className="absolute h-full w-full rounded-full bg-primary"
                  style={{
                    clipPath: 'polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)',
                  }}
                />
                <div
                  style={{ boxShadow: '0px 0px 8px 1px #00277c8a' }}
                  className="flex size-60 flex-col justify-center gap-2 rounded-full border-2 border-primary bg-white text-center"
                >
                  <Image
                    src={
                      media?.path
                        ? `${routes.bucketUrl}${media?.path}`
                        : '/assets/images/placeholder.svg'
                    }
                    width={64}
                    height={64}
                    alt="{media?.alt || title}"
                    title="{media?.title || title}"
                    className="h-16 w-full object-contain duration-300"
                  />
                  <div>
                    <p className="text-2xl font-normal text-secondary">
                      {title}
                    </p>
                    {content && (
                      <div
                        dangerouslySetInnerHTML={{ __html: content }}
                        className="mx-auto max-w-44 text-sm font-normal leading-4 text-primary"
                      />
                    )}
                  </div>
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

export default AboutPhilosophiesdataSection
