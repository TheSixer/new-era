/**
 * 优惠券状态
 * 0 已作废 3 生效中 4 未生效 5 已过期
 *
 * @description 这个优惠券并并不等同字段中的status。是前端推导出来的。并且支持以此作为筛选
 */
export enum ECouponStatus {
  /** 已作废 */
  Void = 0,
  /** 生效中 */
  Valid = 3,
  /** 未生效 */
  NoValid = 4,
  /** 已过期 */
  Expired = 5
}

export const MCouponStatus = {
  [ECouponStatus.Void]: '已作废',
  [ECouponStatus.Valid]: '生效中',
  [ECouponStatus.NoValid]: '未生效',
  [ECouponStatus.Expired]: '已过期'
}
