import { convertEnum } from '@wmeimob/utils/src/enumUtil'

/**
 * 优惠券适用范围
 *
 * 0 全商品(店铺) 1 指定商品(店铺) 2 全场(平台) 3 指定品牌(平台) 4 指定类目(平台)
 */
export enum ECouponAcceptGoodsType {
  /** 全商品(店铺) */
  All,
  /** 指定商品(店铺) */
  AssignGood,
  /** 全场(平台) */
  AllPlatform,
  /** 指定品牌(平台) */
  AssignBrand,
  /** 指定类目(平台) */
  AssignCate
}

export const [MCouponAcceptGoodsType, OCouponAcceptGoodsType] = convertEnum([
  [ECouponAcceptGoodsType.All, '全商品'],
  [ECouponAcceptGoodsType.AssignGood, '指定商品'],
  [ECouponAcceptGoodsType.AllPlatform, '全场'],
  [ECouponAcceptGoodsType.AssignBrand, '指定品牌'],
  [ECouponAcceptGoodsType.AssignCate, '指定类目']
])
