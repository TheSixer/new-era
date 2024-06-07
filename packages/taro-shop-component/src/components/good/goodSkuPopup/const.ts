import { IMMPopupProps } from '@wmeimob/taro-design/src/components/popup/const'
import { GoodsSkuStockAndPriceVo, GoodsSkuVO, GoodsVO } from '@wmeimob/taro-api'

export type TGoodSku = GoodsSkuStockAndPriceVo & GoodsSkuVO

export interface IGoodSkuPopupProps extends IMMPopupProps {
  /** 商品详情数据 */
  good: GoodsVO

  skuValues: number[]

  buyCounts?: number

  /** 监听sku变化 */
  onSkuChange(value: number[], sku?: TGoodSku): void

  /** 监听购买数量变化 */
  onCountChange?(count: number): void
}
