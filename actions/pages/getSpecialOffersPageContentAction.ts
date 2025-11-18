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

const getSpecialOffersPageContentAction = async (): Promise<Return> => {
  try {
    const response = await CmsModel.getSpecialOfferPageContent()
    const { success, message } = response

    return success
      ? { success, message, data: response.data }
      : { success, message, errors: response.error }
  } catch (error) {
    console.error({ getSpecialOffersPageContentAction: error })

    const errorMessage = 'Unable to get special offer'

    return {
      success: false,
      message: errorMessage,
      errors: { message: [errorMessage] },
    }
  }
}

export default getSpecialOffersPageContentAction
