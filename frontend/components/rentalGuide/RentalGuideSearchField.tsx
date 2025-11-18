'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import { classnames } from '@/futils'
import InputField from '@/components/common/InputField'
import { type RentalGuideData } from '@/model/CmsModel'
import RentalGuideWidget from '@/components/rentalGuide/RentalGuideWidget'

interface RentalGuideSearchFieldProps {
  rentalGuides: RentalGuideData[]
  isPending?: boolean
}

const RentalGuideSearchField = ({
  rentalGuides,
  isPending,
}: RentalGuideSearchFieldProps) => {
  const t = useTranslations()

  const [search, setSearch] = useState('')
  const [isInSearch, setIsInSearch] = useState(false)
  const [inputFocused, setInputFocused] = useState(false)

  const onBlur = () => {
    setTimeout(() => {
      setInputFocused(false)
    }, 100)
  }

  useEffect(() => {
    const activeRentalGuides = rentalGuides.filter((rentalGuide) =>
      (
        rentalGuide.title.toLowerCase() ||
        rentalGuide.subtitle?.toLowerCase() ||
        rentalGuide.content?.toLowerCase()
      )?.includes(search.toLowerCase())
    )

    setIsInSearch(!!activeRentalGuides.length)
  }, [search, rentalGuides])

  return (
    <div className="relative">
      <InputField
        onBlur={onBlur}
        onChange={setSearch}
        isDisabled={isPending}
        name="rentalGuideSearch"
        aria-label="Rental Guides Search"
        placeholder={`${t('Search')}...`}
        onFocus={() => setInputFocused(true)}
      />

      <div
        data-lenis-prevent
        className={classnames(
          'absolute mt-1 space-y-4 overflow-auto rounded-2xl bg-white px-4 shadow-lg shadow-primary/20 duration-300',
          inputFocused && isInSearch ? 'max-h-[420px] py-4' : 'max-h-0 py-0'
        )}
      >
        {rentalGuides.map((rentalGuide) => {
          const inSearch = (
            rentalGuide.title.toLowerCase() ||
            rentalGuide.subtitle?.toLowerCase() ||
            rentalGuide.content?.toLowerCase()
          )?.includes(search.toLowerCase())

          return (
            <RentalGuideWidget
              key={rentalGuide.id}
              className={inSearch ? 'h-[84px]' : '!mt-0 h-0'}
              {...rentalGuide}
            />
          )
        })}
      </div>
    </div>
  )
}

export default RentalGuideSearchField
