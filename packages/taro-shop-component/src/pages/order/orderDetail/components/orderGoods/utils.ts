import { EOrderStatus } from '../../../../../enums/EOrderStatus'
import { EOrderGoodsRefundState } from '../../../../../enums/ERefund'
import { OrderItemsVO, OrderVO } from '@wmeimob/taro-api'

/** 该商品是否可申请售后 */
export function canGoodsAfterSales(orderGoods: OrderItemsVO, orderStatus: EOrderStatus, order: OrderVO) {
  // 超过后台配置【收货后可维权时间】后，不允许售后
  if (order.closeRefund) {
    return false
  }

  /**
   * 申请售后
   * 订单在 待收货 待发货以及交易完成时可以售后（但超过后台配置【收货后可维权时间】后，不允许售后）
   * gift 表示赠品 赠品不可售后
   */
  const orderStatusHit = [EOrderStatus.WAIT_RECEIVING, EOrderStatus.UNSHIPPED, EOrderStatus.PART_COMPLETED, EOrderStatus.COMPLETED].includes(orderStatus)
  const orderAfterSaleStatusHit = [EOrderGoodsRefundState.UN_APPLY, EOrderGoodsRefundState.APPLY_FAIL].includes(orderGoods.refundStatus!)
  const canAfterSales = !orderGoods.gift && orderStatusHit && orderAfterSaleStatusHit

  return canAfterSales
}
