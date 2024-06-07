import { convertEnum } from '@wmeimob/utils/src/enumUtil'

/** 权益适用范围 */
export enum EMemberRangeType {
  /** 全部商品 */
  AllGoods = 1,
  /** 部分商品 */
  PartGoods = 2
}

export const [MMemberRangeType, OMemberRangeType] = convertEnum([
  [EMemberRangeType.AllGoods, '全部商品'],
  [EMemberRangeType.PartGoods, '部分商品']
])
