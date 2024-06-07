import { FC, memo } from 'react'
import { View, Image } from '@tarojs/components'
import { IActivityTimeBoxProps } from './const'
import styles from './index.module.less'
import MMSpace from '@wmeimob/taro-design/src/components/space'
import timeIcon from './images/time_icon.png'
import lightningIcon from './images/lightning_icon.png'
import classNames from 'classnames'

const Component: FC<IActivityTimeBoxProps> = (props) => {
  const desc = {
    notStart: '距离活动开始',
    pending: '距离活动结束',
    end: '活动已结束'
  }[props.timeRangeState]

  const isEnd = props.timeRangeState === 'end'

  return (
    <View
      className={classNames(styles.activityTimeBoxStyle, {
        [styles.isEnd]: isEnd
      })}
    >
      <Image src={timeIcon} className={styles.timeIcon} />
      <View className={styles.activityTimeBoxL}>{desc}</View>

      <Image src={lightningIcon} className={styles.lightningIcon} />

      <View className={styles.activityTimeBoxR}>
        <MMSpace gap={5}>
          <View className={styles.timeNum}>{props.day}</View>
          <View className={styles.sign}>天</View>
          <View className={styles.timeNum}>{props.hour}</View>
          <View className={styles.sign}>:</View>
          <View className={styles.timeNum}>{props.minute}</View>
          <View className={styles.sign}>:</View>
          <View className={styles.timeNum}>{props.seconds}</View>
        </MMSpace>
      </View>
    </View>
  )
}

const ActivityTimeRange = memo(Component)
export default ActivityTimeRange
