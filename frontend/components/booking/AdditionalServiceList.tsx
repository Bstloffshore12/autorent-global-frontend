import { getTranslations } from 'next-intl/server'

import { classnames } from '@/futils'
import { calculateAdditionalServiceCost } from '@/futils'
import { type BookingDetailData } from '@/model/UserModel'

interface AdditionalServiceListProps {
  order?: BookingDetailData['order']
  currency: BookingDetailData['order']['currency']
  additionals?: BookingDetailData['additional_charges']
  extraKilometerCharges?: BookingDetailData['extra_kilometer_charges']
}

const AdditionalServiceList = async ({
  order,
  currency,
  additionals,
  extraKilometerCharges,
}: AdditionalServiceListProps) => {
  const t = await getTranslations()

  return (
    <div>
      {additionals && additionals.length > 0 && (
        <div>
          <p className="font-medium">{t('Additional Services')}</p>
          {additionals.map((addOn) => (
            <div key={addOn.id}>
              <div
                className={classnames(
                  'grid grid-cols-[auto_100px] items-center gap-1 border-b border-dashed py-2 duration-150'
                )}
              >
                <div className="text-left">
                  <div
                    className={classnames(
                      'flex items-center gap-2 font-normal duration-150'
                    )}
                  >
                    {addOn.title}
                  </div>
                  <p className="text-sm">{addOn.description}</p>
                </div>
                <p className="text-right font-normal">
                  {addOn.price} {currency}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {extraKilometerCharges && extraKilometerCharges.length > 0 && (
        <div className="mt-4">
          <p className="font-medium">Extra Kilometers Charges</p>
          {extraKilometerCharges.map((charge) => (
            <div key={charge.id}>
              <div
                className={classnames(
                  'grid grid-cols-[auto_100px] items-center gap-1 border-b border-dashed py-2 duration-150'
                )}
              >
                <div className="text-left">
                  <div
                    className={classnames(
                      'flex items-center gap-2 font-normal duration-150'
                    )}
                  >
                    {charge.title}
                  </div>
                  <p className="text-sm">{charge.description}</p>
                </div>
                <p className="text-right font-normal">
                  {charge.amount} {currency}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdditionalServiceList
