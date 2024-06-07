import { convertEnum } from '@wmeimob/utils/src/enumUtil'

/**
 * 会员卡类型
 */
export enum EMemberCardType {
  /** 付费卡 */
  NeedPay = 1,

  /** 免费卡 */
  Free = 2
}

export const [MMemberCardType, OMemberCardType] = convertEnum([
  [EMemberCardType.Free, '免费卡'],
  [EMemberCardType.NeedPay, '付费卡']
])
