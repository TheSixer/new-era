/* eslint-disable max-nested-callbacks */
import Taro from '@tarojs/taro'
import { forwardRef, memo } from 'react'
import { CoverView, Image, View } from '@tarojs/components'
import useToastService, { IToastProps, ToastState, IToastRef, IToastMessageState } from './const'
import styles from './index.module.less'
import classNames from 'classnames'
import MMLoading from '../loading'
import MMIconFont from '../icon-font'

const { slideIn, slideOut, fadeIn, fadeOut } = ToastState

/**
 * Toast 轻提示
 * 在页面中间弹出黑色半透明提示，用于消息通知、加载提示、操作结果提示等场景。
 * @param {*} props
 * @return {*}
 */
const Component = forwardRef<IToastRef, IToastProps>((props, ref) => {
  const { messages, showMask } = useToastService(props, ref)

  const getMessageClassName = (value: IToastMessageState) => {
    const animationTypeClass = {
      [slideIn]: styles.animation_slideIn,
      [slideOut]: styles.animation_slideOut,
      [fadeIn]: styles.animation_fadeIn,
      [fadeOut]: styles.animation_fadeOut
    }[value.state]

    return classNames([styles.toastStyle_message, value.icon && styles.withIcon, styles[value.animationType!], animationTypeClass])
  }

  return (
    <View className={styles.toastStyle}>
      {showMask && (
        <View catchMove className={styles.toastStyle_mask}>
          <CoverView style={{ width: '100%', height: '100%' }} />
        </View>
      )}
      {messages.map(value => (
        <View key={value.id} className={classNames(styles.toastStyle_messageWrapper, styles[value.position || 'center'], value.hidden && styles.hidden)}>
          <View className={getMessageClassName(value)}>
            {(value.icon as any) === 'loading' && <MMLoading gray size={36} />}
            {!!value.icon && <MMIconFont size={24} value={value.icon} className={styles.iconfont} />}
            {!!value.img && <Image src={value.img} className={styles.img} />}
            {value.message}
          </View>
        </View>
      ))}
    </View>
  )
})

const MMToast = memo(Component)
export default MMToast
