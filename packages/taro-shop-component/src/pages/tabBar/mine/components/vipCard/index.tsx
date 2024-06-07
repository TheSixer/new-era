import { FC, memo } from 'react'
import styles from './index.module.less'
import { IVipCardProps } from './const'
import { View } from '@tarojs/components'
import MMIconFontName from '@wmeimob/taro-design/src/components/icon-font/const'
import MMIconFont from '@wmeimob/taro-design/src/components/icon-font'

const Component: FC<IVipCardProps> = props => {
  // 通过解构定义defaultProps
  // const {} = props

  return (
    <View className={styles.vipCardStyle}>
      <MMIconFont value={MMIconFontName.Trophy} size={15} color="#ffe1bb" />
      <View className={styles.content}>
        <View>商城会员卡</View>
        <View className={styles.subText}>开通会员卡，享多重特权福利</View>
      </View>

      <View className={styles.button}>申请会员卡</View>
    </View>
  )
}

Component.displayName = 'VipCard'

const VipCard = memo(Component)
export default VipCard
