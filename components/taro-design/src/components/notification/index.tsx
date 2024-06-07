/* eslint-disable max-nested-callbacks */
import { forwardRef, memo } from 'react'
import { Image, View } from '@tarojs/components'
import useToastService, { IToastProps, ToastState, IMMNotificationRef, IToastMessageState } from './const'
import styles from './index.module.less'
import classNames from 'classnames'
import icon_close from './icon_close.png'
import icon_success from './icon_success.png'
import icon_error from './icon_error.png'

const { slideIn, slideOut, fadeIn, fadeOut } = ToastState

/**
 * Toast 轻提示
 * 在页面中间弹出黑色半透明提示，用于消息通知、加载提示、操作结果提示等场景。
 * @param {*} props
 * @return {*}
 */
const Component = forwardRef<IMMNotificationRef, IToastProps>((props, ref) => {
  const { messages, setHide } = useToastService(props, ref)

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
      {messages.map((value) => (
        <View key={value.id} className={classNames(styles.toastStyle_messageWrapper, styles[value.position!])}>
          <View className={getMessageClassName(value)}>
            {!!value.iconType ? (
              <Image src={{ success: icon_success, error: icon_error }[value.iconType]} style={{ width: 30, height: 30, marginLeft: 15 }} />
            ) : (
              value.icon
            )}

            <View className={styles.notification_content}>
              <View className={styles.notification_content_title}>{value.title}</View>

              {!!value.content && <View className={styles.notification_content_content}>{value.content}</View>}
            </View>

            <Image
              src={icon_close}
              className={styles.close}
              onClick={() => {
                setHide({ id: value.id })
              }}
            />
          </View>
        </View>
      ))}
    </View>
  )
})

const MMNotification = memo(Component)
export default MMNotification
