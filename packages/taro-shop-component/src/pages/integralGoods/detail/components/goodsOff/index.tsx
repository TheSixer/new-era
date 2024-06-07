import Taro from '@tarojs/taro'
import { memo, FC } from 'react'
import { View } from '@tarojs/components'
import { IGoodsOffProps } from './const'
import styles from './index.module.less'
import MMEmpty from '@wmeimob/taro-design/src/components/empty'
import MMButton from '@wmeimob/taro-design/src/components/button'
import { routeNames } from '../../../../../routes'

const Component: FC<IGoodsOffProps> = (props) => {
  // const {} = props;

  return (
    <View className={styles.goodsOffStyle}>
      <View className="spacing" />
      <View className="spacing" />
      <View className="spacing" />
      <View className="spacing" />
      <View className="spacing" />
      <View className="spacing" />

      <MMEmpty text="商品已下架" />

      <View className="spacing" />
      <View className="spacing" />
      <View className="spacing" />
      <View className="spacing" />

      <View className={styles.wrapper}>
        <MMButton onClick={() => Taro.switchTab({ url: routeNames.tabBarHome })}>返回首页</MMButton>
      </View>
    </View>
  )
}

const GoodsOff = memo(Component)
export default GoodsOff
