/* eslint-disable no-console */
import Taro from '@tarojs/taro'
import { FC, memo, useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import { IPrefectureProps } from './const'
import styles from './index.module.less'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import MMPullToRefresh from '@wmeimob/taro-design/src/components/pull-to-refresh'
import { MarketingActivityDto, api } from '@wmeimob/taro-api'
import useMMPullToRefresh from '@wmeimob/taro-design/src/components/pull-to-refresh/useMMPullToRefresh'
import MMEmpty from '@wmeimob/taro-design/src/components/empty'
import emptyActivityImg from './images/empty_activity.png'
import { routeNames } from '../../../routes'
import { PageContainer } from '@wmeimob/taro-design'
import { EActivityType } from '@wmeimob/shop-data/src/enums/activity/EActivityType'
import getParamsUrl from '@wmeimob/taro-utils/src/getParamsUrl'
import EventItem from './components/eventItem'
import { PositionFilled } from '../../../components/Icons'
import Tabs from './components/Tabs'

const tabs = [{
  label: '全部',
  value: '0'
}, {
  label: '活动类型',
  value: '1'
}, {
  label: '活动类型',
  value: '2'
}, {
  label: '活动类型',
  value: '3'
}, {
  label: '活动类型',
  value: '4'
}, {
  label: '活动类型',
  value: '5'
}]

const Component: FC<IPrefectureProps> = (props) => {
  const [activeTab, setActiveTab] = useState(0)
  const { toActivityDetail, pullInfo, pullToRefreshProps } = useBasicService()

  const handleTableChange = (tab) => {
    setActiveTab(tab)
  }

  const navigate = () => {
    Taro.navigateTo({
      url: routeNames.eventsCities
    })
  }

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
            <Text className={styles.timePeriod}>{getTimePeriod()}好，aaa</Text>
            <View className={styles.event_position} onClick={navigate}>
              <PositionFilled width="24rpx" height="24rpx" />
              <Text className={styles.event_position_text}>position</Text>
            </View>
          </View>
          <Text className={styles.event_header__text}>探索专属体验融入社群</Text>
        </View>

        <Tabs tabs={tabs} activeTab={activeTab} onChange={handleTableChange} />

        <View className={styles.list}>
          <Text className={styles.list_title}>16个活动</Text>
          {[1,2,3].map((item) => (
            <EventItem key={item} />
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

function useBasicService() {
  const [info, pullToRefreshProps] = useMMPullToRefresh<MarketingActivityDto>({
    initRequest: false,
    getData: async (queryParams) =>
      api['/wechat/activity_GET']({
        ...queryParams,
        // 常规活动
        activityTypeList: [EActivityType.Deduction, EActivityType.Discount, EActivityType.Presented].map(String)
      })
  })

  useEffect(() => {
    // pullToRefreshProps.onRefresh()

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
          }
        });
      }
    });

    Taro.getLocation({
      type: 'wgs84',
      success: (res) => {
        console.log('getLocation', res)
      },
      fail: (err) => {
        console.log('getLocation fail', err)
      }
    })
  }, [])
  // useDidShow(() => {
  // })

  function getLocation() {
    Taro.getLocation({
      type: 'wgs84',
      success: (res) => {
        console.log('getLocation', res)
      },
      fail: (err) => {
        console.log('getLocation fail', err)
      }
    })
  }

  function toActivityDetail(activity: MarketingActivityDto) {
    Taro.navigateTo({
      url: getParamsUrl(routeNames.activityGoodsList,
        {
          activityNo: activity.activityNo
        })
    })
  }

  return {
    toActivityDetail,
    pullInfo: info,
    pullToRefreshProps
  }
}
