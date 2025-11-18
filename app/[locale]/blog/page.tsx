import { redirect } from 'next/navigation'

import routes from '@/routes'
import { type GetOperatingCountriesData } from '@/model/OperatingCountryModel'

interface BlogPageProps {
  params: Promise<{ locale: GetOperatingCountriesData['iso2'] }>
}

const BlogPage = async ({ params }: BlogPageProps) => {
  const { locale } = await params

  return redirect(`/${locale}/${routes.blogs}`)
}

export default BlogPage
