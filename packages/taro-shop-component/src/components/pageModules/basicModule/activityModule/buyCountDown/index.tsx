import { View, Text } from '@tarojs/components'
import { IBuyCountDownProps } from './const'
import styles from './index.module.less'
import useTimeRangeCountDown from '@wmeimob/utils/src/hooks/useTimeRangeCountDown'
import { FC } from 'react'

const Component: FC<IBuyCountDownProps> = (props) => {
  const { endTime = '', startTime = '' } = props
  const { day, hour, minute, seconds, timeRangeState } = useTimeRangeCountDown<number>({ startTime, endTime, timeType: 'number' })

  const paratopeTime = (data: number) => (data < 10 ? `0${data}` : `${data}`)

  return (
    <View className={styles.buyCountDownStyle}>
      {timeRangeState === 'end' || !startTime || !endTime ? (
        <Text>已结束</Text>
      ) : (
        <View>
          <Text>距{timeRangeState === 'notStart' ? '开始' : '结束'}</Text>
          <Text className={styles.pinkBorder}>{paratopeTime(day)}</Text>天<Text className={styles.pinkBorder}>{paratopeTime(hour)}</Text>:
          <Text className={styles.pinkBorder}>{paratopeTime(minute)}</Text>:<Text className={styles.pinkBorder}>{paratopeTime(seconds)}</Text>
        </View>
      )}
    </View>
  )
}

const BuyCountDown = Component
export default BuyCountDown
