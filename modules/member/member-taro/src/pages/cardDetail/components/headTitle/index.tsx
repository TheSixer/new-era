import { View } from '@tarojs/components'
import { FC, memo, PropsWithChildren } from 'react'
import styles from './index.module.less'

interface IHeadTitleProps {}

const Component: FC<PropsWithChildren<IHeadTitleProps>> = (props) => {
  // const {} = props

  return (
    <View className={styles.headTitleStyle}>
      <View className={styles.line} />
      <View className={styles.text}>{props.children}</View>
      <View className={styles.line} />
    </View>
  )
}

const HeadTitle = memo(Component)
export default HeadTitle
