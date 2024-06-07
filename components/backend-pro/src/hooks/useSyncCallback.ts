/*
 * 同步hooks
 */

import { useEffect, useState, useCallback } from 'react'

export default function useSyncCallback (callback) {
  const [proxyState, setProxyState] = useState({ current: false })

  const Func = useCallback(() => {
      setProxyState({ current: true })
  }, [])

  useEffect(() => {
      if (proxyState.current === true) setProxyState({ current: false })
  }, [proxyState])

  useEffect(() => {
      proxyState.current && callback()
  })

  return Func
}