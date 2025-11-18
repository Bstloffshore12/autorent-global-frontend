'use client'

import {
  Group,
  Label,
  Dialog,
  Button,
  Heading,
  Popover,
  Calendar,
  DateInput,
  DatePicker,
  DateSegment,
  CalendarCell,
  CalendarGrid,
} from 'react-aria-components'
import { type Granularity } from '@react-types/datepicker'
import { type DateValue, type ZonedDateTime } from '@internationalized/date'
import { BiChevronDown, BiChevronLeft, BiChevronRight } from 'react-icons/bi'

import { classnames } from '@/futils'
import FieldError from '@/components/common/FieldError'

type DateTimePickerProps = {
  label?: string
  bordered?: boolean
  isRequired?: boolean
  isDisabled?: boolean
  errorMessage?: string
  size?: 'big' | 'small'
  portalContainer?: Element
  popoverClassName?: string
  inputContainerClass?: string
  defaultValue?: ZonedDateTime
  granularity?: Granularity | undefined
  value: ZonedDateTime | null | undefined
  minValue?: DateValue | null | undefined
  onChange?: ((value: ZonedDateTime | null) => void) | undefined
}

const getSize = (size: DateTimePickerProps['size']) => {
  if (size === 'small') return 'h-9 text-sm'
  if (size === 'big') return 'h-12 text-base'

  return 'h-10 text-base'
}

const DateTimePicker = ({
  size,
  label,
  value,
  bordered,
  onChange,
  minValue,
  isRequired,
  isDisabled,
  granularity,
  errorMessage,
  defaultValue,
  portalContainer,
  popoverClassName,
  inputContainerClass,
}: DateTimePickerProps) => {
  return (
    <DatePicker
      hideTimeZone
      value={value}
      minValue={minValue}
      onChange={onChange}
      isRequired={isRequired}
      isDisabled={isDisabled}
      aria-label="Date Picker"
      granularity={granularity}
      defaultValue={defaultValue}
      className={({ isInvalid }) =>
        classnames(isInvalid && 'inValid group font-normal')
      }
    >
      {label && <Label className="mb-2 block">{label}</Label>}
      <Group
        className={classnames(
          'flex w-full items-center justify-between gap-2 duration-300',
          'group-[.inValid]:border-red-400 group-[.inValid]:ring-1 group-[.inValid]:ring-red-300',
          bordered && 'h-12 rounded-lg border border-neutral-200 px-4',
          getSize(size),
          isDisabled && 'bg-neutral-100',
          inputContainerClass
        )}
      >
        <DateInput
          className={classnames(
            'flex gap-0.5 font-normal',
            !value && 'text-neutral-500',
            isDisabled && 'bg-neutral-100'
          )}
        >
          {(segment) => <DateSegment segment={segment} />}
        </DateInput>
        <Button className="flex flex-1 justify-end">
          <BiChevronDown />
        </Button>
      </Group>
      <Popover
        UNSTABLE_portalContainer={portalContainer}
        className={({ defaultClassName }) =>
          classnames(
            defaultClassName,
            'overflow-auto rounded-lg border border-primary-light bg-white p-4 shadow-lg shadow-primary/20',
            popoverClassName
          )
        }
      >
        <Dialog>
          <Calendar>
            <header className="mb-3 flex items-center justify-between gap-2">
              <Button slot="previous" className="text-xl">
                <BiChevronLeft />
              </Button>
              <Heading />
              <Button slot="next" className="text-xl">
                <BiChevronRight />
              </Button>
            </header>
            <CalendarGrid className="w-full">
              {(date) => (
                <CalendarCell
                  className={({
                    isHovered,
                    isSelected,
                    isDisabled: dateIsDisabled,
                  }) =>
                    classnames(
                      'flex size-8 items-center justify-center rounded-lg text-center duration-150',
                      isHovered ? 'bg-primary-light text-primary' : '',
                      dateIsDisabled && 'text-neutral-400',
                      isSelected && '!bg-primary !text-white'
                    )
                  }
                  date={date}
                />
              )}
            </CalendarGrid>
          </Calendar>
        </Dialog>
      </Popover>
      <FieldError message={errorMessage} />
    </DatePicker>
  )
}

export default DateTimePicker
