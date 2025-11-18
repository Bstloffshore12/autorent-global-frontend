import { type ReactNode } from 'react'

import { classnames } from '@/futils'
import getBookingInvoiceAction from '@/actions/order/getBookingInvoiceAction'

interface InvoicePageProps {
  params: Promise<{ id: string }>
}

interface TdProps {
  text: string | null
  className?: string
}

const Td = ({ text = '', className }: TdProps) => {
  return <td className={classnames('tetx-sm p-1', className)}>{text}</td>
}

interface TrProps {
  className?: string
  children: ReactNode
}

const Tr = ({ children, className }: TrProps) => {
  return (
    <tr className={classnames('border-b border-dashed', className)}>
      {children}
    </tr>
  )
}

const InvoicePage = async ({ params }: InvoicePageProps) => {
  const { id } = await params
  const res = await getBookingInvoiceAction(id)

  if (!res.success) return null

  const data = res.data

  return (
    <div
      className="mx-auto bg-white text-sm"
      style={{ width: '210mm', height: '297mm' }}
    >
      {/* Invoice Container */}
      <div className="mx-auto max-w-4xl rounded-lg border p-4 shadow-sm">
        {/* Header Section */}
        <div className="mb-4 flex items-start justify-between border-b-2 border-primary-light pb-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-primary">
              {data.oc.trade_name}
            </h1>
            <div className="t space-y-1 text-gray-600">
              <p>TRN: {data.oc.trn}</p>
              <p>{data.oc.state_label}</p>
              <p>Phone: {data.oc.phone_number}</p>
              <p>Email: {data.oc.email}</p>
              <p>Support: {data.oc.support_email}</p>
            </div>
          </div>

          <div className="space-y-2 text-right">
            <h2 className="text-2xl font-bold text-secondary">INVOICE</h2>
            <div className="space-y-1">
              <p className="font-medium">
                Date:{' '}
                <span className="font-normal">{data.oc.tax_effectivedate}</span>
              </p>
              <p className="font-medium">
                Tax Rate:{' '}
                <span className="font-normal">
                  {data.oc.tax_rate}% {data.oc.tax_label}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="mb-4 rounded-lg bg-primary-light p-2">
          <h3 className="font-normal">Customer Information</h3>
          <div className="grid grid-cols-2 gap-1 md:grid-cols-2">
            <p>
              <span className="font-normal">Name:</span> {data.customer.name}
            </p>
            <p>
              <span className="font-normal">Phone:</span> {data.customer.phone}
            </p>
            <p>
              <span className="font-normal">Email:</span> {data.customer.email}
            </p>
            <p>
              <span className="font-normal">Address:</span>{' '}
              {data.customer.address}
            </p>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-4">
          <table className="w-full border-collapse">
            <thead>
              <Tr className="bg-primary font-normal text-white">
                <th className="p-1 text-left font-normal">Description</th>
                <th className="p-1 text-left font-normal">Details</th>
                <th className="min-w-24 p-1 text-right font-normal">Amount</th>
              </Tr>
            </thead>
            <tbody>
              <Tr>
                <Td text={data.order.title} />
                <Td text={data.order.description} />
                <Td
                  text={`${data.order.amount} ${data.oc.currency}`}
                  className="min-w-24 text-right"
                />
              </Tr>

              {data.additional_charges.map((charge, index) => (
                <Tr key={`add-${index}`}>
                  <Td text={charge.title} />
                  <Td text={charge.description} />
                  <Td
                    text={`${charge.amount} ${data.oc.currency}`}
                    className="min-w-24 text-right"
                  />
                </Tr>
              ))}
              {data.order_extensions.map((charge, index) => (
                <Tr key={`add-${index}`}>
                  <Td text={charge.title} />
                  <Td text={charge.description} />
                  <Td
                    text={`${charge.amount} ${data.oc.currency}`}
                    className="min-w-24 text-right"
                  />
                </Tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals Section */}
        <div className="flex justify-end">
          <div className="w-full md:w-1/2">
            <div className="flex justify-between">
              <span>Sub Total:</span>
              <span>
                {data.total.sub_total} {data.oc.currency}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Government Tax ({data.oc.tax_rate}%):</span>
              <span>
                {data.total.government_tax} {data.oc.currency}
              </span>
            </div>
            <div className="flex justify-between border-t">
              <span>Total Amount Due:</span>
              <span>
                {data.total.total_amount} {data.oc.currency}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Amount Paid:</span>
              <span>
                {data.total.already_paid} {data.oc.currency}
              </span>
            </div>
            <div className="flex justify-between border-y">
              <span>Balance Due:</span>
              <span>
                {data.total.total_due} {data.oc.currency}
              </span>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="mt-10 text-gray-600">
          <p className="font-medium text-gray-800">Notes:</p>
          <p className="mt-1">
            For any questions regarding this invoice, please contact our
            customer service.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-12 border-t border-gray-200 pt-6 text-center text-xs text-gray-500">
          <p className="font-medium text-gray-700">
            Thank you for your business!
          </p>
          <p className="mt-1">
            {data.oc.trade_name} | Phone: {data.oc.phone_number} | Email:{' '}
            {data.oc.support_email}
          </p>
          <p className="mt-1">
            This is a computer generated invoice. No signature is required.
          </p>
        </div>
      </div>
    </div>
  )
}

export default InvoicePage
