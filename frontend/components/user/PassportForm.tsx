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
  compareDate,
  toastErrors,
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

type PassportFormProps = {
  className?: string
  countries: Option[]
  userProfile: UserData
}

const PassportForm = ({
  countries,
  className,
  userProfile,
}: PassportFormProps) => {
  const t = useTranslations()

  const { getProfile } = useUser()

  const [isEditable, setIsEditable] = useState(false)

  const [expiry, setExpiry] = useState<ZonedDateTime | null>(
    toZonedDateTime(userProfile.passport_expiry)
  )
  const [file, setFile] = useState<File | null>(null)
  const [path, setPath] = useState(userProfile?.passport?.path)
  const [number, setNumber] = useState(userProfile?.passport_number || '')
  const [place, setPlace] = useState<Key>(userProfile.passport_place || '')

  const preparePayload = () => {
    const passport_expiry = expiry ? dateToApiAcceptableFormat(expiry) : ''

    const fields = {
      passport_number: number || '',
      passport_place: place?.toString() || '',
      passport_expiry: passport_expiry.split(' ')[0],
    }

    const files = new FormData()
    if (file) files.append('passport_upload', file)

    return { fields, files }
  }

  const onFileChange = (fileTarget: EventTarget & HTMLInputElement) => {
    setFile(fileTarget.files?.[0] || null)
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
        setPath(data.passport?.path)
        setPlace(data.passport_place)
        setNumber(data.passport_number)
        setExpiry(toZonedDateTime(data.passport_expiry))
      }

      toast.success(res.message)
    } else toastErrors(res.errors)
  }

  const { mutate, isPending: isProfileUpdating } = useMutation({
    mutationFn: updateProfileDetails,
  })

  const isConpleted = !!(number && place && expiry && path)

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
            {t('Passport Information')}
          </SectionHeading>
          <ProfileFormStatusIndecator
            isVisible={isEditable}
            isConpleted={isConpleted}
          />
        </div>

        <Button
          className={classnames(
            '!min-w-0 overflow-hidden',
            isEditable ? 'w-36' : 'w-24'
          )}
          size="small"
          theme="primaryLight"
          onPress={() => setIsEditable(!isEditable)}
        >
          <BiSolidEditAlt /> {isEditable ? t('Cancel Edit') : t('Edit')}
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="grid gap-4">
          <InputField
            isRequired
            value={number}
            onChange={setNumber}
            isDisabled={!isEditable}
            label={t('Passport Number')}
            placeholder={t('Passport Number')}
          />
          <DateTimePicker
            bordered
            isRequired
            value={expiry}
            granularity="day"
            isDisabled={!isEditable}
            onChange={handleSetExpiry}
            label={t('Passport Expiry')}
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

        <div
          className={classnames(
            'grid gap-2',
            path ? 'grid-rows-[auto_32px]' : 'grid-rows-1'
          )}
        >
          <FileDropZone
            id="passport"
            name="passport"
            filePath={path}
            isRequired={!path}
            onChange={onFileChange}
            isDisabled={!isEditable}
            label={t('Passport Picture')}
            classname="grid  grid-rows-[32px_auto]"
            accept={getUserAcceptableDocumentsType()}
          />
          {path ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={routes.bucketUrlClient + path}
              className="flex items-center gap-2 font-normal text-primary underline"
            >
              <FaRegFilePdf className="text-secondary" />
              {t('View the existing passport')}
            </a>
          ) : null}
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
        {t('Update Passport Information')}
      </Button>
    </Form>
  )
}

export default PassportForm
