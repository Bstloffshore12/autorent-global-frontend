'use client'

import Image from 'next/image'
import { useLocale } from 'next-intl'
import { useTranslations } from 'next-intl'
import { Button } from 'react-aria-components'
import { useCallback, useEffect } from 'react'

import {
  classnames,
  filterOperatingCountriesBySlug as getActiveCountry,
} from '@/futils'
import routes from '@/routes'
import Modal from '@/components/common/Modal'
import { useAppStore } from '@/store/provider'
import { useRouter, usePathname } from '@/i18n/routing'
import SectionHeading from '@/components/common/SectionHeading'
import { type GetOperatingCountriesData } from '@/model/OperatingCountryModel'

type OnSelectProps = {
  id: GetOperatingCountriesData['id']
  iso2: GetOperatingCountriesData['iso2']
}

type OperatingCountrySelectorModalProps = {
  operatingCountries: GetOperatingCountriesData[]
}

const OperatingCountrySelectorModal = ({
  operatingCountries: list,
}: OperatingCountrySelectorModalProps) => {
  const t = useTranslations()

  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale() as GetOperatingCountriesData['iso2']

  const {
    setGeneral: {
      setTax,
      setPayAtCounterPercentage,
      setContact,
      setCurrency,
      setIsSalePriceActive,
      setIsGlobalDailyPriceActive,
      setIsGlobalWeeklyPriceActive,
      setIsGlobalMonthlyPriceActive,
    },
    operatingCountry: { activeId, isModalOpen },
    setOperatingCountry: { setList, setActiveId, setIsModalOpen },
  } = useAppStore((state) => state)

  const onSelect = useCallback(
    ({ iso2 }: OnSelectProps) => {
      setIsModalOpen(false)
      router.replace(pathname, { locale: iso2 })
    },
    [setIsModalOpen, pathname, router]
  )

  useEffect(() => {
    const activeCountry = getActiveCountry(locale, list)

    if (!activeCountry) return

    setActiveId(activeCountry?.id || 0)
    setList(list)
    setContact({
      email: activeCountry.email,
      phonecode: activeCountry.phonecode,
      phoneLength: activeCountry.phonelength,
      phoneNumber: activeCountry.phone_number || '',
      supportEmail: activeCountry.support_email,
      whatsapp: {
        text: activeCountry.whatsapp_text,
        number: activeCountry.whatsapp_number,
      },
      location: activeCountry.name,
    })
    setCurrency({
      name: activeCountry.currency_name,
      abbreviation: activeCountry.currency,
      position: activeCountry.currency_position,
    })
    setTax({
      taxRate: activeCountry.tax_rate,
      taxLabel: activeCountry.tax_label,
      taxStatus: activeCountry.tax_status === 'Y',
      taxIncluded: activeCountry.display_after_vat === 1,
      taxEffectiveDate: activeCountry.tax_effectivedate
        ? new Date(activeCountry.tax_effectivedate)
        : null,
    })
    setPayAtCounterPercentage(activeCountry.pay_at_counter_percentage)
    setIsSalePriceActive(activeCountry.sale_price_active)

    // Set global pricing modes based on the active operating country
    setIsGlobalDailyPriceActive(activeCountry.daily_price_active)
    setIsGlobalWeeklyPriceActive(activeCountry.weekly_price_active)
    setIsGlobalMonthlyPriceActive(activeCountry.monthly_price_active)
  }, [
    list,
    locale,
    setTax,
    setList,
    setContact,
    setCurrency,
    setActiveId,
    setIsSalePriceActive,
    setPayAtCounterPercentage,
    setIsGlobalDailyPriceActive,
    setIsGlobalWeeklyPriceActive,
    setIsGlobalMonthlyPriceActive,
  ])

  return (
    <Modal
      isOpen={isModalOpen}
      className="p-6 text-center md:p-10"
      setOpen={() => setIsModalOpen(false)}
    >
      <SectionHeading className="mb-2">{t('Change Country')}</SectionHeading>
      <p>{t('Experience our service in the following countries')}.</p>

      <div className="mt-8 flex flex-wrap justify-between gap-x-2 gap-y-10 md:mt-12">
        {list.map(({ id, iso2, media, name }) => (
          <Button
            key={iso2}
            onPress={() => onSelect({ id, iso2 })}
            className={classnames(
              'group mx-auto flex min-w-40 cursor-pointer flex-col items-center space-y-4 duration-300 hover:opacity-100 hover:grayscale-[0]',
              id === activeId
                ? 'opacity-100 grayscale-[0]'
                : 'opacity-60 grayscale-[.8]'
            )}
          >
            <Image
              width={100}
              height={75}
              title={media?.title}
              alt={media?.alt || name}
              src={
                media?.path
                  ? `${routes.bucketUrlClient}${media?.path}`
                  : '/assets/images/placeholder.svg'
              }
              className="mx-auto h-full w-full max-w-24 rounded object-contain shadow shadow-primary/40 duration-300 group-hover:shadow-lg group-hover:shadow-primary/40"
            />
            <p className="font-normal">{t(name)}</p>
          </Button>
        ))}
      </div>
    </Modal>
  )
}

export default OperatingCountrySelectorModal
