import { memo, FC } from 'react'
import { View, Image, Input } from '@tarojs/components'
import { IOrderSearchInputProps } from './const'
import styles from './index.module.less'
import order_search from './images/order_search.png'

const Component: FC<IOrderSearchInputProps> = props => {
  return (
    <View className={styles.orderSearchInputStyle}>
      <View className={styles.inputWrapper}>
        <Image className={styles.searchIcon} src={order_search} />
        <Input
        className={styles.input}
          placeholder="搜索我的订单"
          placeholder-class={styles.placeholderStyle}
          maxlength={40}
          onConfirm={ev => props.onSearch(ev.detail.value || '')}
        />
      </View>
    </View>
  )
}

const OrderSearchInput = memo(Component)
export default OrderSearchInput
