import { EOrderStatus } from '@wmeimob/shop-data/src/enums/order/EOrderStatus'
import { OrderVO } from '@wmeimob/backend-api'

export interface IOrderListProps {}

export interface IOrderVo extends OrderVO {
  queryType: EOrderStatus
}
