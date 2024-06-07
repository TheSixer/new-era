import { convertEnum } from '@wmeimob/utils/src/enumUtil'

/** 权益类型 */
export enum EMemberRightsType {
  /** 商品折扣 */
  GoodsDiscount = 1
}

export const [MMemberRightsType, OMemberRightsType] = convertEnum([[EMemberRightsType.GoodsDiscount, '商品折扣']])
