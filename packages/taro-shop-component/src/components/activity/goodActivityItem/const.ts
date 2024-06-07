import { ReactNode } from 'react'
import { MarketingActivityGoodsParam } from '@wmeimob/taro-api'

export interface IGoodActivityItemProps {
  hasSign?: boolean
  data: MarketingActivityGoodsParam
  buttonText?: ReactNode
}
