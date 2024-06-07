/* eslint-disable @typescript-eslint/no-invalid-this */
import { useRef } from 'react'

type Fun = (...args) => any

/**
 * 特殊节流函数
 * 相比较于普通节流函数。最后一次触发事件后也还会执行一次事件处理函数
 * @param fn 包裹函数
 * @param threshold 间隔时间 默认200ms
 * @returns
 */
export function useThrottleLast(fn: Fun, threshold = 200) {
  const timer = useRef<any>()
  const startTime = useRef(Date.now())

  return (...args) => {
    const remaining = threshold - (Date.now() - startTime.current)
    clearTimeout(timer.current)
    if (remaining <= 0) {
      fn.apply(this, args)
      startTime.current = Date.now()
    } else {
      timer.current = setTimeout(() => fn.apply(this, args), remaining)
    }
  }
}
