import { createEnumOptions } from '../utils'

/** 运费类型 */
export enum EShippingType {
  /** 买家承担 */
  BuyerBear = 1,
  /** 卖家包邮 */
  SellerBear
}

export const MShippingType = {
  [EShippingType.BuyerBear]: '买家承担',
  [EShippingType.SellerBear]: '卖家包邮'
}

export const OShippingType = createEnumOptions(MShippingType)
