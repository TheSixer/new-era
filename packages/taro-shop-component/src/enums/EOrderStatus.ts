/**
 * 订单状态
 */

import { createEnumOptions } from './utils'

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

export const OrderStatusText = {
  [EOrderStatus.PENDING_PAYMENT]: '待付款',
  [EOrderStatus.UNSHIPPED]: '待发货',
  [EOrderStatus.WAIT_RECEIVING]: '待收货',
  [EOrderStatus.PART_COMPLETED]: '待评价',
  [EOrderStatus.COMPLETED]: '交易完成',
  [EOrderStatus.CANCEL]: '交易关闭'
}

export const OOrderStatus = createEnumOptions(OrderStatusText)
