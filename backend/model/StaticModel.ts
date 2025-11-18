import { GiSelfLove } from 'react-icons/gi'
import { VscWorkspaceTrusted } from 'react-icons/vsc'
import { IoCalendarOutline, IoCarSportOutline } from 'react-icons/io5'

export interface GetLocationsResult {
  [key: string]: {
    id: string
    area: string
    email: string
    phone1: string
    phone2: string
    address: string
    iframeLink: string
  }[]
}

class StaticModel {
  static getDocumentRequirement = () => [
    {
      id: '1',
      image: 'https://autorent-me.com/uploads/pages/image-car-resident.jpg',
      title: 'For UAE Residents',
      points: [
        'UAE Driving License',
        'Emirates ID',
        'Credit Card',
        'Address Proof (Dewa Bill/Telephone Bill/Company Address)',
        '(Residential Visa may be acceptable)',
      ],
    },
    {
      id: '2',
      image: 'https://autorent-me.com/uploads/pages/image-car-tourist.jpg',
      title: 'For Tourists visiting the UAE',
      points: [
        'Passport',
        'Valid Visit Visa',
        'Credit Card',
        'Home Country Driving License',
        'International Driving Permit (IDP)',
      ],
    },
  ]

  static getAdvantages = () => [
    {
      id: '1',
      Icon: 'ai-outline-thunderbolt.svg',
      heading: 'On time, every time',
      para: 'Guaranteed pick-up and delivery at your doorstep for every booking. We work hard to make hiring a car incredibly simple and convenient.',
    },
    {
      id: '2',
      Icon: 'IoCarSportOutline.svg',
      heading: '13,000+ Vehicle Fleet',
      para: 'Continuous additions to our fleet ensure you get the most current model cars for a truly seamless and exciting driving experience.',
    },
    {
      id: '3',
      Icon: 'ai-outline-dollar.svg',
      heading: 'Flexi fares',
      para: 'There’s always a perfect fit! Get the most out of your budget by taking advantage of our low prices and extensive range of vehicles.',
    },
    {
      id: '4',
      Icon: 'gi-world.svg',
      heading: 'Travel without boundaries',
      para: 'All our cars have an all-GCC permit, allowing you to travel freely to several local and international destinations.',
    },
  ]

  static getFaqs = () => [
    {
      question:
        'Can a foreign national or traveller from a country outside UAE rent a car through Auto Rent?',
      answer:
        'Yes! As a foreign national if you hold an international driving license and if your travel-related documents are proper, you can rent a car from Auto Rent just like a UAE national.',
    },
    {
      question: "What are the driver's license requirements for car rentals?",
      answer:
        'If you are a resident in the UAE, you will need a valid UAE driving license. An international driving license can also be helpful for such occasions in case you are a tourist and staying on a visit visa. Moreover, if you possess a European or GCC (Gulf Cooperation Council) driving license, you may easily rent a car with it as far as you stay on the visit visa, which is a plus point to get a rental car in Dubai.',
    },
    {
      question: 'What is the age limit to rent a car?',
      answer:
        'Your age limit to hold a car for driving in Dubai must be 18 years old, but to rent a car you must be 21 years old, and your driving license must be 6 months older than 21 years old.',
    },
    {
      question: 'Does Auto Rent offer doorstep delivery of cars?',
      answer:
        'Currently, Auto Rent offers doorstep delivery of cars booked for lease for a minimal additional charge of AED 50.',
    },
    {
      question:
        'Can I extend my rental term or upgrade my vehicle in a lease plan?',
      answer:
        'Yes. You can extend your rental term provided you intimate Auto Rent before the end of the original term and complete the required documentation for the same. Also, in the lease plan Auto Rent allows you to opt for an upgrade of vehicle midway through the lease term. New payment terms will be applicable.',
    },
    {
      question:
        'Should one pay the whole amount upfront in case of opting for a vehicle lease?',
      answer:
        'No. Auto Rent has a provision for part payments and EMI options even when opting for a vehicle lease.',
    },
    {
      question: 'What are the rules for Salik and other fines?',
      answer:
        'All fines and penalties will be charged by the rent a car company to the driver’s final receipt. As for Salik, (Dubai toll collection system) will also get mentioned on the final billing deed. You can better gather data about Salik info, visit www.salik.gov.ae/en',
    },
    {
      question: 'Is there any type of insurance offered on the car?',
      answer:
        'Autorent offers a Collision Damage Waiver for all types of car rental. Hence, always reassure what is included in the company’s policy before you fix a deal. Furthermore, a point to keep in mind is if you are getting a car below the market rate then reconfirm; is insurance included or excluded? One must always opt for an insured rental car rather than paying any additional charges later in case of an accident or mishap.',
    },
  ]

  static getTrust = () => [
    {
      id: '1',
      Icon: IoCalendarOutline,
      heading: '15+ Years',
      para: 'Reliable services for nearly two decades.',
    },
    {
      id: '2',
      Icon: VscWorkspaceTrusted,
      heading: '32,000+ Bookings',
      para: 'End-to-end solutions from booking to delivery at doorstep.',
    },
    {
      id: '3',
      Icon: IoCarSportOutline,
      heading: '13,000+ Vehicles',
      para: 'Strongest fleet, largest network, and quickest service time after time.',
    },
    {
      id: '4',
      Icon: GiSelfLove,
      heading: '20,000+ Happy Customers',
      para: 'Available in more than 15 locations, 24x7 road assistance, cars available all the time.',
    },
  ]

  static getBlogs = () => [
    {
      id: '1',
      date: 'October 15, 2024',
      category: 'admin',
      tags: ['New car review'],
      title: 'Rivian Launches R1T Lease Program in Select States',
      description:
        "2024 BMW Skytop Concept Much like last year's Touring Coupe unveiled at the Concorso d'Eleganza Villa d'Este,",
    },
    {
      id: '2',
      date: 'October 15, 2024',
      category: 'admin',
      tags: ['Races and chases'],
      title: 'The 2024 Subaru WRX Is Now $2,230 More Expensive',
      description:
        "2024 BMW Skytop Concept Much like last year's Touring Coupe unveiled at the Concorso d'Eleganza Villa d'Este,",
    },
    {
      id: '3',
      date: 'October 15, 2024',
      category: 'admin',
      tags: ['Technology'],
      title: 'Maintenance Every Car to service Owner Should Know',
      description:
        "2024 BMW Skytop Concept Much like last year's Touring Coupe unveiled at the Concorso d'Eleganza Villa d'Este,",
    },
    {
      id: '4',
      date: 'October 15, 2024',
      category: 'admin',
      tags: ['Official'],
      title: 'Making the Right Choice for Your Vehicle Regular Car Servicing',
      description:
        "2024 BMW Skytop Concept Much like last year's Touring Coupe unveiled at the Concorso d'Eleganza Villa d'Este,",
    },
    {
      id: '5',
      date: 'October 8, 2024',
      category: 'admin',
      tags: ['Races and chases'],
      title: 'The BMW skytop could go into production after all',
      description:
        "2024 BMW Skytop Concept Much like last year's Touring Coupe unveiled at the Concorso d'Eleganza Villa d'Este,",
    },
    {
      id: '6',
      date: 'October 8, 2024',
      category: 'admin',
      tags: ['Recalls'],
      title: 'Toyota, Mazda, and Subaru join forces on new combustion engines',
      description:
        "2024 BMW Skytop Concept Much like last year's Touring Coupe unveiled at the Concorso d'Eleganza Villa d'Este,",
    },
    {
      id: '7',
      date: 'October 8, 2024',
      category: 'admin',
      tags: ['Technology'],
      title: 'Audi gives the RS4 avant more power but still no US visa',
      description:
        "2024 BMW Skytop Concept Much like last year's Touring Coupe unveiled at the Concorso d'Eleganza Villa d'Este,",
    },
    {
      id: '8',
      date: 'October 8, 2024',
      category: 'admin',
      tags: ['Official'],
      title: 'The BMW skytop could go into production after all',
      description:
        "2024 BMW Skytop Concept Much like last year's Touring Coupe unveiled at the Concorso d'Eleganza Villa d'Este,",
    },
    {
      id: '9',
      date: 'October 8, 2024',
      category: 'admin',
      tags: ['Races and chases'],
      title: 'The ypsilon HF is the first hot lancia in decades',
      description:
        "2024 BMW Skytop Concept Much like last year's Touring Coupe unveiled at the Concorso d'Eleganza Villa d'Este,",
    },
  ]

  static getContactInfo = () => ({
    phone: {
      text: '+971 600549993',
      link: '+971600549993',
    },
    email: {
      text: 'bookings@autorent-me.com',
      link: 'bookings@autorent-me.com',
    },
  })

  static getRentalGuides = () => [
    {
      id: '1',
      title: 'Dubai',
      image: '/assets/images/dubai.jpg',
      para: 'The pulsating city life, modern infrastructure, and being one of the world’s major economic hubs, Dubai is always on the move. This ever-lively city epitomises the bright present and the promising future of our times. Tourists throng Dubai. It is also a hub of many different cultures and ethnicities. Futuristic roads and well-connected highways make it easier to travel, yet the pace may be challenging for some. Renting a vehicle especially for someone from outside can be often challenging. Some pointers in this regard can always help.',
    },
    {
      id: '2',
      title: 'Sharjah',
      image: '/assets/images/sharjah.jpg',
      para: 'Sharjah is the third-most populous city and fast developing city in the UAE. Known for its rich cultural roots and also the industrial verve, Sharjah has many prominent tourist locations to visit too. This WHO healthy city is also the cultural capital of UAE. Museums, heritage centres, parks, aquariums, waterfronts, and beaches are the key attractions in the city. Though connected by public transport systems, visiting many localities, and travelling from and to Sharjah to other cities and emirates is more economical if one has access to a rental car.',
    },
    {
      id: '3',
      title: 'Ras Al Khaimah',
      image: '/assets/images/ras-al-khaimah.jpg',
      para: 'One of the seven Emirates in UAE Ras Al Khaimah is known for its trading ports. This Emirate is one of the fast-developing centres of business as well as a place providing a laidback life with its many villages and forts that project a mix of the old and new. There are many sights to visit in Ras Al Khaimah. Known for the many forts, museums, hills, and ports the city is visited by many tourists too. As the cost of living is less compared to other cities, one can opt to travel to other places in UAE, staying here. A rental car in such situations may be an ideal choice.',
    },
    {
      id: '4',
      title: 'Abu Dhabi',
      image: '/assets/images/abu-dhabi.jpg',
      para: 'The capital city of UAE, Abu Dhabi is one of the fast-developing and highly advanced cities in the world. Most major businesses and industrial firms are concentrated in this city. For this same reason, the traffic is always buzzing with luxury cars and business travels moving from one location to another. Abu Dhabi is also home to scenic wonders, desert safaris, museums, malls, and tourist destinations. Tourists and foreign travellers visit the city in large numbers. For long days of travel and longer stay, a rental car may be the best option to go for.',
    },
  ]

  static getHowItWorks = () => [
    {
      id: '1',
      icon: 'location',
      title: 'LOCATION & DATES',
      para: 'Select the pickup and return dates and locations.',
    },
    {
      id: '2',
      icon: 'car',
      title: 'SELECT VEHICLE',
      para: 'Compare and Select your preferred vehicle.',
    },
    {
      id: '3',
      icon: 'add-on',
      title: 'ADD-ONS & EXTRAS',
      para: 'Select add-ons and extras based on your vehicle of choice.',
    },
    {
      id: '4',
      icon: 'info',
      title: 'YOUR INFO',
      para: 'Enter and submit your accurate Information.',
    },
    {
      id: '5',
      icon: 'card',
      title: 'CHECKOUT & PAYMENT',
      para: 'Review the charges and make payment on Counter.',
    },
    {
      id: '6',
      icon: 'collect-vehicle',
      title: 'COLLECT VEHICLE',
      para: 'Our represenative will contact you for vehicle delivery.',
    },
  ]

  static getLocations = (): GetLocationsResult => ({
    dubai: [
      {
        id: 'oud-metha',
        iframeLink:
          'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d491.96987826577293!2d55.30858793338035!3d25.23332032637044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xa3a83e5afa83c184!2sAutorent%20Car%20Rental%20LLC%20-%20Oud%20Metha%2C%20Dubai!5e0!3m2!1sen!2sin!4v1601032229903!5m2!1sen!2sin',
        area: 'Oud Metha',
        address:
          'Autorent, Sultan Business Centre, Next to Lamcy Plaza, Ground Floor.',
        phone1: '+971 4 8855757',
        phone2: '+971 4 3374 734',
        email: 'bookings@autorent-me.com',
      },
      {
        id: 'dubai-investment-park-1',
        iframeLink:
          'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d957.7233715590556!2d55.15408895887071!3d25.004125054750954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f72595c21a2c7%3A0x541547da78266a1a!2sEuropean%20Business%20Center!5e0!3m2!1sen!2sin!4v1601032437447!5m2!1sen!2sin',
        area: 'Dubai Investment Park - 1',
        address:
          'European Business Center (Ground Floor) Dubai Investments Park - 1, Dubai',
        phone1: '+971 4 3366337',
        phone2: '+971 4 3374 734',
        email: 'bookings@autorent-me.com',
      },
      {
        id: 'al-quoz',
        iframeLink:
          'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d903.1448725982021!2d55.227380255709924!3d25.11609216667924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f127e61529121%3A0xbeba7c42c6c7f9c9!2sAutorent%20Car%20Rental%20-%20Al%20Quoz!5e0!3m2!1sen!2sin!4v1667211614181!5m2!1sen!2sin',
        area: 'Al Quoz',
        address:
          'Plot No : 0369-0322, Al Quoz Industrial Area # 4, Landmark : Stripes Sign LLC',
        phone1: '04 320 7715',
        phone2: '+971 4 3374 734',
        email: 'bookings@autorent-me.com',
      },
      {
        id: 'al-mamzar',
        iframeLink:
          'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2316.8292348572118!2d55.35469333316505!3d25.28393515541347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5dfa537f3d9b%3A0x5e36c7db829622f5!2sAutorent%20Car%20Rental%20LLC%20-%20Al%20Mamzar%2C%20Dubai%2C%20UAE!5e0!3m2!1sen!2sin!4v1601032675160!5m2!1sen!2sin',
        area: 'Al Mamzar',
        address:
          '13th Floor, AB Plaza 8 - Hor Al Anz East - Al Mamzar, Behind, Emirates NBD Building',
        phone1: '600549993',
        phone2: '+971 4 3374 734',
        email: 'bookings@autorent-me.com',
      },
      {
        id: 'damac-hills',
        iframeLink:
          'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5553311265376!2d55.247531099999996!3d25.016792299999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f7157cd887801%3A0x4b8021638639cde6!2sAutorent%20Car%20Rental%20-%20Damac%20Hills%20Mall!5e1!3m2!1sen!2sin!4v1736406699263!5m2!1sen!2sin',
        area: 'Damac Hills',
        address:
          'Al Hebiah Third Ventura at - DAMAC Hills - Dubai - United Arab Emirates',
        phone1: '+971 600 549993',
        phone2: '',
        email: 'bookings@autorent-me.com',
      },
    ],
    'Abu Dhabi': [
      {
        id: 'musaffah-industrial-area',
        iframeLink:
          'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58158.91569283177!2d54.45183566939493!3d24.34885323012109!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e40e7483d11d5%3A0x7672bbc1a32c03c2!2sMusaffah%20-%20Abu%20Dhabi%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1601033029259!5m2!1sen!2sin',
        area: 'Musaffah Industrial Area',
        address:
          'Store No: 1, E-5 Plot 51, Mussafah Industrial Area, Near Emirates Steel',
        phone1: '+971 2 5512162',
        phone2: '+971 4 3374 734',
        email: 'bookings@autorent-me.com',
      },
    ],
    'Other Emirates': [
      {
        id: 'al-marija-sharjah',
        iframeLink:
          'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1855.5922148183292!2d55.383379186093734!3d25.353405731440386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5a3444945821%3A0xfbd91462d4881f41!2sAutorent%20Car%20Rental%20LLC!5e0!3m2!1sen!2sin!4v1601033176721!5m2!1sen!2sin',
        area: 'Al Marija, Sharjah',
        address:
          'Shop #2, Old Sharjah Cinema Building, Al Marija Street, Near SNTTA',
        phone1: '+971 6 5521175',
        phone2: '+971 4 3374 734',
        email: 'bookings@autorent-me.com',
      },
      {
        id: 'ras-al-khaimah',
        iframeLink:
          'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.995908271169!2d55.327513315471506!3d25.270723083862045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5cc6c4eed5cf%3A0x3692e3769fc2b5bf!2sWARBA%20CENTER!5e0!3m2!1sen!2sin!4v1601033331521!5m2!1sen!2sin',
        area: 'Ras Al Khaimah',
        address: 'Shop no. 3, Al Warba Buidling, Al Nakheel Area',
        phone1: '600549993',
        phone2: '+971 4 3374 734',
        email: 'bookings@autorent-me.com',
      },
    ],
  })
}

export default StaticModel
