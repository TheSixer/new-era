import { View } from '@tarojs/components'
import Taro, { getCurrentInstance, useRouter } from '@tarojs/taro'
import { api, MarketingActivityDto, MarketingActivityGoodsVo } from '@wmeimob/taro-api'
import { MMEmpty, PageContainer } from '@wmeimob/taro-design'
import MMDivider from '@wmeimob/taro-design/src/components/divider'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import { MMNavigationType } from '@wmeimob/taro-design/src/components/navigation/const'
import MMPullToRefresh from '@wmeimob/taro-design/src/components/pull-to-refresh'
import useMMPullToRefresh from '@wmeimob/taro-design/src/components/pull-to-refresh/useMMPullToRefresh'
import { selectRect } from '@wmeimob/taro-design/src/components/utils'
import useTimeRangeCountDown from '@wmeimob/utils/src/hooks/useTimeRangeCountDown'
import { FC, memo, useEffect, useState } from 'react'
import ActivityExplainDialog from '../../components/activityExplainDialog'
import ActivityTimeRange from '../../components/activityTimeRange'
import GoodActivityItem from '../../components/goodActivityItem'
import styles from './index.module.less'
import classNames from 'classnames'

interface IPreSaleDetailProps {
  isNoStatusBar: boolean
  onGoodsDetail(goods: MarketingActivityGoodsVo, activity: MarketingActivityDto): void
}

const Component: FC<IPreSaleDetailProps> = (props) => {
  const { activity, timeRangeCountdown, maxHeight, pullToRefreshProps, info } = useService()
  const {isNoStatusBar = false} = props
  return (
    <PageContainer className={classNames(styles.preSaleDetailStyle,isNoStatusBar&&styles.preSaleDetailStyle_h5)} noPlace>
      <MMNavigation title="" type={MMNavigationType.Transparent} />

      <View className="spacing" />
      <View className={styles.header}>
        <View className={styles.title}>活动详情</View>

        {activity.content && <ActivityExplainDialog explain={activity.content} />}
      </View>

      <View className={styles.card}>
        {(!info.isEmpty&&!!info.list.length)&&<View>
          <View className={styles.name}>{activity.activityName}</View>

          <View className={styles.timeRange}>
            <MMDivider />
            <ActivityTimeRange {...timeRangeCountdown} />
          </View>
        </View>}

        <View id="flag" />

        <View style={{ height: maxHeight, overflow: 'hidden' }}>
          <MMPullToRefresh
            {...pullToRefreshProps}
            style={{ maxHeight: '100%' }}
            showScrollbar={false}
            empty={info.isEmpty && <MMEmpty imgStyle={{marginTop: 70}} type="record" text="暂无活动商品" />}
          >
            {!!info.list.length&&<View className={styles.scrollContent}>
              {info.list.map((item) => (
                <GoodActivityItem data={item} key={item.goodsNo} buttonText='去购买'
                                  onDetail={() => props.onGoodsDetail(item, activity)} />
              ))}
            </View>}
          </MMPullToRefresh>
        </View>
      </View>
    </PageContainer>
  )
}

const PreSaleDetailPage = memo(Component)
export default PreSaleDetailPage

function useService() {
  const { params = {} } = useRouter()

  const [activity, setActivity] = useState<MarketingActivityDto>({})
  const [maxHeight, setMaxHeight] = useState(0)

  const timeRangeCountdown = useTimeRangeCountDown({
    startTime: activity.startTime,
    endTime: activity.endTime,
    onTimeStateChange: () => {
      getActivity()
    }
  })

  const [info, pullToRefreshProps] = useMMPullToRefresh({
    getData: (queryParams) => api['/wechat/activity/goods_GET']({ activityNo: params.activityNo!, ...queryParams })
  })

  useEffect(() => {
    getActivity()
  }, [])

  useEffect(() => {
    calcMaxHeight()
  }, [info.list])

  async function calcMaxHeight() {
    const topViewRes = await selectRect('#flag', getCurrentInstance().page)
    const { screenHeight } = Taro.getSystemInfoSync()

    if (topViewRes) {
      setMaxHeight(screenHeight - topViewRes.top)
    }
  }

  function getActivity() {
    api['/wechat/activity/{activityNo}_GET'](params.activityNo!).then(({ data = {} }) => {
      setActivity(data)
    })
  }

  return {
    activity,
    timeRangeCountdown,
    maxHeight,
    pullToRefreshProps,
    info
  }
}
