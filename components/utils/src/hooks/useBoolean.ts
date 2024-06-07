import { useState, useCallback } from 'react'

/**
 * useBoolean 真假值控制
 *
 * @export
 * @param {boolean} [defaultBoolean=false]
 * @return {*}
 */
export function useBoolean(defaultBoolean = false) {
  const [state, setState] = useState(defaultBoolean)

  /** 设置为true */
  const setTrue = useCallback(() => setState(true), [])

  /** 设置为false */
  const setFalse = useCallback(() => setState(false), [])

  /** 切换 */
  const toggle = useCallback(() => setState((pre) => !pre), [])

  return [
    state,
    {
      triggerBoolean: setState,
      toggle,
      setState,
      setTrue,
      setFalse
    }
  ] as const
}
