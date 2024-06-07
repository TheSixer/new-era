/* eslint-disable max-nested-callbacks */
import { ReactNode, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { guid } from '../utils'

export interface IToastProps {
  /**
   * 持续时间
   * 覆盖默认的持续时间
   * 传递null则不自动关闭
   * @default 4.5s
   */
  duration?: number | null

  /**
   * 弹窗位置
   * @defalt top
   */
  position?: EToastPosition | keyof typeof EToastPosition
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

export interface IToastMessage extends IToastProps {
  /** 消息 */
  title: ReactNode

  /** 通知内容 */
  content?: ReactNode

  /**
   * 动画方式
   *
   * @default slideup 滑动
   */
  animationType?: EAnimationType | keyof typeof EAnimationType

  /** 图标 */
  icon?: ReactNode

  /**
   * 图片类型
   *
   * 传递快捷类型显示图片
   * 传递这个值的时候会忽略icon prop
   */
  iconType?: 'success' | 'error'
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

export type IMMNotificationRef = ReturnType<typeof useToastService>['imperativeHandler'] // Toast ref引用类型

export type IToastInstance = {
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
  const { duration = 4500, position = EToastPosition.top } = props
  const [messages, setMessages] = useState<IToastMessageState[]>([])
  // const clearSetTimeout = useRef<any>()
  const durationTime = useRef<Record<string, any>>({})

  const loadingRef = useRef('')

  /**
   * 设置隐藏当前弹窗实例
   */
  function setHide({ id, time = transitionTiming }: IHideOption) {
    // 执行推出动画
    if (time > 50) {
      setMessages((pre) => pre.map((value) => (value.id === id ? { ...value, state: value.outState } : value)))
    }
    setTimeout(() => {
      // 实例推出
      setMessages((pre) =>
        pre.filter((value) => {
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

    const pos = option.position || position
    // 计算动画类型
    const { animationType = EAnimationType.slideup, ...rest } = option
    const [ain, outState] = {
      [EAnimationType.slideup]: [slideIn, slideOut],
      [EAnimationType.fade]: [fadeIn, fadeOut]
    }[animationType]

    // 推入栈
    setMessages((pre) => [...pre, { ...rest, animationType, position: pos, id, state: ToastState.new, outState, cb }])

    // 执行进入动画并计算持续时间
    setTimeout(() => {
      setMessages((pre) => pre.map((value) => (value.id === id ? { ...value, state: ain } : value)))
      setDuration()
    }, 50)

    // 设置持续时间
    function setDuration() {
      if (durationTime.current[id]) {
        clearTimeout(durationTime.current[id])
      }
      // 计算退出时间。 如果是null 则不退出
      const dur = option.duration || duration
      if (dur !== null) {
        durationTime.current[id] = setTimeout(() => {
          setHide({ id })
        }, dur - 100)
      }
    }

    return {
      /**
       * 隐藏弹窗
       */
      hide: () => setHide({ id, time: 100 })
    }
  }

  function addToastWrapper(message: string | IToastAction, options?: Partial<IToastMessage>, cb?: IToastMessageCallBack) {
    const option = typeof message === 'string' ? { message } : { ...message }
    return addToast({ title: '', ...option, ...options }, cb)
  }

  const imperativeHandler = {
    /**
     * 弹出一个信息提示框
     *
     */
    open: (message: IToastMessage, cb?: IToastMessageCallBack) => addToast(message, cb)!,

    /**
     * 弹出一个失败信息提示框
     *
     */
    fail: (message: IToastAction, cb?: IToastMessageCallBack) => addToastWrapper(message, { iconType: 'error' }, cb)!,

    /**
     * 弹出一个成功信息提示框
     *
     */
    success: (message: IToastAction, cb?: IToastMessageCallBack) => addToastWrapper(message, { iconType: 'success' }, cb)!
  }

  useImperativeHandle(ref, () => imperativeHandler, [duration])

  useEffect(() => {
    return () => {
      // clearSetTimeout.current && clearTimeout(clearSetTimeout.current)
      Object.keys(durationTime.current).forEach((key) => {
        durationTime.current[key] && clearTimeout(durationTime.current[key])
      })
    }
  }, [])

  return {
    messages,
    imperativeHandler,
    setHide
  }
}
