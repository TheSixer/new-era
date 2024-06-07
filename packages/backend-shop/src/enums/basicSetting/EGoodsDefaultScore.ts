import { convertEnum } from '@wmeimob/utils/src/enumUtil';

/** 商品积分比例 启用禁用 */
export enum EGoodsDefaultScore {
  /** 禁用 */
  Disable,
  /** 启用 */
  Enable
}

export const [MGoodsDefaultScore, OGoodsDefaultScore] = convertEnum([
  [EGoodsDefaultScore.Disable, '禁用'],
  [EGoodsDefaultScore.Enable, '启用']
])
