import { IGoodsVoWithActivity } from '@wmeimob/taro-api/src/types/goods/IGoodsVoWithActivity'

export interface IGoodListProps<DataType = any> {
  /** 商品列表 */
  list: IGoodsVoWithActivity[]
  /** 类型 */
  type?: EGoodListType

  onClick?(data: DataType, index: number): void
}

/**
 * 商品列表显示类型
 */
export enum EGoodListType {
  /** 网格卡片 */
  Grid,
  /** 列表类型 */
  Item
}
