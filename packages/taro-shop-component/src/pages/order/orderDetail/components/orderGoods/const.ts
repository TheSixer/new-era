import { EOrderStatus } from '../../../../../enums/EOrderStatus'
import { OrderVO } from '@wmeimob/taro-api'

export interface IOrderGoodsProps {
  order: OrderVO

  orderState?: EOrderStatus
}
