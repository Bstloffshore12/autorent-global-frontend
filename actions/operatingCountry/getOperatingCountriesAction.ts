'use server'

import OperatingCountryModel, {
  type GetOperatingCountriesData,
} from '@/model/OperatingCountryModel'

type Return = {
  success: boolean
  message?: string
  data: GetOperatingCountriesData[]
}

const getOperatingCountriesAction = async (): Promise<Return> => {
  try {
    const response = await OperatingCountryModel.getOperatingCountries()
    const { success } = response

    return success
      ? {
          success,
          data: response.data.map((l: GetOperatingCountriesData) => ({
            ...l,
            iso2: l.iso2.toLowerCase(),
          })),
        }
      : { success, data: [] }
  } catch (error) {
    console.error({ getOperatingCountriesAction: error })

    return {
      data: [],
      success: false,
      message: 'Unable to get operating countries',
    }
  }
}

export default getOperatingCountriesAction
