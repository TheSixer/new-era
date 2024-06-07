/** 货物状态 */
export enum OrderRefundGoodsStatusEnum {
  /** 未收到货 */
  UnShipped,
  /** 部分收货 */
  PartialShipped,
  /** 已收到货 */
  Shipped
}
export const OrderRefundGoodsStatusName = {
  [OrderRefundGoodsStatusEnum.UnShipped]: '未收到货',
  [OrderRefundGoodsStatusEnum.PartialShipped]: '部分收货',
  [OrderRefundGoodsStatusEnum.Shipped]: '已收到货'
}

/** 同意/拒绝退款标识 */
export type OrderRefundType = 'agree' | 'refuse'
