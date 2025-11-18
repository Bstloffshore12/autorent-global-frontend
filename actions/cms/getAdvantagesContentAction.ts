'use server'

import { type Errors } from '@/model/NetworkModel'
import CmsModel, { type GetAdvantagesData } from '@/model/CmsModel'

type Return =
  | {
      success: true
      data: GetAdvantagesData[]
    }
  | {
      errors: Errors
      success: false
      message: string
    }

const getAdvantagesContentAction = async (): Promise<Return> => {
  try {
    const response = await CmsModel.getAdvantagesContent()
    const { success, message } = response

    return success
      ? { success, message, data: response.data }
      : { success, message, errors: response.error }
  } catch (error) {
    console.error({ getAdvantagesContentAction: error })

    return {
      success: false,
      message: 'Unable to get advantages',
      errors: { message: ['Unable to get advantages'] },
    }
  }
}

export default getAdvantagesContentAction
