import { EOrderStatus } from '../../../../../enums/EOrderStatus'
import { OrderVO } from '@wmeimob/taro-api'

export interface IDetailStatusProps {
  order: OrderVO

  orderState?: EOrderStatus
}
