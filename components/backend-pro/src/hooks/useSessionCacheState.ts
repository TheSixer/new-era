import { useState, useCallback, useMemo, useEffect } from 'react';


export default function useSessionCacheState<S = any>(initState: S, key = '') {
  const cacheKey = useMemo(() => key ? encodeURIComponent(key + '_' + window.location.href) : '', [key])
  const bakKey = useMemo(() => key ? encodeURIComponent(key + '_' + window.location.href + '_bak') : '', [key])

  const [state, setState] = useState<S>(() => {
    if (key) {
      const state = sessionStorage.getItem(cacheKey)
      if (state) {
        sessionStorage.removeItem(cacheKey)
        return state === 'undefined' ? undefined : JSON.parse(state)
      }
    }
    return initState
  })


  const setCache = useCallback(() => {
    if (bakKey) {
      sessionStorage.setItem(cacheKey, sessionStorage.getItem(bakKey)!)
      sessionStorage.removeItem(bakKey)
    }
  }, [bakKey])


  useEffect(() => {
    if (bakKey) {
      sessionStorage.setItem(bakKey, JSON.stringify(state === undefined ? 'undefined' : state))
    }
  }, [state, bakKey])


  return [state, setState, setCache] as const
}