import { ICouponProps } from '@wmeimob/taro-shop-coupon/src/components/shop-coupon/const'
import { CouponTemplateVo } from '@wmeimob/taro-api'

export interface ICouponItemProps extends Omit<ICouponProps, 'data'> {
  /**
   * 商品详情优惠券data
   */
  data?: CouponTemplateVo

  size?: 'small'
  /**
   * 我的优惠券data
   */
  // mineData?: MemCouponVo
  /**
   * 状态 0 未使用 1 已使用 2 已过期 3已作废
   */
  // useStatus?: number
}
