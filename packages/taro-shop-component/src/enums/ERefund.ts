/**
 * 订单商品的售后状态
 */

import { ERefundStatus } from '@wmeimob/shop-data/src/enums/refund/ERefundStatus'

export enum EOrderGoodsRefundState {
  // 0 未申请 1 申请中 2 申请成功 -1退款失败
  /** 未申请 */
  UN_APPLY = 0,

  /** 申请中 */
  APPLYING,

  /** 申请成功 */
  APPLY_SUCCESS,

  /** 退款失败 */
  APPLY_FAIL
}

/**
 * 售后状态对应中文显示
 */
export const EOrderGoodsRefundStateDesc = {
  [EOrderGoodsRefundState.UN_APPLY]: '未申请',
  [EOrderGoodsRefundState.APPLYING]: '申请售后中',
  [EOrderGoodsRefundState.APPLY_SUCCESS]: '售后完成',
  [EOrderGoodsRefundState.APPLY_FAIL]: '售后拒绝'
}
