/**
 * 订单状态
 */

import { convertEnum } from '@wmeimob/utils/src/enumUtil'

export enum EOrderStatus {
  /** 待付款 */
  PENDING_PAYMENT = 1,

  /** 待发货 */
  UNSHIPPED,

  /** 待收货 */
  WAIT_RECEIVING,

  /** 待评价 */
  PART_COMPLETED,

  /**
   * 交易完成
   */
  COMPLETED,

  /** 交易关闭 */
  CANCEL
}

export const [MOrderStatus, OOrderStatus] = convertEnum([
  [EOrderStatus.PENDING_PAYMENT, '待付款'],
  [EOrderStatus.UNSHIPPED, '待发货'],
  [EOrderStatus.WAIT_RECEIVING, '待收货'],
  [EOrderStatus.PART_COMPLETED, '待评价'],
  [EOrderStatus.COMPLETED, '交易完成'],
  [EOrderStatus.CANCEL, '交易关闭']
])

/**
 * 提供给后台管理系统的枚举
 * 需要去掉待评价的
 */
export const MBackendOrderStatus = OOrderStatus.filter((it) => it.value !== EOrderStatus.PART_COMPLETED).reduce((result, item) => {
  result[item.value] = item.label
  return result
}, {} as Record<string, any>)
