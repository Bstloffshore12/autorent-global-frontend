'use server'

import PaymentModel from '@/model/PaymentModel'
import { type Errors } from '@/model/NetworkModel'
import { type PaymentMethod } from '@/model/PaymentModel'

type Return =
  | {
      success: true
      data: PaymentMethod[]
    }
  | {
      errors: Errors
      success: false
      message: string
    }

const getPaymentOptionsAction = async (): Promise<Return> => {
  try {
    const response = await PaymentModel.getMethods()
    const { success, message } = response

    return success
      ? { success, message, data: response.data }
      : { success, message, errors: response.error }
  } catch (error) {
    console.error({ getPaymentOptionsAction: error })
    const errorMessage = 'Unable to get payments methods'

    return {
      success: false,
      message: errorMessage,
      errors: { message: [errorMessage] },
    }
  }
}

export default getPaymentOptionsAction
