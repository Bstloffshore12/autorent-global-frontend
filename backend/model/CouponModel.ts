import NetworkModel from '@/model/NetworkModel'

export interface CouponData {
  id: number
  end: string
  code: string
  title: string
  value: string
  start: string
  quantity: number
  description: string
  type: 'percentage' | 'fixed'
}

class CouponModel {
  static getCoupon = async () =>
    NetworkModel.fetch(NetworkModel.apiRoutes.coupons.getCoupon)

  static check = async (coupon: string, rentalcarId: number) =>
    NetworkModel.fetch(NetworkModel.apiRoutes.coupons.check, {
      method: 'POST',
      body: JSON.stringify({ code: coupon, rentalcar_id: rentalcarId }),
    })
}

export default CouponModel
