import { getTranslations } from 'next-intl/server'

import Chip from '@/components/common/Chip'
import { type BookingDetailData } from '@/model/UserModel'

interface FeaturesChipsProps {
  className?: string
  features: BookingDetailData['car']['carattributes']['features']
}

const FeaturesChips = async ({ features, className }: FeaturesChipsProps) => {
  const t = await getTranslations()

  return (
    <div className={className}>
      <div className="mb-1 flex justify-between font-medium text-black">
        <p className="text-left">{t('Features')}</p>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-2 pt-2">
        {features.map((feature) => (
          <Chip
            key={feature.id}
            theme="primaryLight"
            className="flex items-center gap-1 !text-sm font-normal text-primary"
          >
            {feature.title}
          </Chip>
        ))}
      </div>
    </div>
  )
}

export default FeaturesChips
