import { redirect } from 'next/navigation'

import routes from '@/routes'
import PaymentModel from '@/model/PaymentModel'
import NetworkModel from '@/model/NetworkModel'

export async function GET(request: Request) {
  let redirectUrl = `${routes.baseUrl}${routes.home}`

  try {
    const url = new URL(request.url)
    const urlParams = url.searchParams

    // prepare data
    const body = new FormData()
    for (const [key, value] of urlParams.entries()) body.append(key, value)

    const apiUrl = NetworkModel.apiRoutes.payment.nboRedirect
    const response = await PaymentModel.executePayment({ url: apiUrl, body })

    const locale = 'om'
    const success = response.success ? 'true' : ''

    redirectUrl = `${routes.baseUrl}/api?locale=${locale}&success=${success}`
  } catch (error) {
    console.error({ nbo: error })
  }

  return redirect(redirectUrl)
}

export async function POST(request: Request) {
  let redirectUrl = `${routes.baseUrl}${routes.home}`

  try {
    const res = await request.text()

    // prepare data
    const body = new FormData()
    const urlParams = new URLSearchParams(res)
    for (const [key, value] of urlParams.entries()) body.append(key, value)

    const url = NetworkModel.apiRoutes.payment.nboRedirect
    const response = await PaymentModel.executePayment({ url, body })

    const locale = 'om'
    const success = response.success ? 'true' : ''

    redirectUrl = `${routes.baseUrl}/api?locale=${locale}&success=${success}`
  } catch (error) {
    console.error({ nbo: error })
  }

  return redirect(redirectUrl)
}
