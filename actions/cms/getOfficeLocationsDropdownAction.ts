'use server'

import { type Errors } from '@/model/NetworkModel'
import CmsModel, { type OfficeLocationDropdownData } from '@/model/CmsModel'

type Return =
  | {
      success: true
      data: OfficeLocationDropdownData
    }
  | {
      errors: Errors
      success: false
      message: string
    }

const getOfficeLocationsDropdownAction = async (): Promise<Return> => {
  try {
    const response = await CmsModel.getOfficeLocationsDropdown()
    const { success, message } = response

    if (success) {
      return { success, message, data: response.data }
    } else {
      return { success, message, errors: response.error }
    }
  } catch (error) {
    console.error({ getOfficeLocationsDropdownAction: error })

    return {
      success: false,
      message: 'Unable to get office locations dropdown',
      errors: { message: ['Unable to get office locations dropdown'] },
    }
  }
}

export default getOfficeLocationsDropdownAction
