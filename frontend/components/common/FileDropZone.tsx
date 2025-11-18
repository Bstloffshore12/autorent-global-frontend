import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Label } from 'react-aria-components'
import { type ChangeEvent, useState } from 'react'
import { IoCloudUploadOutline } from 'react-icons/io5'

import routes from '@/routes'
import { classnames } from '@/futils'

interface FileDropZone {
  id: string
  name: string
  label?: string
  accept?: string
  filePath?: string
  classname?: string
  isRequired?: boolean
  isDisabled?: boolean
  onChange: (currentTarget: EventTarget & HTMLInputElement) => void
}

const FileDropZone = ({
  id,
  name,
  label,
  accept,
  filePath,
  onChange,
  classname,
  isRequired,
  isDisabled,
}: FileDropZone) => {
  const t = useTranslations()

  const [value, setFileValue] = useState('')
  const [fileUrl, setFileUrl] = useState('')
  const [fileName, setFileName] = useState('')
  const [isInvalid, setIsInvalid] = useState(false)

  const handleFileChange = ({
    currentTarget,
  }: ChangeEvent<HTMLInputElement>) => {
    const isValid = !currentTarget.checkValidity()

    // set file name and value
    setFileValue(currentTarget.value)
    setFileName(currentTarget.files?.[0]?.name || '')
    const file = currentTarget.files?.[0]
      ? URL.createObjectURL(currentTarget.files[0])
      : ''

    setFileUrl(file)

    // check if file is valid
    setIsInvalid(isValid)

    onChange(currentTarget)
  }

  const onInvalid = () => {
    setIsInvalid(true)
  }

  return (
    <div className={classname}>
      {label && <Label className="mb-2 block font-normal">{label}</Label>}
      <div
        className={classnames(
          'relative overflow-hidden rounded-lg border-2 border-dotted font-normal',
          isInvalid
            ? 'border-red-400 text-red-500'
            : 'border-neutral-200 text-neutral-500'
        )}
      >
        {filePath && filePath.toLowerCase().endsWith('.pdf') ? (
          accept?.includes('pdf') && (
            <iframe
              title={id}
              width="100%"
              height="300"
              src={fileUrl || `${routes.bucketUrlClient}${filePath}`}
              className={classnames(
                'absolute h-full w-full object-cover duration-200',
                fileUrl || filePath ? 'opacity-5' : 'opacity-0',
                isDisabled && (filePath || fileUrl) && '!opacity-100'
              )}
            >
              <p className="text-center text-xs text-neutral-500">
                {t('PDF preview is not available')}.
              </p>
            </iframe>
          )
        ) : (
          <Image
            alt={id}
            title={id}
            width={600}
            height={600}
            className={classnames(
              'absolute h-full w-full object-cover duration-200',
              fileUrl || filePath ? 'opacity-5' : 'opacity-0',
              isDisabled && (filePath || fileUrl) && '!opacity-100'
            )}
            src={
              fileUrl || filePath
                ? fileUrl || `${routes.bucketUrlClient}${filePath}`
                : '/assets/images/placeholder.svg'
            }
          />
        )}

        <label
          htmlFor={id}
          className="flex h-full min-h-40 items-center justify-center px-4"
        >
          <div
            className={classnames(
              'flex flex-col flex-wrap items-center justify-center gap-5 text-sm font-normal duration-200 md:flex-row',
              isDisabled && filePath ? 'opacity-0' : 'opacity-100'
            )}
          >
            <IoCloudUploadOutline size={40} />
            <div className="text-center">
              {fileName ? (
                <p>{fileName}</p>
              ) : (
                <div>
                  <p>{t('Click to upload or drag and drop')}</p>
                  <p>{accept?.replaceAll('.', '')}</p>
                </div>
              )}
            </div>
          </div>
          <input
            id={id}
            type="file"
            name={name}
            value={value}
            accept={accept}
            disabled={isDisabled}
            required={isRequired}
            onInvalid={onInvalid}
            onChange={handleFileChange}
            className="absolute z-50 opacity-0"
          />
        </label>
      </div>
    </div>
  )
}

export default FileDropZone
