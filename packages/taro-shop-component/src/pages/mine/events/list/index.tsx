/* eslint-disable no-console */
import Taro from '@tarojs/taro'
import { FC, memo, useEffect, useState } from 'react'
import { View, Text, ScrollView } from '@tarojs/components'
import { IPrefectureProps } from './const'
import styles from './index.module.less'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import MMPullToRefresh from '@wmeimob/taro-design/src/components/pull-to-refresh'
import { ActivityOrderOutputDto, ActivityOutputDto, MarketingActivityDto, api } from '@wmeimob/taro-api'
import useMMPullToRefresh from '@wmeimob/taro-design/src/components/pull-to-refresh/useMMPullToRefresh'
import MMEmpty from '@wmeimob/taro-design/src/components/empty'
import emptyActivityImg from './images/empty_activity.png'
import { routeNames } from '../../../../routes'
import { PageContainer } from '@wmeimob/taro-design'
import getParamsUrl from '@wmeimob/taro-utils/src/getParamsUrl'
import EventItem from './components/eventItem'
import Tabs from './components/Tabs'
import { EEventStatus, OEventStatus } from '../../../../enums/event/EEventStatus'
import useGetLocation from '../../../../hooks/useGetLocation'

export interface TabItem {
  label?: string
  value?: number
}

const Component: FC<IPrefectureProps> = () => {
  const [activeTab, setActiveTab] = useState(EEventStatus.NoUse)
  const { location } = useGetLocation()

  const { toActivityDetail, orders, loading } = useBasicService(activeTab, location)

  const handleTableChange = (tab) => {
    setActiveTab(tab)
  }

  return (
    <PageContainer className={styles.prefectureStyle} noPlace>
      <MMNavigation title='活动预约' type="Transparent" />

      <Tabs tabs={OEventStatus} activeTab={activeTab} onChange={handleTableChange} />

      <ScrollView scrollY className={styles.scrollView}>

        <View className={styles.book_list}>
          {orders.map((order) => (
            <EventItem key={order.id} data={order.activity} toDetail={() => toActivityDetail(order.orderNo)} />
          ))}
        </View>
      
        { orders.length === 0 && !loading && <MMEmpty fixed text='暂时没有活动' src={emptyActivityImg} imgStyle={{ width: 160, height: 160 }} />}
      </ScrollView>

    </PageContainer>
  )
}

const Prefecture = memo(Component)
export default Prefecture

function useBasicService(activeTab, location) {
  const [loading, setLoading] = useState(false)
  const [orders, setOrders] = useState<ActivityOrderOutputDto[]>([])

  useEffect(() => {
    if (location.latitude && location.longitude) {
      fetchData(activeTab, {
        latitude: 120.52,
        longitude: -122.12
      })
    }
  }, [activeTab, location])

  async function fetchData(status, locat) {
    setLoading(true)
    const { data = [] } = await api['/wechat/activity/myBookRecord_GET']({ status, ...locat })

    setOrders(data)
    setLoading(false)
  }

  function toActivityDetail(orderNo: string) {
    Taro.navigateTo({
      url: getParamsUrl(routeNames.mineEventsDetail, { orderNo })
    })
  }

  return {
    toActivityDetail,
    orders,
    loading
  }
}
