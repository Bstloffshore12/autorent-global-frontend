'use server'

import { type Errors } from '@/model/NetworkModel'
import CarModel, { type ModelData } from '@/model/CarModel'

type Return =
  | {
      success: true
      data: ModelData[]
    }
  | {
      errors: Errors
      success: false
      message: string
    }

interface getModelsActionProps {
  makeId: string
}

const getModelsAction = async ({
  makeId,
}: getModelsActionProps): Promise<Return> => {
  try {
    const response = await CarModel.getModels(makeId)
    const { success, message } = response

    if (success) {
      const data = Array.isArray(response.data)
        ? response.data.map(({ id, title }: { id: string; title: string }) => ({
            id,
            title,
          }))
        : []
      return { success: true, data }
    }

    return { success, message, errors: response.error }
  } catch (error) {
    console.error({ getModelsAction: error })

    return {
      success: false,
      message: 'Unable to get Models',
      errors: { message: ['Unable to get Models'] },
    }
  }
}

export default getModelsAction
