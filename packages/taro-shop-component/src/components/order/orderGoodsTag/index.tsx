import { Text, View } from '@tarojs/components'
import { convertEnum } from '@wmeimob/utils/src/enumUtil'
import classNames from 'classnames'
import { FC, memo } from 'react'
import styles from './index.module.less'

export enum EOrderGoodsTagType {
  /** 预售 */
  PreSale = 1,
  /** 赠品(满赠活动) */
  Gift,
  /** 赠品券 */
  GiftCoupon,
  /** 兑换券 */
  ExchangeCoupon
}

const [MOrderGoodsTagType] = convertEnum([
  [EOrderGoodsTagType.PreSale, '预售'],
  [EOrderGoodsTagType.Gift, '赠品'],
  [EOrderGoodsTagType.GiftCoupon, '赠品券'],
  [EOrderGoodsTagType.ExchangeCoupon, '兑换券']
])

interface IOrderGoodsTagProps {
  type?: EOrderGoodsTagType
}

const Component: FC<IOrderGoodsTagProps> = (props) => {
  const { type } = props

  return !type ? null : (
    <View
      className={classNames({
        [styles.orderGoodsTagStyle]: true,
        [styles.orderGoodsTagStyle__preSale]: type === EOrderGoodsTagType.PreSale,
        [styles.orderGoodsTagStyle__exchangeCoupon]: type === EOrderGoodsTagType.ExchangeCoupon,
        [styles.orderGoodsTagStyle__giftCoupon]: type === EOrderGoodsTagType.GiftCoupon,
        [styles.orderGoodsTagStyle__gift]: [EOrderGoodsTagType.Gift].includes(type)
      })}
    >
      <Text>{MOrderGoodsTagType[type]}</Text>
    </View>
  )
}

const OrderGoodsTag = memo(Component)
export default OrderGoodsTag
