'use client'

import { useTranslations } from 'next-intl'

import { useAppStore } from '@/store/provider'
import { type CarState } from '@/store/slices/carSlice'
import moment from 'moment-timezone'
import {
  classnames,
  includeTax,
  toZonedDateTime,
  getCountryTimezone,
} from '@/futils'

type PriceProps = {
  price: string
  label: string
  isActive: boolean
  classname?: string
  sale: string | null
  interactive?: boolean
  pricingMode: CarState['order']['pricingMode']
}

const PriceChip = ({
  sale,
  label,
  price,
  isActive,
  classname,
  interactive,
  pricingMode,
}: PriceProps) => {
  const {
    general: {
      tax,
      isSalePriceActive,
      currency: { abbreviation },
    },
    setOrder: { setPickupTime, setDropoffTime },
    operatingCountry: { activeId },
  } = useAppStore((state) => state)

  const timezone = getCountryTimezone(activeId)

  const processedSale =
    tax.taxIncluded && sale ? includeTax({ tax, price: sale }).toFixed(2) : sale

  const processedPrice = tax.taxIncluded
    ? includeTax({ tax, price }).toFixed(2)
    : price

  const updateDuration = (mode: CarState['order']['pricingMode']) => {
    let daysToAdd = 1
    if (mode === 'weekly') daysToAdd = 7
    if (mode === 'monthly') daysToAdd = 30

    const from = moment.tz(timezone)
    const to = moment.tz(timezone).add(daysToAdd, 'days')

    setDropoffTime(toZonedDateTime(to, timezone))
    setPickupTime(toZonedDateTime(from, timezone))
  }

  return (
    <p
      className={classnames(
        'grid flex-1 rounded-lg bg-primary-light p-2 text-center text-sm font-normal shadow-md shadow-primary/10 duration-300 md:gap-1',
        isActive && '!bg-primary text-white shadow-xl',
        interactive && 'cursor-pointer',
        classname
      )}
      onClick={() => interactive && updateDuration(pricingMode)}
    >
      <span className="capitalize">{label}</span>
      {sale && !!isSalePriceActive && (
        <span className="capitalize line-through">{processedPrice}</span>
      )}
      <span
        className={classnames(
          'text-shadow-lg font-medium duration-300',
          isActive ? 'text-green-400' : 'text-green-700'
        )}
      >
        {abbreviation} {processedSale || processedPrice}
      </span>
    </p>
  )
}

type PriceChipsProps = {
  daily: string
  weekly: string
  monthly: string
  classname?: string
  interactive?: boolean
  itemClassname?: string
  dailySale: string | null
  weeklySale: string | null
  monthlySale: string | null
  availableModes: CarState['order']['pricingMode'][]
}

const PriceChips2 = ({
  daily,
  weekly,
  monthly,
  classname,
  dailySale,
  weeklySale,
  monthlySale,
  interactive,
  itemClassname,
  availableModes,
}: PriceChipsProps) => {
  const t = useTranslations()

  const { pricingMode } = useAppStore((state) => state.order)

  return (
    <div
      className={classnames(
        'flex h-min grid-cols-3 gap-4 rtl:flex-row-reverse',
        classname,
        !availableModes.length && 'max-h-0'
      )}
    >
      {availableModes.includes('daily') && (
        <PriceChip
          price={daily}
          sale={dailySale}
          label={t('daily')}
          pricingMode="daily"
          classname={itemClassname}
          interactive={interactive}
          isActive={pricingMode === 'daily'}
        />
      )}
      {availableModes.includes('weekly') && (
        <PriceChip
          price={weekly}
          sale={weeklySale}
          label={t('weekly')}
          pricingMode="weekly"
          classname={itemClassname}
          interactive={interactive}
          isActive={pricingMode === 'weekly'}
        />
      )}
      {availableModes.includes('monthly') && (
        <PriceChip
          price={monthly}
          sale={monthlySale}
          label={t('monthly')}
          pricingMode="monthly"
          classname={itemClassname}
          interactive={interactive}
          isActive={pricingMode === 'monthly'}
        />
      )}
    </div>
  )
}

export default PriceChips2
