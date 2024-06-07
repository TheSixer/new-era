import { CSSProperties, ReactNode } from 'react'
import { OrderItemsDTO, OrderItemsVO, RefundItemDto } from '@wmeimob/taro-api'

export interface IOrderGoodProps {
  /**
   * 数据
   * 支持三种数据结构
   */
  data?: OrderItemsVO | RefundItemDto | OrderItemsDTO

  className?: string

  style?: string | CSSProperties

  /** 是否显示售价，默认 true */
  showPrice?: boolean

  /** 是否显示市场价，默认 true */
  showMarketPrice?: boolean

  /** 是否显示数量，默认 true */
  showQuantity?: boolean
  /** 是否显示包邮文本 */
  showFreeShipping?: boolean

  /** 自定义渲染售价与市场价 */
  renderPrice?: ReactNode

  /** 字体颜色 */
  color?: string

  /** 整个商品信息区点击回调 */
  onClick?(): void
}

export interface IOrderGoodData {
  /** 封面图 */
  coverImg?: string

  /** 商品名称 */
  goodsName?: string

  /** 规格名称 */
  skuName?: string

  /** 价格 */
  price?: number

  /** 市场价 */
  marketPrice?: number

  buyCounts?: number
}
