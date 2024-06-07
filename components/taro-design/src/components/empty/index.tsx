import { Image, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { FC, memo, PropsWithChildren, useMemo, useState } from 'react'
import { IMMEmptyProps, EMMEmpty, typeMap } from './const'
import styles from './index.modules.less'
import classNames from 'classnames'

/**
 * @name 空状态
 */
const Component: FC<PropsWithChildren<IMMEmptyProps>> = (props) => {
  const { fixed = false, src, text, type = EMMEmpty.data, suffix } = props

  const [imgStyle, setImgStyle] = useState({ width: 180, height: 140, ...props.imgStyle })

  const innerText = useMemo<string>(() => (text ? text : typeMap[type!].text), [text, type])

  const innerSrc = useMemo(() => (src ? src : typeMap[type!].src), [type, src])

  return (
    <View className={classNames(styles.MMEmpty, fixed && styles.fixed)}>
      <Image src={innerSrc} style={imgStyle} />

      <Text className={styles.text}>{innerText}</Text>

      {suffix}
    </View>
  )
}

const MMEmpty = memo(Component)
export default MMEmpty
