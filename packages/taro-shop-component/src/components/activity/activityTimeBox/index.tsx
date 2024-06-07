import { View } from '@tarojs/components'
import MMSpace from '@wmeimob/taro-design/src/components/space'
import useTimeRangeCountDown from '@wmeimob/utils/src/hooks/useTimeRangeCountDown'
import { memo, FC } from 'react'
import { MarketingActivityDto } from '@wmeimob/taro-api'
import styles from './index.module.less'

interface IActivityTimeBoxProps {
  // inStatus: boolean
  activity?: MarketingActivityDto
  handleRefresh?: () => void
}

const Component: FC<IActivityTimeBoxProps> = (props) => {
  const { activity } = props

  const { startTime, endTime } = activity || {}
  const { day, minute, hour, seconds, timeRangeState } = useTimeRangeCountDown({
    startTime,
    endTime,
    onTimeStateChange: () => {
      setTimeout(() => {
        props.handleRefresh?.()
      }, 200)
    }
  })

  if (!activity) {
    return null
  }

  return timeRangeState === 'end' ? (
    <View className={styles.actEnd}>活动已结束</View>
  ) : (
    <View className={styles.activityTimeBoxStyle}>
      <View className={styles.activityTimeBoxL}>{timeRangeState === 'pending' ? '距离活动结束' : '距离活动开始'}</View>
      <View className={styles.activityTimeBoxR}>
        <MMSpace gap={6}>
          <View className={styles.timeNum}>{day}</View>
          <View className={styles.sign}>天</View>
          <View className={styles.timeNum}>{hour}</View>
          <View className={styles.sign}>:</View>
          <View className={styles.timeNum}>{minute}</View>
          <View className={styles.sign}>:</View>
          <View className={styles.timeNum}>{seconds}</View>
        </MMSpace>
      </View>
    </View>
  )
}

const ActivityTimeBox = memo(Component)
export default ActivityTimeBox
