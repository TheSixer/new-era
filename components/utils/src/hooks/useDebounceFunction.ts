import { useRef } from 'react'

/**
 * 延迟触发 多次提交，提交最后一次
 *
 * @export
 * @template T
 * @param {T} fun
 * @param {number} [delay=200]
 * @returns
 */
export function useDebounceFunction<T extends (...args: any) => any>(fun: T, delay = 200) {
  const st = useRef(null as any) // 存储去抖动后的值

  return (...args: Parameters<T>) => {
    clearTimeout(st.current)
    st.current = setTimeout(() => {
      fun.apply(this, args)
    }, delay)
  }
}
