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
import emptyImg from '../../../assets/images/icon_empty.png'
import { routeNames } from '../../../routes'
import { PageContainer } from '@wmeimob/taro-design'
import getParamsUrl from '@wmeimob/taro-utils/src/getParamsUrl'
import EventItem from './components/eventItem'
import { PositionFilled } from '../../../components/Icons'
import Tabs from './components/Tabs'
import { useGlobalStore } from '@wmeimob/taro-store'
import { useAtom } from 'jotai'
import { addressAtom } from './store'

export interface TabItem {
  label?: string
  value?: number
}

const Component: FC<IPrefectureProps> = () => {
  const [activeTab, setActiveTab] = useState(0)
  const { activityTypes, getPosition } = useTypesService()
  const { user } = useGlobalStore()
  const [address, setAddress] = useAtom(addressAtom)

  const { toActivityDetail, pullInfo, pullToRefreshProps } = useBasicService(activeTab, address)

  const handleTableChange = (tab) => {
    setActiveTab(tab)
  }

  const navigate = () => {
    Taro.navigateTo({
      url: getParamsUrl(routeNames.eventsCities, {})
    })
  }

  useEffect(() => {
    if (!address?.province && (!address?.latitude || !address?.longitude)) {
      Taro.authorize({
        scope: 'scope.userLocation',
        success() {
          // 用户已经同意授权
          getLocation()
        },
        fail() {
          // 用户拒绝授权，引导用户到设置页开启授权
          Taro.showModal({
            title: '授权提示',
            content: '请前往设置开启位置信息授权',
            success(res) {
              if (res.confirm) {
                Taro.openSetting({
                  success(settingRes) {
                    if (settingRes.authSetting['scope.userLocation']) {
                      // 用户已同意授权，重新获取位置
                      getLocation();
                    }
                  }
                });
              }
              setAddress({ province: '上海市' })
            }
          });
        }
      });
    }
  }, [address]);

  const getLocation = () => {
    Taro.getLocation({
      type: 'wgs84',
      success(res) {
        getPosition({
            latitude: res?.latitude,
            longitude: res?.longitude
        }, (province) => {
          setAddress({
            province,
            latitude: res?.latitude,
            longitude: res?.longitude
          })
        });
      },
      fail() {
        setAddress({ province: '上海市' })
        Taro.showToast({
          title: '获取位置失败',
          icon: 'none'
        });
      }
    });
  }

  return (
    <PageContainer className={styles.prefectureStyle} noPlace>
      <MMNavigation title="活动预约" type="Transparent" />

      <MMPullToRefresh
        {...pullToRefreshProps}
        empty={pullInfo.isEmpty && <MMEmpty fixed text="暂无数据" src={emptyImg} imgStyle={{ width: '64rpx', height: '64rpx' }} />}
      >
        <View className={styles.event_container}>
          <View className={styles.event_header}>
            <Text className={styles.timePeriod}>
              {getTimePeriod()}好，{user.nickName}
            </Text>
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
  const now = new Date()
  const hour = now.getHours()

  if (hour < 12) {
    return '上午'
  } else if (hour < 14) {
    return '中午'
  }
  return '下午'
}

function useTypesService() {
  const [activityTypes, setActivityTypes] = useState<TabItem[]>([{ label: '全部', value: 0 }])

  async function getActivityTypes() {
    try {
      const { data = [] } = await api['/wechat/activity/classList_GET']({})
      setActivityTypes((prev) => prev.concat(data?.map((item) => ({ label: item.name, value: item.id }))))
    } catch (error) {}
  }

  async function getPosition(location, callback) {
    try {
      const {
        data: { addressComponent }
      } = await api['/wechat/activity/getAddress_GET'](location)
      callback(addressComponent?.province?.length > 0 ? addressComponent?.province : '上海市')
    } catch (error) {}
  }

  useEffect(() => {
    getActivityTypes()
  }, [])

  return { activityTypes, getPosition }
}

function useBasicService(activeTab, address) {
  const [info, pullToRefreshProps] = useMMPullToRefresh<ActivityOutputDto>({
    initRequest: false,
    getData: async (queryParams) =>
      api['/wechat/activity/activityList_GET']({
        ...queryParams,
        classifyId: activeTab || '',
        ...location,
        ...address
      })
  })

  useEffect(() => {
    if (address.province || (address?.latitude && address?.longitude)) {
      pullToRefreshProps.onRefresh()
    }
  }, [activeTab, address])

  function toActivityDetail(activity: MarketingActivityDto) {
    Taro.navigateTo({
      url: getParamsUrl(routeNames.eventsDetail, {
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
