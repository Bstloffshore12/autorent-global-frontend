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

const getSpecialOfferDetailPageContentAction = async (
  slug: string
): Promise<Return> => {
  try {
    const response = await CmsModel.getSpecialOfferDetailPageContent(slug)
    const { success, message } = response

    return success
      ? { success, message, data: response.data }
      : { success, message, errors: response.error }
  } catch (error) {
    console.error({ getSpecialOfferDetailPageContentAction: error })

    const errorMessage = 'Unable to get special offer'

    return {
      success: false,
      message: errorMessage,
      errors: { message: [errorMessage] },
    }
  }
}

export default getSpecialOfferDetailPageContentAction
