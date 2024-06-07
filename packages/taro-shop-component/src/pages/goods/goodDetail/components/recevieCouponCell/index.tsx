import { memo, FC } from 'react'
import { View, Text } from '@tarojs/components'
import { IRecevieCouponCellProps } from './const'
import styles from './index.module.less'
import MMIconFont from '@wmeimob/taro-design/src/components/icon-font'
import MMIconFontName from '@wmeimob/taro-design/src/components/icon-font/const'

const Component: FC<IRecevieCouponCellProps> = (props) => {
  const { data = [] } = props

  return !data.length ? null : (
    <View className={styles.recevieCouponCellStyle} onClick={props.onClick}>
      <Text className={styles.title}>领券</Text>

      <View className={styles.couponUl}>
        {data.map((item) => (
          <View key={item.templateNo} className={styles.couponLi}>
            {item.name}
          </View>
        ))}
      </View>

      <MMIconFont value={MMIconFontName.Next} size={12} color="#999999" />
    </View>
  )
}

const RecevieCouponCell = memo(Component)
export default RecevieCouponCell
