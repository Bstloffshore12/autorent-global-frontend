'use server'

import { type Errors } from '@/model/NetworkModel'
import CarModel, { type CarDetail } from '@/model/CarModel'

type Return =
  | {
      success: true
      message: string
      data: CarDetail
    }
  | {
      errors: Errors
      success: false
      message: string
    }

type GetCarDetailActionProps = {
  slug: string
}

const getCarDetailAction = async ({
  slug,
}: GetCarDetailActionProps): Promise<Return> => {
  try {
    const response = await CarModel.getCarDetail(slug)
    const { success, message } = response

    return success
      ? { success, message, data: response.data }
      : { success, message, errors: response.error }
  } catch (error) {
    console.error({ getCarDetailAction: error })

    return {
      success: false,
      message: 'Unable to get car detail',
      errors: { message: ['Unable to get car detail'] },
    }
  }
}

export default getCarDetailAction
