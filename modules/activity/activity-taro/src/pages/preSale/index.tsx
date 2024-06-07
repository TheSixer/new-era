import { Image, View } from '@tarojs/components'
import { useDidShow } from '@tarojs/taro'
import { api, MarketingActivityDto, MarketingActivityGoodsParam } from '@wmeimob/taro-api'
import { MMEmpty, PageContainer } from '@wmeimob/taro-design'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import { MMNavigationType } from '@wmeimob/taro-design/src/components/navigation/const'
import useMMPullToRefresh from '@wmeimob/taro-design/src/components/pull-to-refresh/useMMPullToRefresh'
import { isNewIphone } from '@wmeimob/taro-design/src/components/utils'
import { FC, Fragment, memo } from 'react'
import Card from './components/card'
import bgImg from './images/bg.png'
import emptyActivityImg from './images/empty_activity.png'
import styles from './index.module.less'

interface IPreSaleProps {
  onDetail(goods: MarketingActivityGoodsParam): void
  onMoreClick(activity: MarketingActivityDto): void
}

const Component: FC<IPreSaleProps> = (props) => {
  const { pullInfo, pullToRefreshProps } = useService()

  const { isEmpty } = pullInfo

  return (
    <PageContainer className={styles.preSaleStyle} noPlace>
      <MMNavigation place={false} title={isEmpty ? '预售活动' : ''} type={isEmpty ? MMNavigationType.Default : MMNavigationType.Transparent} />

      {!isEmpty && <Image src={bgImg} className={styles.bgImg} mode="widthFix" />}

      {!isEmpty && <View className={styles.title}>预售活动</View>}

      <View className={styles.wrapper}>
        {isEmpty && <MMEmpty fixed text="暂时没有活动" src={emptyActivityImg} imgStyle={{ width: 160, height: 160 }} />}

        <View className={styles.list}>
          {pullInfo.list.map((item) => (
            <Fragment key={item.id}>
              <Card activity={item} onRefresh={pullToRefreshProps.onRefresh} onMoreClick={() => props.onMoreClick(item)} onDetail={props.onDetail} />
              <View className="spacing" />
            </Fragment>
          ))}

          {isNewIphone && <View className="spacingIphone" />}
        </View>
      </View>
    </PageContainer>
  )
}

const PreSalePage = memo(Component)
export default PreSalePage

function useService() {
  const [info, pullToRefreshProps] = useMMPullToRefresh<MarketingActivityDto>({
    initRequest: false,
    getData: (queryParams) => api['/wechat/activity/preSale_GET']({ ...queryParams, pageSize: 100 })
  })

  useDidShow(() => {
    pullToRefreshProps.onRefresh()
  })

  return {
    pullInfo: info,
    pullToRefreshProps
  }
}
