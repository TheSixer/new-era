import { IGoodsVoWithActivity } from '@wmeimob/taro-api/src/types/goods/IGoodsVoWithActivity'

export interface IGoodItemProps {
  /** 商品数据 */
  data: IGoodsVoWithActivity

  onClick?(): void
}
