import { memo, FC, ReactNode, PropsWithChildren } from 'react'
import { View } from '@tarojs/components'
import styles from './index.module.less'

export interface IIndexBarAnchorProps {
  /**
   * 索引 唯一
   */
  index: string
  /**
   * 内容区标题
   */
  title: ReactNode

  /**
   * 右侧悬浮描述
   */
  brief?: ReactNode
}

/**
 * name 索引栏
 */
const Component: FC<PropsWithChildren<IIndexBarAnchorProps>> = (props) => {
  return (
    <View id={`anchor-${props.index}`} className={styles.indexBarAnchorStyle}>
      <View className={styles.title}>{props.title}</View>

      <View>{props.children}</View>
    </View>
  )
}

const MMIndexBarAnchor = memo(Component)
MMIndexBarAnchor.displayName = 'MMIndexBarAnchor'
export default MMIndexBarAnchor
