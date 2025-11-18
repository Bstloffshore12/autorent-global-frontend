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

const getCareerPageContentAction = async (): Promise<Return> => {
  try {
    const response = await CmsModel.getCareerPageContent()
    const { success, message } = response

    return success
      ? { success, message, data: response.data }
      : { success, message, errors: response.error }
  } catch (error) {
    console.error({ getCareerPageContentAction: error })

    return {
      success: false,
      message: 'Unable to get career content',
      errors: { message: ['Unable to get career content'] },
    }
  }
}

export default getCareerPageContentAction
