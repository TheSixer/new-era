/**
 * 订单状类型
 */

import { convertEnum } from '@wmeimob/utils/src/enumUtil'

export enum EOrderType {
  /** 普通订单 */
  Normal = 1,

  /** 限时抢购订单 */
  FlashSale,

  /** 积分订单 */
  Integral,

  /** 预售商品订单 */
  PreSale
}

export const [MOrderType, OOrderType] = convertEnum([
  [EOrderType.Normal, '普通订单'],
  [EOrderType.FlashSale, '限时抢购订单'],
  [EOrderType.Integral, '积分订单'],
  [EOrderType.PreSale, '预售商品订单']
])
