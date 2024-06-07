import { View } from '@tarojs/components'
import { MarketingActivityDto, MarketingActivityGoodsParam } from '@wmeimob/taro-api'
import MMCard from '@wmeimob/taro-design/src/components/card'
import MMDivider from '@wmeimob/taro-design/src/components/divider'
import MMIconFont from '@wmeimob/taro-design/src/components/icon-font'
import MMIconFontName from '@wmeimob/taro-design/src/components/icon-font/const'
import useTimeRangeCountDown from '@wmeimob/utils/src/hooks/useTimeRangeCountDown'
import { FC, memo } from 'react'
import ActivityTimeRange from '../../../../components/activityTimeRange'
import GoodActivityItem from '../../../../components/goodActivityItem'
import styles from './index.module.less'

export interface ICardProps {
  activity: MarketingActivityDto,
  onRefresh: () => void
  onMoreClick: () => void
  onDetail: (goods: MarketingActivityGoodsParam)=> void
}

/** 显示商品数量 */
const VISIBLE_COUNT = 2

const Component: FC<ICardProps> = (props) => {
  const { activity, onMoreClick, onRefresh } = props

  const timeRangeCountdown = useTimeRangeCountDown({
    startTime: activity.startTime,
    endTime: activity.endTime,
    onTimeStateChange: () => {
      onRefresh()
    }
  })

  return (
    <MMCard title={<View className={styles.name}>{activity.activityName}</View>}>
      <MMDivider />
      <ActivityTimeRange {...timeRangeCountdown} />

      {activity.marketingActivityGoodsParams?.slice(0, VISIBLE_COUNT).map((item) => (
        <GoodActivityItem
          data={item}
          key={item.goodsNo}
          buttonText={timeRangeCountdown.timeRangeState === 'end' ? '去查看' : '去预购'}
          onDetail={() => props.onDetail(item)}
        />
      ))}

      <View className={styles.footer} onClick={onMoreClick}>
        <View className={styles.footer_text}>查看更多</View>
        <MMIconFont value={MMIconFontName.Next} size={11} />
      </View>
    </MMCard>
  )
}

const Card = memo(Component)
export default Card
