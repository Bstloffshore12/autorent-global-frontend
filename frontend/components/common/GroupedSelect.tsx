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
import { type ReactNode } from 'react'
import { BiChevronDown } from 'react-icons/bi'

import { classnames } from '@/futils'
import LoadingSpinner from '@/icons/LoadingSpinner'
import FieldError from '@/components/common/FieldError'

export type GroupedOption = {
  id: number | string
  title: string | ReactNode
  type: string
}

interface GroupedSelect {
  label?: string
  options: GroupedOption[]
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

const getSize = (size: GroupedSelect['size']) => {
  if (size === 'small') return 'h-9 text-sm'
  if (size === 'big') return 'h-12 text-base'

  return 'h-10 text-base'
}

const GroupedDropdown = ({
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
}: GroupedSelect) => {
  // Group options by type
  const groupedOptions = options.reduce(
    (acc, option) => {
      if (!acc[option.type]) {
        acc[option.type] = []
      }
      acc[option.type].push(option)
      return acc
    },
    {} as Record<string, GroupedOption[]>
  )

  // Create flat list with special separator items for headers
  const flatOptions: Array<{
    id: string
    title: string
    isHeader: boolean
    type?: string
  }> = []

  Object.entries(groupedOptions).forEach(([type, typeOptions]) => {
    // Add header
    flatOptions.push({
      id: `header-${type}`,
      title: type.charAt(0).toUpperCase() + type.slice(1),
      isHeader: true,
      type,
    })

    // Add options
    typeOptions.forEach((option) => {
      flatOptions.push({
        id: option.id.toString(),
        title: option.title as string,
        isHeader: false,
        type: option.type,
      })
    })
  })

  const handleSelectionChange = (key: Key) => {
    // Only allow selection of non-header items
    if (typeof key === 'string' && !key.startsWith('header-')) {
      onSelectionChange?.(key)
    }
  }

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
        onSelectionChange={handleSelectionChange}
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
          <ListBox
            data-lenis-prevent
            className={({ defaultClassName }) =>
              classnames(defaultClassName, 'max-h-96 min-w-14 duration-300')
            }
          >
            {flatOptions.map(({ id, title, isHeader }) => (
              <ListBoxItem
                id={id}
                key={id}
                className={({ isSelected }) =>
                  classnames(
                    isHeader
                      ? 'cursor-default border-b border-primary-light/30 bg-primary-light/20 px-4 py-2 text-sm font-semibold text-primary'
                      : 'min-w-40 cursor-pointer px-4 py-2 capitalize duration-100 hover:bg-primary-light',
                    !isHeader &&
                      isSelected &&
                      'bg-primary text-white hover:!bg-primary hover:!text-white',
                    !isHeader && getSize(size)
                  )
                }
                isDisabled={isHeader}
              >
                {title}
              </ListBoxItem>
            ))}
          </ListBox>
        </Popover>
      </AriaSelect>

      {errorMessage && <FieldError message={errorMessage} />}
    </div>
  )
}

export default GroupedDropdown
