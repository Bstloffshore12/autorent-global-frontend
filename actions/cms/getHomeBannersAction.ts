'use server'

import { type Errors } from '@/model/NetworkModel'
import CmsModel, { type HomeBannersData } from '@/model/CmsModel'

type Return =
  | {
      success: true
      data: HomeBannersData[]
    }
  | {
      errors: Errors
      success: false
      message: string
    }

const getHomeBannersAction = async (): Promise<Return> => {
  try {
    const response = await CmsModel.getHomeBannersContent()
    const { success, message } = response

    return success
      ? { success, message, data: response.data }
      : { success, message, errors: response.error }
  } catch (error) {
    console.error({ getHomeBannersAction: error })

    return {
      success: false,
      message: 'Unable to get home banenrs',
      errors: { message: ['Unable to get home banenrs'] },
    }
  }
}

export default getHomeBannersAction
