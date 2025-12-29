'use client'

import { useLocale } from 'next-intl'
import { toast } from 'react-toastify'
import { useTranslations } from 'next-intl'
import { FaRegFilePdf } from 'react-icons/fa6'
import { BiSolidEditAlt } from 'react-icons/bi'
import { useMutation } from '@tanstack/react-query'
import { Form, type Key } from 'react-aria-components'
import { useEffect, useState, type FormEvent } from 'react'
import { now, type ZonedDateTime } from '@internationalized/date'
import ProfileFormStatusIndecator from '@/components/user/ProfileFormStatusIndecator'

import {
  classnames,
  toastErrors,
  compareDate,
  toZonedDateTime,
  dateToApiAcceptableFormat,
  getCountryTimezone,
  getUserAcceptableDocumentsType,
} from '@/futils'
import routes from '@/routes'
import useUser from '@/hooks/useUser'
import { useAppStore } from '@/store/provider'
import Button from '@/components/common/Button'
import { type UserData } from '@/model/UserModel'
import InputField from '@/components/common/InputField'
import FileDropZone from '@/components/common/FileDropZone'
import SectionHeading from '@/components/common/SectionHeading'
import DateTimePicker from '@/components/common/DateTimePicker'
import Dropdown, { type Option } from '@/components/common/Select'
import postProfileDetailsAction from '@/actions/user/postProfileDetailsAction'
import type { GetOperatingCountriesData } from '@/model/OperatingCountryModel'

type ResidenceIdFormProps = {
  className?: string
  countries: Option[]
  userProfile: UserData
}

const ResidenceIdForm = ({
  countries,
  className,
  userProfile,
}: ResidenceIdFormProps) => {
  const t = useTranslations()

  const { getProfile } = useUser()

  const locale = useLocale() as GetOperatingCountriesData['iso2']

  const location = useAppStore((state) => state.general.contact.location)
  const { activeId } = useAppStore((state) => state.operatingCountry)
  const timezone = getCountryTimezone(activeId)

  const [isEditable, setIsEditable] = useState(false)

  const [expiry, setExpiry] = useState<ZonedDateTime | null>(
    toZonedDateTime(userProfile.resident_expiry)
  )
  const [fileBack, setFileBack] = useState<File | null>(null)
  const [fileFront, setFileFront] = useState<File | null>(null)
  const [number, setNumber] = useState(userProfile?.emirates_id || '')
  const [place, setPlace] = useState<Key>(userProfile.resident_place || '')
  const [backPath, setBackPath] = useState(userProfile?.resident_back?.path)
  const [frontPath, setFrontPath] = useState(userProfile?.resident_front?.path)

  const preparePayload = () => {
    const resident_expiry = expiry ? dateToApiAcceptableFormat(expiry) : ''

    const fields = {
      emirates_id: number || '',
      resident_place: place?.toString() || '',
      resident_expiry: resident_expiry.split(' ')[0],
    }

    const files = new FormData()
    if (fileBack) files.append('resident_back', fileBack)
    if (fileFront) files.append('resident_front', fileFront)

    return { fields, files }
  }

  const onFileFrontChange = (fileTarget: EventTarget & HTMLInputElement) => {
    setFileFront(fileTarget.files?.[0] || null)
  }

  const onFileBackChange = (fileTarget: EventTarget & HTMLInputElement) => {
    setFileBack(fileTarget.files?.[0] || null)
  }

  const handleSetExpiry = (value: ZonedDateTime | null) => {
    if (value) setExpiry(value)
  }

  const updateProfileDetails = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const payload = preparePayload()
    const res = await postProfileDetailsAction(payload)

    if (res.success) {
      const data = await getProfile()

      if (data) {
        setIsEditable(false)
        setNumber(data.emirates_id)
        setPlace(data.resident_place)
        setBackPath(data.resident_back?.path)
        setFrontPath(data.resident_front?.path)
        setExpiry(toZonedDateTime(data.resident_expiry))
      }

      toast.success(res.message)
    } else toastErrors(res.errors)
  }

  const { mutate, isPending: isProfileUpdating } = useMutation({
    mutationFn: updateProfileDetails,
  })

  const isConpleted = !!(number && place && expiry && backPath && frontPath)

  const getResidentIdLength = (country: GetOperatingCountriesData['iso2']) => {
    const l = { ae: 15, sa: 10, bh: 9, om: 8 }
    return l[country] || 15
  }

  // set residence place of issue based on the current location
  useEffect(() => {
    const currentCountry = countries.find((c) => c.id === location)?.id || ''
    setPlace(currentCountry)
  }, [countries, location])

  return (
    <Form
      onSubmit={mutate}
      className={classnames(
        'space-y-4 rounded-lg border border-primary-light p-6 shadow-md shadow-primary/10',
        className
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <SectionHeading className="!text-2xl">
            {t('Residence ID Information')}
          </SectionHeading>

          <ProfileFormStatusIndecator
            isVisible={isEditable}
            isConpleted={isConpleted}
          />
        </div>

        <Button
          size="small"
          theme="primaryLight"
          className={classnames(
            '!min-w-0 overflow-hidden',
            isEditable ? 'w-36' : 'w-24'
          )}
          onPress={() => setIsEditable(!isEditable)}
        >
          <BiSolidEditAlt /> {isEditable ? t('Cancel Edit') : t('Edit')}
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="grid gap-4">
          <InputField
            isRequired
            value={number}
            onChange={setNumber}
            isDisabled={!isEditable}
            label={t('Residence ID Number')}
            placeholder={t('Residence ID Number')}
            maxLength={getResidentIdLength(locale)}
            minLength={getResidentIdLength(locale)}
            pattern={`^[A-Za-z0-9]{${getResidentIdLength(locale)}}$`}
          />
          <DateTimePicker
            bordered
            isRequired
            value={expiry}
            granularity="day"
            isDisabled={!isEditable}
            onChange={handleSetExpiry}
            label={t('Residence ID Expiry')}
            minValue={now(timezone).add({ days: 1 })}
          />
          <Dropdown
            bordered
            isRequired
            selectedKeys={place}
            isDisabled={!isEditable}
            label={t('Place of Issue')}
            onSelectionChange={setPlace}
            placeholder={t('Place of Issue')}
            options={countries.filter((c) => c.id === location)}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
          <div
            className={classnames(
              'grid gap-2',
              frontPath ? 'grid-rows-[auto_32px]' : 'grid-rows-1'
            )}
          >
            <FileDropZone
              filePath={frontPath}
              isRequired={!frontPath}
              isDisabled={!isEditable}
              id="resudenceIdFrontSide"
              name="resudenceIdFrontSide"
              onChange={onFileFrontChange}
              classname="grid grid-rows-[32px_auto]"
              label={t('Residence ID Front Picture')}
              accept={getUserAcceptableDocumentsType()}
            />
            {frontPath ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={routes.bucketUrlClient + frontPath}
                className="flex items-center gap-2 font-normal text-primary underline"
              >
                <FaRegFilePdf className="text-secondary" />
                {t('View the existing resudence ID')}
              </a>
            ) : null}
          </div>
          <div
            className={classnames(
              'grid gap-2',
              backPath ? 'grid-rows-[auto_32px]' : 'grid-rows-1'
            )}
          >
            <FileDropZone
              filePath={backPath}
              isRequired={!backPath}
              isDisabled={!isEditable}
              id="resudenceIdBackSide"
              name="resudenceIdBackSide"
              onChange={onFileBackChange}
              classname="grid grid-rows-[32px_auto]"
              label={t('Residence ID Back Picture')}
              accept={getUserAcceptableDocumentsType()}
            />
            {backPath ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={routes.bucketUrlClient + backPath}
                className="flex items-center gap-2 font-normal text-primary underline"
              >
                <FaRegFilePdf className="text-secondary" />
                {t('View the existing resudence ID')}
              </a>
            ) : null}
          </div>
        </div>
      </div>

      <Button
        type="submit"
        theme="primary"
        isPending={isProfileUpdating}
        isDisabled={isProfileUpdating}
        className={classnames(
          'mx-auto block overflow-hidden',
          isEditable ? '!h-10 !opacity-100' : '!h-0 !opacity-0'
        )}
      >
        {t('Update Residence ID Information')}
      </Button>
    </Form>
  )
}

export default ResidenceIdForm
