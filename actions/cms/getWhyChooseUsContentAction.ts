'use server'

import { Errors } from '@/model/NetworkModel'
import CmsModel, { type WhyChooseUsData } from '@/model/CmsModel'

type Return =
  | {
      success: true
      data: WhyChooseUsData[]
    }
  | {
      errors: Errors
      success: false
      message: string
    }

const getWhyChooseUsContentAction = async (): Promise<Return> => {
  try {
    const response = await CmsModel.getWhyChooseUsContent()
    const { success, message } = response

    return success
      ? { success, message, data: response.data }
      : { success, message, errors: response.error }
  } catch (error) {
    console.error({ getWhyChooseUsContentAction: error })

    return {
      success: false,
      message: 'Unable to get why choose us',
      errors: { message: ['Unable to get why choose us'] },
    }
  }
}

export default getWhyChooseUsContentAction
