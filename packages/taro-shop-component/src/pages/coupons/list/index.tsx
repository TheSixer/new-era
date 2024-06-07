import Taro from '@tarojs/taro'
import { FC, memo, useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import styles from './index.module.less'
import { ECouponHistoryQueryType, EStatus, ICouponMineProps } from './const'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
// import MMIconFont from '@wmeimob/taro-design/src/components/icon-font'
// import MMIconFontName from '@wmeimob/taro-design/src/components/icon-font/const'
// import { routeNames } from '../../../routes'
import CouponItem from '../../../components/couponItem'
import { api } from '@wmeimob/taro-api'
import useMMPullToRefresh from '@wmeimob/taro-design/src/components/pull-to-refresh/useMMPullToRefresh'
import MMEmpty from '@wmeimob/taro-design/src/components/empty'
import MMPullToRefresh from '@wmeimob/taro-design/src/components/pull-to-refresh'
import MMFixHead from '@wmeimob/taro-design/src/components/fix-head'
import classNames from 'classnames'
import { ECouponUseStatus, MCouponUseStatus } from '../../../enums/coupon/ECouponUseStatus'
import { MemCouponVo } from '@wmeimob/taro-api'
import { ECouponAcceptGoodsType } from '@wmeimob/shop-data/coupon/enums/ECouponAcceptGoodsType'
import { routeNames } from '../../../routes'
import { useSuperLock } from '@wmeimob/utils/src/hooks/useSuperLock'
import { useSetAtom } from 'jotai'
import { couponGoodNoAtom } from '../couponGoods/store'
import { useToast } from '@wmeimob/taro-design'
import icon_empty from '../images/icon_empty.png'
import { navByLink } from '../../../components/pageModules/utils'
import { EJumpType } from '@wmeimob-modules/decoration-data/src/enums/EJumpType'

/**
 * 优惠券组件
 *
 * 支持tab和单页面两种模式
 *
 *
 * @return {*}
 */
const Component: FC<ICouponMineProps> = () => {
  const { tabs, activeValue, setActiveValue } = useCopuonTab()

  const { info, pullToRefresh } = useCouponList(activeValue)

  const { goToUse } = useCouponUse()

  return (
    <View className={styles.couponMineStyle}>
      {/*<MMFixHead>*/}
        <MMNavigation title="优惠券" />
        <View className={styles.head}>
          {tabs.map((tab) => (
            <View
              key={tab.value}
              className={classNames(styles.head_item, activeValue === tab.value && styles.active)}
              onClick={() => setActiveValue(tab.value)}
            >
              {tab.label}
            </View>
          ))}
        </View>
      {/*</MMFixHead>*/}

      <MMPullToRefresh
        {...pullToRefresh}
        empty={info.isEmpty && <MMEmpty src={icon_empty} imgStyle={{ width: 160, height: 160 }} text="暂无优惠券" fixed />}
        /** 历史优惠券跳转 */
        // renderFooter={
        //   <View className={styles.history}>
        //     <View onClick={() => Taro.navigateTo({ url: routeNames.couponsHistory })}>历史优惠券</View>
        //     <MMIconFont value={MMIconFontName.Next} size={10} color={styles.gray5} />
        //   </View>
        // }
      >
        <View className={styles.commentsBox}>
          {info.list.map((item) => {
            // 未使用的优惠券等同于已过期
            let rightText = '去使用'
            const disabled = activeValue !== EStatus.CanUse
            if (activeValue !== EStatus.CanUse) {
              rightText = item.useStatus === ECouponUseStatus.NotUse ? MCouponUseStatus[ECouponUseStatus.OutDate] : MCouponUseStatus[item.useStatus!]
            }
            return <CouponItem data={item} key={item.id} disabled={disabled} rightText={rightText} onClickRight={() => goToUse(item)} />
          })}
        </View>
      </MMPullToRefresh>
    </View>
  )
}

const CouponMine = memo(Component)
export default CouponMine

/**
 * 优惠券tab
 * @returns
 */
function useCopuonTab() {
  const [activeValue, setActiveValue] = useState(EStatus.CanUse)
  const [tabs] = useState([
    { label: '可使用', value: EStatus.CanUse },
    { label: '已使用', value: EStatus.Used },
    { label: '已过期', value: EStatus.InValid }
  ])

  return {
    tabs,
    activeValue,
    setActiveValue
  }
}

/**
 * 优惠券列表查询逻辑
 * @param status
 * @returns
 */
function useCouponList(status = EStatus.CanUse) {
  /**
   * 可使用优惠券
   */
  const [info, pullToRefresh] = useMMPullToRefresh({
    initRequest: false,
    getData: (pa) => api['/wechat/web/memCoupon/my_GET'](pa as any)
  })

  /**
   * 已使用优惠券
   */
  const [useInfo, usedPullToRefresh] = useMMPullToRefresh({
    initRequest: false,
    getData: (pa) => api['/wechat/web/memCoupon/myHistory_GET']({ ...pa, status: ECouponHistoryQueryType.Used })
  })

  /** 已过期优惠券 */
  const [inValidInfo, InvalidPullToRefresh] = useMMPullToRefresh({
    initRequest: false,
    getData: (pa) => api['/wechat/web/memCoupon/myHistory_GET']({ ...pa, status: ECouponHistoryQueryType.InValid })
  })

  const list = {
    [EStatus.CanUse]: pullToRefresh,
    [EStatus.Used]: usedPullToRefresh,
    [EStatus.InValid]: InvalidPullToRefresh
  }

  useEffect(() => {
    list[status].onRefresh()
  }, [status])

  return {
    info: {
      [EStatus.CanUse]: info,
      [EStatus.Used]: useInfo,
      [EStatus.InValid]: inValidInfo
    }[status]!,

    pullToRefresh: {
      [EStatus.CanUse]: pullToRefresh,
      [EStatus.Used]: usedPullToRefresh,
      [EStatus.InValid]: InvalidPullToRefresh
    }[status]!
  }
}

/**
 * 优惠券去使用逻辑
 * @returns
 */
function useCouponUse() {
  const [toast] = useToast()
  const setCouponGoodNo = useSetAtom(couponGoodNoAtom)

  /**
   * 点击去使用
   *
   * @description 如果是适用全部商品跳转至商品列表；如果适用一个商品直接跳到详情；如果 适用多个跳到适用商品列表
   */
  const [goToUse] = useSuperLock(async (item: MemCouponVo) => {
    const { couponTemplateNo = '' } = item
    const { data = {} } = await api['/wechat/web/memCoupon/goods/{no}_GET'](couponTemplateNo)
    const { goods = [], type } = data

    // 适用全部商品跳转至商品列表
    if (type === ECouponAcceptGoodsType.All) {
      return Taro.navigateTo({ url: routeNames.goodsGoodsList })
    }

    // 指定商品
    if (type === ECouponAcceptGoodsType.AssignGood) {
      if (!goods.length) {
        return toast?.message('暂无可用商品')
      }

      // 适用一个商品直接跳到详情
      if (goods.length === 1) {
        navByLink(EJumpType.GoodDetail,{ goodsNo: goods[0] } )
        // Taro.navigateTo({ url: routeNames.goodsGoodDetail, params: { goodsNo: goods[0] } })
      } else if (goods.length > 1) {
        // 适用多个跳到商品列表
        setCouponGoodNo(goods)
        Taro.navigateTo({ url: routeNames.couponsCouponGoods })
      }
    }
  })

  return {
    goToUse
  }
}
