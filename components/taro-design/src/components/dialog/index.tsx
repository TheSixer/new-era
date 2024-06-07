import { memo, PropsWithChildren, useState, FC } from 'react'
import { View, Text } from '@tarojs/components'
import { IDialogProps } from './const'
import styles from './index.module.less'
import MMOverlay from '../overlay'
import classNames from 'classnames'
import MMLoading from '../loading'
import MMSpace from '../space'
import MMIconFontName from '../icon-font/const'
import MMIconFont from '../icon-font'

/**
 * 对话框组件
 * @param props
 * @returns
 */
const Component: FC<PropsWithChildren<IDialogProps>> = (props) => {
  const {
    visible,
    footer,
    title = '',
    okText = '确定',
    closeable = false,
    cancel = true,
    cancelText = '取消',
    okColor = styles.fiveColor,
    cancelColor = styles.gray6
  } = props

  const showFooter = footer !== false

  const [loading, setLoading] = useState(false)

  const handleOk = async () => {
    if (props.okLoading) {
      setLoading(true)
    }
    try {
      await props.onOk?.()
    } catch (error) {}
    setLoading(false)
  }

  return (
    <MMOverlay visible={visible}>
      <View className={styles.dialogStyle}>
        <View className={styles.dialogStyle_wrapper}>
          <View className={styles.dialogStyle_content_wrapper}>
            {/* 标题 */}
            <View className={styles.dialogStyle_title}>
              <Text>{title}</Text>
              {closeable && (
                <View className={styles.dialogStyle_close} onClick={props.onCancel}>
                  <MMIconFont value={MMIconFontName.Close} size={14} color={styles.gray5} />
                </View>
              )}
            </View>
            {/* 内容 */}
            {(!!props.children || !!props.content) && <View className={styles.dialogStyle_content}>{props.children || props.content}</View>}
          </View>

          {/* 底部 */}
          {showFooter && (
            <View className={styles.dialogStyle_foot}>
              {props.footer ? (
                // 自定义底部
                <View className={styles.dialogStyle_customFooter}>{props.footer}</View>
              ) : (
                <>
                  {/* 取消 */}
                  {cancel && (
                    <View className={classNames(styles.dialogStyle_foot_item, styles.cancel)} style={{ color: cancelColor }} onClick={() => props.onCancel?.()}>
                      {cancelText}
                    </View>
                  )}

                  {/* 确定 */}
                  <View className={styles.dialogStyle_foot_item} style={{ color: okColor }} onClick={handleOk}>
                    <MMSpace>
                      {loading && <MMLoading size={12} />}
                      {okText}
                    </MMSpace>
                  </View>
                </>
              )}
            </View>
          )}
        </View>
      </View>
    </MMOverlay>
  )
}

const MMDialog = memo(Component)
export default MMDialog
