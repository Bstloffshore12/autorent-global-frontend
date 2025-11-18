import CustomerTestimonials from './CustomerTestimonials'
import {
  BsHeadset,
  BsCashCoin,
  BsHouseFill,
  BsGeoAltFill,
  BsCalendarFill,
  BsCarFrontFill,
} from 'react-icons/bs'
import Faqs from './Faqs'
import Image from 'next/image'
import ListingSliderSection from '@/sections/ListingSliderSection'
import Form from './Form'
import LinkButton from '@/components/common/LinkButton'
import PopupForm from './PopUpForm'

const LandingPageData = ({
  source,
  campaign,
}: {
  source: string
  campaign: string
}) => {
  return (
    <>
      <PopupForm />
      {/* Hero Section */}
      <section>
        <div className="relative w-full shrink-0">
          <Image
            src="/assets/images/summer-promotion.png"
            alt="banners"
            width={1920}
            height={1080}
            layout="responsive"
          />
        </div>

        <LinkButton
          href="#contact"
          theme="primaryLight"
          className="absolute bottom-6 left-8 lg:bottom-24 xl:bottom-24"
        >
          Check Availability
        </LinkButton>
      </section>

      {/* contact form */}
      <section className="bg-white py-12" id="contact">
        <div className="container mx-auto px-4">
          <h2 className="mb-4 text-center text-2xl font-bold">
            📞 Book Your Ride Now – Easy & Quick
          </h2>
          <p className="mb-4 text-center">
            Fill the form below to get the best offer from Autorent car rental.
            Our team will respond quickly with availability and the best rates.
          </p>
          <h2 className="mb-8 text-center text-xl font-semibold">
            Get a Quick Car Rental Quote
          </h2>
          <div className="flex justify-center">
            <div className="w-full max-w-xl">
              <Form source={source} campaign={campaign} />
              <div id="responseMessage" className="mt-2 text-green-600"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Car Fleet Section */}
      <ListingSliderSection
        rows={2}
        leadMode
        enquiryLink="#contact"
        heading="Explore More with Easy Car Rentals Across the UAE"
        subTitle="Choose from Our Extensive Fleet of Rental Cars"
      />

      {/* Why Autorent is the Smart Choice Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          {/* Features Grid */}
          <h4 className="mb-8 mt-12 text-center text-2xl font-semibold">
            Why Choose Autorent Car Rental?
          </h4>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-sm transition duration-300 hover:shadow-md">
              <BsCarFrontFill className="mb-4 text-4xl text-blue-600" />
              <p className="text-gray-700">
                Wide Range – Economy, Sedan, SUV & Luxury Cars
              </p>
            </div>

            <div className="flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-sm transition duration-300 hover:shadow-md">
              <BsGeoAltFill className="mb-4 text-4xl text-blue-600" />
              <p className="text-gray-700">
                Multiple Locations – Dubai, Sharjah, Abu Dhabi & RAK
              </p>
            </div>

            <div className="flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-sm transition duration-300 hover:shadow-md">
              <BsCashCoin className="mb-4 text-4xl text-blue-600" />
              <p className="text-gray-700">
                Transparent Pricing – No hidden charges
              </p>
            </div>

            {/* <div className="flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-sm transition duration-300 hover:shadow-md">
              <BsMouseFill className="mb-4 text-4xl text-blue-600" />
              <p className="text-gray-700">
                Easy Online Booking – Book in minutes
              </p>
            </div> */}

            <div className="flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-sm transition duration-300 hover:shadow-md">
              <BsCalendarFill className="mb-4 text-4xl text-blue-600" />
              <p className="text-gray-700">
                Flexible Terms – Daily, Weekly & Monthly
              </p>
            </div>

            <div className="flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-sm transition duration-300 hover:shadow-md">
              <BsHeadset className="mb-4 text-4xl text-blue-600" />
              <p className="text-gray-700">
                Excellent Support – Friendly & professional
              </p>
            </div>

            <div className="flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-sm transition duration-300 hover:shadow-md">
              <BsHouseFill className="mb-4 text-4xl text-blue-600" />
              <p className="text-gray-700">
                Convenient Pickup – Airport, Hotel or Home
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <CustomerTestimonials />

      {/* FAQs Section */}
      <section className="bg-white py-16" id="faq">
        <div className="container mx-auto px-4">
          <h2 className="mb-10 text-center text-3xl font-bold text-gray-800">
            ❓ Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            <Faqs />
          </div>
        </div>
      </section>

      {/* company details */}
      <section className="mt-16 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-100 px-8 py-12 shadow-md">
        <div className="mb-10 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900">Autorent</h2>
          <p className="text-xl text-gray-700">
            Trusted Car Rental & Lease Services in UAE
          </p>
          <div className="mx-auto mt-4 h-1 w-32 rounded-full bg-blue-600"></div>
        </div>

        <div className="mx-auto max-w-4xl space-y-6 text-lg leading-relaxed text-gray-700">
          <div className="rounded-xl bg-white/70 p-6">
            <p>
              Looking for{' '}
              <span className="font-semibold text-blue-700">
                car rental in Dubai, Sharjah, Abu Dhabi, or Ras Al Khaimah
              </span>
              ? <span className="font-semibold text-gray-900">Autorent</span>{' '}
              offers affordable and flexible options for{' '}
              <span className="font-semibold text-blue-700">
                car rental UAE
              </span>
              , including{' '}
              <span className="font-semibold text-blue-700">
                cheap car rental in Dubai
              </span>{' '}
              and{' '}
              <span className="font-semibold text-blue-700">
                cheap car rental in Abu Dhabi
              </span>
              .
            </p>
          </div>

          <div className="rounded-xl bg-white/70 p-6">
            <p>
              We specialize in{' '}
              <span className="font-semibold text-blue-700">
                car lease Dubai
              </span>
              ,{' '}
              <span className="font-semibold text-blue-700">
                car lease in Dubai
              </span>
              , and{' '}
              <span className="font-semibold text-blue-700">
                monthly car rental in Dubai
              </span>{' '}
              or{' '}
              <span className="font-semibold text-blue-700">
                monthly car rental in Abu Dhabi
              </span>
              . Whether you want to{' '}
              <span className="font-semibold text-blue-700">
                rent a car in Dubai
              </span>
              ,{' '}
              <span className="font-semibold text-blue-700">
                rent a car in Sharjah
              </span>
              ,{' '}
              <span className="font-semibold text-blue-700">
                rent a car in Abu Dhabi
              </span>
              , or{' '}
              <span className="font-semibold text-blue-700">
                rent a car in Ras Al Khaimah
              </span>
              , we&apos;ve got you covered.
            </p>
          </div>

          <div className="rounded-xl bg-white/70 p-6">
            <p>
              Find the best options for{' '}
              <span className="font-semibold text-blue-700">
                car hire near me
              </span>
              ,{' '}
              <span className="font-semibold text-blue-700">
                car rental in Sharjah
              </span>
              ,{' '}
              <span className="font-semibold text-blue-700">
                car rental Ras Al Khaimah
              </span>
              , and{' '}
              <span className="font-semibold text-blue-700">
                car rental Abu Dhabi
              </span>
              .
            </p>
          </div>

          <div className="rounded-xl bg-blue-600 p-8 text-center text-white">
            <p className="text-xl font-bold">
              Book now with <span className="text-yellow-300">Autorent</span>{' '}
              and experience convenient and budget-friendly{' '}
              <span className="text-yellow-300">car hire in the UAE</span>!
            </p>
          </div>
        </div>
      </section>

      {/* footer */}
      <section className="bg-gradient-to-br from-gray-50 via-white to-gray-100 py-16">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold text-gray-800 md:text-4xl">
            Experience Reliable Car Hire with{' '}
            <span className="text-blue-600">Autorent</span>
          </h2>

          <p className="mb-6 text-lg text-gray-600">
            Enjoy{' '}
            <span className="font-medium text-blue-600">flexible rentals</span>,
            24/7 support, and unbeatable prices wherever you are in the UAE.
          </p>
          <p className="text-xl font-semibold italic text-gray-800">
            Autorent Car Rental –{' '}
            <span className="text-blue-600">Your Journey, Our Priority</span>
          </p>
        </div>
      </section>
    </>
  )
}

export default LandingPageData
