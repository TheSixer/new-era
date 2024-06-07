import Taro from '@tarojs/taro'
import { useEffect, useMemo, useState } from 'react'
import { EActivityStatus } from '../../../enums/activity/EActivityStatus'
import { api } from '@wmeimob/taro-api'
import { routeNames } from '../../../routes'
import { IPageActivity } from '../basicModule/activityModule/const'
import { BasicModuleSignEnum, IBasicActivityData } from '@wmeimob-modules/decoration-data'
import useComponentStyle from '@wmeimob-modules/decoration-taro/src/hooks/useComponentStyle'
import getParamsUrl from '@wmeimob/taro-utils/src/getParamsUrl'

/**
 * 活动通用业务hook
 *
 * 根据后台自定义页面配置的活动信息
 * 通过接口获取实际活动与商品信息。进行组合
 * 如果活动不存在、商品数组为空时。都将会被屏蔽处理
 *
 */
export default function userActivityModuleService(props) {
  const { data, moduleType = BasicModuleSignEnum.DefaultTipBlock } = props

  const { style: componentStyle } = useComponentStyle(props.componentStyle)

  // 接口活动信息
  const [activitys, setActivitys] = useState<IPageActivity[]>([])

  // 是否显示卡片标题
  const showCardTitle = useMemo(() => activitys.length === 1, [activitys])

  useEffect(() => {
    async function getData() {
      const result = await getAcitity()
      // 过滤 活动不存在的、活动没有启用的 活动商品不存在的
      const actis = result.filter((item) => item !== null && item.activityStatus !== EActivityStatus.NoUse) as any
      setActivitys(actis)
    }

    if (data.length) {
      getData()
    }
  }, [data])

  // 获取活动和活动商品数据
  async function getAcitity() {
    return Promise.all<(IPageActivity | null)[]>(
      data.map(async (item) => {
        const { activityNo, showGoodNum = 0 } = item
        try {
          const { data: activity } = await api['/wechat/activity/{activityNo}_GET'](activityNo)
          if (!activity) {
            return null
          }
          const { data: goodData = {} } = await api['/wechat/activity/goods_GET']({ activityNo })
          const goods = (goodData.list || []).slice(0, showGoodNum) // 显示商品数量

          return goods.length ? { ...activity, goods } : null
          // return { ...activity, goods }
        } catch (error) {}
        return null
      })
    )
  }

  /** 点击跳转 */
  function handleClickMore(item: IBasicActivityData, index: number) {
    const url = {
      // [BasicModuleSignEnum.GroupActivity]: routeNames.activityFlashSale, // 拼团
      [BasicModuleSignEnum.FreeShipping]: routeNames.activityGoodsList, // 免邮
      [BasicModuleSignEnum.PreSale]: routeNames.activityPreSaleDetail, // 预售
      [BasicModuleSignEnum.MarketingActivity]: routeNames.activityGoodsList, // 满减满折满赠
      [BasicModuleSignEnum.PanicBuying]: routeNames.activityFlashSaleDetail // 抢购
    }[moduleType]

    const params = {
      activityNo: item.activityNo,
      id: item.id,
      type: item.type !== undefined ? item.type : 1 // 链接类型
    }
    url && Taro.navigateTo({ url: getParamsUrl(url, params) })
  }

  return {
    componentStyle,
    activitys,
    showCardTitle,
    handleClickMore
  }
}
