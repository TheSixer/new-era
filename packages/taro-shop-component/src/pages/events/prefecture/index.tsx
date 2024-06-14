/* eslint-disable no-console */
import Taro from '@tarojs/taro'
import { FC, memo, useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import { IPrefectureProps } from './const'
import styles from './index.module.less'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import MMPullToRefresh from '@wmeimob/taro-design/src/components/pull-to-refresh'
import { ActivityOutputDto, MarketingActivityDto, api } from '@wmeimob/taro-api'
import useMMPullToRefresh from '@wmeimob/taro-design/src/components/pull-to-refresh/useMMPullToRefresh'
import MMEmpty from '@wmeimob/taro-design/src/components/empty'
import emptyActivityImg from './images/empty_activity.png'
import { routeNames } from '../../../routes'
import { PageContainer } from '@wmeimob/taro-design'
import getParamsUrl from '@wmeimob/taro-utils/src/getParamsUrl'
import EventItem from './components/eventItem'
import { PositionFilled } from '../../../components/Icons'
import Tabs from './components/Tabs'
import useGetLocation from '../../../hooks/useGetLocation'
import { useGlobalStore } from '@wmeimob/taro-store'
import { useAtom } from 'jotai'
import { addressAtom } from './store'

export interface TabItem {
  label?: string
  value?: number
}

const Component: FC<IPrefectureProps> = () => {
  const [activeTab, setActiveTab] = useState(0)
  const { location } = useGetLocation()
  const { activityTypes, address: position } = useTypesService(location)
  const { user } = useGlobalStore()
  const [address, setAddress] = useAtom(addressAtom)

  const { toActivityDetail, pullInfo, pullToRefreshProps } = useBasicService(activeTab, address)

  const handleTableChange = (tab) => {
    setActiveTab(tab)
  }

  const navigate = () => {
    Taro.navigateTo({
      url: getParamsUrl(routeNames.eventsCities,
        {
          city: '上海'
        })
    })
  }

  useEffect(() => {
    setAddress(position)
  }, [position])

  return (
    <PageContainer className={styles.prefectureStyle} noPlace>
      <MMNavigation title='活动预约' type="Transparent" />

      <MMPullToRefresh
        {...pullToRefreshProps}
        empty={pullInfo.isEmpty &&
        <MMEmpty fixed text='暂时没有活动' src={emptyActivityImg} imgStyle={{ width: 160, height: 160 }} />}
      >
        <View className={styles.event_container}>
          <View className={styles.event_header}>
            <Text className={styles.timePeriod}>{getTimePeriod()}好，{user.nickName}</Text>
            <View className={styles.event_position} onClick={navigate}>
              <PositionFilled width="24rpx" height="24rpx" />
              <Text className={styles.event_position_text}>{address?.province}</Text>
            </View>
          </View>
          <Text className={styles.event_header__text}>探索专属体验融入社群</Text>
        </View>

        <Tabs tabs={activityTypes} activeTab={activeTab} onChange={handleTableChange} />

        <View className={styles.list}>
          <Text className={styles.list_title}>{pullInfo.total}个活动</Text>
          {pullInfo.list.map((item) => (
            <EventItem key={item.id} data={item} toDetail={toActivityDetail} />
          ))}
        </View>
      </MMPullToRefresh>
    </PageContainer>
  )
}

const Prefecture = memo(Component)
export default Prefecture

function getTimePeriod() {
  const now = new Date();
  const hour = now.getHours();

  if (hour < 12) {
    return "上午";
  } else if (hour < 14) {
    return "中午";
  } 
  return "下午";
}

function useTypesService(location) {
  const [position, setPosition] = useState<any>()
  const [activityTypes, setActivityTypes] = useState<TabItem[]>([{ label: '全部', value: 0 }])

  async function getActivityTypes() {
    const { data = [] } = await api['/wechat/activity/classList_GET']({})
    setActivityTypes((prev) => prev.concat(data?.map((item) => ({ label: item.name, value: item.id }))))
  }

  async function getPosition(locat) {
    const { data: address } = await api['/wechat/activity/getAddress_GET'](locat)
    setPosition(address)
  }

  useEffect(() => {
    getActivityTypes()
  }, [])

  useEffect(() => {
    if (location.latitude && location.longitude) {
      getPosition({
        latitude: 120.52,
        longitude: -122.12
      })
    }
  }, [location])

  return { activityTypes, address: position }
}

function useBasicService(activeTab, location) {
  const [info, pullToRefreshProps] = useMMPullToRefresh<ActivityOutputDto>({
    initRequest: false,
    getData: async (queryParams) =>
      api['/wechat/activity/activityList_GET']({
        ...queryParams,
        classifyId: activeTab || '',
        ...location
        // latitude: 120.52,
        // longitude: -122.12
        // 常规活动
        // activityTypeList: [EActivityType.Deduction, EActivityType.Discount, EActivityType.Presented].map(String)
      })
  })

  useEffect(() => {
    pullToRefreshProps.onRefresh()
  }, [activeTab, location])

  function toActivityDetail(activity: MarketingActivityDto) {
    Taro.navigateTo({
      url: getParamsUrl(routeNames.eventsDetail,
        {
          id: activity.id
        })
    })
  }

  return {
    toActivityDetail,
    pullInfo: info,
    pullToRefreshProps
  }
}
