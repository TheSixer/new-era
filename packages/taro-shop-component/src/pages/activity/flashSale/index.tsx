import { useDidShow } from '@tarojs/taro'
import { FC, Fragment, memo } from 'react'
import { View, Image } from '@tarojs/components'
import { IFlashSaleProps } from './const'
import styles from './index.module.less'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import { MMNavigationType } from '@wmeimob/taro-design/src/components/navigation/const'
import useMMPullToRefresh from '@wmeimob/taro-design/src/components/pull-to-refresh/useMMPullToRefresh'
import { MarketingActivityDto, api } from '@wmeimob/taro-api'
import Card from './components/card'
import bgImg from './images/bg.png'
import { PageContainer } from '@wmeimob/taro-design'
import { isNewIphone } from '@wmeimob/taro-design/src/components/utils'
import MMEmpty from '@wmeimob/taro-design/src/components/empty'
import emptyActivityImg from './images/empty_activity.png'

const Component: FC<IFlashSaleProps> = (props) => {
  const { pullInfo, pullToRefreshProps } = useBasicService()

  const { isEmpty } = pullInfo

  return (
    <PageContainer className={styles.flashSaleStyle} noPlace>
      <MMNavigation place={false} title={isEmpty ? '限时抢购' : ''} type={isEmpty ? MMNavigationType.Default : MMNavigationType.Transparent} />

      {!isEmpty && <Image src={bgImg} className={styles.bgImg} mode="widthFix" />}

      <View className={styles.wrapper}>
        {isEmpty && <MMEmpty fixed text="暂时没有活动" src={emptyActivityImg} imgStyle={{ width: 160, height: 160 }} />}

        <View className={styles.list}>
          {pullInfo.list.map((item) => (
            <Fragment key={item.id}>
              <Card activity={item} onRefresh={pullToRefreshProps.onRefresh} />
              <View className="spacing" />
            </Fragment>
          ))}
          {isNewIphone && <View className="spacingIphone" />}
        </View>
      </View>
    </PageContainer>
  )
}

const FlashSale = memo(Component)
export default FlashSale

function useBasicService() {
  const [info, pullToRefreshProps] = useMMPullToRefresh<MarketingActivityDto>({
    initRequest: false,
    getData: (queryParams) => api['/wechat/activity/flashSale_GET']({ ...queryParams, pageSize: 100 })
  })

  useDidShow(() => {
    pullToRefreshProps.onRefresh()
  })

  return {
    pullInfo: info,
    pullToRefreshProps
  }
}
