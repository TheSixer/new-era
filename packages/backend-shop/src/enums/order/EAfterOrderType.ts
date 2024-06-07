/** 售后订单类型 */
export enum EAfterOrderType {
  /** 普通订单 */
  Normal,

  /** 限时抢购 */
  FlashSale
}

export const AfterOrderTypeName = {
  [EAfterOrderType.Normal]: '普通订单',

  [EAfterOrderType.FlashSale]: '限时抢购'
}
