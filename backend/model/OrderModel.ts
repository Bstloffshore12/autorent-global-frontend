import { cookies } from 'next/headers'

import NetworkModel from '@/model/NetworkModel'
import { type PaymentMethod } from '@/model/PaymentModel'

interface AdditionalCharge {
  title: string
  description: string | null
  amount: string
  media?: string | null
}

interface Order {
  title: string
  description: string
  amount: string
}

interface Customer {
  name: string
  phone: string
  email: string
  address: string
}

interface OC {
  trade_name: string
  trn: string
  state_label: string
  tax_status: string
  tax_rate: number
  tax_label: string
  tax_effectivedate: string
  phone_number: string
  support_email: string
  email: string
  currency: string
}

interface Total {
  sub_total: string
  government_tax: string
  total_amount: string
  already_paid: string
  total_due: string
}

export interface InvoiceData {
  oc: OC
  customer: Customer
  order: Order
  additional_charges: AdditionalCharge[]
  order_extensions: Order[]
  order_extra_charges: Order[]
  total: Total
}

export type PostOrderProps = {
  coupon: string
  pickup_date: string
  self_pickup: string
  rentalcar_id: number
  dropoff_date: string
  self_dropoff: string
  additional_id: string
  pickup_id: number | string
  dropoff_id: number | string
  payment_id: PaymentMethod['id']
}

export type PostOrderData = {
  order_id: string
  payment_id: string
}

class OrderModel {
  static cookieKey = 'orderSubmitted'

  static setCookieSubmit = async () => {
    const cookieStore = await cookies()
    cookieStore.set(this.cookieKey, 'true', {
      path: '/',
      maxAge: 15,
      secure: true,
      httpOnly: true,
      sameSite: 'lax',
    })
  }

  static checkIfSubmitted = async () => {
    const cookieStore = await cookies()
    return cookieStore.get(this.cookieKey)?.value
  }

  static postOrder = async (data: PostOrderProps) => {
    const body = JSON.stringify(data)

    return NetworkModel.fetch(NetworkModel.apiRoutes.postOrder, {
      body,
      method: 'POST',
    })
  }

  static getOrderInvoice = async (orderId: string) =>
    NetworkModel.fetch(NetworkModel.apiRoutes.booking.getInvoice(orderId))

  static postExtraKilometer = async (data: PostExtraKilometerProps) => {
    const body = JSON.stringify(data)
    return NetworkModel.fetch(NetworkModel.apiRoutes.extraKilometer, {
      body,
      method: 'POST',
    })
  }
}

export type PostExtraKilometerProps = {
  order_id: string | number
  rental_additional_charge_id: string | number
  payment_id: string | number
  kilometers?: number
  amount?: string | number
  title?: string
  description?: string
}

export default OrderModel
