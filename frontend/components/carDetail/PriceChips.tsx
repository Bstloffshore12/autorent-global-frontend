'use client'

import { classnames } from '@/futils'
import { useAppStore } from '@/store/provider'

type PriceProps = {
  price: string
  duration: string
  isActive: boolean
}

const PriceChip = ({ price, duration, isActive }: PriceProps) => {
  const { abbreviation } = useAppStore((state) => state.general.currency)

  return (
    <p
      className={classnames(
        'grid rounded-lg px-2 py-1 text-center duration-300 md:flex md:gap-1',
        isActive
          ? 'bg-primary-light shadow-md shadow-primary/20'
          : 'bg-neutral-100 shadow-none'
      )}
    >
      <span
        className={classnames(
          'text-sm font-medium duration-300 md:text-lg',
          isActive ? 'text-primary' : ''
        )}
      >
        {abbreviation} {price}
      </span>
      <span className="text-sm font-normal md:mt-2">/{duration}</span>
    </p>
  )
}

type BasePrice = {
  daily: string
  weekly: string
  monthly: string
}

const PriceChips = ({ basePrices }: { basePrices: BasePrice }) => {
  const { pricingMode } = useAppStore((state) => state.order)

  return (
    <div className="grid grid-cols-3 gap-4 md:flex">
      <PriceChip
        duration="Day"
        price={basePrices.daily}
        isActive={pricingMode === 'daily'}
      />
      <PriceChip
        duration="Week"
        price={basePrices.weekly}
        isActive={pricingMode === 'weekly'}
      />
      <PriceChip
        duration="Month"
        price={basePrices.monthly}
        isActive={pricingMode === 'monthly'}
      />
    </div>
  )
}

export default PriceChips
