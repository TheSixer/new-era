/**
 * 优惠券使用状态 后台使用
 * 状态 0 未使用 1 已使用 2 已过期 3已作废
 * */

export enum ECouponUseStatus {
  /** 未使用 */
  NotUse,
  /** 已使用 */
  Used,
  /** 已过期 */
  OutDate,
  /** 已作废 */
  Cancellation
}

export const MCouponUseStatus = {
  [ECouponUseStatus.NotUse]: '未使用',
  [ECouponUseStatus.Used]: '已使用',
  [ECouponUseStatus.OutDate]: '已过期',
  [ECouponUseStatus.Cancellation]: '已作废'
}
