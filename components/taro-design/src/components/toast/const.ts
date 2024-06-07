/* eslint-disable max-nested-callbacks */
import { ReactNode, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import MMIconFontName from '../icon-font/const'
import { guid } from '../utils'

export interface IToastProps {
  /**
   * 持续时间
   *
   */
  duration?: number

  /**
   * 全局是否有蒙层
   */
  mask?: boolean
}

export enum ToastState {
  new,
  slideIn,
  slideOut,

  fadeIn,
  fadeOut
}

export enum EAnimationType {
  /** 淡入淡出 */
  fade = 'fade',

  /** 滑动滑出 */
  slideup = 'slideup'
}

/** 弹窗位置 */
export enum EToastPosition {
  /** 顶部 */
  top = 'top',
  /** 居中 */
  center = 'center',
  /** 底部 */
  bottom = 'bottom'
}

export interface IToastMessage {
  /** 消息 */
  message: ReactNode

  /** 自定义icon */
  icon?: MMIconFontName

  /** 自定义图片 */
  img?: string

  /**
   * 动画方式
   *
   * @default fade 淡入淡出
   */
  animationType?: EAnimationType | keyof typeof EAnimationType

  /**
   * 弹窗位置
   */
  position?: EToastPosition | keyof typeof EToastPosition

  /**
   * 持续时间
   * 覆盖默认的持续时间
   */
  duration?: number

  /**
   * 是否有蒙层
   */
  mask?: boolean

  /**
   * 是否不显示
   *
   * @description 比如当你需要一个loading态蒙层防止点击事件时。你可以设置此属性
   */
  hidden?: boolean
}

export interface IToastMessageState extends IToastMessage {
  id: string

  /** 当前动画状态 */
  state: ToastState

  /** 退出状态 */
  outState: ToastState

  /** 回调函数 */
  cb?: IToastMessageCallBack
}

export type IToastMessageCallBack = () => void

export type IToastAction = Partial<Omit<IToastMessage, 'icon'>>

export type IToastRef = ReturnType<typeof useToastService>['imperativeHandler'] // Toast ref引用类型

export type IToastInstance = {
  /** 更新message信息 */
  setMessage(message: IToastMessage['message']): void
  /** 隐藏当前弹窗 */
  hide(): void
}

export interface IHideOption {
  /** toast */
  id: string
  /**
   * 延迟时间
   * @default transitionTiming = 500
   */
  time?: number
}

const { slideIn, slideOut, fadeIn, fadeOut } = ToastState
const transitionTiming = 500

/**
 * 组件逻辑hook
 * @param props
 * @param ref
 * @returns
 */
export default function useToastService(props: IToastProps, ref: any) {
  const { duration = 2000, mask = false } = props
  const [messages, setMessages] = useState<IToastMessageState[]>([])
  // const clearSetTimeout = useRef<any>()
  const durationTime = useRef<Record<string, any>>({})

  const showMask = useMemo(() => messages.some(it => it.mask), [messages])

  const loadingRef = useRef('')

  /**
   * 设置隐藏当前弹窗实例
   */
  function setHide({ id, time = transitionTiming }: IHideOption) {
    // 执行推出动画
    if (time > 50) {
      setMessages(pre => pre.map(value => (value.id === id ? { ...value, state: value.outState } : value)))
    }
    setTimeout(() => {
      // 实例推出
      setMessages(pre =>
        pre.filter(value => {
          // 在此执行回调函数函数
          if (value.id === id) {
            setTimeout(() => {
              value.cb?.()
            }, 0)
          }
          return value.id !== id
        })
      )
    }, time)
  }

  function addToast(option: IToastMessage, cb?: IToastMessageCallBack): IToastInstance | undefined {
    const id = guid()

    if ((option.icon as any) === 'loading') {
      if (loadingRef.current) {
        return undefined
      }
      // 如果是loadind 缓存id
      loadingRef.current = id
    }

    // 计算动画类型
    const { animationType = EAnimationType.fade } = option
    const [ain, outState] = {
      [EAnimationType.slideup]: [slideIn, slideOut],
      [EAnimationType.fade]: [fadeIn, fadeOut]
    }[animationType]

    // 推入栈
    setMessages(pre => [...pre, { mask, ...option, id, state: ToastState.new, outState, cb }])

    // 执行进入动画并计算持续时间
    setTimeout(() => {
      setMessages(pre => pre.map(value => (value.id === id ? { ...value, state: ain } : value)))
      setDuration()
    }, 50)

    // 设置持续时间
    function setDuration() {
      if (durationTime.current[id]) {
        clearTimeout(durationTime.current[id])
      }
      // 计算退出时间
      durationTime.current[id] = setTimeout(() => {
        setHide({ id })
      }, (option.duration || duration) - 100)
    }

    return {
      /**
       * 更新弹窗信息
       * 更新内容后会重置弹窗持续时间
       */
      setMessage(message) {
        setMessages(pre => pre.map(me => (me.id === id ? { ...me, message } : me)))
        setDuration()
      },
      /**
       * 隐藏弹窗
       */
      hide: () => setHide({ id, time: 100 })
    }
  }

  function addToastWrapper(message: string | IToastAction, options?: Partial<IToastMessage>, cb?: IToastMessageCallBack) {
    const option = typeof message === 'string' ? { message } : { ...message }
    return addToast({ message: '', ...option, ...options }, cb)
  }

  const imperativeHandler = {
    /**
     * 弹出一个信息提示框
     *
     */
    message: (message: string | IToastMessage, cb?: IToastMessageCallBack) => addToast(typeof message === 'string' ? { message } : { ...message }, cb)!,

    /**
     * 弹出一个失败信息提示框
     *
     */
    fail: (message: string | IToastAction, cb?: IToastMessageCallBack) => addToastWrapper(message, { icon: MMIconFontName.Close }, cb)!,

    /**
     * 弹出一个成功信息提示框
     *
     */
    success: (message: string | IToastAction, cb?: IToastMessageCallBack) => addToastWrapper(message, { icon: MMIconFontName.Check }, cb)!,

    /**
     * 显示一个loading
     *
     * @duration 强制持续时间为10s
     * @description loading设计为单例模式。 在组件级别只存在一个
     * loading状态下mask强制为true.也就是会阻止一切点击事件。
     * 所以你必须手动调用toast.hideLoading()来关闭
     */
    loading: (message?: string | IToastAction, cb?: IToastMessageCallBack) => {
      let option: IToastAction = {
        duration: 10000
      }

      option = typeof message === 'string' ? { ...option, message } : { ...option, ...message }
      return addToastWrapper(option, { icon: 'loading' as any, mask: true }, cb)
    },

    /**
     * 隐藏loading
     */
    hideLoading: () => {
      if (loadingRef.current) {
        setHide({ id: loadingRef.current, time: 100 })
        loadingRef.current = ''
      }
    }
  }

  useImperativeHandle(ref, () => imperativeHandler, [duration])

  useEffect(() => {
    return () => {
      // clearSetTimeout.current && clearTimeout(clearSetTimeout.current)
      Object.keys(durationTime.current).forEach(key => {
        durationTime.current[key] && clearTimeout(durationTime.current[key])
      })
    }
  }, [])

  return {
    messages,
    showMask,
    imperativeHandler
  }
}
