import React, { memo, PropsWithChildren, FC } from 'react'
import { View } from '@tarojs/components'
import { ICellGroupProps } from './const'
import styles from './cell-group.module.less'
import classNames from 'classnames'

/**
 * MMCellGroup 单元格组
 *
 * 单元格组会加上边框信息
 * @param props
 * @returns
 */
const Component: FC<PropsWithChildren<ICellGroupProps>> = props => {
  const { className, style, title, onClick } = props

  let childrenIndex = -1
  const newChildren = React.Children.map(props.children, (child: any) => {
    if (child?.type?.displayName === 'MMCell') {
      const idx = ++childrenIndex
      return React.cloneElement(child, {
        key:idx,
        onClick: () => {
          const { props: cprops = {} } = child
          cprops.onClick?.()
          onClick?.(cprops.name || idx, idx)
        }
      })
    }
    return child
  })

  return (
    <View className={classNames(styles.cellGroupStyle, className)} style={style}>
      {title && <View className={styles.title}>{title}</View>}
      {newChildren}
    </View>
  )
}

const MMCellGroup = memo(Component)
export default MMCellGroup
