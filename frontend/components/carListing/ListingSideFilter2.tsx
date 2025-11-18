'use client'

import { BiReset } from 'react-icons/bi'
import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useState } from 'react'

import type {
  MakeData,
  DoorData,
  ModelData,
  BodyTypeData,
  CategoryData,
  FuelTypesData,
  PriceRangeData,
  TransmissionData,
} from '@/model/CarModel'
import { classnames } from '@/futils'
import { useAppStore } from '@/store/provider'
import Slider from '@/components/common/Slider'
import Button from '@/components/common/Button'
import Checkbox from '@/components/common/Checkbox'
import useQueryString from '@/hooks/useQueryString'

interface SelectedOptions {
  'make[]'?: string
  'door[]'?: string
  'model[]'?: string
  'bodyType[]'?: string
  'category[]'?: string
}

export interface ListingSideFilter2Props {
  makes: MakeData[]
  doors: DoorData[]
  bodyTypes: BodyTypeData[]
  fuelTypes: FuelTypesData[]
  priceRange: PriceRangeData
  categories: CategoryData[]
  selectedOptions: SelectedOptions
  transmissions: TransmissionData[]
  models: { [key: string]: ModelData[] }
}

interface SelectedFiltersProps {
  make: string[]
  door: string[]
  model: string[]
  cylinder: string[]
  bodyType: string[]
  fuelType: string[]
  category: string[]
  transmission: string[]
  priceRange: { min: number; max: number }
}

const ListingSideFilter2 = ({
  makes,
  doors,
  models,
  fuelTypes,
  bodyTypes,
  priceRange,
  categories,
  transmissions,
  selectedOptions,
}: ListingSideFilter2Props) => {
  const t = useTranslations()

  const {
    general: { currency },
    order: { pricingMode },
  } = useAppStore((state) => state)

  const initialSelectedFilterState: SelectedFiltersProps = {
    make: [],
    door: [],
    model: [],
    cylinder: [],
    bodyType: [],
    fuelType: [],
    category: [],
    transmission: [],
    priceRange: {
      min: Number(priceRange?.[pricingMode].min),
      max: Number(priceRange?.[pricingMode].max),
    },
  }

  const { setQueryString, setQueryStrings, resetQueryString } = useQueryString()

  const [selectedFilters, setSelectedFilters] = useState<SelectedFiltersProps>({
    cylinder: [],
    fuelType: [],
    transmission: [],
    make: selectedOptions['make[]'] ? [selectedOptions['make[]']] : [],
    door: selectedOptions['door[]'] ? [selectedOptions['door[]']] : [],
    model: selectedOptions['model[]'] ? [selectedOptions['model[]']] : [],
    category: selectedOptions['category[]']
      ? [selectedOptions['category[]']]
      : [],
    bodyType: selectedOptions['bodyType[]']
      ? [selectedOptions['bodyType[]']]
      : [],
    priceRange: {
      min: Number(priceRange[pricingMode].min),
      max: Number(priceRange[pricingMode].max),
    },
  })

  const resetFilter = () => {
    resetQueryString()
    setSelectedFilters(initialSelectedFilterState)
  }

  const updateQueryString = (filters: SelectedFiltersProps) => {
    const queryStringObject: { [name: string]: string[] } = {}

    Object.keys(filters).forEach((key) => {
      const typedKey = key as keyof SelectedFiltersProps
      const valuesOfKey = filters[typedKey]
      if (Array.isArray(valuesOfKey) && valuesOfKey.length)
        queryStringObject[key] = valuesOfKey
    })

    setQueryStrings(queryStringObject)
  }

  const updateFilter = (name: keyof SelectedFiltersProps, value: number) => {
    if (Array.isArray(selectedFilters[name])) {
      let values = selectedFilters[name]
      const stringValue = value.toString()
      if (values.includes(stringValue))
        values = values.filter((v) => v !== stringValue)
      else values = [...values, stringValue]
      const updatedSelectedFilters = { ...selectedFilters, [name]: values }
      setSelectedFilters(updatedSelectedFilters)
      updateQueryString(updatedSelectedFilters)
    }
  }

  const updateMakeFilter = (value: number) => {
    let selectedMakes = selectedFilters.make
    let selectedModels = selectedFilters.model
    const makeId = value.toString()
    if (selectedMakes.includes(makeId)) {
      selectedMakes = selectedMakes.filter((v) => v !== makeId)
      selectedModels = selectedModels.filter(
        (v) => !models[makeId].map(({ id }) => id).includes(Number(v))
      )
    } else selectedMakes = [...selectedMakes, makeId]
    const updatedSelectedFilters = {
      ...selectedFilters,
      make: selectedMakes,
      model: selectedModels,
    }
    setSelectedFilters(updatedSelectedFilters)
    updateQueryString(updatedSelectedFilters)
  }

  const updatePriceRange = (range: number | number[]) => {
    const [min, max] = Array.isArray(range) ? range : [range, range]
    setSelectedFilters((s) => ({ ...s, priceRange: { min, max } }))
  }

  const updatePriceRangeQueryString = useCallback(
    (range: number | number[]) => {
      const [min, max] = Array.isArray(range) ? range : [range, range]

      setQueryString([
        { name: 'min', value: min },
        { name: 'max', value: max },
      ])
    },
    [setQueryString]
  )

  // when price mode chagne
  useEffect(() => {
    // get min max according to new pricing mode
    const range = [
      Number(priceRange?.[pricingMode].min),
      Number(priceRange?.[pricingMode].max),
    ]

    updatePriceRange(range) // update state
    updatePriceRangeQueryString(range) // update query pricing query string
    setQueryString([{ name: 'priceType', value: pricingMode }]) // update price type query string
  }, [pricingMode])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xl font-medium text-black">{t('Filters')}</p>
        <Button
          size="small"
          onPress={resetFilter}
          theme="secondaryLight"
          className="!h-8 !px-2"
        >
          <BiReset size={18} /> {t('Reset')}
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <p className="mb-2">{t('Select Make')}</p>
          {makes
            .filter(({ car_count }) => car_count)
            .map(({ id, title }) => (
              <div key={id}>
                <Checkbox
                  label={title}
                  labelClassName="font-light"
                  onChange={() => updateMakeFilter(id)}
                  isSelected={selectedFilters.make.includes(id.toString())}
                />
                {models[id].map((model) => (
                  <Checkbox
                    key={model.id}
                    label={model.title}
                    labelClassName="font-light"
                    onChange={() => updateFilter('model', model.id)}
                    className={classnames(
                      'overflow-hidden pl-4 duration-300',
                      selectedFilters.make.includes(id.toString())
                        ? 'h-6'
                        : 'h-0'
                    )}
                    isSelected={selectedFilters.model.includes(
                      model.id.toString()
                    )}
                  />
                ))}
              </div>
            ))}
        </div>
        <div className="space-y-1">
          <p className="mb-2">{t('Category')}</p>
          {categories.map(({ id, title }) => (
            <Checkbox
              key={id}
              label={title}
              labelClassName="font-light"
              onChange={() => updateFilter('category', id)}
              isSelected={selectedFilters.category.includes(id.toString())}
            />
          ))}
        </div>
        <div className="space-y-1">
          <p className="mb-2">{t('Select Body Type')}</p>
          {bodyTypes.map(({ id, title }) => (
            <Checkbox
              key={id}
              label={title}
              labelClassName="font-light"
              onChange={() => updateFilter('bodyType', id)}
              isSelected={selectedFilters.bodyType.includes(id.toString())}
            />
          ))}
        </div>
        <div className="space-y-1">
          <p className="mb-2">{t('Select Fuel Type')}</p>
          {fuelTypes.map(({ id, title }) => (
            <Checkbox
              key={id}
              label={title}
              labelClassName="font-light"
              onChange={() => updateFilter('fuelType', id)}
              isSelected={selectedFilters.fuelType.includes(id.toString())}
            />
          ))}
        </div>
        <div className="space-y-1">
          <p className="mb-2">{t('Select Transmission')}</p>
          {transmissions.map(({ id, title }) => (
            <Checkbox
              key={id}
              label={title}
              labelClassName="font-light"
              onChange={() => updateFilter('transmission', id)}
              isSelected={selectedFilters.transmission.includes(id.toString())}
            />
          ))}
        </div>
        <div className="space-y-1">
          <p className="mb-2">{t('Select Doors')}</p>
          {doors.map(({ id, title }) => (
            <Checkbox
              key={id}
              labelClassName="font-light"
              label={`${title} ${t('Doors')}`}
              onChange={() => updateFilter('door', id)}
              isSelected={selectedFilters.door.includes(id.toString())}
            />
          ))}
        </div>
        <Slider
          label={`${t('Price')}: `}
          onChange={updatePriceRange}
          thumbLabels={['start', 'end']}
          className="font-normal text-black"
          prefix={`${currency.abbreviation} `}
          onChangeEnd={updatePriceRangeQueryString}
          minValue={Number(priceRange?.[pricingMode]?.min)}
          maxValue={Number(priceRange?.[pricingMode]?.max)}
          value={[
            selectedFilters.priceRange.min,
            selectedFilters.priceRange.max,
          ]}
        />
      </div>
    </div>
  )
}

export default ListingSideFilter2
