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

const getPrivacyPolicyPageContentAction = async (): Promise<Return> => {
  try {
    const response = await CmsModel.getPrivacyPolicyPageContent()
    const { success, message } = response

    return success
      ? { success, message, data: response.data }
      : { success, message, errors: response.error }
  } catch (error) {
    console.error({ getPrivacyPolicyPageContentAction: error })

    return {
      success: false,
      message: 'Unable to get privacy policy',
      errors: { message: ['Unable to get privacy policy'] },
    }
  }
}

export default getPrivacyPolicyPageContentAction
