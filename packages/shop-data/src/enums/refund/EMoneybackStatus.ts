import { convertEnum } from '@wmeimob/utils/src/enumUtil'

/**
 * 订单售后状态
 */
export enum EMoneybackStatus {
  /** 未处理 */
  Untreated,
  /** 已退款 */
  refunded,
  /** 拒绝退款 */
  Refused
}

export const [MMoneybackStatus, OEMoneybackStatus] = convertEnum([
  [EMoneybackStatus.Untreated, '未处理'],
  [EMoneybackStatus.refunded, '已退款'],
  [EMoneybackStatus.Refused, '拒绝退款']
])
