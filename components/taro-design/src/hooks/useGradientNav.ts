import { useState, CSSProperties, useRef, useEffect } from 'react'
import Taro from '@tarojs/taro'
import MMNavigation from '../components/navigation'

export interface IUseGradientNav {
  /** 选择器 */
  selector: string

  /**
   * 顶部偏移量
   * 距离顶部多少时开始计算
   * @default 20
   */
  offset?: number

  /** 初始样式 */
  style: {
    /** 背景色 */
    background?: number[]
    /** 字体颜色 */
    color?: number[]
  }
}

/**
 * 渐变导航
 *
 * 颜色只能使用rgb颜色
 * @export
 * @return {*}
 */
export default function useGradientNav(option: IUseGradientNav) {
  const { style = {}, offset = 20 } = option
  const { background = [255, 255, 255], color = [51, 51, 51] } = style

  const [contentStyle, setContentStyle] = useState<CSSProperties>(() => {
    return {
      background: `rgb(${background.join(' ')} / 0)`,
      color: `rgb(${color.join(' ')} / 0)`
    }
  })

  const query = useRef<Taro.SelectorQuery>()
  const navHeight = useRef(MMNavigation.navigationHeight * 2)

  useEffect(() => {
    Taro.nextTick(() => {
      if (process.env.TARO_ENV === 'h5'){
        // query.current = (document.querySelector(option.selector) as any)
        // console.log(query)
      }else {
      query.current = Taro.createSelectorQuery()
        .select(option.selector)
        .boundingClientRect(({top}) => {
          if (typeof top === 'number'){
            // 把顶部拉出来时是 > 0
            if (top > 0) return
            const offsetTop = Math.abs(top) - offset
            let opa = parseFloat((offsetTop / navHeight.current).toFixed(2))
            // eslint-disable-next-line no-nested-ternary
            opa = opa >= 1 ? 1 : opa <= 0.2 ? 0 : opa
            setContentStyle({ background: `rgb(${background.join(' ')} / ${opa})`, color: `rgb(${color.join(' ')} / ${opa})` })
          }
        })
      }
    })
  }, [])

  const hanelScroll = throttleLast((ev) => {
    if (process.env.TARO_ENV === 'h5'){
      const {top} = (document.querySelector(option.selector) as any).getBoundingClientRect();
      if (typeof top === 'number'){
        // 把顶部拉出来时是 > 0
        if (top > 0) return
        const offsetTop = Math.abs(top) - offset
        let opa = parseFloat((offsetTop / navHeight.current).toFixed(2))
        // eslint-disable-next-line no-nested-ternary
        opa = opa >= 1 ? 1 : opa <= 0.3 ? 0 : opa
        setContentStyle({ background: `rgb(${background.join(' ')} / ${opa})`, color: `rgb(${color.join(' ')} / ${opa})` })
      }
    }else {
      query.current?.exec()
    }
  }, 50)

  return {
    contentStyle,
    hanelScroll
  }
}

function throttle<T extends (...args: any) => any>(fun: T, time = 200) {
  let date = new Date()
  return (...args: Parameters<T>) => {
    return new Promise<ReturnType<T>>((resolve) => {
      const now = new Date()
      if (now.getTime() - date.getTime() > time) {
        date = now
        resolve(fun.apply(this, args))
      }
    })
  }
}

function throttleLast(fun: any, time = 200, lastTime = 500) {
  let date = new Date()
  let stLast = useRef<any>()
  return function (...args) {
    const now = new Date()
    clearTimeout(stLast.current)
    if (now.getTime() - date.getTime() > time) {
      date = now
      fun.apply(this, args)
    } else {
      stLast.current = setTimeout(() => {
        fun.apply(this, args)
      }, lastTime)
    }
  }
}
