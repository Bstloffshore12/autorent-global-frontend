'use server'

import { type Errors } from '@/model/NetworkModel'
import CmsModel, { type RentalGuideData } from '@/model/CmsModel'

type Return =
  | {
      success: true
      message: string
      data: RentalGuideData[]
    }
  | {
      errors: Errors
      success: false
      message: string
    }

const getRentalGuidesAction = async (): Promise<Return> => {
  try {
    const response = await CmsModel.getRentalGuides()
    const { success, message } = response

    return success
      ? { success, message, data: response.data }
      : { success, message, errors: response.error }
  } catch (error) {
    console.error({ getRentalGuidesAction: error })

    return {
      success: false,
      message: 'Unable to get rental guides',
      errors: { message: ['Unable to get rental guides'] },
    }
  }
}

export default getRentalGuidesAction
