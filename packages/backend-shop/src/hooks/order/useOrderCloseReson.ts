import { useMemo } from 'react'
import { EWholeOrderStatus } from '~/enums/order/EWholeOrderStatus'

/**
 *
 * 获取订单关闭关闭
 *
 * @param type
 * @param closedReason
 * @returns
 */
export default function useOrderCloseReson(type?: EWholeOrderStatus, closedReason?: string) {
  return useMemo(() => {
    return closedReason
      ? closedReason
      : type
      ? {
          [EWholeOrderStatus.ORDER_STATUS_SYS_CANCEL]: '超时自动取消',
          [EWholeOrderStatus.ORDER_STATUS_USER_CANCEL]: '主动取消',
          [EWholeOrderStatus.ORDER_STATUS_REFUND_CANCEL]: '全部退货退款'
        }[type] || ''
      : ''
  }, [type, closedReason])
}
