import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'

import routes from '@/routes'
import PaymentModel from '@/model/PaymentModel'
import NetworkModel from '@/model/NetworkModel'

export async function GET(request: Request) {
  let redirectUrl = `${routes.baseUrl}${routes.home}`

  try {
    const url = new URL(request.url)
    const urlParams = url.searchParams

    // Check if we have the required parameters
    const key = urlParams.get('key')
    const resultIndicator = urlParams.get('resultIndicator')

    if (!key || !resultIndicator) {
      redirectUrl = `${routes.baseUrl}/api?locale=bh&success=false`
      return redirect(redirectUrl)
    }

    // prepare data
    const body = new FormData()
    for (const [key, value] of urlParams.entries()) body.append(key, value)

    const apiUrl = NetworkModel.apiRoutes.payment.credimaxRedirect

    try {
      const response = await PaymentModel.executePayment({ url: apiUrl, body })

      const locale = 'bh'
      const success = response.success ? 'true' : ''

      redirectUrl = `${routes.baseUrl}/api?locale=${locale}&success=${success}`
    } catch {
      redirectUrl = `${routes.baseUrl}/api?locale=bh&success=false`
    }
  } catch {
    redirectUrl = `${routes.baseUrl}/api?locale=bh&success=false`
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

    const url = NetworkModel.apiRoutes.payment.credimaxRedirect

    try {
      const response = await PaymentModel.executePayment({ url, body })

      const locale = 'bh'
      const success = response.success ? 'true' : ''

      redirectUrl = `${routes.baseUrl}/api?locale=${locale}&success=${success}`
    } catch {
      redirectUrl = `${routes.baseUrl}/api?locale=bh&success=false`
    }
  } catch {
    redirectUrl = `${routes.baseUrl}/api?locale=bh&success=false`
  }

  return redirect(redirectUrl)
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
