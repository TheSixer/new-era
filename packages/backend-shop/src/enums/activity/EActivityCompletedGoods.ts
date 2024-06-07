import { convertEnum } from '@wmeimob/utils/src/enumUtil'

/**
 * 活动结束商品状态
 */
export enum EActivityCompletedGoods {
  /** 恢复普通商品 */
  Normal = 0,

  /** 下架 */
  Undercarriage = 1
}

export const [MActivityCompletedGoods, OActivityCompletedGoods] = convertEnum([
  [EActivityCompletedGoods.Normal, '恢复普通商品'],
  [EActivityCompletedGoods.Undercarriage, '下架']
])
