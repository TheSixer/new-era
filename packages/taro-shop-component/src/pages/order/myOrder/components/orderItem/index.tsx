import { Text, View } from '@tarojs/components'
import GoodsPriceWithIntegral from '@wmeimob-modules/goods-taro/src/components/goodsPriceWithIntegral'
import { EOrderType } from '@wmeimob/shop-data/src/enums/order/EOrderType'
import MMCard from '@wmeimob/taro-design/src/components/card'
import MMSpace from '@wmeimob/taro-design/src/components/space'
import shopVariable from '@wmeimob/taro-design/src/components/styles/themes/shop.variable'
import classNames from 'classnames'
import { FC, memo } from 'react'
import GoodPrice from '../../../../../components/good/goodPrice'
import OrderGood from '../../../../../components/order/orderGood'
import { EOrderStatus } from '../../../../../enums/EOrderStatus'
import { EWholeOrderStatus } from '../../../../../enums/EWholeOrderStatus'
import useOrderGoods from '../../../../../hooks/order/useOrderGoods'
import useOrderOperations from '../../../../../hooks/order/useOrderOperations'
import useOrderTypes from '../../../../../hooks/useOrderTypes'
import { routeNames } from '../../../../../routes'
import { IOrderItemProps } from './const'
import styles from './index.module.less'
import { EJumpType } from '@wmeimob-modules/decoration-data/src/enums/EJumpType'
import { navByLink } from '../../../../../components/pageModules/utils'

const Component: FC<IOrderItemProps> = (props) => {
  const { data, handleRefresh } = props
  const { orderState } = useOrderTypes(data.orderStatus)
  const { buttonList } = useOrderOperations({ order: data, onRefresh: handleRefresh })

  const [goods] = useOrderGoods(data)

  return (
    <MMCard
      title={<View className={styles.title}>订单：{data.orderNo}</View>}
      extra={<View className={classNames(styles.itemStatus, data.orderStatusName === '交易关闭' && styles.itemStatusGray)}>{data.orderStatusName}</View>}
      className={styles.orderItemStyle}
    >
      <View
        onClick={() => {
          navByLink(EJumpType.DefaultNav, { url: routeNames.orderOrderDetail, params: { orderNo: data.orderNo } })
        }}
      >
        {goods.map((item) => (
          <View className={styles.goods} key={item.id}>
            <OrderGood key={item.id} data={item} showMarketPrice={false} />
          </View>
        ))}
      </View>

      <View className={styles.pay}>
        <Text>
          {[EOrderStatus.PENDING_PAYMENT].includes(orderState!) ||
          [EWholeOrderStatus.ORDER_STATUS_SYS_CANCEL, EWholeOrderStatus.ORDER_STATUS_USER_CANCEL].includes(data.orderStatus!)
            ? '应付款: '
            : '实付款: '}
        </Text>

        <GoodsPriceWithIntegral
          salePrice={data.payAmount!}
          exchangeIntegral={data.exchangeIntegral}
          color={shopVariable.primaryColor}
          fontSize={[18, shopVariable.fontSizeSm]}
        />
      </View>

      {data.orderType !== EOrderType.Integral && (
        <View className={styles.allPrice}>
          <Text>总价</Text>
          <GoodPrice value={data.orderAmount!} color={shopVariable.gray5} fontSize={shopVariable.fontSizeSm} />
          {!!data.allDiscountAmount && (
            <>
              <Text style={{ marginLeft: shopVariable.spacing }}>优惠</Text>
              <GoodPrice value={data.allDiscountAmount} color={shopVariable.gray5} fontSize={shopVariable.fontSizeSm} />
            </>
          )}

          {!!data.freightAmount && (
            <>
              <Text style={{ marginLeft: shopVariable.spacing }}>含运费</Text>
              <GoodPrice value={data.freightAmount} color={shopVariable.gray5} fontSize={shopVariable.fontSizeSm} />
            </>
          )}
        </View>
      )}

      {!!buttonList.length && (
        <View className={styles.btnBox}>
          <MMSpace gap={10}>{buttonList}</MMSpace>
        </View>
      )}
    </MMCard>
  )
}

const OrderItem = memo(Component)
export default OrderItem
