import { convertEnum } from '@wmeimob/utils/src/enumUtil'
/**
 * 优惠劵类型
 * 0 抵扣 1 折扣
 */
export enum ECouponType {
  /** 抵扣/满减 */
  Deduction = 0,
  /** 满折满折 */
  Discount = 1,
  /** 赠品券 */
  Present = 2,
  /** 兑换券 */
  Exchange = 3,
  /** 包邮券 */
  FreeShipping = 4
}

export const [MCouponType, OCouponType] = convertEnum([
  [ECouponType.Deduction, '满减'],
  [ECouponType.Discount, '满折'],
  [ECouponType.Present, '赠品券'],
  [ECouponType.Exchange, '兑换券'],
  [ECouponType.FreeShipping, '免邮券']
])
