import { OrderVO } from '@wmeimob/backend-api/src/request/data-contracts'

export interface IShippingGoodsTableProps {
  value?: any[]

  isSplit: boolean

  order?: OrderVO

  onChange?: (data: any[]) => void
}
