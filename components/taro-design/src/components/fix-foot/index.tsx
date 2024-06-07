import Taro from '@tarojs/taro'
import { memo, PropsWithChildren, useEffect, useRef, useState, FC } from 'react'
import { View } from '@tarojs/components'
import { IFootBarProps } from './const'
import styles from './index.module.less'
import { isNewIphone } from '../utils'
import classNames from 'classnames'
import MMDivider from '../divider'

/**
 * 底部组件
 *
 * 提供一个固定在底部的组件 需要注意的是他需要放在页面组件的最下面。
 * @param {*} props
 * @return {*}
 */
const Component: FC<PropsWithChildren<IFootBarProps>> = (props) => {
  const { dynamic = false, backgroundColor = '#ffffff', border = false, style, noStyle = false } = props
  const [height, setHeight] = useState<number>()

  const timer = useRef<number>()

  useEffect(
    () => {
      timer.current = setTimeout(() => {
        clearTimeout(timer.current)
        Taro.createSelectorQuery()
          .select(`.${styles.footBarStyle_wrapper}`)
          .boundingClientRect((res) => {
            res && setHeight(res.height)
          })
          .exec()
      }, 50)
    },
    dynamic ? undefined : []
  )

  const spacingIphone = isNewIphone && <View className="spacingIphone" />

  function renderChildren() {
    if (!props.children) {
      return spacingIphone
    }

    return noStyle ? (
      props.children
    ) : (
      <>
        <View className={styles.footBarStyle_content}>{props.children}</View>
        {spacingIphone}
      </>
    )
  }

  return (
    <View className={classNames(styles.footBarStyle, props.className)} style={{ height, ...style }}>
      <View className={styles.footBarStyle_wrapper} style={{ backgroundColor: backgroundColor === false ? undefined : backgroundColor }}>
        {border && <MMDivider />}
        {renderChildren()}
      </View>
    </View>
  )
}

const MMFixFoot = memo(Component)
export default MMFixFoot
