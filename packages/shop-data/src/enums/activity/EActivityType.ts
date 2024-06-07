import { convertEnum } from '@wmeimob/utils/src/enumUtil'

/**
 * 活动类型
 */
export enum EActivityType {
  /** 预售 */
  PreSale = 1,

  /** 限时抢购 */
  FlashSale = 2,

  /** 满减 */
  Deduction = 3,

  /** 满折 */
  Discount = 4,

  /** 满赠 */
  Presented = 5,

  /** 优惠券 */
  Coupon = 6,

  /** 会员折扣 */
  MemberDiscount = 7,

  /** 积分 */
  Score = 8,

  /** 包邮活动 */
  FreeShipping = 9
}

export const [MActivityType, OActivityType] = convertEnum([
  [EActivityType.PreSale, '预售'],
  [EActivityType.FlashSale, '限时抢购'],
  [EActivityType.Deduction, '满减'],
  [EActivityType.Discount, '满折'],
  [EActivityType.Presented, '满赠'],
  [EActivityType.Coupon, '优惠券'],
  [EActivityType.MemberDiscount, '会员折扣'],
  [EActivityType.Score, '积分'],
  [EActivityType.FreeShipping, '包邮']
])
