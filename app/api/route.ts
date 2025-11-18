import { redirect } from 'next/navigation'
import { type NextRequest } from 'next/server'

import routes from '@/routes'

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const success = searchParams.get('success')

  const locale = searchParams.get('locale')
  const destination = success
    ? routes.user.bookingStaticSuccess
    : routes.user.bookingStaticFailure

  const redirectUrl = `${routes.baseUrl}/${locale}${destination}`

  return redirect(redirectUrl)
}
