import { convertEnum } from '@wmeimob/utils/src/enumUtil'

/**
 * 商品货物发货状态
 *
 * 从订单状态和EGoodShipStatus衍生而来
 */
export enum EGoodShippingStatus {
  /** 未发货 */
  UnShipped,
  /** 部分发货 */
  PartialShipped,
  /** 发货 */
  Shipped,

  /** 已收货 */
  Done = 99
}

export const [MGoodShippingStatus, OGoodShippingStatus] = convertEnum([
  [EGoodShippingStatus.UnShipped, '待发货'],
  [EGoodShippingStatus.PartialShipped, '待收货'],
  [EGoodShippingStatus.Shipped, '待收货'],
  [EGoodShippingStatus.Done, '已收货']
])
