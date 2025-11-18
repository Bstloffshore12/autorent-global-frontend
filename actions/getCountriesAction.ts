'use server'

import NetworkModel from '@/model/NetworkModel'
import { type Errors } from '@/model/NetworkModel'

export type CountryData = { name: string; flag: string; phone_code: string }

type Return =
  | {
      success: true
      data: CountryData[]
    }
  | {
      errors: Errors
      success: false
      message: string
    }

const getCountriesAction = async (): Promise<Return> => {
  try {
    const res = await fetch(NetworkModel.apiRoutes.getCountries)

    const response = await res.json()

    if (res.status === 200) {
      return { success: true, data: response.data }
    }

    throw new Error(response.message)
  } catch (error) {
    console.error({ getCountriesAction: error })

    return {
      success: false,
      message: 'Unable to get countries',
      errors: { message: ['Unable to get countries'] },
    }
  }
}

export default getCountriesAction
