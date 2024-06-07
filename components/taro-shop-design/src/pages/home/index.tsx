import Taro from '@tarojs/taro'
import { FC, memo, useState } from 'react'
import styles from './index.module.less'
import { IHomeProps } from './const'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import { View } from '@tarojs/components'
import DeliveryTab from '../../components/deliveryTab'

const Component: FC<IHomeProps> = () => {
  const [index, setIndex] = useState('delivery')

  return (
    <View className={styles.homeStyle}>
      <MMNavigation title="基础用法" />
    </View>
  )
}

const Home = memo(Component)
export default Home
