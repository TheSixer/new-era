import { useRef } from 'react'

/**
 * 节流函数
 * @param fn 包裹函数
 * @param threshold 间隔时间 默认200ms
 * @param scope this作用域
 * @returns
 */
export function useThrottle<T extends (...args: any) => any>(fn: T, threshold = 200, scope?: any) {
  const prev = useRef(Date.now())

  return (...args: Parameters<T>) => {
    const now = Date.now()
    if (now - prev.current > threshold) {
      prev.current = now
      // eslint-disable-next-line @typescript-eslint/no-invalid-this
      fn.apply(scope || this, args)
    }
  }
}
