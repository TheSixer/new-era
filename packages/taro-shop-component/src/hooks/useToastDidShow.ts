import { useToast } from '@wmeimob/taro-design'
import { useEffect, useRef } from 'react'
import Taro, { useDidShow } from '@tarojs/taro'

/**
 * 支持在didShow里面使用toast
 *
 * @param fn
 * @param deps
 * @description 由于小程序机制（没有root节点）所以toast本质上是基于组件Ref实现的。
 * 故在useDidShow生命周期里面。toast并没有挂载.所以这里写了一个hack的方法来实现
 */
export default function useToastDidShow(fn: () => any, deps: React.DependencyList = []) {
  const [toast] = useToast()
  const didShowRef = useRef(false)

  useEffect(() => {
    if (toast) {
      Taro.nextTick(async () => {
        didShowRef.current = true
        fn()
      })
    }
  }, [toast])

  useDidShow(() => {
    if (didShowRef.current) {
      fn()
    }
  })
}
