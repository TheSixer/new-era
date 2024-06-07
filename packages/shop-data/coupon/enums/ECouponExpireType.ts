/**
 * 优惠券过期类型
 */
export enum ECouponExpireType {
  /** 使用有效期 */
  Date = 1,

  /** 领取失效 */
  Receive = 2
}

export const MCouponExpireType = {
  [ECouponExpireType.Date]: '使用有效期',
  [ECouponExpireType.Receive]: '领取失效'
}

export const OCouponExpireType = [
  { label: '使用有效期', value: ECouponExpireType.Date },
  { label: '领取失效', value: ECouponExpireType.Receive }
]
