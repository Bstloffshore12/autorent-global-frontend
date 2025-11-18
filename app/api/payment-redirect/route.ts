import { redirect } from 'next/navigation'

import routes from '@/routes'
import PaymentModel from '@/model/PaymentModel'
import NetworkModel from '@/model/NetworkModel'

export async function POST(request: Request) {
  let redirectUrl = `${routes.baseUrl}${routes.home}`

  try {
    const res = await request.text()

    // prepare data
    const urlParams = new URLSearchParams(res)
    const encResp = urlParams.get('encResp')

    const body = new FormData()
    body.append('encResp', encResp || '')

    const url = NetworkModel.apiRoutes.payment.redirect
    const response = await PaymentModel.executePayment({ url, body })

    const locale = 'ae'
    const success = response.success ? 'true' : ''

    redirectUrl = `${routes.baseUrl}/api?locale=${locale}&success=${success}`
  } catch (error) {
    console.error({ ccavenue: error })
  }

  return redirect(redirectUrl)
}
