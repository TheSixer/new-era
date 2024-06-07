import { OrderItemsVO } from '@wmeimob/backend-api/src/request/data-contracts'
import { useMemo } from 'react'
import { EGoodShipStatus } from '@wmeimob-modules/order-data/enums/EGoodShipStatus'

/**
 * 订单中商品发货状态hook
 * @param items
 * @returns
 */
export default function useOrderGoodsShipStatus(items?: OrderItemsVO[]) {
  /**
   * 未发货商品
   */
  const unShippedGoods = useMemo(() => {
    return (items || []).filter((item) => item.shipingStatus === EGoodShipStatus.UnShipped)
  }, [items])

  /**
   * 已发货商品
   */
  const shippedGoods = useMemo(() => {
    return (items || []).filter((item) => item.shipingStatus === EGoodShipStatus.Shipped)
  }, [items])

  return {
    unShippedGoods,
    unShippedGoodsNum: unShippedGoods.length,
    shippedGoods,
    shippedGoodsNum: shippedGoods.length
  }
}
