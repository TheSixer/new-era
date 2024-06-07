/** 新人优惠券领取结果 */
export enum ENewcomerCouponReceiveResult {
  /** 成功 */
  Success = 1,
  /** 未设置 */
  UnSetting,
  /** 已领取 */
  Receive,
  /** 部分库存不足 */
  PartialStockLow,
  /** 全部库存不足 */
  allStockLow
}
