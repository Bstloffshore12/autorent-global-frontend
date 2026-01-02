import Image from 'next/image'
import { FiAlertTriangle } from 'react-icons/fi'
import { getTranslations } from 'next-intl/server'
import { BiXCircle, BiCheckCircle } from 'react-icons/bi'

import routes from '@/routes'
import { Link } from '@/i18n/routing'
import Card from '@/components/common/Card'
import Chip from '@/components/common/Chip'
import LinkButton from '@/components/common/LinkButton'
import PageHeading from '@/components/common/PageHeading'
import { type BookingDetailData } from '@/model/UserModel'
import DocumentList from '@/components/booking/DocumentList'
import RentalDetails from '@/components/booking//RentalDetails'
import FeaturesChips from '@/components/carDetail/FeaturesChips'
import AdditionalServiceList from '@/components/booking/AdditionalServiceList'
import CarAttributesSection2 from '@/components/carDetail/CarAttributesSection2'
import BookingDetailPaymentSummary from '@/components/booking/BookingDetailPaymentSummary'
import PaymentModel, { type PaymentMethod } from '@/model/PaymentModel'
import BookingExtraKmsAndPayment from './BookingExtraKmsAndPayment'

interface BookingDetailProps {
  bookingData: BookingDetailData
}

const BookingDetail = async ({ bookingData }: BookingDetailProps) => {
  const t = await getTranslations()
  const paymentMethodsRes = await PaymentModel.getMethods()
  const paymentMethods = paymentMethodsRes.data as PaymentMethod[]

  const basePrices = {
    daily: bookingData.car.dailysale || bookingData.car.daily,
    weekly: bookingData.car.weeklysale || bookingData.car.weekly,
    monthly: bookingData.car.monthlysale || bookingData.car.monthly,
  }

  // Helper function to get status icon
  const getStatusIcon = (statusName: string) => {
    switch (statusName.toLowerCase()) {
      case 'confirmed':
        return <BiCheckCircle className="h-5 w-5" />
      case 'cancelled':
        return <BiXCircle className="h-5 w-5" />
      case 'pending':
        return <FiAlertTriangle className="h-5 w-5" />
      default:
        return <FiAlertTriangle className="h-5 w-5" />
    }
  }

  return (
    <div>
      {/* Status Header */}
      <div className="mb-6 grid justify-center gap-4 text-center lg:grid-cols-2 lg:justify-between lg:text-left">
        <div>
          <PageHeading>{t('Booking Details')}</PageHeading>
          <p>
            {t('Your booking reference is')}{' '}
            <span className="text-lg font-bold text-primary">
              {bookingData.order.booking_id}
            </span>
          </p>
        </div>

        <div className="flex h-min justify-end gap-2 text-sm">
          <p
            style={{ backgroundColor: bookingData.order.status_color }}
            className="flex items-center gap-1 rounded-full px-2 py-1 text-white"
          >
            {getStatusIcon(bookingData.order.status_name)}
            {bookingData.order.status_name}
          </p>
          <p
            style={{
              backgroundColor: bookingData.order.payment_status_color,
            }}
            className="rounded-full px-2 py-1 text-white"
          >
            {bookingData.order.payment_status_name}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-[auto_360px]">
        <div className="space-y-6">
          {/* Rental Details */}
          <RentalDetails
            order={bookingData.order}
            leaseDetails={bookingData.lease_details}
            className="space-y-2"
          />

          <BookingDetailPaymentSummary
            className="block lg:hidden"
            order={bookingData.order}
            basePrice={basePrices[bookingData.order.pricemode]}
            additionalCharges={bookingData.additional_charges}
            extraKilometerCharges={bookingData.extra_kilometer_charges}
            location_dropoff_charge={bookingData.location_dropoff_charge}
          />

          {bookingData.documents && (
            <DocumentList
              className="block lg:hidden"
              documents={bookingData.documents}
              order_id={bookingData.order.order_id}
              isInvoiceAvailable={bookingData.order.is_invoice}
            />
          )}

          {/* Car Details */}
          <Card className="space-y-4">
            <div className="flex flex-col gap-6 lg:flex-row">
              <Link href={routes.carDetail(bookingData.car.slug)}>
                <Image
                  width={288}
                  height={300}
                  alt={bookingData.car.media?.alt || bookingData.car.title}
                  title={bookingData.car.media?.title || bookingData.car.title}
                  className="mx-auto h-full w-full min-w-56 max-w-72 rounded-md object-contain sm:mx-0"
                  src={
                    bookingData.car.media?.path
                      ? `${routes.bucketUrl}${bookingData.car.media.path}`
                      : '/assets/images/placeholder.svg'
                  }
                />
              </Link>
              <div className="">
                <h3 className="text-xl font-semibold">
                  {bookingData.car.title}
                </h3>

                <div className="mb-3 mt-1 flex gap-2">
                  <Chip>{bookingData.car.make}</Chip>
                  <Chip>{bookingData.car.bodytype}</Chip>
                </div>
                <CarAttributesSection2
                  make={bookingData.car.make}
                  door={bookingData.car.door}
                  seat={bookingData.car.seat}
                  year={
                    bookingData.lease_details?.year_title ||
                    bookingData.car.year
                  }
                  color={bookingData.car.color}
                  model={bookingData.car.model}
                  warranty={bookingData.car.warranty}
                  bodyType={bookingData.car.bodyType}
                  fuelType={bookingData.car.fuelType}
                  cylinder={bookingData.car.cylinder}
                  transmission={bookingData.car.transmission}
                  bodyCondition={bookingData.car.bodyCondition}
                  regionalSpecification={bookingData.car.regionalSpecification}
                />
              </div>
            </div>
            <FeaturesChips
              className="border-y py-4"
              features={bookingData.car.carattributes.features}
            />

            <AdditionalServiceList
              currency={bookingData.order.currency}
              additionals={bookingData.additional_charges}
              extraKilometerCharges={bookingData.extra_kilometer_charges}
              order={bookingData.order}
            />
            {bookingData.location_dropoff_charge && (
              <div className="py-2">
                <p className="text-sm capitalize">Drop Off Charges</p>
                <div className="flex items-center justify-between border-b border-dashed pb-1 text-sm">
                  <span>{bookingData.location_dropoff_charge.title}</span>
                  <span>
                    {bookingData.location_dropoff_charge.amount}{' '}
                    {bookingData.order.currency}
                  </span>
                </div>
              </div>
            )}
          </Card>

          <BookingExtraKmsAndPayment
            carSlug={bookingData.car.slug}
            currency={bookingData.order.currency}
            pricingMode={bookingData.order.pricemode}
            orderId={bookingData.order.order_id.toString()}
            totalAmount={bookingData.order.total_amount}
            extraKms={bookingData.extra_kilometer_options || []}
            paymentMethods={paymentMethods}
          />
        </div>

        <div className="sticky top-0 hidden h-max gap-6 lg:grid">
          <BookingDetailPaymentSummary
            order={bookingData.order}
            basePrice={basePrices[bookingData.order.pricemode]}
            additionalCharges={bookingData.additional_charges}
            extraKilometerCharges={bookingData.extra_kilometer_charges}
            location_dropoff_charge={bookingData.location_dropoff_charge}
          />

          {bookingData.documents && (
            <DocumentList
              documents={bookingData.documents}
              order_id={bookingData.order.order_id}
              isInvoiceAvailable={bookingData.order.is_invoice}
            />
          )}
        </div>
      </div>

      <LinkButton
        className="mx-auto mt-6 w-max"
        theme="primaryLight"
        href={routes.user.bookings}
      >
        {t('View All Bookings')}
      </LinkButton>
    </div>
  )
}

export default BookingDetail
