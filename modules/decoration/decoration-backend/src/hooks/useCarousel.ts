import { CarouselRef } from 'antd/lib/carousel'
import { useEffect, useRef } from 'react'

/**
 *
 * 轮播组件hook
 * 用于控制轮播图自动轮播
 * @param interval 轮播间隔 1s
 */
export default function useCarousel(interval = 1) {
  const ref = useRef<CarouselRef | null>(null)
  const timeout = useRef<any>()

  useEffect(() => {
    function doNext() {
      if (timeout.current) {
        clearTimeout(timeout.current)
      }
      timeout.current = setTimeout(() => {
        ref.current?.next()
        doNext()
      }, interval * 1000)
    }

    interval > 0 && doNext()

    return () => {
      clearTimeout(timeout.current)
    }
  }, [interval])

  return {
    carouselRef: ref
  }
}
