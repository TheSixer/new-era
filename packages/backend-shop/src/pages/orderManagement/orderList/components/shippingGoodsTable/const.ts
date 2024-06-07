import { OrderVO } from '@wmeimob/backend-api'

export interface IShippingGoodsTableProps {
  value?: any[]

  isSplit: boolean

  order?: OrderVO

  onChange?: (data: any[]) => void
}
