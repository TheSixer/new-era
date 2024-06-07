import { convertEnum } from '@wmeimob/utils/src/enumUtil'

/**
 * 商品积分使用
 */
export enum EGoodScore {
  /** 禁止使用 */
  Disabled,
  /** 允许使用 */
  Allow
}

export const [MGoodScore, OGoodScore] = convertEnum([
  [EGoodScore.Allow, '允许使用'],
  [EGoodScore.Disabled, '禁止使用']
])
