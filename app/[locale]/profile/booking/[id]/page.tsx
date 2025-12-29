import BookingDetail from '@/components/booking/BookingDetail'
import getBookingDetailAction from '@/actions/user/getBookingDetailAction'

interface BookingDetailPageProps {
  params: Promise<{ id: string }>
}

const BookingDetailPage = async ({ params }: BookingDetailPageProps) => {
  const { id } = await params
  const res = await getBookingDetailAction(id)
  return res.success && res.data ? (
    <BookingDetail bookingData={res.data} />
  ) : null
}

export default BookingDetailPage
