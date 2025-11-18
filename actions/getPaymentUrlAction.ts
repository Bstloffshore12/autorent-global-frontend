'use server'

import { type Errors } from '@/model/NetworkModel'
import PaymentModel, { type GetPaymentUrlProps } from '@/model/PaymentModel'

type Return =
  | {
      data: string
      success: true
    }
  | {
      errors: Errors
      success: false
      message: string
    }

const getPaymentUrlAction = async (
  data: GetPaymentUrlProps
): Promise<Return> => {
  try {
    const response = await PaymentModel.getPaymentUrl(data)
    const { success, message } = response

    return success
      ? {
          success,
          message,
          data: response.data,
        }
      : { success, message, errors: response.error }
  } catch (error) {
    console.error({ getPaymentUrlAction: error })
    const errorMessage = 'Unable to get payments url'

    return {
      success: false,
      message: errorMessage,
      errors: { message: [errorMessage] },
    }
  }
}

export default getPaymentUrlAction
