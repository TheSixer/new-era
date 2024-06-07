import { IGoodListProps } from '../goodList/const'

export interface IGoodRecommendProps {
  /** 标题 */
  title?: string

  /** 商品列表 */
  list: any[]

  /** 点击商品 */
  onClick?: IGoodListProps['onClick']
}
