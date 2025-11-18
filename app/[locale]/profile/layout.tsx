import { cookies } from 'next/headers'
import { getTranslations } from 'next-intl/server'

import routes from '@/routes'
import { redirect } from '@/i18n/routing'
import Container from '@/components/common/Container'
import Breadcrumb from '@/components/common/Breadcrumb'
import UserSidePanel from '@/components/user/UserSidePanel'
import { type GetOperatingCountriesData } from '@/model/OperatingCountryModel'

type UserLayout = {
  children: React.ReactNode
  params: Promise<{ locale: GetOperatingCountriesData['iso2'] }>
}

const UserLayout = async ({ children, params }: UserLayout) => {
  const [t, { locale }, cookieStore] = await Promise.all([
    getTranslations(),
    params,
    cookies(),
  ])

  const token = cookieStore.get('token')?.value
  if (!token) redirect({ locale, href: routes.home })

  return (
    <>
      <Breadcrumb path={[{ name: t('Profile') }]} />

      <main className="mb-8 mt-2">
        <Container>
          <div className="relative grid gap-6 md:grid-cols-[200px_auto]">
            <UserSidePanel />
            <div className="mt-8">{children}</div>
          </div>
        </Container>
      </main>
    </>
  )
}

export default UserLayout
