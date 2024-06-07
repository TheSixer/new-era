import { OrderVO } from '@wmeimob/backend-api/src/request/data-contracts'
import { EOrderStatus } from '@wmeimob/shop-data/src/enums/order/EOrderStatus'

export interface IOrderListProps {}

export interface IOrderVo extends OrderVO {
  queryType: EOrderStatus
}
