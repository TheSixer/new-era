import { ECouponType } from '@wmeimob/shop-data/coupon/enums/ECouponType'
import { OrderCalculateResponse, OrderItemsDTO } from '@wmeimob/taro-api'
import { useMemo } from 'react'

/**
 * 优惠券商品
 * @param order
 * @returns
 */
export default function useCouponGoodsItems(order: OrderCalculateResponse) {
  /**
   * 赠品券商品信息
   */
  const giftCouponGoods = useMemo(() => {
    const giftGoods = (order.couponGoodsItems || []).find((item) => item.couponType === ECouponType.Present)
    return !giftGoods?.saleQuantity ? undefined : giftGoods
  }, [order.couponGoodsItems])

  /**
   * 兑换券券商品信息
   */
  const exchangeCouponGoods = useMemo<OrderItemsDTO | undefined>(() => {
    const giftGoods = (order.couponGoodsItems || []).find((item) => item.couponType === ECouponType.Exchange)
    return giftGoods
  }, [order.couponGoodsItems])

  return {
    /** 赠品券商品信息 */
    giftCouponGoods,
    /** 兑换券券商品信息 */
    exchangeCouponGoods
  }
}
