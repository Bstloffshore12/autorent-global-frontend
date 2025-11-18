'use client'

import {
  Input,
  Label,
  TextArea,
  TextField,
  type TextFieldProps,
} from 'react-aria-components'

import { classnames } from '@/futils'
import FieldError from '@/components/common/FieldError'

interface InputField extends TextFieldProps {
  rows?: number
  label?: string
  placeholder: string
  isDisabled?: boolean
  isTextAria?: boolean
  errorMessage?: string
  size?: 'big' | 'small'
  labelClassName?: string
  inputClassName?: string
}

const getSize = (size: InputField['size']) => {
  if (size === 'small') return 'h-9 text-sm'
  if (size === 'big') return 'h-12 text-base'

  return 'h-10 text-base'
}

const InputField = ({
  size,
  rows,
  label,
  isTextAria,
  isDisabled,
  placeholder,
  errorMessage,
  labelClassName,
  inputClassName,
  ...props
}: InputField) => {
  return (
    <TextField {...props} isDisabled={isDisabled}>
      {label && (
        <Label className={classnames('mb-2 block font-normal', labelClassName)}>
          {label}
        </Label>
      )}

      {isTextAria ? (
        <TextArea
          rows={rows}
          placeholder={placeholder}
          className={({ isInvalid, isFocused }) =>
            classnames(
              'block w-full rounded-lg border border-neutral-200 px-4 py-2 font-normal duration-300 placeholder:text-neutral-500',
              isFocused && 'border-primary ring-1 ring-blue-300',
              isInvalid && '!border-red-400 ring-1 ring-red-300',
              isDisabled && 'bg-neutral-100',
              inputClassName
            )
          }
        />
      ) : (
        <Input
          placeholder={placeholder}
          className={({ isInvalid, isFocused }) =>
            classnames(
              'block h-12 w-full rounded-lg border border-neutral-200 px-4 py-2 font-normal duration-300 placeholder:text-neutral-500',
              isFocused && 'border-primary ring-1 ring-blue-300',
              isInvalid && '!border-red-400 ring-1 ring-red-300',
              isDisabled && 'bg-neutral-100',
              getSize(size),
              inputClassName
            )
          }
        />
      )}
      <FieldError message={errorMessage} />
    </TextField>
  )
}

export default InputField
