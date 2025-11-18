export interface Car {
  id: number
  bodyType: string
  isFeatured: boolean
  year: number
  name: string
  km: string
  fuelType: string
  transmission: string
  price: {
    day: {
      old: string
      new: string
    }
    week: {
      old: string
      new: string
    }
    month: {
      old: string
      new: string
    }
  }
  oldPrice?: string
}

const cars = (): Car[] => [
  {
    id: 1,
    bodyType: 'Crossover',
    isFeatured: true,
    year: 2024,
    name: 'BMW i7 2022',
    km: '2204',
    fuelType: 'Petrol',
    transmission: 'Automatic',

    price: {
      day: { old: '171', new: '111' },
      week: { old: '1100', new: '715' },
      month: { old: '2420', new: '1573' },
    },
  },
  {
    id: 2,
    bodyType: 'Crossover',
    isFeatured: true,
    year: 2022,
    name: 'Ford Territory Titanium X',
    km: '22511',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    price: {
      day: { old: '171', new: '111' },
      week: { old: '1100', new: '715' },
      month: { old: '2420', new: '1573' },
    },
  },
  {
    id: 3,
    bodyType: 'SUV',
    isFeatured: true,
    year: 2022,
    name: 'Kia Carnival MPV',
    km: '773231',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    price: {
      day: { old: '171', new: '111' },
      week: { old: '1100', new: '715' },
      month: { old: '2420', new: '1573' },
    },
  },
  {
    id: 4,
    bodyType: 'Crossover',
    isFeatured: false,
    year: 2020,
    name: 'Range Rover Evoque',
    km: '234231',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    price: {
      day: { old: '171', new: '111' },
      week: { old: '1100', new: '715' },
      month: { old: '2420', new: '1573' },
    },
  },
  {
    id: 5,
    bodyType: 'Crossover',
    isFeatured: true,
    year: 2022,
    name: 'Mercedes-Benz C-Class 2024',
    km: '2521',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    price: {
      day: { old: '171', new: '111' },
      week: { old: '1100', new: '715' },
      month: { old: '2420', new: '1573' },
    },
  },
  {
    id: 6,
    bodyType: 'Minivan',
    isFeatured: true,
    year: 2022,
    name: 'Isuzu D-Max',
    km: '222441',
    fuelType: 'Diesel',
    transmission: 'Manual',
    price: {
      day: { old: '171', new: '111' },
      week: { old: '1100', new: '715' },
      month: { old: '2420', new: '1573' },
    },
  },
  {
    id: 7,
    bodyType: 'Sedan',
    isFeatured: false,
    year: 2024,
    name: 'Nissan Rogue 2024',
    km: '42214',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    price: {
      day: { old: '171', new: '111' },
      week: { old: '1100', new: '715' },
      month: { old: '2420', new: '1573' },
    },
  },
  {
    id: 8,
    bodyType: 'Minivan',
    isFeatured: false,
    year: 2017,
    name: 'Audi A4 2017',
    km: '90642',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    price: {
      day: { old: '171', new: '111' },
      week: { old: '1100', new: '715' },
      month: { old: '2420', new: '1573' },
    },
  },
]

export default cars
