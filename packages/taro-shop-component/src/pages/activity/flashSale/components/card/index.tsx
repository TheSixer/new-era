import Taro from '@tarojs/taro'
import { FC, memo } from 'react'
import { View } from '@tarojs/components'
import { ICardProps } from './const'
import styles from './index.module.less'
import MMCard from '@wmeimob/taro-design/src/components/card'
import MMDivider from '@wmeimob/taro-design/src/components/divider'
import GoodActivityItem from '../../../../../components/activity/goodActivityItem'
import ActivityTimeRange from '../../../flashSaleDetail/components/activityTimeRange'
import useTimeRangeCountDown from '@wmeimob/utils/src/hooks/useTimeRangeCountDown'
import MMIconFont from '@wmeimob/taro-design/src/components/icon-font'
import MMIconFontName from '@wmeimob/taro-design/src/components/icon-font/const'
import { routeNames } from '../../../../../routes'
import getParamsUrl from '@wmeimob/taro-utils/src/getParamsUrl'

/** 显示商品数量 */
const VISIBLE_COUNT = 2

const Component: FC<ICardProps> = (props) => {
  const { activity, onRefresh } = props

  const timeRangeCountdown = useTimeRangeCountDown({
    startTime: activity.startTime,
    endTime: activity.endTime,
    onTimeStateChange: () => {
      onRefresh()
    }
  })

  function handleMoreClick() {
    Taro.navigateTo({
      url: getParamsUrl(routeNames.activityFlashSaleDetail,
        {
          activityNo: activity.activityNo
        })
    })
  }

  return (
    <MMCard title={<View className={styles.name}>{activity.activityName}</View>}>
      <MMDivider />
      <ActivityTimeRange {...timeRangeCountdown} />

      {activity.marketingActivityGoodsParams?.slice(0, VISIBLE_COUNT).map((item) => (
        <GoodActivityItem data={item} key={item.goodsNo}
                          buttonText={timeRangeCountdown.timeRangeState === 'end' ? '去查看' : '去抢购'} />
      ))}

      <View className={styles.footer} onClick={handleMoreClick}>
        <View className={styles.footer_text}>查看更多</View>
        <MMIconFont value={MMIconFontName.Next} size={11} />
      </View>
    </MMCard>
  )
}

const Card = memo(Component)
export default Card
