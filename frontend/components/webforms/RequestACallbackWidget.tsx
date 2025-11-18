'use client'

import { useTranslations } from 'next-intl'
import { Button } from 'react-aria-components'

import { classnames } from '@/futils'
import { useAppStore } from '@/store/provider'
import useTopOffset from '@/hooks/useTopOffset'
import RequestACallbackModal from '@/modal/RequestACallbackModal'

const RequestACallbackWidget = () => {
  const t = useTranslations()

  const { offset } = useTopOffset()

  const {
    webForm: { isRequestACallbackModalOpen },
    setWebForm: { setIsRequestACallbackModalOpen },
  } = useAppStore((state) => state)

  const oepnRequestACallbackModal = () => {
    setIsRequestACallbackModalOpen(true)
  }

  return (
    <>
      <Button
        type="button"
        onPress={oepnRequestACallbackModal}
        style={{ writingMode: 'vertical-lr' }}
        className={classnames(
          'fixed bottom-0 top-0 z-50 my-auto h-max rotate-180 rounded-r-lg bg-secondary px-0.5 py-3 font-normal text-white opacity-75 duration-300 focus:opacity-100 md:text-lg md:opacity-100',
          isRequestACallbackModalOpen ? '-right-8' : 'right-0',
          offset < 300 && '!-right-8'
        )}
      >
        <span>{t('Request a Callback')}</span>
      </Button>
      <RequestACallbackModal />
    </>
  )
}

export default RequestACallbackWidget
