import { convertEnum } from '@wmeimob/utils/src/enumUtil'

/** 积分增加方式、积分来源 */
export enum EScorePlusType {
  /** 后台增加 */
  Admin = 1,
  /** 购买商品 */
  BuyGoods,
  /** 订单退回 */
  OrderRefund,
  /** 售后退回 */
  AfterSale
}

export const [MScorePlusType, OScorePlusType] = convertEnum([
  [EScorePlusType.Admin, '后台增加'],
  [EScorePlusType.BuyGoods, '购买商品'],
  [EScorePlusType.OrderRefund, '订单退回'],
  [EScorePlusType.AfterSale, '售后退回']
])
