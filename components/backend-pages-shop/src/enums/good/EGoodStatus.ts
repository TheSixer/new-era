import { convertEnum } from '@wmeimob/utils/src/enumUtil'

/**
 * 商品状态
 */
export enum EGoodStatus {
  /** 未上架 */
  unShelved = '0',

  /** 上架 */
  shelved = '1'
}

export const [MGoodStatus, OGoodStatus] = convertEnum([
  [EGoodStatus.shelved, '上架'],
  [EGoodStatus.unShelved, '下架']
])
