import type { Dispatch, ReactNode, SetStateAction } from 'react'

import ModalContainer from '@/components/common/ModalContainer'

interface ModalProp {
  isOpen: boolean
  drawer?: boolean
  className?: string
  children: ReactNode
  setOpen: Dispatch<SetStateAction<boolean>>
}

const Modal = ({ isOpen, className, setOpen, children, drawer }: ModalProp) => {
  return (
    <ModalContainer
      setOpen={setOpen}
      isOpen={isOpen}
      drawer={drawer}
      className={className}
    >
      {children}
    </ModalContainer>
  )
}

export default Modal
