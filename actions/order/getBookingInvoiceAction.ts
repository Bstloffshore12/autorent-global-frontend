'use server'

import { type Errors } from '@/model/NetworkModel'
import OrderModel, { type InvoiceData } from '@/model/OrderModel'

type Return =
  | {
      success: true
      message: string
      data: InvoiceData
    }
  | {
      errors: Errors
      success: false
      message: string
    }

const getBookingInvoiceAction = async (bookingId: string): Promise<Return> => {
  try {
    const response = await OrderModel.getOrderInvoice(bookingId)
    const { success, message } = response

    return success
      ? { success, message, data: response.data }
      : { success, message, errors: response.error }
  } catch (error) {
    console.error({ getBookingInvoiceAction: error })

    return {
      success: false,
      message: 'Unable to get Coupons',
      errors: { message: ['Unable to get Coupons'] },
    }
  }
}

export default getBookingInvoiceAction
