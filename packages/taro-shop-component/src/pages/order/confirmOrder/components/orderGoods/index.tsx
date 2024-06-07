import { View } from '@tarojs/components'
import { EActivityType } from '@wmeimob/shop-data/src/enums/activity/EActivityType'
import { OrderCalculateResponse, OrderItemsDTO } from '@wmeimob/taro-api'
import { Cell, Divider } from '@wmeimob/taro-design'
import shopVariable from '@wmeimob/taro-design/src/components/styles/themes/shop.variable'
import dayjs from 'dayjs'
import { FC, memo, useMemo } from 'react'
import OrderGood from '../../../../../components/order/orderGood'
import OrderGoodsTag, { EOrderGoodsTagType } from '../../../../../components/order/orderGoodsTag'
import useCouponGoodsItems from '../../hooks/useCouponGoodsItems'
import CellTitle from '../cellTitle'
import styles from './index.module.less'

interface IOrderGoodsProps {
  order: OrderCalculateResponse
}

type TConfirmGoods = OrderItemsDTO & {
  /** 是否满足包邮活动 */
  isFreeShipping?: boolean
  /** 商品标签类型 */
  orderGoodsTag?: EOrderGoodsTagType
}

const Component: FC<IOrderGoodsProps> = (props) => {
  const { order } = props

  /** 预售信息 */
  const preSale = useMemo(() => {
    const activity = findActivity(order, EActivityType.PreSale)
    const shippingTime = activity ? dayjs(activity.shippingTime).format('YYYY年MM月DD日') : ''

    /** 将有参与预售活动的商品捞出 */
    const preSaleGoods =
      order.items?.reduce(
        (obj, { skuNo, orderItemMarketingList = [] }) => ({
          ...obj,
          [skuNo!]: orderItemMarketingList.some((goodsActivity) => goodsActivity.marketingType === EActivityType.PreSale)
        }),
        {} as Record<string, boolean>
      ) || {}

    return {
      show: !!activity,
      shippingTime,
      preSaleGoods
    }
  }, [order])

  /** 包邮活动信息 */
  const freeShipping = useMemo(() => {
    const activity = findActivity(order, EActivityType.FreeShipping)

    /** 将有参与包邮活动的商品捞出 */
    const freeShippingGoods =
      order.items?.reduce(
        (obj, { skuNo, orderItemMarketingList = [] }) => ({
          ...obj,
          [skuNo!]: orderItemMarketingList.some((goodsActivity) => goodsActivity.marketingType === EActivityType.FreeShipping)
        }),
        {} as Record<string, boolean>
      ) || {}

    return {
      show: !!activity,
      freeShippingGoods
    }
  }, [order])

  // 赠品券商品
  const { giftCouponGoods, exchangeCouponGoods } = useCouponGoodsItems(order)

  /**
   * 确认订单商品处理
   */
  const orderGoods = useMemo(() => {
    // 处理预售信息
    const list: TConfirmGoods[] = (order.items || []).map((item) => ({
      ...item,
      orderGoodsTag: preSale.preSaleGoods[item.skuNo!] ? EOrderGoodsTagType.PreSale : undefined,
      isFreeShipping: freeShipping.freeShippingGoods[item.skuNo!]
    }))

    // 处理兑换券商品 从商品列表中剥离并生成一条新数据
    if (exchangeCouponGoods) {
      list.push({ ...exchangeCouponGoods, orderGoodsTag: EOrderGoodsTagType.ExchangeCoupon })
    }
    // 拼接赠送商品
    if (giftCouponGoods) {
      list.push({ ...giftCouponGoods, orderGoodsTag: EOrderGoodsTagType.GiftCoupon })
    }

    return list
  }, [order.items, giftCouponGoods, exchangeCouponGoods, preSale, freeShipping])

  function findActivity(order, type: EActivityType) {
    return order.marketingActivityList?.find(({ marketingType }) => marketingType === type)
  }

  return (
    <View>
      {/*{preSale.show && (*/}
      {/*  <>*/}
      {/*    <Cell title={<CellTitle title={`预售商品${preSale.shippingTime}后发货`} />} />*/}
      {/*    <Divider style={{ margin: `${shopVariable.spacingLarge / 2}px ${shopVariable.spacingLarge}px` }} />*/}
      {/*  </>*/}
      {/*)}*/}

      {orderGoods.map((item, index) => (
        // 兑换券拆分商品列表会导致商品skuid不唯一。添加index
        <Cell key={`${item.goodsId}${item.skuId!}${index}`} valueAlign="left">
          <View className={styles.goods_container}>
            <OrderGood data={item} showMarketPrice={false} showFreeShipping={item.isFreeShipping} />
          </View>
        </Cell>
      ))}
    </View>
  )
}

const OrderGoods = memo(Component)
export default OrderGoods
