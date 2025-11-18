'use server'

import { type Errors } from '@/model/NetworkModel'
import CmsModel, { type GetTrustData } from '@/model/CmsModel'

type Return =
  | {
      success: true
      data: GetTrustData[]
    }
  | {
      errors: Errors
      success: false
      message: string
    }

const getTrustContentAction = async (): Promise<Return> => {
  try {
    const response = await CmsModel.getTrustContent()

    const { success, message } = response

    return success
      ? { success, message, data: response.data }
      : { success, message, errors: response.error }
  } catch (error) {
    console.error({ getTrustContentAction: error })

    return {
      success: false,
      message: 'Unable to get content',
      errors: { message: ['Unable to get content'] },
    }
  }
}

export default getTrustContentAction
