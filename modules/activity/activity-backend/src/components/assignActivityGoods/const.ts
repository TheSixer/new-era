import { GoodsVO, MarketingActivityGoodsParam } from '@wmeimob/backend-api'
import { IChooseGoodsDrawerProps } from '@wmeimob/backend-pages-shop/src/components/goods/chooseGoodsDrawer'
import { CardProps } from 'antd'
import { MMProColumns } from 'MMProType'

export interface IAssignActivityGoodsProps {
  value?: MarketingActivityGoodsParam[]

  cardProps?: CardProps

  goodsDrawerProps?: Partial<IChooseGoodsDrawerProps>

  disabled?: boolean

  concatColumns?: (operates: {
    /** 移除 */
    remove(goodsNo: string): void
  }) => MMProColumns<any>[]

  onChange?(value: GoodsVO[]): void
}
