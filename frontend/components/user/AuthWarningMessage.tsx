'use client'

import { useTranslations } from 'next-intl'

import useUser from '@/hooks/useUser'
import { classnames } from '@/futils'
import { useAppStore } from '@/store/provider'
import useTopOffset from '@/hooks/useTopOffset'
import Container from '@/components/common/Container'

const AuthWarningMessage = () => {
  const t = useTranslations('auth')

  const { offset } = useTopOffset()

  const {
    auth: { isLoggedIn },
    user: { isVerified },
  } = useAppStore((state) => state)

  const { getProfileCompletionPercentage } = useUser()

  let title = ''
  let message = ''

  if (!isLoggedIn) {
    title = t('message.login.title')
    message = t('message.login.detail')
  } else if (!isVerified) {
    title = t('message.verify.title')
    message = t('message.verify.detail')
  } else if (getProfileCompletionPercentage() < 100) {
    title = t('message.profile.title')
    message = t('message.profile.detail')
  }

  return (
    <Container
      className={classnames(
        'sticky top-0 duration-500',
        title ? 'scale-100' : 'scale-0 !p-0',
        offset > 300 && 'z-50 pt-14 md:pt-20'
      )}
    >
      <div
        className={classnames(
          'rounded-lg border border-dashed border-secondary bg-secondary-light text-secondary shadow-secondary/10 duration-300',
          title ? '' : '!p-0',
          offset > 300
            ? 'p-2 text-sm opacity-75 shadow-lg md:w-1/2'
            : 'w-full p-4 opacity-100 shadow'
        )}
      >
        <p className="text-lg font-semibold">{title}</p>
        <p className="font-normal">{message}</p>
      </div>
    </Container>
  )
}

export default AuthWarningMessage
