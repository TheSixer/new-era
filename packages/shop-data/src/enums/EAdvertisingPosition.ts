import { convertEnum } from '@wmeimob/utils/src/enumUtil'

/** 广告显示位置 */
export enum EAdvertisingPosition {
  /** 个人中心 */
  Person = 'Person',
  /** 支付完成页 */
  PaySuccess = 'PaySuccess'
}

export const [MAdvertisingPosition, OAdvertisingPosition] = convertEnum([
  [EAdvertisingPosition.Person, '个人中心'],
  [EAdvertisingPosition.PaySuccess, '支付完成页']
])
