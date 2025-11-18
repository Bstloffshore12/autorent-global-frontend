'use client'

import Modal from '@/components/common/Modal'
import { useAppStore } from '@/store/provider'
import SectionHeading from '@/components/common/SectionHeading'

const LoadingModal = () => {
  const { title, children, isActive, subtitle, icon } = useAppStore(
    (state) => state.ui.loadingModel
  )

  return (
    <Modal
      isOpen={isActive}
      setOpen={() => {}}
      // setOpen={() => resetLoadingModel()}
      className="w-full !max-w-2xl !p-0"
    >
      <div className="p-8 text-center">
        {icon && icon}
        <SectionHeading className="my-4" brandColoured>
          {title}
        </SectionHeading>
        <p>{subtitle}</p>
        {children}
      </div>
    </Modal>
  )
}

export default LoadingModal
