import Image from 'next/image'
import { type ReactNode } from 'react'
import { getTranslations } from 'next-intl/server'

import routes from '@/routes'
import { classnames } from '@/futils'
import Container from '@/components/common/Container'
import SectionHeading from '@/components/common/SectionHeading'
import getHowItWorksContentAction from '@/actions/cms/getHowItWorksContentAction'

interface IconRingProps {
  up?: boolean
  className?: string
  children: ReactNode
}

const IconRing = ({ up = false, className, children }: IconRingProps) => {
  return (
    <div
      className={classnames(
        'flex justify-center after:absolute after:-right-20 after:bottom-0 after:w-36 after:border-t-[3px] after:border-dashed after:border-secondary',
        up
          ? 'after:rotate-[40deg]'
          : 'after:-left-20 after:rotate-[-40deg] md:after:-right-20 md:after:bottom-full md:after:left-auto md:after:top-0',
        className
      )}
    >
      <div className="grid size-36 place-items-center rounded-full border-[3px] border-dashed border-primary bg-white md:size-44">
        <div className="mx-auto flex size-28 items-center justify-center rounded-full fill-secondary text-4xl shadow-xl shadow-primary/60 md:size-36">
          {children}
        </div>
      </div>
    </div>
  )
}

interface ContentProps {
  para?: string
  title: string
  count: string
}

const Content = ({ count, title, para }: ContentProps) => {
  return (
    <div className="flex min-h-32 flex-col justify-center text-center md:min-h-0 md:space-y-2 md:px-4">
      {count && (
        <div
          className="text-lg font-bold text-secondary md:text-2xl"
          dangerouslySetInnerHTML={{ __html: count }}
        />
      )}
      <h3 className="font-semibold text-primary md:text-lg">{title}</h3>
      <p className="text-sm font-normal md:text-base">{para}</p>
    </div>
  )
}

const HowItWorksSection = async () => {
  const t = await getTranslations()

  const res = await getHowItWorksContentAction()

  if (res.success && res.data.length) {
    const { data } = res

    return (
      <section>
        <Container className="space-y-6">
          <SectionHeading className="text-center" brandColoured>
            {t('How It Works')}
          </SectionHeading>
          <div className="grid grid-cols-2 md:grid-cols-6">
            {data.map(({ id, content, title, media }, i) => (
              <div
                className={classnames(
                  'flex md:gap-6',
                  i % 2 ? 'flex-col-reverse' : 'flex-col'
                )}
                key={id}
              >
                <IconRing
                  up={i % 2 === 0}
                  className={classnames(i === 5 && 'after:hidden')}
                >
                  <Image
                    width={60}
                    height={60}
                    title={media?.title}
                    alt={media?.alt || title}
                    src={
                      media?.path
                        ? `${routes.bucketUrl}${media?.path}`
                        : '/assets/images/placeholder.svg'
                    }
                  />
                </IconRing>
                <Content
                  para={content}
                  title={title}
                  count={String(i + 1).padStart(2, '0')}
                />
              </div>
            ))}
          </div>
        </Container>
      </section>
    )
  }

  return null
}

export default HowItWorksSection
