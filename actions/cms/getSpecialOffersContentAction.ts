'use server'

import { type Errors } from '@/model/NetworkModel'
import CmsModel, { type SpecialOffer } from '@/model/CmsModel'

type Return =
  | {
      success: true
      data: SpecialOffer[]
    }
  | {
      errors: Errors
      success: false
      message: string
    }

const getSpecialOffersContentAction = async (): Promise<Return> => {
  try {
    const response = await CmsModel.getSpecialOffersContent()
    const { success, message } = response

    return success
      ? { success, message, data: response.data }
      : { success, message, errors: response.error }
  } catch (error) {
    console.error({ getSpecialOffersAction: error })

    const errorMessage = 'Unable to get special offers'

    return {
      success: false,
      message: errorMessage,
      errors: { message: [errorMessage] },
    }
  }
}

export default getSpecialOffersContentAction
