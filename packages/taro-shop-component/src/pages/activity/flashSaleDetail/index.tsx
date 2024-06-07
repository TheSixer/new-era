import Taro, { getCurrentInstance, useRouter } from '@tarojs/taro'
import { FC, memo, useEffect, useMemo, useState } from 'react'
import { View } from '@tarojs/components'
import styles from './index.module.less'
import { IFlashSaleDetailProps } from './const'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import useMMPullToRefresh from '@wmeimob/taro-design/src/components/pull-to-refresh/useMMPullToRefresh'
import MMPullToRefresh from '@wmeimob/taro-design/src/components/pull-to-refresh'
import { api } from '@wmeimob/taro-api'
import MMEmpty from '@wmeimob/taro-design/src/components/empty'
import { PageContainer } from '@wmeimob/taro-design'
import { MarketingActivityDto } from '@wmeimob/taro-api'
import GoodActivityItem from '../../../components/activity/goodActivityItem'

import MMCard from '@wmeimob/taro-design/src/components/card'
import { MMNavigationType } from '@wmeimob/taro-design/src/components/navigation/const'
import MMRichText from '../../../components/richText'
import MMDivider from '@wmeimob/taro-design/src/components/divider'
import ActivityTimeRange from './components/activityTimeRange'
import MMDialog from '@wmeimob/taro-design/src/components/dialog'
import useTimeRangeCountDown from '@wmeimob/utils/src/hooks/useTimeRangeCountDown'
import { selectRect } from '@wmeimob/taro-design/src/components/utils'

const Component: FC<IFlashSaleDetailProps> = () => {
  const { params = {} } = useRouter()

  const [activity, setActivity] = useState<MarketingActivityDto>({})
  const [modalVisible, setModalVisible] = useState(false)
  const [maxHeight, setMaxHeight] = useState(0)

  const timeRangeParams = useActivityTimeRange({
    activity,
    onRefresh: getActivity
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

  function handleExplainClick() {
    setModalVisible(true)
  }

  return (
    <PageContainer className={styles.flashSaleDetailStyle} noPlace>
      <MMNavigation title="" type={MMNavigationType.Transparent} />

      <View className="spacing" />
      <View className={styles.header}>
        <View className={styles.title}>活动详情</View>

        {activity.content && (
          <View className={styles.explain} onClick={handleExplainClick}>
            活动说明
          </View>
        )}
      </View>

      <View className={styles.card}>
        <View className={styles.name}>{activity.activityName}</View>

        <View className={styles.timeRange}>
          <MMDivider />
          <ActivityTimeRange {...timeRangeParams} />
        </View>

        <View id="flag" />

        <View style={{ height: maxHeight, overflow: 'hidden' }}>
          <MMPullToRefresh
            {...pullToRefreshProps}
            style={{ maxHeight: '100%' }}
            showScrollbar={false}
            empty={info.isEmpty && <MMEmpty type="record" text="暂无活动商品" />}
          >
            <View className={styles.scrollContent}>
              {info.list.map((item) => (
                <GoodActivityItem data={item} key={item.goodsNo} />
              ))}
            </View>
          </MMPullToRefresh>
        </View>
      </View>

      <MMDialog title="活动说明" visible={modalVisible} closeable footer={false} onCancel={() => setModalVisible(false)}>
        <View className={styles.explain_detail}>
          <MMRichText html={activity.content || ''} />
        </View>
      </MMDialog>
    </PageContainer>
  )
}

const FlashSaleDetail = memo(Component)
export default FlashSaleDetail

function useActivityTimeRange(params: { activity: MarketingActivityDto; onRefresh: () => void }) {
  const { activity } = params

  const timeRangeCountdown = useTimeRangeCountDown({
    startTime: activity.startTime,
    endTime: activity.endTime,
    onTimeStateChange: () => {
      params.onRefresh()
    }
  })

  return timeRangeCountdown
}
