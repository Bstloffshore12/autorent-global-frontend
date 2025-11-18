import { classnames } from '@/futils'
import { useAppStore } from '@/store/provider'

interface PriceProps {
  price: string
  className?: string
  salesPrice?: string | null
}

const Price = ({ className, salesPrice, price }: PriceProps) => {
  const {
    general: { currency },
  } = useAppStore((state) => state)
  return (
    <div className={classnames('gap-2 text-lg text-primary', className)}>
      {salesPrice && (
        <p className="text-xs text-neutral-400 line-through">
          {currency.abbreviation} {Number(price).toLocaleString()}
        </p>
      )}
      <p className="font-medium">
        {currency.abbreviation} {salesPrice || price}
      </p>
    </div>
  )
}

export default Price
