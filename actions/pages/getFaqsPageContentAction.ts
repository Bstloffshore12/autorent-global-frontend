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

const getFaqsPageContentAction = async (): Promise<Return> => {
  try {
    const response = await CmsModel.getFaqsPageContent()
    const { success, message } = response

    return success
      ? { success, message, data: response.data }
      : { success, message, errors: response.error }
  } catch (error) {
    console.error({ getFaqsPageContentAction: error })

    return {
      success: false,
      message: 'Unable to get frequently asked questions',
      errors: { message: ['Unable to get frequently asked questions'] },
    }
  }
}

export default getFaqsPageContentAction
