import { convertEnum } from '@wmeimob/utils/src/enumUtil'

/**
 * 订单商品售后状态
 *
 * 0 未申请 1 申请中 2 售后完成 3售后拒绝
 */
export enum EOrderRefundStatus {
  /** 未售后 */
  None,

  /** 售后中 */
  Apply,

  /** 售后完毕 */
  Completed,

  /** 售后拒绝 */
  Refund
}

export const [MOrderRefundStatus, OOrderRefundStatus] = convertEnum([
  [EOrderRefundStatus.None, '未售后'],
  [EOrderRefundStatus.Apply, '售后中'],
  [EOrderRefundStatus.Completed, '已售后'],
  [EOrderRefundStatus.Refund, '售后拒绝']
])
