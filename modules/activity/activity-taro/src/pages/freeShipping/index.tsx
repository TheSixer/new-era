import { View } from '@tarojs/components'
import { useDidShow } from '@tarojs/taro'
import { api, MarketingActivityDto } from '@wmeimob/taro-api'
import { MMEmpty, Navigation, PageContainer } from '@wmeimob/taro-design'
import MMPullToRefresh from '@wmeimob/taro-design/src/components/pull-to-refresh'
import useMMPullToRefresh from '@wmeimob/taro-design/src/components/pull-to-refresh/useMMPullToRefresh'
import classNames from 'classnames'
import { FC, memo } from 'react'
import ActivityListItem from '../../components/activityListItem'
import emptyActivityImg from './images/empty_activity.png'
import styles from './index.module.less'
import { EActivityType } from '@wmeimob/shop-data/src/enums/activity/EActivityType'
import useGradientNav from '@wmeimob/taro-design/src/hooks/useGradientNav'

interface IFreeShippingProps {
  onDetail(activityNo: string, activity: MarketingActivityDto): void
}

const Component: FC<IFreeShippingProps> = (props) => {
  const { pullInfo, pullToRefreshProps } = useBasicService()
  const { contentStyle, hanelScroll } = useGradientNav({
    selector: '#selector',
    style: {
      background: [255, 65, 59]
    }
  })
  return (
    <PageContainer className={classNames(styles.freeShippingStyle, pullInfo.isEmpty && styles.isEmpty)} noPlace>
      <Navigation title="包邮活动" type={pullInfo.isEmpty ? 'Default' : 'Transparent'} />

      <MMPullToRefresh
        {...pullToRefreshProps}
        empty={pullInfo.isEmpty && <MMEmpty fixed text="暂时没有活动" src={emptyActivityImg} imgStyle={{ width: 160, height: 160 }} />}
      >
        <View className={styles.list}>
          {pullInfo.list.map((item) => (
            <ActivityListItem activity={item} key={item.activityNo} onClick={() => props.onDetail(item.activityNo!, item)} />
          ))}
        </View>
      </MMPullToRefresh>
    </PageContainer>
  )
}

const MMFreeShippingPage = memo(Component)
export default MMFreeShippingPage

function useBasicService() {
  const [info, pullToRefreshProps] = useMMPullToRefresh<MarketingActivityDto>({
    initRequest: false,
    getData: async (queryParams) =>
      api['/wechat/activity_GET']({
        ...queryParams,
        activityTypeList: [EActivityType.FreeShipping]
      })
  })

  useDidShow(() => {
    pullToRefreshProps.onRefresh()
  })

  return {
    pullInfo: info,
    pullToRefreshProps
  }
}
