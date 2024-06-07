import { useMemo } from 'react'
import { View, Text } from '@tarojs/components'
import classnames from 'classnames'
import styles from './index.modules.less'

interface IProps {
  /**
   * 值
   */
  value?: number | string

  /**
   * 展示封顶的数字值
   * @default 99
   */
  overflowCount?: number

  /**
   * 设置状态点的位置偏移
   */
  offset?: [number, number?]

  /**
   * 不展示数字，只有一个小红点
   */
  dot?: boolean

  /**
   * 绝对定位
   */
  absolute?: boolean
}

/**
 * @name 徽章
 */
const MMBadgeTabbar = (props: IProps) => {
  const { value, overflowCount = 99, absolute, dot, offset = [19, 3] } = props

  const retValue = useMemo(() => {
    const inValue = Number(value ?? 0)
    return isNaN(inValue) ? 0 : inValue > overflowCount ? `${overflowCount}+` : value
  }, [value, overflowCount])

  return (
    <View className={classnames(absolute && styles.MMBadgeAbsolute)} style={{ right: offset[0] ?? 0, top: offset[1] ?? 0 }}>
      <View className={classnames(styles.MMBadge, value !== void 0 && !dot && styles.MMBadgeNumber)}>{!dot && <Text>{retValue}</Text>}</View>
    </View>
  )
}

export default MMBadgeTabbar
