import { View, Text, Image } from '@tarojs/components'
import { ECouponType } from '@wmeimob/shop-data/coupon/enums/ECouponType'
import classnames from 'classnames'
import { FC, memo } from 'react'
import { IMMShopCouponData } from '../shop-coupon/const'
import styles from './index.module.less'
import icon_duihuan from './icon_duihuan.png'
import icon_mianyou from './icon_mianyou.png'
import icon_zengpin from './icon_zengpin.png'

interface ILeftContentProps {
  data: IMMShopCouponData

  countSize: any
}

const Component: FC<ILeftContentProps> = (props) => {
  const { data } = props

  const { type } = data

  const iconSrcs = {
    [ECouponType.FreeShipping]: icon_mianyou,
    [ECouponType.Exchange]: icon_duihuan,
    [ECouponType.Present]: icon_zengpin
  }

  return (
    <View className={styles.left}>
      <View className={styles.left_content}>
        {data.type === ECouponType.Deduction && <Text className={styles.left_iconMoneny}>￥</Text>}

        {[ECouponType.FreeShipping, ECouponType.Exchange, ECouponType.Present].includes(type) ? (
          <Image src={iconSrcs[type]} className={classnames(styles.leftImg)} />
        ) : (
          // {type === ECouponType.FreeShipping ? '包邮券' : type === ECouponType.Exchange ? '兑换券' : '赠品券'}
          <Text className={classnames(styles.left_count, styles[props.countSize])}>{data.count}</Text>
        )}

        {data.type === ECouponType.Discount && <View className={styles.left_discount}>折</View>}
      </View>
      {![ECouponType.FreeShipping, ECouponType.Exchange, ECouponType.Present].includes(type) && (
        <View className={styles.left_condition}>{data.demandPrice ? `满${data.demandPrice}元可用` : '无门槛'}</View>
      )}
    </View>
  )
}

const LeftContent = memo(Component)
export default LeftContent
