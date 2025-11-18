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

const get404PageContentAction = async (): Promise<Return> => {
  try {
    const response = await CmsModel.get404PageContent()
    const { success, message } = response

    return success
      ? { success, message, data: response.data }
      : { success, message, errors: response.error }
  } catch (error) {
    console.error({ get404PageContentAction: error })

    return {
      success: false,
      message: 'Unable to get content',
      errors: { message: ['Unable to get content'] },
    }
  }
}

export default get404PageContentAction
