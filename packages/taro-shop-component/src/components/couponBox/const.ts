import { CouponTemplateVo } from '@wmeimob/taro-api'

export interface ICouponBoxProps {
  couponVisible: boolean

  data: CouponTemplateVo[]

  onClose?: () => void

  onReceiveCoupon?(coupon: CouponTemplateVo): void
}
