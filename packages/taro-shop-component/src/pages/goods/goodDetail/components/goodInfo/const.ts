import { GoodsVO, CouponTemplateVo } from '@wmeimob/taro-api'

export interface IGoodInfoProps {
  data: GoodsVO

  coupons: CouponTemplateVo[]

  onShowCoupon(): void
}
