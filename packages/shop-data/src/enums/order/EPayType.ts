import { convertEnum } from '@wmeimob/utils/src/enumUtil'

/** 支付方式 */
export enum EPayType {
  /** 微信支付 */
  WeiXin = 1,
  /** 支付宝 */
  Alipay,
  /** 线下支付 */
  OffLine,
  /** 余额支付 */
  Balance
}

export const [MPayType, OPayType] = convertEnum([
  [EPayType.WeiXin, '微信支付'],
  [EPayType.Alipay, '支付宝'],
  [EPayType.OffLine, '线下支付'],
  [EPayType.Balance, '余额支付']
])
