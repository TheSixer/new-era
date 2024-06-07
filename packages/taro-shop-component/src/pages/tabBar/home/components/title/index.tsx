import { memo, FC } from 'react'
import { View, Text } from '@tarojs/components'
import { ITitleProps } from './const'
import styles from './index.module.less'

const Component: FC<ITitleProps> = ({ title, subTitle }) => (
  <View className={styles.banner_title}>
    <Text className={styles.banner_title__text}>{title}</Text>
    <Text className={styles.banner_title__sub}>{subTitle}</Text>
  </View>
)

const Title = memo(Component)
export default Title
