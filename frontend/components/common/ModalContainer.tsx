import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { Dialog, Modal, ModalOverlay } from 'react-aria-components'

import { classnames } from '@/futils'

interface ModalContainerProps {
  isOpen: boolean
  drawer?: boolean
  className?: string
  children: ReactNode
  setOpen: Dispatch<SetStateAction<boolean>>
}

const ModalContainer = ({
  isOpen,
  drawer,
  children,
  className,
  setOpen,
}: ModalContainerProps) => {
  return (
    <ModalOverlay
      isDismissable
      isOpen={isOpen}
      onOpenChange={setOpen}
      className={({ defaultClassName }) =>
        classnames(
          defaultClassName,
          'fixed bottom-0 left-0 right-0 top-0 z-50 flex bg-black/30 backdrop-blur-sm',
          drawer ? '' : 'items-center justify-center p-3 md:p-4'
        )
      }
    >
      <Modal
        data-lenis-prevent
        className={({ defaultClassName }) =>
          classnames(
            defaultClassName,
            'max-h-full max-w-3xl overflow-auto bg-white p-3 shadow-lg shadow-primary/20',
            drawer ? 'is-drawer w-fit' : 'rounded-xl md:rounded-2xl md:p-6',
            className
          )
        }
      >
        <Dialog aria-label="Modal">{children}</Dialog>
      </Modal>
    </ModalOverlay>
  )
}

export default ModalContainer
