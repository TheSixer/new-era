import { useRef } from 'react'

/**
 * 永远返回第一次的运行的返回
 *
 * @param fun
 * @param time
 */
export function useSaveReturnFunction<T extends (...args: any) => any>(fun: T, time = 200) {
  const returnValue = useRef(null as ReturnType<T>)

  return (...args: Parameters<T>) => {
    if (returnValue.current) {
      return returnValue.current
    }

    returnValue.current = fun.apply(this, args)
    return returnValue.current
  }
}
