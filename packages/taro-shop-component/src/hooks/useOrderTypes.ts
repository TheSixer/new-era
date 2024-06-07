import { useMemo } from 'react'
import { EOrderStatus, OrderStatusText } from '../enums/EOrderStatus'
import { EWholeOrderStatus } from '../enums/EWholeOrderStatus'

const {
  ORDER_STATUS_PENDING_PAYMENT,
  ORDER_STATUS_PAY_ERROR,
  ORDER_STATUS_UNSHIPPED,
  ORDER_STATUS_PART_SHIPPED,
  ORDER_STATUS_WAIT_RECEIVING,
  ORDER_STATUS_SYS_COMPLETED,
  ORDER_STATUS_USER_COMPLETED,
  ORDER_STATUS_PART_COMPLETED,
  ORDER_STATUS_SYS_COMMENT,
  ORDER_STATUS_USER_COMMENT,
  ORDER_STATUS_SYS_CANCEL,
  ORDER_STATUS_USER_CANCEL,
  ORDER_STATUS_REFUND_CANCEL
} = EWholeOrderStatus

const typeMaps: any[] = [
  [EOrderStatus.PENDING_PAYMENT, [ORDER_STATUS_PENDING_PAYMENT, ORDER_STATUS_PAY_ERROR]],
  [EOrderStatus.UNSHIPPED, [ORDER_STATUS_UNSHIPPED, ORDER_STATUS_PART_SHIPPED]],
  [EOrderStatus.WAIT_RECEIVING, [ORDER_STATUS_WAIT_RECEIVING]],
  [EOrderStatus.PART_COMPLETED, [ORDER_STATUS_SYS_COMPLETED, ORDER_STATUS_USER_COMPLETED, ORDER_STATUS_PART_COMPLETED]],
  [EOrderStatus.COMPLETED, [ORDER_STATUS_SYS_COMMENT, ORDER_STATUS_USER_COMMENT]],
  [EOrderStatus.CANCEL, [ORDER_STATUS_SYS_CANCEL, ORDER_STATUS_USER_CANCEL, ORDER_STATUS_REFUND_CANCEL]]
]

/**
 * 订单状态hook
 */
export default function useOrderTypes(type?: EWholeOrderStatus) {
  // 订单状态转换
  const orderState = useMemo(() => {
    if (type === undefined) {
      return undefined
    }
    const [result] = typeMaps.find(([_, originStatus]) => originStatus.indexOf(type) !== -1) || []
    return result !== undefined ? (result as EOrderStatus) : undefined
  }, [type])

  // 订单中文描述
  const orderText = useMemo(() => (orderState === undefined ? '' : OrderStatusText[orderState]), [orderState])

  /**
   * 订单状态是否匹配
   * @param orderStatus
   * @param status
   * @returns
   */
  function isMatchStatus(orderStatus: EWholeOrderStatus, status: EWholeOrderStatus[] = []) {
    return status.indexOf(orderStatus) !== -1
  }

  return {
    orderState,
    orderText,
    isMatchStatus
  }
}
