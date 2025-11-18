'use client'

import { toast } from 'react-toastify'
import { useTranslations } from 'next-intl'
import { FaRegFilePdf } from 'react-icons/fa6'
import { BiSolidEditAlt } from 'react-icons/bi'
import { useState, type FormEvent } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Form, type Key } from 'react-aria-components'
import { now, type ZonedDateTime } from '@internationalized/date'

import {
  classnames,
  toastErrors,
  compareDate,
  toZonedDateTime,
  dateToApiAcceptableFormat,
  getUserAcceptableDocumentsType,
} from '@/futils'
import routes from '@/routes'
import useUser from '@/hooks/useUser'
import Button from '@/components/common/Button'
import { type UserData } from '@/model/UserModel'
import InputField from '@/components/common/InputField'
import FileDropZone from '@/components/common/FileDropZone'
import SectionHeading from '@/components/common/SectionHeading'
import DateTimePicker from '@/components/common/DateTimePicker'
import Dropdown, { type Option } from '@/components/common/Select'
import postProfileDetailsAction from '@/actions/user/postProfileDetailsAction'
import ProfileFormStatusIndecator from '@/components/user/ProfileFormStatusIndecator'

type LicenseFormProps = {
  countries: Option[]
  userProfile: UserData
}

const LicenseForm = ({ countries, userProfile }: LicenseFormProps) => {
  const t = useTranslations()

  const { getProfile } = useUser()

  const [isEditable, setIsEditable] = useState(false)

  const [expiry, setExpiry] = useState<ZonedDateTime | null>(
    toZonedDateTime(userProfile.license_expiry)
  )
  const [fileBack, setFileBack] = useState<File | null>(null)
  const [fileFront, setFileFront] = useState<File | null>(null)
  const [number, setNumber] = useState(userProfile?.license_number || '')
  const [place, setPlace] = useState<Key>(userProfile.license_place || '')
  const [backPath, setBackPath] = useState(userProfile?.license_back?.path)
  const [frontPath, setFrontPath] = useState(userProfile?.license_front?.path)

  const preparePayload = () => {
    const license_expiry = expiry ? dateToApiAcceptableFormat(expiry) : ''

    const fields = {
      license_number: number || '',
      license_place: place?.toString() || '',
      license_expiry: license_expiry.split(' ')[0],
    }

    const files = new FormData()
    if (fileBack) files.append('license_back', fileBack)
    if (fileFront) files.append('license_front', fileFront)

    return { fields, files }
  }

  const onFileFrontChange = (fileTarget: EventTarget & HTMLInputElement) => {
    setFileFront(fileTarget.files?.[0] || null)
  }

  const onFileBackChange = (fileTarget: EventTarget & HTMLInputElement) => {
    setFileBack(fileTarget.files?.[0] || null)
  }

  const checkIfValidDate = (value: ZonedDateTime) =>
    compareDate({ ending: now('Etc/GMT-4'), starting: value }) <= 0

  const handleSetExpiry = (value: ZonedDateTime | null) => {
    if (value && checkIfValidDate(value)) setExpiry(value)
  }

  const updateProfileDetails = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const payload = preparePayload()
    const res = await postProfileDetailsAction(payload)

    if (res.success) {
      const data = await getProfile()

      if (data) {
        setIsEditable(false)
        setPlace(data.license_place)
        setNumber(data.license_number)
        setBackPath(data.license_back?.path)
        setFrontPath(data.license_front?.path)
        setExpiry(toZonedDateTime(data.license_expiry))
      }

      toast.success(res.message)
    } else toastErrors(res.errors)
  }

  const { mutate, isPending: isProfileUpdating } = useMutation({
    mutationFn: updateProfileDetails,
  })

  const isConpleted = !!(number && place && expiry && backPath && frontPath)

  return (
    <Form
      onSubmit={mutate}
      className="space-y-4 rounded-lg border border-primary-light p-6 shadow-md shadow-primary/10"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <SectionHeading className="!text-2xl">
            {t('License Information')}
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
            label={t('License Number')}
            placeholder={t('License Number')}
          />
          <DateTimePicker
            bordered
            isRequired
            value={expiry}
            granularity="day"
            isDisabled={!isEditable}
            onChange={handleSetExpiry}
            label={t('License Expiry')}
            minValue={now('Etc/GMT-4').add({ days: 1 })}
          />
          <Dropdown
            bordered
            isRequired
            options={countries}
            selectedKeys={place}
            isDisabled={!isEditable}
            label={t('Place of Issue')}
            onSelectionChange={setPlace}
            placeholder={t('Place of Issue')}
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
              id="licenseFrontSide"
              name="licenseFrontSide"
              isRequired={!frontPath}
              isDisabled={!isEditable}
              onChange={onFileFrontChange}
              label={t('License Front Picture')}
              classname="grid grid-rows-[32px_auto]"
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
                {t('View the existing license')}
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
              id="licenseBackSide"
              name="licenseBackSide"
              isRequired={!backPath}
              isDisabled={!isEditable}
              onChange={onFileBackChange}
              label={t('License Back Picture')}
              classname="grid grid-rows-[32px_auto]"
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
                {t('View the existing license')}
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
        {t('Update License Information')}
      </Button>
    </Form>
  )
}

export default LicenseForm
