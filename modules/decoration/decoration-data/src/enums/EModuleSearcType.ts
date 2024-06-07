import { convertEnum } from '@wmeimob/utils/src/enumUtil'

/**
 * 搜索模块类型
 */
export enum EModuleSearcType {
  /** 固定单词 */
  Fixed,
  /** 轮播 */
  Swiper
}

export const [MModuleSearcType, OModuleSearcType] = convertEnum([
  [EModuleSearcType.Fixed, '固定'],
  [EModuleSearcType.Swiper, '轮播']
])
