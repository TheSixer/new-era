import { FC } from 'react'
import { View } from '@tarojs/components'
import { ITimeCountDownProps } from './const'
import styles from './index.module.less'
import useCountDown from '@wmeimob/utils/src/hooks/useCountDown'

const Component: FC<ITimeCountDownProps> = (props) => {
  const { time = 0, onEnd = () => {} } = props

  const { day, hour, minute, seconds } = useCountDown({
    endTime: time,
    onTimeEnd: onEnd
  })

  return (
    <View className={styles.timeCountDownStyle}>
      <View className={styles.styleOut}>{day}</View>天<View className={styles.styleOut}>{hour}</View>:<View className={styles.styleOut}>{minute}</View>:
      <View className={styles.styleOut}>{seconds}</View>
    </View>
  )
}

const TimeCountDown = Component
export default TimeCountDown
