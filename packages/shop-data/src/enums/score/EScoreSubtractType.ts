import { convertEnum } from '@wmeimob/utils/src/enumUtil';

/** 积分增加方式、积分来源 */
export enum EScoreSubtractType {
  /** 后台扣减 */
  Admin = 1,
  /** 积分商品抵扣 */
  ScoreGoods
}

export const [MScoreSubtractType, OScoreSubtractType] = convertEnum([
  [EScoreSubtractType.Admin, '后台扣减'],
  [EScoreSubtractType.ScoreGoods, '积分商品抵扣']
])
