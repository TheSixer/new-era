import { createEnumOptions } from '../utils'

/**
 * 订单商品发货状态
 */
export enum EGoodShipStatus {
  /** 未发货 */
  UnShipped,
  /** 部分发货 */
  PartialShipped,
  /** 发货 */
  Shipped
}

export const MGoodShipStatus = {
  [EGoodShipStatus.UnShipped]: '未发货',
  [EGoodShipStatus.PartialShipped]: '部分发货',
  [EGoodShipStatus.Shipped]: '发货'
}

export const OGoodShipStatus = createEnumOptions(MGoodShipStatus)
