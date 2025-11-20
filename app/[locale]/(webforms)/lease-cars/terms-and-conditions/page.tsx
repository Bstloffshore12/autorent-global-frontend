import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import Container from '@/components/common/Container'
import Breadcrumb from '@/components/common/Breadcrumb'
import PageHeading from '@/components/common/PageHeading'
import getPersonalTermsContentAction from '@/actions/pages/getMonthlyTermsContentAction'
import SectionHeading from '@/components/common/SectionHeading'

const Page = async () => {
  const [t, res] = await Promise.all([
    getTranslations(),
    getPersonalTermsContentAction(),
  ])
  //   console.log(res, 'res in terms and conditions page')

  if (res.success && res.data) {
    const { data } = res
    return (
      <>
        <Breadcrumb path={[{ name: t('Terms and Conditions') }]} />

        <main className="mb-8 mt-2 md:mt-8">
          <Container>
            <section>
              <PageHeading>{data.title}</PageHeading>

              <SectionHeading className="mt-2 text-xl">
                {data.subtitle}
              </SectionHeading>

              {data.content && (
                <div
                  dangerouslySetInnerHTML={{ __html: data.content }}
                  className="privacy-policy-terms-and-conditions-content mt-6"
                />
              )}
            </section>
          </Container>
        </main>
      </>
    )
  }

  return notFound()
}

export default Page
