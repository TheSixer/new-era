import { useCallback, useRef } from 'react'

/**
 * 函数在未运行完成前 锁死
 *
 * @export
 * @template T
 * @param {T} fun
 * @returns
 */
export function useLockFunction<P extends any[] = any[]>(fn: (...args: P) => any) {
  const lockRef = useRef(false)

  return useCallback(
    async (...args: P) => {
      if (lockRef.current) return
      lockRef.current = true

      try {
        const ret = await fn(...args)
        lockRef.current = false
        return ret
      } catch (error) {
        lockRef.current = false
        throw error
      }
    },
    [fn]
  )
}
