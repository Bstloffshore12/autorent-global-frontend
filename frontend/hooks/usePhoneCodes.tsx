import Image from 'next/image'
import { useEffect, useState } from 'react'

import routes from '@/routes'
import { toastErrors } from '@/futils'
import { useAppStore } from '@/store/provider'
import { type Option } from '@/components/common/Select'
import getCountriesAction from '@/actions/getCountriesAction'

const Title = ({ code, flag }: { code: string; flag?: string }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Image
        width={20}
        height={15}
        alt={`Flag of ${code}`}
        src={
          flag
            ? `${routes.bucketUrlClient}${flag}`
            : '/assets/images/placeholder.svg'
        }
      />

      <span style={{ marginLeft: '8px' }}>+{code}</span>
    </div>
  )
}

type UsePhoneCodesProps = {
  default: string
  options: Option[]
  globalOptions: Option[]
  isCountriesLoading: boolean
}

const usePhoneCodes = (): UsePhoneCodesProps => {
  const {
    general: {
      contact: { phonecode, location },
    },
    operatingCountry: { list },
  } = useAppStore((state) => state)

  const [globalOptions, setGlobalOptions] = useState<Option[]>([])
  const [isCountriesLoading, setIsCountriesLoading] = useState(false)

  const getCountries = async () => {
    setIsCountriesLoading(true)
    const res = await getCountriesAction()
    if (res.success) {
      setGlobalOptions(
        res.data.map(({ flag, phone_code, name }) => ({
          id: `${phone_code}-${name}`,
          title: `${flag} ${phone_code}`,
        }))
      )

      setIsCountriesLoading(false)
      return res.data
    }

    toastErrors(res.errors)

    setIsCountriesLoading(false)
    return null
  }

  useEffect(() => {
    getCountries()
  }, [])

  return {
    options: list.map((l) => ({
      id: l.phonecode,
      title: <Title code={l.phonecode} flag={l.media?.path} />,
    })),
    globalOptions,
    isCountriesLoading,
    default: `+${phonecode}-${location}`,
  }
}

export default usePhoneCodes
