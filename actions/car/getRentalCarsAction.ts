import CarModel, {
  type CarData,
  type CarPagination,
  type GetRentalCarsProps,
} from '@/model/CarModel'
import { type Errors } from '@/model/NetworkModel'

type Return =
  | {
      success: true
      message: string
      data: { cars: CarData[]; pagination: CarPagination }
    }
  | {
      errors: Errors
      success: false
      message: string
    }

const getRentalCarsAction = async (
  props: GetRentalCarsProps
): Promise<Return> => {
  try {
    const response = await CarModel.getRentalCars(props)
    const { success, message } = response

    return success
      ? {
          success,
          message,
          data: { cars: response.data, pagination: response.pagination },
        }
      : { success, message, errors: response.error }
  } catch (error) {
    console.error({ getRentalCarsAction: error })

    return {
      success: false,
      message: 'Unable to get rental cars',
      errors: { message: ['Unable to get rental cars'] },
    }
  }
}

export default getRentalCarsAction
