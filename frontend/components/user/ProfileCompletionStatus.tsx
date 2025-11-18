'use client'

import { useTranslations } from 'next-intl'

import useUser from '@/hooks/useUser'
import { classnames } from '@/futils'

const ProfileCompletionStatus = () => {
  const t = useTranslations()

  const { getProfileCompletionPercentage } = useUser()

  const percentage = getProfileCompletionPercentage()

  return (
    <div className="grid grid-cols-[auto_96px] gap-2">
      <div>
        <p
          className={classnames(
            'font-medium',
            percentage < 100 ? 'text-secondary' : 'text-primary'
          )}
        >
          {percentage < 100
            ? t('Complete your Profile')
            : t('Profile Completed')}
        </p>
        <p>
          {percentage < 100
            ? t(
                'By completing your profile, It will be easier for you to approve your car rental booking requests'
              )
            : t(
                'Congratulations, Your profile is completed, You can now rent a car'
              )}
        </p>
      </div>
      <div
        style={{ width: `${percentage}%` }}
        className={classnames(
          'progress-bar absolute end-0 mt-2 rounded-md text-center text-xs font-semibold text-white duration-700',
          percentage < 100
            ? 'top-full bg-secondary/90 p-0'
            : 'top-0 !w-24 bg-primary/90 p-2'
        )}
      >
        <span>
          {percentage}% {t('Completed')}
        </span>
      </div>
    </div>
  )
}

export default ProfileCompletionStatus
