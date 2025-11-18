'use server'

import { type Errors } from '@/model/NetworkModel'
import OrderModel, {
  type PostOrderData,
  type PostOrderProps,
} from '@/model/OrderModel'

type Return =
  | {
      success: true
      message: string
      data: PostOrderData
    }
  | {
      errors: Errors
      success: false
      message: string
    }

const postOrderAction = async (data: PostOrderProps): Promise<Return> => {
  try {
    const response = await OrderModel.postOrder(data)
    const { success, message } = response

    if (success) {
      await OrderModel.setCookieSubmit()
      return { success, message, data: response.data }
    }
    return { success, message, errors: response.error }
  } catch (error) {
    console.error({ postOrderAction: error })

    return {
      success: false,
      message: 'Unable to post order',
      errors: { message: ['Unable to post order'] },
    }
  }
}

export default postOrderAction
