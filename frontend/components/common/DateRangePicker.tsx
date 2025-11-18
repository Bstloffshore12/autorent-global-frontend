'use client'

import {
  Label,
  Group,
  Dialog,
  Button,
  Heading,
  Popover,
  DateInput,
  DateSegment,
  CalendarCell,
  CalendarGrid,
  RangeCalendar,
  DateRangePicker as ArialDateRangePicker,
} from 'react-aria-components'
import { BiChevronDown, BiChevronLeft, BiChevronRight } from 'react-icons/bi'

import { classnames } from '@/futils'

const DateRangePicker = () => {
  return (
    <ArialDateRangePicker>
      <Label>Trip dates</Label>
      <Group className="flex gap-2">
        <DateInput className="flex" slot="start">
          {(segment) => <DateSegment segment={segment} />}
        </DateInput>
        <span aria-hidden="true">-</span>
        <DateInput className="flex" slot="end">
          {(segment) => <DateSegment segment={segment} />}
        </DateInput>
        <Button>
          <BiChevronDown />
        </Button>
      </Group>
      <Popover className="rounded-lg border border-primary-light bg-white/90 p-4 shadow-lg backdrop-blur">
        <Dialog>
          <RangeCalendar>
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
                    isSelected,
                    isSelectionEnd,
                    isSelectionStart,
                  }) =>
                    classnames(
                      isSelected ? 'text-datk bg-primary-light' : '',
                      isSelectionEnd && 'rounded-e !bg-primary text-white',
                      isSelectionStart && 'rounded-s !bg-primary text-white',
                      'p-1 text-center'
                    )
                  }
                  date={date}
                />
              )}
            </CalendarGrid>
          </RangeCalendar>
        </Dialog>
      </Popover>
    </ArialDateRangePicker>
  )
}

export default DateRangePicker
