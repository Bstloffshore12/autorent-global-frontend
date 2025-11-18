'use server'

import { type Errors } from '@/model/NetworkModel'
import CmsModel, { type OfficeLocationGroupByStateData } from '@/model/CmsModel'

type Return =
  | {
      success: true
      data: OfficeLocationGroupByStateData
    }
  | {
      errors: Errors
      success: false
      message: string
    }

const getOfficeLocationsContentAction = async (): Promise<Return> => {
  try {
    const response = await CmsModel.getOfficeLocationsContent()
    const { success, message } = response

    return success
      ? { success, message, data: response.data }
      : { success, message, errors: response.error }
  } catch (error) {
    console.error({ getOfficeLocationsContentAction: error })

    return {
      success: false,
      message: 'Unable to get office locations',
      errors: { message: ['Unable to get office locations'] },
    }
  }
}

export default getOfficeLocationsContentAction
