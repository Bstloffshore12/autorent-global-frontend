import { redirect } from 'next/navigation'
import { BsPatchCheckFill } from 'react-icons/bs'
import { getTranslations } from 'next-intl/server'

import routes from '@/routes'
import WebformModel from '@/model/WebformModel'
import Container from '@/components/common/Container'
import Breadcrumb from '@/components/common/Breadcrumb'
import ContactAside from '@/components/webforms/ContactAside'
import SectionHeading from '@/components/common/SectionHeading'
import OfficeLocationSection from '@/sections/OfficeLocationSection'
import ContactFormThanks from '@/components/webforms/ContactFormThanks'
import { type GetOperatingCountriesData } from '@/model/OperatingCountryModel'

interface ContactThanksPageProps {
  params: Promise<{
    locale: GetOperatingCountriesData['iso2']
  }>
}

const ContactThanksPage = async ({ params }: ContactThanksPageProps) => {
  const [{ locale }, t, isFormSubmitted] = await Promise.all([
    params,
    getTranslations(),
    WebformModel.form.checkIfSubmitted(),
  ])

  // Return to home page if user didnt come through from submission
  if (!isFormSubmitted) return redirect(`/${locale}/${routes.home}`)

  return (
    <>
      <Breadcrumb path={[{ name: t('Thanks') }]} />

      <main className="mb-8 mt-2 md:mt-8">
        <Container className="grid gap-6 md:grid-cols-[auto_400px]">
          <section className="text-center">
            <BsPatchCheckFill className="mx-auto mb-8 text-8xl text-primary" />

            <SectionHeading headingLevel={1} className="mb-4 md:mb-8">
              {t('Thank You for Getting in Touch!')}
            </SectionHeading>
            <ContactFormThanks />
          </section>

          <ContactAside />
        </Container>

        <Container>
          <section>
            <OfficeLocationSection />
          </section>
        </Container>
      </main>
    </>
  )
}

export default ContactThanksPage
