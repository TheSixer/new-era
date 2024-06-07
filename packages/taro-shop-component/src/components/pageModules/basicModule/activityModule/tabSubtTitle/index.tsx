import { FC } from 'react'
import { Text } from '@tarojs/components'
import { ITabSubtTitleProps } from './const'
import useTimeRangeCountDown from '@wmeimob/utils/src/hooks/useTimeRangeCountDown'
import dayjs from 'dayjs'

const Component: FC<ITabSubtTitleProps> = (props) => {
  const { startTime = '', endTime = '' } = props

  const { day, hour, minute, seconds, timeRangeState } = useTimeRangeCountDown<number>({ startTime, endTime, timeType: 'number' })

  const paratopeTime = (data: number) => (data < 10 ? `0${data}` : `${data}`)

  let text = ''
  if (!startTime || !endTime) {
    text = '已结束'
  } else if (dayjs(endTime).diff(dayjs(), 'millisecond') < 0) {
    // endTime 小于当前判定为已结束
    text = '已结束'
  } else if (timeRangeState === 'end') {
    text = '已结束'
  } else if (timeRangeState === 'notStart') {
    text = day > 0 ? `${day}天后开始` : `${paratopeTime(hour)}:${paratopeTime(minute)}:${paratopeTime(seconds)}开始`
  } else {
    text = day > 0 ? `${day}天后结束` : `${paratopeTime(hour)}:${paratopeTime(minute)}:${paratopeTime(seconds)}结束`
  }

  return <Text>{text}</Text>
}

const TabSubtTitle = Component
export default TabSubtTitle
