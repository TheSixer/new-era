import { View, Text } from '@tarojs/components'
import { ECouponType } from '@wmeimob/shop-data/coupon/enums/ECouponType'
import classnames from 'classnames'
import { FC, memo } from 'react'
import { IMMShopCouponData } from '../shop-coupon/const'
import styles from './index.module.less'

interface ILeftContentProps {
  data: IMMShopCouponData

  countSize: any
}

const Component: FC<ILeftContentProps> = (props) => {
  const { data } = props

  const { type } = data

  return (
    <View className={styles.left}>
      <View className={styles.left_content}>
        {data.type === ECouponType.Deduction && <Text className={styles.left_iconMoneny}>￥</Text>}

        {[ECouponType.FreeShipping, ECouponType.Exchange, ECouponType.Present].includes(type) ? (
          <Text className={classnames(styles.left_count)} style={{ fontSize: 20 }}>
            {type === ECouponType.FreeShipping ? '包邮券' : type === ECouponType.Exchange ? '兑换券' : '赠品券'}
          </Text>
        ) : (
          <Text className={classnames(styles.left_count, styles[props.countSize])}>{data.count}</Text>
        )}

        {data.type === ECouponType.Discount && <View className={styles.left_discount}>折</View>}
      </View>
      <View className={styles.left_condition}>{data.demandPrice ? `满${data.demandPrice}元可用` : '无门槛'}</View>
    </View>
  )
}

const LeftContent = memo(Component)
export default LeftContent
