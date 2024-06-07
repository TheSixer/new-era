export enum ECouponType {
  /** 优惠券 */
  PRICE = 0,

  /** 折扣券 */
  DISCOUNT
}

export enum ECouponTypeMine {
  /** 优惠券 */
  PRICE = 'Price',

  /** 折扣券 */
  DISCOUNT = 'Discount'
}

export const CouponTypeDesc = {
  [ECouponType.PRICE]: '优惠券',
  [ECouponType.DISCOUNT]: '折扣券'
}

export const CouponTypeMineDesc = {
  [ECouponTypeMine.PRICE]: '优惠券',
  [ECouponTypeMine.DISCOUNT]: '折扣券'
}

// 优惠券生效时间条件
export enum ECouponExpireDateType {
  /** 无限制 */
  UNLIMITED = 0,
  /** 指定时间 */
  DESIGNATE,
  /** 动态时间 */
  DYNAMIC
}
