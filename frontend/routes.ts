const routes = {
  home: '/',
  faqs: '/faqs',
  blogs: '/blogs',
  about: '/about',
  listing: '/rent-cars',
  rentalGuides: '/rental-guides',
  privacyPolicy: '/privacy-policy',
  termsAndConditions: '/terms-and-conditions',
  personalLeaseCars: '/lease-cars/car-listing',
  monthlyLeaseCars: '/monthly-lease-cars',
  monthlyLeaseCarDetail: (slug: string) => `/monthly-lease-cars/${slug}`,
  personalLeaseCarDetail: (slug: string) => `/lease-cars/car-listing/${slug}`,
  blogDetail: (slug: string) => `/blog/${slug}`,
  carDetail: (slug: string) => `/rent-car/${slug}`,
  rentalGuideDetail: (slug: string) => `/rental-guide/${slug}`,

  specialOffers: '/special-offers',
  specialOffersByState: (stateName: string) =>
    `/special-offers/${stateName.toLowerCase().replaceAll(' ', '-')}`,
  specialOffer: (stateName: string, slug: string) =>
    `/special-offers/${stateName.toLowerCase().replaceAll(' ', '-')}/${slug}`,

  webform: {
    careers: '/careers',
    contact: '/contact',
    feedback: '/feedback',
    success: '/form/success',
    leaseCars: '/lease-cars',
    rentCarsEnquiry: '/rent-cars-enquiry',
    corporateLeasing: '/corporate-leasing',
    roadSideAssistance: '/road-side-assistance',
  },

  user: {
    profile: '/profile',
    support: '/profile/support',
    security: '/profile/security',
    bookings: '/profile/bookings',
    myAddresses: '/profile/my-addresses',
    inviteFrends: '/profile/invite-frends',
    bookingStaticSuccess: '/booking/success',
    bookingStaticFailure: '/booking/failure',
    bookingSuccess: (id: number | string) => `/booking/success/${id}`,
    bookingDetails: (id: number | string) => `/profile/booking/${id}`,
    invoices: (id: number | string) => `/profile/booking/invoice/${id}`,
  },

  baseUrl: process.env.METADATA_BASE,
  bucketUrl: process.env.BUCKET_URL,
  bucketUrlClient: process.env.NEXT_PUBLIC_BUCKET_URL,
}

export default routes
