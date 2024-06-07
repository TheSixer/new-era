import Taro, { getCurrentInstance } from '@tarojs/taro'
import { useState, useRef, useEffect, useCallback } from 'react'
import { IToastRef } from '../../components/toast/const'
import { IContainerDialogRef } from '../../components/dialog/ContainerDialog'

/** toast弹窗缓存对象 */
const toastMap: Record<string, IToastRef | null> = {}

/**
 * 设置toast
 * 会触发taro消息。通知所有的useToast更新toast
 *
 * 并且由于PageContainer中使用的是回调ref。在页面销毁时会自动将ref设置为
 * 所以有个自动销毁机制。你并不需要额外处理销毁
 */
export const setToast = (key: string, value: IToastRef | null) => {
  toastMap[key] = value
  // console.log(toastMap, value, 'setToast', `toast_${key}`)
  if (value) {
    Taro.eventCenter.trigger(`toast_${key}`)
  }
}

/**
 * 获取toast实例
 * 在useEffect中首次并不能保证已经存在
 *
 * @warning 必须与PageContainer组件一起使用！！！
 */
export function useToast() {
  const [, setFlag] = useState(false)
  // WARNNING: 这里H5 可能有bug。随时关注
  const pathRef = useRef<string>(getCurrentInstance().router?.path || '')

  const eventHanlder = useCallback(() => {
    setFlag((pre) => !pre)
  }, [])

  Taro.eventCenter.on(`toast_${pathRef.current}`, eventHanlder)

  useEffect(() => {
    return () => {
      Taro.eventCenter.off(`toast_${pathRef.current}`, eventHanlder)
    }
  })

  return [toastMap[pathRef.current]]
}

/** toast弹窗缓存对象 */
const dialogMap: Record<string, IContainerDialogRef | null> = {}
/**
 * 设置dialogMap
 * 会触发taro消息。通知所有的useDialog更新dialog
 *
 * 并且由于PageContainer中使用的是回调ref。在页面销毁时会自动将ref设置为null
 * 所以有个自动销毁机制。你并不需要额外处理销毁
 */
export const setDialog = (key: string, value: IContainerDialogRef | null) => {
  dialogMap[key] = value
  // console.log(dialogMap, value, 'dialog_', `dialog_${key}`)
  if (value) {
    Taro.eventCenter.trigger(`dialog_${key}`)
  }
}

/**
 * 获取对话框
 * 在useEffect中首次并不能保证已经存在
 *
 * @warning 必须与PageContainer组件一起使用！！！
 */
export function useDialog() {
  const [_, setFlag] = useState(false)
  // WARNNING: 这里H5 可能有bug。随时关注
  const pathRef = useRef<string>(getCurrentInstance().router?.path || '')

  const eventHanlder = useCallback(() => {
    setFlag((pre) => !pre)
  }, [])

  Taro.eventCenter.on(`dialog_${pathRef.current}`, eventHanlder)

  useEffect(() => {
    return () => {
      Taro.eventCenter.off(`dialog_${pathRef.current}`, eventHanlder)
    }
  })

  return dialogMap[pathRef.current]
}
