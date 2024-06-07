import Taro, { useRouter } from '@tarojs/taro'
import { FC, memo, useState } from 'react'
import { ScrollView, View } from '@tarojs/components'
import styles from './index.module.less'
import { IOrderDetailProps } from './const'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import MMFixFoot from '@wmeimob/taro-design/src/components/fix-foot'
import MMSpace from '@wmeimob/taro-design/src/components/space'
import { OrderVO } from '@wmeimob/taro-api'
import { MMNavigationType } from '@wmeimob/taro-design/src/components/navigation/const'
import useOrderTypes from '../../../hooks/useOrderTypes'
import { PageContainer, useToast } from '@wmeimob/taro-design'
import { api } from '@wmeimob/taro-api'
import useOrderOperations from '../../../hooks/order/useOrderOperations'
import { EOrderPageType } from '../../../enums/order/EOrderPageType'
import OrderInfo from './components/orderInfo'
import OrderAddress from './components/orderAddress'
import DetailStatus from './components/detailStatus'
import OrderGoods from './components/orderGoods'
import useToastDidShow from '../../../hooks/useToastDidShow'
import MMActionSheet from '@wmeimob/taro-design/src/components/action-sheet'
import shopVariable from '@wmeimob/taro-design/src/components/styles/themes/shop.variable'
import useGradientNav from '@wmeimob/taro-design/src/hooks/useGradientNav'
import classNames from 'classnames'
import { isNoStatusBar } from '../../../config'
import MMIconFont from '@wmeimob/taro-design/src/components/icon-font'
import MMIconFontName from '@wmeimob/taro-design/src/components/icon-font/const'
import { routeNames } from '../../../routes'

const Component: FC<IOrderDetailProps> = (props) => {
  const { params } = useRouter()

  const [toast] = useToast()

  const [order, setOrderDetail] = useState<OrderVO>({})

  const { orderState } = useOrderTypes(order.orderStatus)

  const { buttonList, actionSheetProps } = useOrderOperations({
    order,
    onRefresh: handleRefresh,
    from: EOrderPageType.Detail
  })

  const { contentStyle, hanelScroll } = useGradientNav({
    selector: '#selector',
    style: {
      background: [255, 65, 59]
    }
  })

  useToastDidShow(() => {
    getDetail()
  })

  async function getDetail() {
    toast?.loading()
    try {
      const { data = {} } = await api['/wechat/orders/{orderNo}_GET'](params.orderNo!)
      setOrderDetail(data)
    } catch (error) {}
    toast?.hideLoading()
  }

  function handleRefresh() {
    getDetail()
  }

  const isRenderFooter = !!buttonList.length

  const homeButton = params.goHome ? (
    <MMIconFont color="white" value={MMIconFontName.Index} onClick={() => Taro.switchTab({ url: routeNames.tabBarHome })} />
  ) : undefined

  return (
    <PageContainer noPlace={isRenderFooter} className={styles.orderDetailStyle}>
      <ScrollView scrollY enhanced showScrollbar={false} style={{ height: '100%' }} onScroll={hanelScroll}>
        <View id="selector" className={classNames(styles.scrollContent, isNoStatusBar && styles.scrollContent_h5)}>
          <MMNavigation type={MMNavigationType.Transparent} contentStyle={{ ...contentStyle }} renderLeft={homeButton} />

          {/* 订单状态描述 */}
          <DetailStatus order={order} orderState={orderState} />
          {/* 地址 */}
          <OrderAddress order={order} />

          <View className="spacing" />

          {/* 订单商品信息 */}
          <OrderGoods order={order} orderState={orderState} />
          {/* 订单详情 */}
          <OrderInfo order={order} orderState={orderState} />
        </View>

        {isRenderFooter && (
          <>
            <MMFixFoot border>
              <View className={styles.buttons}>
                <MMSpace gap={shopVariable.spacing} style={{ display: 'block' }}>
                  {buttonList}
                </MMSpace>
              </View>
            </MMFixFoot>

            <MMActionSheet {...actionSheetProps} />
          </>
        )}
      </ScrollView>
    </PageContainer>
  )
}

const OrderDetail = memo(Component)
export default OrderDetail
