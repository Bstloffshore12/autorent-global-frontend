'use client'

import {
  Label,
  Button,
  Popover,
  ListBox,
  SelectValue,
  ListBoxItem,
  Select as AriaSelect,
  type Key,
} from 'react-aria-components'
import { useState } from 'react'
import { type ReactNode } from 'react'
import { BiChevronDown } from 'react-icons/bi'

import { classnames } from '@/futils'
import LoadingSpinner from '@/icons/LoadingSpinner'
import FieldError from '@/components/common/FieldError'

export type Option = {
  id: number | string
  title: string | ReactNode
}

interface Select {
  label?: string
  options: Option[]
  selectedKeys?: Key
  bordered?: boolean
  className?: string
  isLoading?: boolean
  isRequired?: boolean
  isDisabled?: boolean
  placeholder?: string
  errorMessage?: string
  size?: 'big' | 'small'
  buttonClassName?: string
  popoverClassName?: string
  onSelectionChange?: (keys: Key) => void
}

const getSize = (size: Select['size']) => {
  if (size === 'small') return 'h-9 text-sm'
  if (size === 'big') return 'h-12 text-base'

  return 'h-10 text-base'
}

const Dropdown = ({
  size,
  label,
  options,
  bordered,
  className,
  isLoading,
  isRequired,
  isDisabled,
  placeholder,
  errorMessage,
  buttonClassName,
  popoverClassName,
  selectedKeys = '',
  onSelectionChange,
}: Select) => {
  const [searchTerm, setSearchTerm] = useState('')
  const filteredOptions = options.filter(({ title }) =>
    title?.toString().toLowerCase().includes(searchTerm.toLowerCase())
  )
  return (
    <div>
      {label && <Label className="mb-2 block font-normal">{label}</Label>}

      <AriaSelect
        isDisabled={isDisabled}
        selectedKey={selectedKeys}
        className={({ isInvalid }) =>
          classnames(isInvalid && 'inValid group', className)
        }
        isRequired={isRequired}
        placeholder={placeholder}
        onSelectionChange={onSelectionChange}
        aria-label={selectedKeys.toString() || placeholder}
      >
        <Button
          isDisabled={isDisabled}
          className={classnames(
            'flex w-full items-center justify-between gap-2 font-normal duration-300',
            bordered && 'h-12 rounded-lg border border-neutral-200 px-4 py-2',
            'group-[.inValid]:border-red-400 group-[.inValid]:ring-1 group-[.inValid]:ring-red-300',
            isDisabled && 'bg-neutral-100',
            !selectedKeys && 'text-neutral-500',
            getSize(size),
            buttonClassName
          )}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <LoadingSpinner className="w-4" /> Loading...
            </span>
          ) : (
            <SelectValue />
          )}
          <BiChevronDown />
        </Button>
        <Popover
          className={({ defaultClassName }) =>
            classnames(
              defaultClassName,
              'overflow-auto rounded-lg border border-primary-light bg-white shadow-lg shadow-primary/20',
              popoverClassName
            )
          }
        >
          {/* 🔍 Search Input */}
          <div className="border-b px-4 py-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search country..."
              className="w-full rounded-md border px-3 py-1 text-sm focus:outline-none focus:ring focus:ring-primary/50"
            />
          </div>
          <ListBox
            data-lenis-prevent
            className={({ defaultClassName }) =>
              classnames(defaultClassName, 'max-h-96 min-w-14 duration-300')
            }
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map(({ id, title }) => (
                <ListBoxItem
                  id={id}
                  key={id}
                  className={({ isSelected }) =>
                    classnames(
                      'min-w-40 cursor-pointer px-4 py-2 capitalize duration-100 hover:bg-primary-light',
                      isSelected &&
                        'bg-primary text-white hover:!bg-primary hover:!text-white',
                      getSize(size)
                    )
                  }
                >
                  {title}
                </ListBoxItem>
              ))
            ) : (
              <ListBoxItem
                id="no-match"
                isDisabled
                className="px-4 py-2 italic text-gray-400"
              >
                No match found
              </ListBoxItem>
            )}
          </ListBox>
        </Popover>
        <FieldError message={errorMessage} />
      </AriaSelect>
    </div>
  )
}

export default Dropdown
