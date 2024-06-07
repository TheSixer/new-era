import Taro from '@tarojs/taro'
import { CSSProperties, memo, useMemo, FC } from 'react'
import { View } from '@tarojs/components'
import { IOrderGoodsProps } from './const'
import styles from './index.module.less'
import OrderGood from '../../../../../components/order/orderGood'
import { EOrderGoodsRefundState, EOrderGoodsRefundStateDesc } from '../../../../../enums/ERefund'
import MMCard from '@wmeimob/taro-design/src/components/card'
import { EOrderStatus } from '../../../../../enums/EOrderStatus'
import MMButton from '@wmeimob/taro-design/src/components/button'
import { useSetAtom } from 'jotai'
import { aftersalesGoodsInfoAtom, IAfterSalesGoodInfo } from '../../../store'
import { routeNames } from '../../../../../routes'
import { OrderItemsVO } from '@wmeimob/taro-api'
import { canGoodsAfterSales } from './utils'
import useOrderGoods from '../../../../../hooks/order/useOrderGoods'
import { MMButtonType } from '@wmeimob/taro-design/src/components/button/const'
import shopVariable from '@wmeimob/taro-design/src/components/styles/themes/shop.variable'
import { EOrderType } from '@wmeimob/shop-data/src/enums/order/EOrderType'
import dayjs from 'dayjs'
import { EActivityType } from '@wmeimob/shop-data/src/enums/activity/EActivityType'
import getParamsUrl from '@wmeimob/taro-utils/src/getParamsUrl'

const buttonStyle: CSSProperties = { width: 70 }

const Component: FC<IOrderGoodsProps> = (props) => {
  const { order, orderState } = props

  const setAfterInfo = useSetAtom(aftersalesGoodsInfoAtom) // 申请售后的商品

  const [goods] = useOrderGoods(order)

  /** 预售信息 */
  const preSale = useMemo(() => {
    const activity = order.orderMasterMarketingList?.find(({ marketingType }) => marketingType === EActivityType.PreSale)
    const shippingTime = activity ? dayjs(activity.shippingTime).format('YYYY年MM月DD日') : ''

    return {
      show: !!activity,
      shippingTime
    }
  }, [order])

  function handleAfterSales(orderGoods: OrderItemsVO) {
    // 如果只有一个商品未申请售后，则可以退运费（要排除赠品）
    // const refundList = order.items!.filter(
    //   item => [EOrderGoodsRefundState.UNAPPLY, EOrderGoodsRefundState.APPLY_FAIL].includes(item.refundStatus!) && !item.gift
    // )

    const info: IAfterSalesGoodInfo = {
      orderDetail: order,
      afterOrderGoods: [orderGoods],
      isUnshipped: orderState === EOrderStatus.UNSHIPPED,
      isFullOrder: false
    }
    setAfterInfo(info)
    Taro.navigateTo({ url: routeNames.orderAftesalesAdd })
  }

  function handleGoodsClick({ goodsNo }: OrderItemsVO) {
    const isIntegralGoods = order.orderType === EOrderType.Integral
    Taro.navigateTo({
      url: getParamsUrl(isIntegralGoods ? routeNames.integralGoodsDetail : routeNames.goodsGoodDetail,
        { goodsNo })
    })
  }

  return (
    <MMCard style={{ minHeight: 120, marginBottom: 10 }} title={preSale.show && `预售商品${preSale.shippingTime}后发货`}>
      {goods.map((item, index) => {
        const isIntegralGoods = order.orderType === EOrderType.Integral

        return (
          <View key={`${item.id!}${item.goodsId!}${index}`} className={styles.goods}>
            <OrderGood data={item} showMarketPrice={false} onClick={() => handleGoodsClick(item)} />

            {/* 申请售后 */}
            {/* 未申请 售后拒绝 */}
            {canGoodsAfterSales(item, orderState!, order) && !isIntegralGoods && (
              <View style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: shopVariable.spacingLarge }}>
                <MMButton size='tiny' type={MMButtonType.default} style={buttonStyle} text='申请售后'
                          onClick={() => handleAfterSales(item)} />
              </View>
            )}

            {/* 售后中  */}
            {[EOrderGoodsRefundState.APPLYING, EOrderGoodsRefundState.APPLY_SUCCESS].includes(item.refundStatus!) && (
              <View style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: shopVariable.spacingLarge }}
                    className={styles.statusStyle}>
                <MMButton type={MMButtonType.default} size='tiny' style={buttonStyle}
                          text={EOrderGoodsRefundStateDesc[item.refundStatus!]} />
              </View>
            )}
          </View>
        )
      })}
    </MMCard>
  )
}

const OrderGoods = memo(Component)
export default OrderGoods
