'use client'

import ListingSideFilter2, {
  type ListingSideFilter2Props,
} from '@/components/carListing/ListingSideFilter2'
import Drawer from '@/components/common/Modal'
import { useAppStore } from '@/store/provider'

const ListingFilterDrawer = ({
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
  const { isListingFilterDrawerOpen, setIsListingFilterDrawerOpen } =
    useAppStore((state) => state)

  const closeModal = () => setIsListingFilterDrawerOpen(false)

  return (
    <Drawer
      drawer
      setOpen={closeModal}
      isOpen={isListingFilterDrawerOpen}
      className="min-w-72 max-w-40 !p-0"
    >
      <aside className="h-fit p-4">
        <ListingSideFilter2
          makes={makes}
          doors={doors}
          models={models}
          fuelTypes={fuelTypes}
          bodyTypes={bodyTypes}
          categories={categories}
          priceRange={priceRange}
          transmissions={transmissions}
          selectedOptions={selectedOptions}
        />
      </aside>
    </Drawer>
  )
}

export default ListingFilterDrawer
