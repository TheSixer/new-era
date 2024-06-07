import { EOrderStatus } from '../../../../../enums/EOrderStatus'
import { OrderVO } from '@wmeimob/taro-api'

export interface IOrderInfoProps {
  order: OrderVO

  orderState?: EOrderStatus
}
