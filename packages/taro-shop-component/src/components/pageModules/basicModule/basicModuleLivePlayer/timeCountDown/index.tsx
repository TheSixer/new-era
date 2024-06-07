import { FC } from 'react'
import { View } from '@tarojs/components'
import { ITimeCountDownProps } from './const'
import styles from './index.module.less'
import useCountDown from '@wmeimob/utils/src/hooks/useCountDown'

const Component: FC<ITimeCountDownProps> = (props) => {
  const { expectStartTime = '', onEnd = () => {} } = props

  const { day, minute, hour, seconds } = useCountDown({
    endTime: expectStartTime,
    onTimeEnd: onEnd
  })

  return (
    <View className={styles.timeCountDownStyle}>
      <View className={styles.red}>预告</View>
      {day}天{hour}:{minute}:{seconds}开始
    </View>
  )
}

const TimeCountDown = Component
export default TimeCountDown
