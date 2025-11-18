'use server'

import { type Errors } from '@/model/NetworkModel'
import CmsModel, { type PartnerData } from '@/model/CmsModel'

type Return =
  | {
      success: true
      data: PartnerData[]
    }
  | {
      errors: Errors
      success: false
      message: string
    }

const getPartnersContentAction = async (): Promise<Return> => {
  try {
    const response = await CmsModel.getPartnersContent()

    const { success, message } = response

    return success
      ? { success, message, data: response.data }
      : { success, message, errors: response.error }
  } catch (error) {
    console.error({ getPartnersContentAction: error })

    return {
      success: false,
      message: 'Unable to get partners',
      errors: { message: ['Unable to get partners'] },
    }
  }
}

export default getPartnersContentAction
