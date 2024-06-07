import { createContext, useContext, useMemo, useState } from 'react'
import { GoodsVO, MarketingActivityDto } from '@wmeimob/taro-api'
import { appName, isWebApp } from '../../../config'
import { routeNames } from '../../../routes'

const GoodDetailContext = createContext({ good: {} } as ReturnType<typeof createGoodDetailValue>)

export type GoodDetailContextValue = ReturnType<typeof createGoodDetailValue>

export function createGoodDetailValue() {
  /** 显示活动弹窗 */
  const [showActivityPop, setShowActivityPop] = useState(false)

  /** 显示分享弹窗 */
  const [showSharePop, setShowSharePop] = useState(false)

  /** 活动弹窗信息 */
  const [activityPopDto, setSctivityPopDto] = useState<MarketingActivityDto>({})
  /** 商品数据 */
  const [good, setGood] = useState<GoodsVO>({}) //
  /** 商品是否已下架 */
  const [isOff, setIsOff] = useState(false)

  const contentValue = useMemo(
    () => ({
      handleShareClick,
      good,
      showActivityPop,
      activityPopDto,
      showSharePop,
      isOff,
      setIsOff,
      setShowSharePop,
      setShowActivityPop,
      setGood,
      handleWebAppAppShare,
      setSctivityPopDto
    }),
    [showActivityPop, activityPopDto, good, showSharePop, isOff]
  )

  /**
   * 点击外层的分享
   */
  function handleShareClick() {
    if (isWebApp) {
      handleWebAppAppShare()
    } else {
      setShowSharePop(true)
    }
  }

  function handleWebAppAppShare() {
    const opts = {
      app_name: appName,
      title: good.goodsName,
      content: ' ',
      image_url: good.coverImg,
      path: routeNames.goodsGoodDetail + `?goodsNo=${good.goodsNo}`,
      url: routeNames.goodsGoodDetail + `?goodsNo=${good.goodsNo}`,
      poster_url: good.coverImg
    } // 判断方法是否定义
    if (typeof m1905Client !== 'undefined' && typeof m1905Client.callShareWmWeb === 'function') {
      // 调用APP分享方法
      m1905Client.callShareWmWeb(JSON.stringify(opts))
    }
    console.log('opts', opts)
  }

  return contentValue
}

export default GoodDetailContext
