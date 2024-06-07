import { memo, Children, ReactNode, FC } from 'react'
import { View } from '@tarojs/components'
import { ISpaceProps } from './const'
import styles from './index.module.less'
import classNames from 'classnames'

/**
 * Space间距
 * 设置组件之间的间距。
 *
 * 何时使用
 * 避免组件紧贴在一起，拉开统一的空间。
 * 适合行内元素的水平间距。
 * 可以设置各种水平对齐方式。
 * @param props
 * @returns
 */
const Component: FC<ISpaceProps> = (props) => {
  const { gap = 10, direction = 'row', className, style } = props

  const newChildren: ReactNode[] = []
  Children.forEach(props.children, (node) => {
    if ([undefined, null, false, true, ''].indexOf(node) === -1) {
      newChildren.push(node)
    }
  })

  const isOnlyOne = newChildren.length === 1

  const halfMargin = `${gap / 2}px`

  const renderItem = (nodes: ReactNode[]) =>
    nodes.map((item, index) => (
      <View key={index} style={{ margin: isOnlyOne ? 0 : halfMargin }}>
        {item}
      </View>
    ))

  return newChildren.length ? (
    <View className={classNames(styles.spaceStyle, styles[direction], className)} style={style}>
      {direction === 'row' && (
        <View className={styles.spaceStyle_wrapper} style={{ margin: isOnlyOne ? 0 : `-${halfMargin}`, flexDirection: direction }}>
          {renderItem(newChildren)}
        </View>
      )}

      {direction === 'column' && <View style={{ margin: isOnlyOne ? 0 : `-${halfMargin}` }}>{renderItem(newChildren)}</View>}
    </View>
  ) : (
    props.children
  )
}

const MMSpace = memo(Component)
export default MMSpace
