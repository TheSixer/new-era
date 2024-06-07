import { memo, FC } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { IOrderAddressProps } from './const'
import styles from './index.module.less'
import MMCard from '@wmeimob/taro-design/src/components/card'
import location from '../../images/location.png'

const Component: FC<IOrderAddressProps> = (props) => {
  const { order } = props

  return (
    <MMCard>
      <View className={styles.orderAddressStyle}>
        <Image src={location} className={styles.icon} />

        <View className={styles.content}>
          <View>
            <Text className={styles.name}>{order.shippingName}</Text>
            <Text>{order.shippingMobile}</Text>
          </View>

          <View className={styles.address}>
            地址：{order.shippingProvince}&nbsp;
            {order.shippingCity}&nbsp;
            {order.shippingDistrict}&nbsp;
            {order.shippingAddress}
          </View>
        </View>
      </View>
    </MMCard>
  )
}

const OrderAddress = memo(Component)
export default OrderAddress
