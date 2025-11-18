'use server'

import { type Errors } from '@/model/NetworkModel'
import CouponModel, { type CouponData } from '@/model/CouponModel'

type Return =
  | {
      success: true
      message: string
      data: CouponData[]
    }
  | {
      errors: Errors
      success: false
      message: string
    }

const getCouponsListAction = async (): Promise<Return> => {
  try {
    const response = await CouponModel.getCoupon()
    const { success, message } = response

    return success
      ? { success, message, data: response.data }
      : { success, message, errors: response.error }
  } catch (error) {
    console.error({ getCouponsListAction: error })

    return {
      success: false,
      message: 'Unable to get Coupons',
      errors: { message: ['Unable to get Coupons'] },
    }
  }
}

export default getCouponsListAction
