'use client'

import { useMemo } from 'react'
import { BsArrowRight } from 'react-icons/bs'
import { Tab, TabList, TabPanel, Tabs } from 'react-aria-components'

import cars from '@/sampleData/cars'
import { classnames } from '@/futils'
import Button from '@/components/common/Button'
// import CarListCard from '@/components/CarListCard'
import Container from '@/components/common/Container'
import SectionHeading from '@/components/common/SectionHeading'

const ListingTabsSection = () => {
  const carByBodyType = useMemo(
    () => Object.groupBy(cars(), ({ bodyType }) => bodyType),
    []
  )
  return (
    <Container>
      <div className="items-center justify-between gap-4 space-y-2 md:flex">
        <div className="space-y-2">
          <SectionHeading>
            Find your dream car easily and quickly
          </SectionHeading>
          <p>
            Browse thousands of new and used cars from all reputable brands on
            the market.
          </p>
        </div>
        <Button theme="primary">
          View All <BsArrowRight />
        </Button>
      </div>

      <Tabs className="mt-6">
        <TabList
          aria-label="Car Listing"
          className="flex gap-4 border-b border-neutral-200"
        >
          {Object.keys(carByBodyType).map((bodyType) => (
            <Tab
              id={bodyType}
              key={bodyType}
              className={({ isSelected }) =>
                classnames(
                  'cursor-pointer border-b-2 border-transparent pb-4 font-normal text-black',
                  isSelected ? '!border-primary' : 'border-primary'
                )
              }
            >
              {bodyType}
            </Tab>
          ))}
        </TabList>
        <div>
          {Object.keys(carByBodyType).map((bodyType) => (
            <TabPanel
              id={bodyType}
              key={bodyType}
              className="my-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {/* {carByBodyType[bodyType]?.map((car) => (
                <CarListCard key={car.id} {...car} />
              ))} */}
            </TabPanel>
          ))}
        </div>
      </Tabs>
    </Container>
  )
}

export default ListingTabsSection
