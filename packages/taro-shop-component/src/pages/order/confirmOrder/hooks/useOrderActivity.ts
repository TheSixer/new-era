import { EActivityConditionType } from '@wmeimob/shop-data/src/enums/activity/EActivityConditionType'
import { EActivityPromotionType } from '@wmeimob/shop-data/src/enums/activity/EActivityPromotionType'
import { times } from 'number-precision'
import { useMemo } from 'react'
import { EActivityType } from '@wmeimob/shop-data/src/enums/activity/EActivityType'
import { ECouponType } from '@wmeimob/shop-data/coupon/enums/ECouponType'
import mmCurrenty from '@wmeimob/utils/src/mmCurrency'
import { OrderMasterMarketingDto } from '@wmeimob/taro-api'

/**
 * 订单中 活动信息hook
 */
export function useOrderActivity(params: { activityList?: OrderMasterMarketingDto[] }) {
  const { activityList: marketingActivityList } = params

  /** 本次计算订单中的满减满折(可能有多个)活动 */
  const fullMinusDiscountActivities = useMemo(() => {
    if (!marketingActivityList?.length) return []

    const target = [EActivityType.Deduction, EActivityType.Discount]
    return marketingActivityList.filter((item) => target.includes(item.marketingType!))
  }, [marketingActivityList])

  /** cell 显示的文案(可能多行) */
  const activityCellsText = useMemo(() => {
    if (!fullMinusDiscountActivities.length) return []

    const res = (activity) => {
      // 循环优惠
      const isCircle = activity.promotionType === EActivityPromotionType.Circles
      const circleText = isCircle ? '每' : ''

      const condition = {
        [EActivityConditionType.Packages]: activity.con + '件', // 满x件
        [EActivityConditionType.Price]: activity.con // 满x元
      }[activity.promotionConditionType!]

      // 只处理满减满折，其他的在上面 activity useMemo 已过滤
      const text: string = {
        // 满折
        [EActivityType.Discount]: `${circleText}满${condition}打${times(activity.promo || 0, 10)}折`,
        // 满减
        [EActivityType.Deduction]: `${circleText}满${condition}减${activity.promo}`
      }[activity.marketingType!]

      return text
    }

    return fullMinusDiscountActivities.map(res)
  }, [fullMinusDiscountActivities])

  /**
   * 包邮活动文本描述
   * 不同商品会产生不同包邮活动
   */
  const freeShippingActivityCellsText = useMemo(() => {
    const freeShipping = marketingActivityList?.filter(({ marketingType }) => marketingType === EActivityType.FreeShipping) || []

    return freeShipping.map((activity) => ({
      name: activity.relName,
      discountAmount: `-${mmCurrenty(activity.discountAmount)}`
    }))
  }, [marketingActivityList])

  /**
   * 免邮券文本描述
   */
  const freeShippingCouponText = useMemo(() => {
    const result = marketingActivityList?.find(
      ({ marketingType, discountType }) => marketingType === EActivityType.Coupon && discountType === ECouponType.FreeShipping
    )
    return result ? `-${mmCurrenty(result.discountAmount)}` : ''
  }, [marketingActivityList])

  /**
   * 兑换券券文本描述
   */
  const exchangeCouponText = useMemo(() => {
    const result = marketingActivityList?.find(
      ({ marketingType, discountType }) => marketingType === EActivityType.Coupon && discountType === ECouponType.Exchange
    )
    return result ? `-${mmCurrenty(result.discountAmount)}` : ''
  }, [marketingActivityList])

  /**
   * 赠品券券文本描述
   */
  const giftCouponText = useMemo(() => {
    const result = marketingActivityList?.find(
      ({ marketingType, discountType }) => marketingType === EActivityType.Coupon && discountType === ECouponType.Present
    )
    return result ? result.relName : ''
  }, [marketingActivityList])

  return {
    /**
     * 是否显示满减满折栏
     */
    isShowFullMinusDiscount: !!fullMinusDiscountActivities.length,
    /**
     * 满减满折活动文本描述
     */
    activityCellsText,
    /**
     * 满减满折活动列表
     */
    fullMinusDiscountActivities,
    /**
     * 包邮活动文本描述
     */
    freeShippingActivityCellsText,
    /** 免邮券文本描述 */
    freeShippingCouponText,
    /** 兑换券券文本描述 */
    exchangeCouponText,
    /** 赠品券券文本描述 */
    giftCouponText
  }
}
