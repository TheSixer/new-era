import { convertEnum } from '@wmeimob/utils/src/enumUtil'

/**
 * 活动优惠计算方式
 */
export enum EActivityPromotionType {
  /** 阶梯优惠 */
  Step,

  /** 循环优惠 */
  Circles
}

export const [MActivityPromotionType, OActivityPromotionType] = convertEnum([
  [EActivityPromotionType.Step, '阶梯优惠'],
  [EActivityPromotionType.Circles, '循环优惠']
])
