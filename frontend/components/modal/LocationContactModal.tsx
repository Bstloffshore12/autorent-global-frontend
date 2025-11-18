'use client'

import { type Dispatch, type SetStateAction } from 'react'

import Modal from '@/components/common/Modal'
import LocationCard from '@/components/LocationCard'
import { type OfficeLocationData } from '@/model/CmsModel'

interface LocationContactModalProps extends OfficeLocationData {
  isLocationContactModalOpen: boolean
  setLocationContactModalState: Dispatch<SetStateAction<boolean>>
}

const LocationContactModal = ({
  id,
  fax,
  city,
  title,
  email,
  phone,
  address,
  mapframe,
  isLocationContactModalOpen,
  setLocationContactModalState,
}: LocationContactModalProps) => {
  const closeModal = () => setLocationContactModalState(false)

  return (
    <Modal
      setOpen={closeModal}
      className="w-full max-w-3xl !p-0"
      isOpen={isLocationContactModalOpen}
    >
      <LocationCard
        id={id}
        fax={fax}
        city={city}
        title={title}
        email={email}
        phone={phone}
        address={address}
        mapframe={mapframe}
        className="border-0"
      />
    </Modal>
  )
}

export default LocationContactModal
