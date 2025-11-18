'use server'

import { type Errors } from '@/model/NetworkModel'
import CarModel, { type BodyTypeData } from '@/model/CarModel'

type Return =
  | {
      success: true
      data: BodyTypeData[]
    }
  | {
      success: false
      message: string
      errors: Errors
    }

const getCategoriesAction = async (): Promise<Return> => {
  try {
    const response = await CarModel.getCategories()
    const { success, message } = response

    return success
      ? { success, message, data: response.data }
      : { success, message, errors: response.error }
  } catch (error) {
    console.error({ getCategoriesAction: error })

    return {
      success: false,
      message: 'Unable to get gategories',
      errors: { message: ['Unable to get gategories'] },
    }
  }
}

export default getCategoriesAction
