import { convertEnum } from '@wmeimob/utils/src/enumUtil'

/** 商品类型 */
export enum EGoodsType {
  /** 普通商品 */
  General,
  /** 积分商品 */
  Integral
}

export const [MGoodsType, OGoodsType] = convertEnum([
  [EGoodsType.General, '普通商品'],
  [EGoodsType.Integral, '积分商品']
])
