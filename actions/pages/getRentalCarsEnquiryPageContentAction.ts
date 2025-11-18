'use server'

import { type Errors } from '@/model/NetworkModel'
import CmsModel, { type CmsContent } from '@/model/CmsModel'

type Return =
  | {
      success: true
      message: string
      data: CmsContent
    }
  | {
      errors: Errors
      success: false
      message: string
    }

const getRentalCarsEnquiryPageContentAction = async (): Promise<Return> => {
  try {
    const response = await CmsModel.getRentalCarsEnquiryPageContent()
    const { success, message } = response

    return success
      ? { success, message, data: response.data }
      : { success, message, errors: response.error }
  } catch (error) {
    console.error({ getRentalCarsEnquiryPageContentAction: error })

    return {
      success: false,
      message: 'Unable to get lease car content',
      errors: { message: ['Unable to get lease car content'] },
    }
  }
}

export default getRentalCarsEnquiryPageContentAction
