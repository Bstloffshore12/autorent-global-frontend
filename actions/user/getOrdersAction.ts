'use server'

import { type Errors } from '@/model/NetworkModel'
import UserModel, { type OrderData } from '@/model/UserModel'

type Return =
  | {
      success: true
      message: string
      data: OrderData[]
    }
  | {
      errors: Errors
      success: false
      message: string
    }

const getOrdersAction = async (): Promise<Return> => {
  try {
    const response = await UserModel.getOrders()
    const { success, message } = response

    return success
      ? { success, message, data: response.data }
      : { success, message, errors: response.error }
  } catch (error) {
    console.error({ getOrdersAction: error })

    return {
      success: false,
      message: 'Unable to get user profile',
      errors: { message: ['Unable to get user profile'] },
    }
  }
}

export default getOrdersAction
