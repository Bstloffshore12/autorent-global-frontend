'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Button } from 'react-aria-components'

import routes from '@/routes'
import { classnames } from '@/futils'
import { useAppStore } from '@/store/provider'
import LoadingSpinner from '@/icons/LoadingSpinner'
import { type GetOperatingCountriesData } from '@/model/OperatingCountryModel'

interface OperatingCountrySelectorProps {
  activeCountry: GetOperatingCountriesData
}

const OperatingCountrySelector = ({
  activeCountry,
}: OperatingCountrySelectorProps) => {
  const t = useTranslations()

  const {
    setUi: { setIsNavigationDrawerActive },
    setOperatingCountry: { setIsModalOpen },
  } = useAppStore((state) => state)

  const onModalOpen = () => {
    setIsModalOpen(true)
    setIsNavigationDrawerActive(false)
  }

  return (
    <Button
      onPress={onModalOpen}
      className={classnames(
        'flex cursor-pointer items-center gap-2 overflow-hidden font-medium duration-1000',
        activeCountry ? 'max-w-52' : 'max-w-8'
      )}
    >
      {activeCountry ? (
        <>
          <Image
            width={28}
            height={21}
            className="h-full w-full max-w-7 rounded object-contain"
            title={activeCountry.name}
            alt={activeCountry.media?.alt || activeCountry.name}
            src={
              activeCountry.media?.path
                ? `${routes.bucketUrlClient}${activeCountry.media?.path}`
                : '/assets/images/placeholder.svg'
            }
          />
          <span
            className={classnames(
              'hidden overflow-hidden text-nowrap duration-500 lg:block',
              activeCountry ? 'max-w-40' : 'max-w-0'
            )}
          >
            {t(activeCountry.name)}
          </span>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </Button>
  )
}

export default OperatingCountrySelector
