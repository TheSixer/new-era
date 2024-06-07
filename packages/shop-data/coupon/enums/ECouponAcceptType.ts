import { convertEnum } from '@wmeimob/utils/src/enumUtil'

/**
 * 优惠券领取方式
 */
export enum ECouponAcceptType {
  /** 直接领取 */
  Receive,
  /** 后台发放 */
  Backend,
  /** 优惠码兑换 */
  CouponCode,
  /** 新人劵 */
  NewUserCoupon
}

export const [MCouponAcceptType, OCouponAcceptType] = convertEnum([
  [ECouponAcceptType.Receive, '直接领取'],
  [ECouponAcceptType.Backend, '后台发放'],
  [ECouponAcceptType.CouponCode, '优惠码兑换'],
  [ECouponAcceptType.NewUserCoupon, '新人劵']
])
