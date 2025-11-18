'use server'

import CmsModel, { type GetCustomeData } from '@/model/CmsModel'
import type { CmsCustomSlugs, Errors } from '@/model/NetworkModel'

type Return =
  | {
      success: true
      data: GetCustomeData
    }
  | {
      errors: Errors
      success: false
      message: string
    }

const getCustomContentAction = async (
  slug: CmsCustomSlugs
): Promise<Return> => {
  try {
    const response = await CmsModel.getCustomContent(slug)
    const { success, message } = response

    return success
      ? { success, message, data: response.data }
      : { success, message, errors: response.error }
  } catch (error) {
    console.error({ getCustomContentAction: error })

    return {
      success: false,
      message: 'Unable to get custom',
      errors: { message: ['Unable to get custom'] },
    }
  }
}

export default getCustomContentAction
