import Taro from '@tarojs/taro'
import { FC, memo, PropsWithChildren, useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import { IHeadBarProps } from './const'
import styles from './index.module.less'
import classNames from 'classnames'

/**
 * 固定头部组件
 */
const Component: FC<PropsWithChildren<IHeadBarProps>> = props => {
  const [height, setHeight] = useState<number>()

  useEffect(() => {
    Taro.nextTick(() => {
      Taro.createSelectorQuery()
        .select(`.${styles.headBarStyle_wrapper}`)
        .boundingClientRect(res => {
          setHeight(res.height)
        })
        .exec()
    })
  }, [])

  return (
    <View className={classNames(styles.headBarStyle, props.className)} style={{ height: props.height || height }}>
      <View className={styles.headBarStyle_wrapper}>{props.children}</View>
    </View>
  )
}

const MMFixHead = memo(Component)
export default MMFixHead
