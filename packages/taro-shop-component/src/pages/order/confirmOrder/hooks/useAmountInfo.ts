import { ECouponType } from '@wmeimob/shop-data/coupon/enums/ECouponType'
import { EActivityType } from '@wmeimob/shop-data/src/enums/activity/EActivityType'
import { OrderCalculateResponse } from '@wmeimob/taro-api'
import { mmAdds } from '@wmeimob/utils/src/mmCurrency'
import { useMemo } from 'react'

export function useAmountInfo(order: OrderCalculateResponse) {
  /** 商品总金额 */
  const goodsAmount = order.goodsAmount || 0

  /** 抵扣前运费（既 运费模板计算出的运费，未减免任何包邮活动等费用） */
  const realFreightAmount = order.realFreightAmount || 0

  /** 支付金额 */
  const payAmount = order.payAmount || 0

  /** 使用积分抵扣金额 */
  const scoreDiscountAmount = order.scoreBO?.discountAmount || 0

  /** 优惠券减免金额。 是从活动列表里面取出来的 */
  const couponAmount = useMemo(
    () =>
      order.marketingActivityList?.find(
        (item) => item.marketingType === EActivityType.Coupon && [ECouponType.Discount, ECouponType.Deduction].includes(item.discountType!)
      )?.discountAmount ?? 0,
    [order]
  )

  /** 会员卡减免金额 */
  const memberDiscount = useMemo(
    () => order.marketingActivityList?.find((item) => item.marketingType === EActivityType.MemberDiscount)?.discountAmount ?? 0,
    [order]
  )

  /** 满减满折总减免金额。不同商品可使本次计算订单中同时存在满减+满折 */
  const deductionActivityDiscountAmount = useMemo(
    () =>
      order.marketingActivityList?.reduce((total, activity) => {
        const hit = [EActivityType.Deduction, EActivityType.Discount].indexOf(activity.marketingType!) !== -1
        return hit ? mmAdds(total, activity.discountAmount) : total
      }, 0) || 0,
    [order]
  )

  /** 免邮活动减免金额。不同商品可使本次计算订单中同时存在多个不同的包邮活动 */
  const freeShippingDiscountAmount = useMemo(
    () =>
    order.marketingActivityList?.reduce((total, activity) => {
      const hit = activity.marketingType === EActivityType.FreeShipping
      return hit ? mmAdds(total, activity.discountAmount) : total
    }, 0) || 0,
    [order]
  )

  /** 免邮券活动减免金额。 */
  const freeShippingCouponDiscountAmount = useMemo(
    () =>
      order.marketingActivityList?.find((activity) => activity.marketingType === EActivityType.Coupon && activity.discountType === ECouponType.FreeShipping)
        ?.discountAmount ?? 0,
    [order]
  )

  /** 兑换券活动减免金额。 */
  const exchangeCouponDiscountAmount = useMemo(
    () =>
      order.marketingActivityList?.find((activity) => activity.marketingType === EActivityType.Coupon && activity.discountType === ECouponType.Exchange)
        ?.discountAmount ?? 0,
    [order]
  )

  return {
    /** 商品总金额 */
    goodsAmount,
    /** 抵扣前运费（既 运费模板计算出的运费，未减免任何包邮活动等费用） */
    realFreightAmount,
    /** 支付金额 */
    payAmount,
    /** 使用积分抵扣金额 */
    scoreDiscountAmount,
    /** 优惠券减免金额。 是从活动列表里面取出来的 */
    couponAmount,
    /** 会员卡减免金额 */
    memberDiscount,
    /** 满减满折总减免金额。不同商品可使本次计算订单中同时存在满减+满折 */
    deductionActivityDiscountAmount,
    /** 免邮活动减免金额。不同商品可使本次计算订单中同时存在多个不同的包邮活动 */
    freeShippingDiscountAmount,
    /** 免邮券活动减免金额。 */
    freeShippingCouponDiscountAmount,
    /** 兑换券活动减免金额。 */
    exchangeCouponDiscountAmount
  }
}
