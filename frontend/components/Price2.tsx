import { classnames } from '@/futils'
import { useAppStore } from '@/store/provider'

interface Price2Props {
  price: string
  className?: string
  salesPrice?: string | null
}

const Price2 = ({ className, salesPrice, price }: Price2Props) => {
  const {
    general: { currency },
  } = useAppStore((state) => state)
  return (
    <div className={classnames('grid text-green-600', className)}>
      {salesPrice && (
        <p className="text-center text-xs text-neutral-400 line-through">
          {currency.abbreviation} {Number(price).toLocaleString()}
        </p>
      )}
      <p className="text-center text-sm font-medium">
        {currency.abbreviation} {salesPrice || price}
      </p>
    </div>
  )
}

export default Price2
