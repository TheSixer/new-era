import { convertEnum } from '@wmeimob/utils/src/enumUtil'

/** 运费类型 */
export enum EShippingType {
  /** 买家承担 */
  BuyerBear = 1,
  /** 卖家包邮 */
  SellerBear
}

export const [MShippingType, OShippingType] = convertEnum([
  [EShippingType.BuyerBear, '买家承担'],
  [EShippingType.SellerBear, '卖家包邮']
])
