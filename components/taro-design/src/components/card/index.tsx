import { FC, PropsWithChildren, memo } from 'react'
import styles from './index.module.less'
import { ICardProps } from './const'
import { View } from '@tarojs/components'
import classNames from 'classnames'

/**
 * 卡片组件
 * @param props
 * @returns
 */
const Component: FC<PropsWithChildren<ICardProps>> = props => {
  const { title = '', size, onClick } = props

  return (
    <View className={classNames(styles.cardStyle, size && styles[size], props.className)} style={props.style} onClick={onClick}>
      {!!title && (
        <View className={styles.cardStyle_title}>
          <View style={{ flex: 1 }}>{title}</View>
          <View>{props.extra}</View>
        </View>
      )}

      <View className={styles.cardStyle_content}>{props.children}</View>
    </View>
  )
}

Component.displayName = 'MMCard'

const MMCard = memo(Component)
export default MMCard
