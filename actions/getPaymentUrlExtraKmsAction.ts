'use server'

import { type Errors } from '@/model/NetworkModel'
import OrderModel, { type PostExtraKilometerProps } from '@/model/OrderModel'
import PaymentModel from '@/model/PaymentModel'

type Return =
  | {
      data: {
        extra_charge_id: number
        amount: string
        payment_url: string
      }
      success: true
    }
  | {
      errors: Errors
      success: false
      message: string
    }

const getPaymentUrlExtraKmsAction = async (
  data: PostExtraKilometerProps
): Promise<Return> => {
  try {
    // 1. Post Extra Kilometer Data
    const extraKmResponse = await OrderModel.postExtraKilometer(data)

    if (!extraKmResponse.success) {
      return {
        success: false,
        message: extraKmResponse.message || 'Failed to add extra kilometers',
        errors: extraKmResponse.errors || {
          message: ['Failed to add extra kilometers'],
        },
      }
    }

    return {
      success: true,
      data: extraKmResponse.data,
    }
  } catch (error) {
    console.error({ getPaymentUrlExtraKmsAction: error })
    const errorMessage = 'An unexpected error occurred'

    return {
      success: false,
      message: errorMessage,
      errors: { message: [errorMessage] },
    }
  }
}

export default getPaymentUrlExtraKmsAction
