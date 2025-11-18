import 'server-only'
import NetworkModel from '@/model/NetworkModel'

export interface PaymentMethod {
  id: number
  mode: string
  name: string
  cancel: null
  response: null
  description: string
  type: 'full' | 'partial'
  percentage: string | null
  method: 'ccavenue' | 'cod' | 'nbo' | 'clickpay' | 'credimax'
}

export type GetPaymentUrlProps = {
  orderId: string
  paymentId: string
}

type CheckPaymentStatusRes = {
  success: boolean
  message: 'Success' | 'Failure'
  data: {
    order_id: number
    status_code: number
    status_message: string
    country_id: '1' | '2' | '3' | '4'
    order_status: 'Success' | 'Failure'
  }
}

interface ExecutePayment {
  url: string
  body: FormData
}

class PaymentModel {
  static getMethods = async () =>
    NetworkModel.fetch(NetworkModel.apiRoutes.payment.getMethods, {
      method: 'POST',
    })

  static getPaymentUrl = async ({ orderId, paymentId }: GetPaymentUrlProps) =>
    NetworkModel.fetch(NetworkModel.apiRoutes.payment.getUrl, {
      method: 'POST',
      body: JSON.stringify({
        order_id: orderId,
        payment_id: paymentId,
      }),
    })

  static executePayment = async ({
    url,
    body,
  }: ExecutePayment): Promise<CheckPaymentStatusRes> => {
    try {
      // Check if this is a Credimax URL and use GET method
      const isCredimax = url.includes('credimaxpaymentredirect')
      const method = isCredimax ? 'GET' : 'POST'

      let requestOptions: RequestInit = { method }

      if (method === 'POST') {
        requestOptions.body = body
      } else if (method === 'GET' && body) {
        // For GET requests, append form data as query parameters
        const urlObj = new URL(url)
        for (const [key, value] of body.entries()) {
          urlObj.searchParams.append(key, value.toString())
        }
        url = urlObj.toString()
      }

      const res = await fetch(url, requestOptions)

      // Check if response is JSON
      const contentType = res.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        return {
          success: false,
          message: 'Failure',
          data: {
            order_id: 0,
            status_code: res.status,
            status_message: 'Non-JSON response from payment API',
            country_id: '1',
            order_status: 'Failure',
          },
        }
      }

      const response = await res.json()

      const success = response.message === 'Success'

      return { ...response, success }
    } catch (error) {
      // Handle error silently or log to external service
      return {
        success: false,
        message: 'Failure',
        data: {
          order_id: 0,
          status_code: 500,
          status_message: 'Payment execution failed',
          country_id: '1',
          order_status: 'Failure',
        },
      }
    }
  }
}

export default PaymentModel
