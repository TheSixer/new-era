import { convertEnum } from '@wmeimob/utils/src/enumUtil'

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

/** 订单商品发货状态 */
export const [MGoodShipStatus, OGoodShipStatus] = convertEnum([
  [EGoodShipStatus.UnShipped, '未发货'],
  [EGoodShipStatus.PartialShipped, '部分发货'],
  [EGoodShipStatus.Shipped, '发货']
])
