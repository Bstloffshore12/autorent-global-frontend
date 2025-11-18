'use client'

import moment from 'moment'
import Datetime from 'react-datetime'
import { IoSearch } from 'react-icons/io5'
import { useTranslations } from 'next-intl'
import { useState, useEffect } from 'react'
import { now } from '@internationalized/date'
import { type Key } from 'react-aria-components'
import { useSearchParams } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'

import type {
  MakeData,
  DoorData,
  BodyTypeData,
  CategoryData,
} from '@/model/CarModel'
import {
  classnames,
  compareDate,
  toZonedDateTime,
  getOfficeLocationsOptions,
} from '@/futils'
import {
  OfficeLocationOption,
  type OfficeLocationGroupByStateData,
} from '@/model/CmsModel'
import routes from '@/routes'
import { useRouter } from '@/i18n/routing'
import { useAppStore } from '@/store/provider'
import Button from '@/components/common/Button'
import usePickUpDropOff from '@/hooks/usePickUpDropOff'
import getModelsAction from '@/actions/car/getModelsAction'
import Dropdown, { type Option } from '@/components/common/Select'

const Label = ({ label }: { label: string }) => {
  return <span className="font-semibold text-primary">{label}</span>
}

interface CarBarSearchForm2Props {
  makes: MakeData[]
  doors: DoorData[]
  className?: string
  bodyTypes: BodyTypeData[]
  categories: CategoryData[]
  officeLocationsContent: OfficeLocationGroupByStateData
}

const CarBarSearchForm2 = ({
  makes,
  // doors,
  className,
  bodyTypes,
  categories,
  officeLocationsContent,
}: CarBarSearchForm2Props) => {
  const t = useTranslations()

  const router = useRouter()
  const searchParams = useSearchParams()

  const [make, setMake] = useState<Key>(0)
  // const [door, setDoor] = useState<Key>(0)
  const [model, setModel] = useState<Key>(0)
  const [bodyType, setBodyType] = useState<Key>(0)
  const [category, setCategory] = useState<Key>(0)
  const [models, setModels] = useState<Option[]>([])

  const [locations, setLocations] = useState<OfficeLocationOption[]>([])

  const getModels = async (makeId: Key) => {
    const res = await getModelsAction({ makeId: makeId.toString() })

    if (res.success) {
      setModels([{ id: 0, title: 'All Models' }, ...res.data])
      return res.data
    }

    return []
  }

  const { mutate, isPending: modelsLoading } = useMutation({
    mutationFn: getModels,
  })

  const handleSelectMake = (makeId: Key) => {
    mutate(makeId)
    setMake(makeId)
  }

  const onSubmit = async () => {
    const params = new URLSearchParams(searchParams.toString())

    if (make) params.set('make[]', make.toString())
    else params.delete('make[]')
    // if (door) params.set('door[]', door.toString())
    // else params.delete('door[]')
    if (model) params.set('model[]', model.toString())
    else params.delete('model[]')
    if (bodyType) params.set('bodyType[]', bodyType.toString())
    else params.delete('bodyType[]')
    if (category) params.set('category[]', category.toString())
    else params.delete('category[]')

    // return
    router.push(`${routes.listing}?${params.toString()}`)
  }

  const {
    setOrder: {
      setPickupTime,
      setDropoffTime,
      setOfficePickupLocation,
      setOfficeDropoffLocation,
    },
    order: {
      pickupTime,
      dropoffTime,
      officeDropoffLocation,
      officePickupLocation,
    },
  } = useAppStore((state) => state)

  const { timeConstraints, pickupTimeConstraints } = usePickUpDropOff()

  useEffect(() => {
    const l = getOfficeLocationsOptions(officeLocationsContent)
    setLocations(l)
  }, [officeLocationsContent])

  const handleSetPickupLocation = (selectedId: Key) => {
    const selectedLocation = locations.find(({ id }) => selectedId === id)
    setOfficePickupLocation(selectedLocation || null)

  }

  const handleSetDropoffLocation = (selectedId: Key) => {
    const selectedLocation = locations.find(({ id }) => selectedId === id)
    setOfficeDropoffLocation(selectedLocation || null)

  }

  const handleSetPickupTime = (value: string | moment.Moment) => {
    const date = toZonedDateTime(value.toString())

    if (date) {
      const d = compareDate({ ending: date, starting: now('Etc/GMT-4') })
      if (d >= 0) setPickupTime(date)
    }

    if (dropoffTime && date) {
      const d = compareDate({ starting: date, ending: dropoffTime })
      if (d < 1) setDropoffTime(date.add({ days: 1 }))
    }
  }

  const handleSetDropoffTime = (value: string | moment.Moment) => {
    const date = toZonedDateTime(value.toString())

    if (pickupTime && value && date) {
      const d = compareDate({ starting: pickupTime, ending: date })
      if (d > 0) setDropoffTime(date)
    }
  }

  return (
    <div className={classnames('z-40', className)}>
      <div className="grid items-center gap-2 rounded-2xl bg-white font-normal text-black sm:grid-cols-3 sm:gap-4 sm:p-4 lg:grid-cols-5">
        <div className="hidden sm:block">
          <Label label={t('Make')} />
          <Dropdown
            options={makes}
            selectedKeys={make}
            placeholder={t('Select Model')}
            popoverClassName="min-w-60 -ml-2"
            onSelectionChange={handleSelectMake}
            className="mt-2 rounded-lg border-2 border-primary px-2"
          />
        </div>
        <div className="hidden sm:block">
          <Label label={t('Model')} />
          <Dropdown
            options={models}
            selectedKeys={model}
            isLoading={modelsLoading}
            placeholder={t('Select Model')}
            onSelectionChange={setModel}
            popoverClassName="min-w-60 -ml-2"
            className="mt-2 rounded-lg border-2 border-primary px-2"
          />
        </div>
        <div className="hidden sm:block">
          <Label label={t('Body')} />
          <Dropdown
            options={bodyTypes}
            selectedKeys={bodyType}
            placeholder={t('Select Body Type')}
            onSelectionChange={setBodyType}
            popoverClassName="min-w-60 -ml-2"
            className="mt-2 rounded-lg border-2 border-primary px-2"
          />
        </div>
        <div className="hidden sm:block">
          <Label label={t('Categories')} />
          <Dropdown
            options={categories}
            selectedKeys={category}
            placeholder={t('Select Category')}
            onSelectionChange={setCategory}
            popoverClassName="min-w-60 -ml-2"
            className="mt-2 rounded-lg border-2 border-primary px-2"
          />
        </div>
        <div className="hidden lg:block">
          {/* <Label label="Door" />
          <Dropdown
            options={doors}
            selectedKeys={door}
            placeholder="Select Door"
            onSelectionChange={setDoor}
            popoverClassName="min-w-60 -ml-2"
            className="mt-2 rounded-lg border-2 border-primary px-2"
          /> */}
        </div>

        <div>
          <Label label={t('Pick up location')} />
          <Dropdown
            isRequired
            options={locations}
            placeholder={t('Pick up location')}
            selectedKeys={officePickupLocation?.id}
            onSelectionChange={handleSetPickupLocation}
            errorMessage="Please select pickup location"
            buttonClassName="mt-2 rounded-lg border-2 border-primary px-2 !h-11"
          />
        </div>

        <div>
          <Label label={t('Pick Up time and date')} />
          <Datetime
            value={pickupTime?.toDate()}
            onChange={handleSetPickupTime}
            inputProps={{ required: true }}
            timeConstraints={pickupTimeConstraints}
            isValidDate={(c) => c.isAfter(moment().subtract(1, 'day'))}
            className="cust-date-time-picker strong-bordere z-20 text-sm"
          />
        </div>

        <div>
          <Label label={t('Drop off location')} />
          <Dropdown
            isRequired
            options={locations}
            placeholder={t('Drop off location')}
            selectedKeys={officeDropoffLocation?.id}
            onSelectionChange={handleSetDropoffLocation}
            errorMessage="Please select drop off location"
            buttonClassName="mt-2 rounded-lg border-2 border-primary px-2 !h-11"
          />
        </div>

        <div>
          <Label label={t('Drop off time and date')} />
          <Datetime
            value={dropoffTime?.toDate()}
            onChange={handleSetDropoffTime}
            inputProps={{ required: true }}
            timeConstraints={timeConstraints}
            isValidDate={(c) => c.isAfter(pickupTime?.toDate())}
            className="cust-date-time-picker strong-bordere z-20 text-sm"
          />
        </div>

        <div className="mt-auto grid items-center">
          <Button
            theme="primary"
            onPress={onSubmit}
            className="flex !h-11 items-center justify-center gap-2"
          >
            <IoSearch />
            {t('Find a Vehicle')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CarBarSearchForm2
