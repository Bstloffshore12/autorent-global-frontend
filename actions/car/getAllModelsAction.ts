'use server'

import { type Errors } from '@/model/NetworkModel'
import CarModel, { type AllModelsData } from '@/model/CarModel'

type Return =
  | {
      success: true
      data: AllModelsData[]
    }
  | {
      errors: Errors
      success: false
      message: string
    }

const getAllModelsAction = async (): Promise<Return> => {
  try {
    const response = await CarModel.getAllModels()
    const { success, message } = response

    if (success) {
      const data = response.data.map(
        ({ id, title }: { id: string; title: string }) => ({ id, title })
      )
      return { success: true, data }
    }

    return { success, message, errors: response.error }
  } catch (error) {
    console.error({ getAllModelsAction: error })

    return {
      success: false,
      message: 'Unable to get Models',
      errors: { message: ['Unable to get Models'] },
    }
  }
}

export default getAllModelsAction
