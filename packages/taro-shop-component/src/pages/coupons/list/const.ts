export interface ICouponMineProps {}

/**
 * 优惠券状态
 */
export enum EStatus {
  /** 可使用 */
  CanUse = 1,
  /** 已使用 */
  Used = 2,
  /** 已过期 */
  InValid = 3
}

/** 历史优惠券接口所对应的查询状态 */
export enum ECouponHistoryQueryType {
  /** 已使用 */
  Used = 1,
  /** 已过期 */
  InValid = 2
}
