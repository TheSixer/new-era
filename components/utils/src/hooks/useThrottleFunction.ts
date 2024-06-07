import { useRef } from 'react'

/**
 * 多少毫秒才能发送一次 限流
 * @deprecated
 * @export
 * @template T
 * @param {T} fun
 * @param {number} [delay=200]
 * @returns
 */
export function useThrottleFunction<T extends (...args: any) => any>(fun: T, time = 200) {
  // 存储去抖动后的值
  const date = useRef(new Date())

  return (...args: Parameters<T>) => {
    return new Promise<ReturnType<T>>((resolve) => {
      const now = new Date()
      if (now.getTime() - date.current.getTime() > time) {
        date.current = now
        resolve(fun.apply(this, args))
      }
    })
  }
}
