import { convertEnum } from '@wmeimob/utils/src/enumUtil'
/**
 * 运费计价类型
 * 运费计价方式 1总量 2 件数 3体积
 * */
export enum EValuationType {
  /**
   * 根据件数
   */
  AsQty = 2,

  /**
   * 根据重量
   */
  AsWeight = 1,

  /**
   * 根据体积
   */
  AsVolume = 3
}

export const [MValuationType, OValuationType] = convertEnum([
  [EValuationType.AsQty, '按件计费'],
  [EValuationType.AsWeight, '按重量计费'],
  [EValuationType.AsVolume, '按体积计费']
])
