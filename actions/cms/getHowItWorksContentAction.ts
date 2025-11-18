'use server'

import { type Errors } from '@/model/NetworkModel'
import CmsModel, { type HowItWorksData } from '@/model/CmsModel'

type Return =
  | {
      success: true
      data: HowItWorksData[]
    }
  | {
      errors: Errors
      success: false
      message: string
    }

const getHowItWorksContentAction = async (): Promise<Return> => {
  try {
    const response = await CmsModel.getHowItWorksContent()
    const { success, message } = response

    return success
      ? { success, message, data: response.data }
      : { success, message, errors: response.error }
  } catch (error) {
    console.error({ getHowItWorksContentAction: error })

    return {
      success: false,
      message: 'Unable to get how it work',
      errors: { message: ['Unable to get how it work'] },
    }
  }
}

export default getHowItWorksContentAction
