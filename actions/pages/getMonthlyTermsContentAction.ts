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

const getMonthlyTermsContentAction = async (): Promise<Return> => {
  try {
    const response = await CmsModel.getMonthlyTermsAndConditionsPageContent()
    const { success, message } = response

    return success
      ? { success, message, data: response.data }
      : { success, message, errors: response.error }
  } catch (error) {
    console.error({ getMonthlyTermsAndConditionsPageContent: error })

    return {
      success: false,
      message: 'Unable to get terms and conditions',
      errors: { message: ['Unable to get terms and conditions'] },
    }
  }
}

export default getMonthlyTermsContentAction
