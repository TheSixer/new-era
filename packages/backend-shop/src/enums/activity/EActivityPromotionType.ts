import { createEnumOptions } from '../utils'

/** 活动优惠计算方式 */
export enum EActivityPromotionType {
  /** 阶梯优惠 */
  Step,

  /** 循环优惠 */
  Circles
}

export const MActivityPromotionType = {
  [EActivityPromotionType.Step]: '阶梯优惠',
  [EActivityPromotionType.Circles]: '循环优惠'
}

export const OActivityPromotionType = createEnumOptions(MActivityPromotionType)
