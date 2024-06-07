import dayjs, { Dayjs } from 'dayjs'
import { useEffect, useState } from 'react'
import useCountDown, { IUseCountDownOption } from './useCountDown'

export interface IUseTimePredictionOption<T = string | Date | Dayjs | number> extends Pick<IUseCountDownOption, 'countLevel'> {
  /** 开始时间 */
  startTime?: T
  /** 结束时间 */
  endTime?: T
  /**
   * 返回时间格式
   * 默认情况下返回的时间格式是字符串。如果你需要使用数值类型来做进一步的逻辑处理。那么你可以设置timeType位数值类型
   * 这个属性的优先级会高于[paratope]
   * @description string = day => '00'   number = day => 0
   */
  timeType?: 'string' | 'number'
  /** 数字是否补位  1 => 01 */
  paratope?: boolean

  /** 时间阶段发生变化时触发 */
  onTimeStateChange?(current: TTimeRangeState): void
}

export type TTimeRangeState = 'notStart' | 'pending' | 'end'

export default function useTimeRangeCountDown<T extends string | number = string>(opiton: IUseTimePredictionOption) {
  const { endTime, startTime, paratope, timeType, onTimeStateChange } = opiton

  const [timeRangeState, setTimeRangeState] = useState<TTimeRangeState>('notStart')

  const startCountDown = useCountDown<T>({
    endTime: startTime,
    paratope,
    timeType,
    start: false,
    onTimeEnd: () => {
      setTimeRangeState('pending')
      endCountDown.start()
      onTimeStateChange?.('pending')
    }
  })

  const endCountDown = useCountDown<T>({
    endTime,
    start: false,
    paratope,
    timeType,
    onTimeEnd: () => {
      setTimeRangeState('end')
      onTimeStateChange?.('end')
    }
  })

  useEffect(() => {
    // 当都有值的时候
    if (startTime && endTime) {
      const now = dayjs()
      // 判断是否到期.到期直接结束
      if (now.isAfter(endTime, 'millisecond')) {
        setTimeRangeState('end')
      } else if (now.isAfter(startTime, 'millisecond')) {
        setTimeRangeState('pending')
        endCountDown.start()
      } else {
        setTimeRangeState('notStart')
        startCountDown.start()
      }
    }
  }, [startTime, endTime])

  const day = timeRangeState === 'notStart' ? startCountDown.day : endCountDown.day
  const hour = timeRangeState === 'notStart' ? startCountDown.hour : endCountDown.hour
  const minute = timeRangeState === 'notStart' ? startCountDown.minute : endCountDown.minute
  const seconds = timeRangeState === 'notStart' ? startCountDown.seconds : endCountDown.seconds

  return {
    day,
    hour,
    minute,
    seconds,
    timeRangeState
  }
}
