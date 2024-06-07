import Taro from '@tarojs/taro'
import { FC, memo, useEffect } from 'react'
import { View } from '@tarojs/components'
import { IPrefectureProps } from './const'
import styles from './index.module.less'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import MMPullToRefresh from '@wmeimob/taro-design/src/components/pull-to-refresh'
import { MarketingActivityDto, api } from '@wmeimob/taro-api'
import useMMPullToRefresh from '@wmeimob/taro-design/src/components/pull-to-refresh/useMMPullToRefresh'
import MMEmpty from '@wmeimob/taro-design/src/components/empty'
import emptyActivityImg from './images/empty_activity.png'
import { routeNames } from '../../../routes'
import classNames from 'classnames'
import { PageContainer } from '@wmeimob/taro-design'
import ActivityListItem from '@wmeimob-modules/activity-taro/src/components/activityListItem'
import { EActivityType } from '@wmeimob/shop-data/src/enums/activity/EActivityType'
import getParamsUrl from '@wmeimob/taro-utils/src/getParamsUrl'

const Component: FC<IPrefectureProps> = (props) => {
  const { toActivityDetail, pullInfo, pullToRefreshProps } = useBasicService()

  return (
    <PageContainer className={classNames(styles.prefectureStyle, pullInfo.isEmpty && styles.isEmpty)} noPlace>
      <MMNavigation title='活动专区' type={pullInfo.isEmpty ? 'Default' : 'Transparent'} />

      <MMPullToRefresh
        {...pullToRefreshProps}
        empty={pullInfo.isEmpty &&
        <MMEmpty fixed text='暂时没有活动' src={emptyActivityImg} imgStyle={{ width: 160, height: 160 }} />}
      >
        <View className={styles.list}>
          {pullInfo.list.map((item) => (
            <ActivityListItem activity={item} key={item.activityNo} onClick={() => toActivityDetail(item)} />
          ))}
        </View>
      </MMPullToRefresh>
    </PageContainer>
  )
}

const Prefecture = memo(Component)
export default Prefecture

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
    pullToRefreshProps.onRefresh()
  }, [])
  // useDidShow(() => {
  // })

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
