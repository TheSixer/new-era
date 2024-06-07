import { convertEnum } from '@wmeimob/utils/src/enumUtil'

/**
 * 售后状态枚举
 */
export enum ERefundStatus {
  /** 待商家处理 */
  StoreProcess = 900,
  /** 等待退货 */
  UserReturn = 910,
  /** 商家验货 */
  StoreCheck = 920,
  /** 退款完成 */
  Complete = 930,
  /** 退款处理中 */
  Process = 931,
  /**
   * 退款完成-线下处理
   *
   * @description 目前无用
   */
  // CompleteOffline,
  /** 商家拒绝 */
  StoreRefuse = 990,
  /** 验货不通过 */
  StoreCheckFail,
  /** 退款失效 */
  CompleteRefundFail
}

export const [MRefundStatus, ORefundStatus] = convertEnum([
  [ERefundStatus.StoreProcess, '待审核'],
  [ERefundStatus.Complete, '已退款'],
  [ERefundStatus.StoreRefuse, '未通过'],
  [ERefundStatus.UserReturn, '待退货'],
  [ERefundStatus.StoreCheck, '待验货退款'],
  [ERefundStatus.Process, '退款中'],
  // [ERefundStatus.CompleteOffline,'退款完成(线下处理)'],
  [ERefundStatus.StoreCheckFail, '验货不通过'],
  [ERefundStatus.CompleteRefundFail, '退款失效']
])

/**
 * 小程序端状态文本。
 *
 * @description 默认与后台保持一致。如果不一致。自行修改。但是建议保持统一
 */
export const RefundStatusTitle = MRefundStatus
// 原小程序状态
//  {
//   [ERefundStatus.StoreRefuse]: '已拒绝',
//   [ERefundStatus.UserReturn]: '待退货',
//   [ERefundStatus.StoreCheck]: '待验货退货',
//   [ERefundStatus.Complete]: '已退款',
//   [ERefundStatus.Process]: '退款处理中',
//   // [ERefundStatus.CompleteOffline]: '已退款',
//   [ERefundStatus.CompleteRefundFail]: '退款失效',
//   [ERefundStatus.StoreCheckFail]: '未通过',
//   [ERefundStatus.StoreProcess]: '待审核'
// }
