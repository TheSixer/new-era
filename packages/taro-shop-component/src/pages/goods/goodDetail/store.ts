import { getEarlyGoodsActivity, isFlashSaleStatus, isPreSaleStatus } from '@wmeimob/shop-data/goods/utils/activities'
import { EActivityType } from '@wmeimob/shop-data/src/enums/activity/EActivityType'
import { useContext, useMemo } from 'react'
import GoodDetailContext from './context'

/**
 * 需要倒计时的活动
 *
 * 限时抢购、预售
 */
export const useCountdownActivity = () => {
  const { good: goods } = useContext(GoodDetailContext)

  const activities = useMemo(() => goods.marketingActivityList || [], [goods])

  const earlyActivity = useMemo(() => getEarlyGoodsActivity(activities, [EActivityType.FlashSale, EActivityType.PreSale]), [activities])
  // const preSale = useMemo(() => getEarlyGoodsActivity(activities, [EActivityType.PreSale]), [activities])

  // 仅用于底部按钮判断，因为倒计时在活动未开始且存在
  const inFlashSale = useMemo(() => isFlashSaleStatus(activities), [activities])

  // 用于底部按钮判断和倒计时显示
  const inPreSale = useMemo(() => isPreSaleStatus(activities), [activities])

  const earlyIsFlashSale = earlyActivity?.activityType === EActivityType.FlashSale

  const earlyIsPreSale = earlyActivity?.activityType === EActivityType.PreSale

  return {
    /** 该商品所有活动 */
    activities,

    /** 当前最早的 预售或限时抢购 */
    earlyActivity,

    earlyIsFlashSale,
    earlyIsPreSale,

    // /** 商品限时抢购活动信息 */
    // flashSale,

    /**
     * 当前是否是限时抢购状态
     * 存在限时抢购活动并且没有进行中的满减满折营销活动
     */
    inFlashSale,

    // /** 预售活动信息 */
    // preSale,

    /**
     * 当前是否是限时抢购状态
     * 注：预售活动结束后商品会直接下架
     */
    inPreSale
  }
}
