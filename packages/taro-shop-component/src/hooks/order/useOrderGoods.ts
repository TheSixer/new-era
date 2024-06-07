import { EActivityType } from '@wmeimob/shop-data/src/enums/activity/EActivityType'
import { EOrderItemType } from '@wmeimob/shop-data/src/enums/order/EOrderItemType'
import { useMemo } from 'react'
import { EOrderGoodsTagType } from '../../components/order/orderGoodsTag'
import { OrderVO } from '@wmeimob/taro-api'

/**
 * 订单商品
 *
 * 对订单商品进行排序操作。将赠品放到列表最下面
 *
 * @export
 * @param {OrderItemsVO[]} [items]
 * @return {*}
 */
export default function useOrderGoods(order?: OrderVO) {
  /** 商品 */
  const goods = useMemo(() => {
    const { items: list = [] } = order || {}

    return list.map((item) => {
      const { orderItemType, orderItemMarketingList = [] } = item
      let orderGoodsTag: EOrderGoodsTagType | undefined

      orderGoodsTag = {
        [EOrderItemType.Gift]: EOrderGoodsTagType.Gift,
        [EOrderItemType.Exchange]: EOrderGoodsTagType.ExchangeCoupon,
        [EOrderItemType.GiftCoupon]: EOrderGoodsTagType.GiftCoupon
      }[orderItemType!]

      const isPreSale = orderItemMarketingList.some((activity) => activity.marketingType === EActivityType.PreSale)

      if (orderGoodsTag === undefined && isPreSale) {
        orderGoodsTag = EOrderGoodsTagType.PreSale
      }

      return { ...item, orderGoodsTag }
    })
  }, [order])

  return [goods]
}
