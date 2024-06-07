import { CardProps } from 'antd'
import { MarketingActivityGoodsParam } from '@wmeimob/backend-api'

export interface IAssignTimeBuyActivityGoodsProps {
  value: MarketingActivityGoodsParam[]

  cardProps?: CardProps

  disabled?: boolean

  onChange(value: MarketingActivityGoodsParam[]): void
}
