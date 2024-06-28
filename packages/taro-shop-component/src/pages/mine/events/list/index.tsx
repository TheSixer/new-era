/* eslint-disable no-console */
import Taro from '@tarojs/taro'
import { FC, memo, useEffect, useState } from 'react'
import { View, ScrollView } from '@tarojs/components'
import { IPrefectureProps } from './const'
import styles from './index.module.less'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import { ActivityOrderOutputDto, api } from '@wmeimob/taro-api'
import MMEmpty from '@wmeimob/taro-design/src/components/empty'
import emptyActivityImg from '../../../../assets/images/icon_empty.png'
import { routeNames } from '../../../../routes'
import { PageContainer } from '@wmeimob/taro-design'
import getParamsUrl from '@wmeimob/taro-utils/src/getParamsUrl'
import EventItem from './components/eventItem'
import Tabs from './components/Tabs'
import { EEventStatus, OEventStatus } from '../../../../enums/event/EEventStatus'
import useGetLocation from '../../../../hooks/useGetLocation'
import LoadingView from '../../../../components/loadingView'

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
      <ScrollView className={styles.scroll} scrollY showScrollbar={false} enhanced={true}>

        <MMNavigation title='我的预约' type="Transparent" />
        
        <Tabs tabs={OEventStatus} activeTab={activeTab} onChange={handleTableChange} />

        {loading && <LoadingView style={{ marginTop: '40rpx', height: '100rpx', background: 'none' }} />}

        <View className={styles.book_list}>
          {orders.map((order) => (
            <EventItem key={order.id} data={{...order.activity, bookTime: order.bookTime, unifyName: order.unifyName }} toDetail={() => toActivityDetail(order.orderNo)} />
          ))}
        </View>
      
        { orders.length === 0 && !loading && <MMEmpty fixed text='暂时没有活动' src={emptyActivityImg} imgStyle={{ width: '64rpx', height: '64rpx' }} />}
      </ScrollView>

    </PageContainer>
  )
}

const Prefecture = memo(Component)
export default Prefecture

function useBasicService(activeTab, location) {
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState<ActivityOrderOutputDto[]>([])

  useEffect(() => {
    if (!location || (location?.latitude && location?.longitude)) {
      fetchData(activeTab, location)
    }
  }, [activeTab, location])

  async function fetchData(status, locat) {
    setLoading(true)
    try {
      const { data = [] } = await api['/wechat/activity/myBookRecord_GET']({ status, ...(locat || {}) })
      setOrders(data)
    } catch (error) {
    }
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
