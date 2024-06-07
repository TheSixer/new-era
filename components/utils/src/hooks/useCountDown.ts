/* eslint-disable no-nested-ternary */
import { useEffect, useRef, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'

export interface IUseCountDownOption {
  /** 结束时间 */
  endTime?: Date | number | Dayjs | string

  /**
   * 返回时间格式
   * 默认情况下返回的时间格式是字符串。如果你需要使用数值类型来做进一步的逻辑处理。那么你可以设置timeType位数值类型
   * 这个属性的优先级会高于[paratope]
   * @description string = day => '00'   number = day => 0
   */
  timeType?: 'string' | 'number'

  /** 数字是否补位  1 => 01 */
  paratope?: boolean

  /**
   * 是否立即开始倒计时
   * 如果设置为false。则需要调用start方法手动开始
   */
  start?: boolean

  /** 若初始化时当前时间已经超过 endTime，是否立即触发一次 onTimeEnd，默认 false */
  triggerInInitFinished?: boolean

  /**
   * 倒计时级别
   *
   * @default 'day''
   */
  countLevel?: 'day' | 'hour'

  /**
   * 倒计时结束时触发事件
   *
   * 只有当endTime时间大于当前时间。才会触发
   */
  onTimeEnd?(): void
}

/**
 * 倒计时
 *
 * @export
 * @param {IUseCountDownOption} props
 * @return {*}
 */
export default function useCountDown<T extends string | number>(props: IUseCountDownOption) {
  const { endTime, paratope = true, start: initStart = true, timeType = 'string', triggerInInitFinished = false, countLevel = 'day' } = props
  const initdata: any = timeType === 'number' ? 0 : paratope ? '00' : '0'
  const [day, setDay] = useState<number | string>(initdata)
  const [hour, setHour] = useState<string | number>(initdata)
  const [minute, setMinute] = useState<string | number>(initdata)
  const [seconds, setSeconds] = useState<string | number>(initdata)

  const timerRef = useRef<any>()

  useEffect(() => {
    if (endTime) {
      if ((initStart && isValidCountTime(endTime)) || triggerInInitFinished) {
        countDown()
      }
    }

    return () => {
      clearTimer()
    }
  }, [endTime])

  function countDown() {
    let endDay = dayjs(endTime)
    const startDay = dayjs()

    if (endDay.diff(startDay, 'millisecond') <= 0) {
      setDay(initdata)
      setHour(initdata)
      setMinute(initdata)
      setSeconds(initdata)
      props.onTimeEnd?.()
      return clearTimer()
    }

    const isNumberType = timeType === 'number'

    if (countLevel === 'day') {
      const diffDay = endDay.diff(startDay, 'day')
      setDay(isNumberType ? diffDay : toParatope(diffDay))
      if (diffDay > 0) {
        endDay = endDay.subtract(diffDay, 'day')
      }
    }

    const diffHour = endDay.diff(startDay, 'hour')
    setHour(isNumberType ? diffHour : toParatope(diffHour))
    if (diffHour > 0) {
      endDay = endDay.subtract(diffHour, 'hour')
    }

    const diffMinute = endDay.diff(startDay, 'minute')
    setMinute(isNumberType ? diffMinute : toParatope(diffMinute))
    if (diffMinute > 0) {
      endDay = endDay.subtract(diffMinute, 'minute')
    }

    let sec = endDay.diff(startDay, 'second')
    sec = sec <= 0 ? 0 : sec
    setSeconds(isNumberType ? sec : toParatope(sec))

    timerRef.current = setTimeout(() => {
      countDown()
    }, 200)
  }

  function clearTimer() {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
  }

  function toParatope(value: number) {
    return value < 10 && paratope ? `0${value}` : `${value}`
  }

  /**
   * 是否是有效的倒计时
   * @returns
   */
  function isValidCountTime(time: IUseCountDownOption['endTime']) {
    return !!time && dayjs(time).diff(dayjs(), 'millisecond') > 0
  }

  return {
    day: day as T,
    hour: hour as T,
    minute: minute as T,
    seconds: seconds as T,
    start: () => {
      if (isValidCountTime(endTime)) {
        countDown()
      }
    }
  }
}
