import Taro from '@tarojs/taro'
import { CSSProperties, memo, useMemo, FC } from 'react'
import { IOrderInfoProps } from './const'
import styles from './index.module.less'
import MMCell from '@wmeimob/taro-design/src/components/cell'
import MMCellGroup from '@wmeimob/taro-design/src/components/cell/cell-group'
import GoodPrice from '../../../../../components/good/goodPrice'
import { EOrderStatus } from '../../../../../enums/EOrderStatus'
import { EActivityType, MActivityType } from '@wmeimob/shop-data/src/enums/activity/EActivityType'
import { OrderMasterMarketingDto } from '@wmeimob/taro-api'
import { Button, Image, Text, View } from '@tarojs/components'
import MMSpace from '@wmeimob/taro-design/src/components/space'
import { useToast } from '@wmeimob/taro-design'
import MMIconFont from '@wmeimob/taro-design/src/components/icon-font'
import MMIconFontName from '@wmeimob/taro-design/src/components/icon-font/const'
import MMDivider from '@wmeimob/taro-design/src/components/divider'
import shopVariable from '@wmeimob/taro-design/src/components/styles/themes/shop.variable'
import { ICellProps } from '@wmeimob/taro-design/src/components/cell/const'
import useOrderAmount from '@wmeimob/shop-data/src/hooks/order/useOrderAmount'
import GoodsPriceWithIntegral, { IGoodsPriceWithIntegralProps } from '@wmeimob-modules/goods-taro/src/components/goodsPriceWithIntegral'
import { ECouponType } from '@wmeimob/shop-data/coupon/enums/ECouponType'
import MMCustomerServiceButton from '../../../../../components/customerServiceButton'
import icon_service from './icon_service.png'
import { isH5 } from '../../../../../config'

const dividerStyle: CSSProperties = {
  marginLeft: shopVariable.spacingLarge,
  marginRight: shopVariable.spacingLarge,
  marginTop: shopVariable.spacingLarge / 2,
  marginBottom: shopVariable.spacingLarge / 2
}

const basicPriceProps: Partial<IGoodsPriceWithIntegralProps> = {
  color: shopVariable.fontColor,
  fontSize: shopVariable.fontSize
}

const cellProps: ICellProps = {
  titleAlign: 'baseline',
  size: 'small'
}

const Component: FC<IOrderInfoProps> = ({ order = {}, orderState }) => {
  const [toast] = useToast()

  const { scoreDeductionAmount, couponDeductionAmount, memberDeductionAmount,scoreDeductionCount } = useOrderAmount(order)

  /** 活动信息 */
  const activities = useMemo(() => {
    const { orderMasterMarketingList = [] } = order

    // 对象map存储
    const acts: Record<string, OrderMasterMarketingDto[]> = {
      Deduction: [], // 满减满折
      Presented: [], // 满赠
      Coupon: [], // 满减满着券
      FreeShippingCoupont: [], // 免邮券
      PresentCoupon: [], // 赠品券
      exchangeCoupon: [], // 兑换券
      FreeShipping: [] // 包邮活动
    }

    // 活动数据分类
    return orderMasterMarketingList.reduce((result, item) => {
      const { marketingType, discountType } = item
      if ([EActivityType.Deduction, EActivityType.Discount].includes(marketingType!)) {
        result.Deduction.push(item)
      } else if ([EActivityType.Presented].includes(marketingType!)) {
        result.Presented.push(item)
      } else if ([EActivityType.Coupon].includes(marketingType!)) {
        if (discountType === ECouponType.FreeShipping) {
          result.FreeShippingCoupont.push(item)
        } else if (discountType === ECouponType.Present) {
          result.PresentCoupon.push(item)
        } else if (discountType === ECouponType.Exchange) {
          result.exchangeCoupon.push(item)
        } else {
          result.Coupon.push(item)
        }
      } else if (EActivityType.FreeShipping === marketingType) {
        result.FreeShipping.push(item)
      }
      return result
    }, acts)
  }, [order])

  // const coupon = useMemo(() => activities[EActivityType.Coupon][0] || {}, [activities])

  function copy(data: string) {
    // 设置系统剪贴板的内容。调用成功后，会弹出 toast 提示"内容已复制"，持续 1.5s
    Taro.setClipboardData({ data,success(){
        if (isH5){
          toast?.message('内容已复制')
        }
      } }).catch(() => {
      toast?.message('复制失败')
    })
  }

  return (
    <>
      <MMCellGroup>
        <MMCell {...cellProps} title='商品金额'>
          <GoodsPriceWithIntegral salePrice={order.goodsAmount!}
                                  exchangeIntegral={order.exchangeIntegral} {...basicPriceProps} />
        </MMCell>
        <MMCell {...cellProps} title='运费'>
          {order.realFreightAmount ? <GoodPrice value={order.realFreightAmount} {...basicPriceProps} /> : '包邮'}
        </MMCell>
        <MMCell {...cellProps} title='合计'>
          <GoodsPriceWithIntegral salePrice={order.orderAmount!}
                                  exchangeIntegral={order.exchangeIntegral} {...basicPriceProps} />
        </MMCell>

        <MMDivider style={dividerStyle} />

        {activities.Deduction.map((li) => {
          return (
            <MMCell
              {...cellProps}
              title={
                <View className={styles.activityCell}>
                  <Text className={styles.activityCell_title}>活动优惠</Text>
                  <View className={styles.activityCell_name}>{MActivityType[li.marketingType!]}</View>
                </View>
              }
              key={li.relNo}
            >
              <GoodPrice value={li.discountAmount!} {...basicPriceProps} prefix='-' />
            </MMCell>
          )
        })}

        {/* 满赠 */}
        {activities.Presented.map((li) => {
          return (
            <MMCell {...cellProps} title='活动赠送' key={li.relNo}>
              {li.relName}
            </MMCell>
          )
        })}

        {/* 包邮活动 */}
        {activities.FreeShipping.map((li) => (
          <MMCell
            {...cellProps}
            title={
              <View className={styles.activityCell}>
                <Text className={styles.activityCell_title}>包邮活动</Text>
                <View className={styles.activityCell_name}>{li.relName}</View>
              </View>
            }
            key={li.relNo}
          >
            <GoodPrice value={li.discountAmount!} {...basicPriceProps} prefix='-' />
          </MMCell>
        ))}

        {!!couponDeductionAmount && (
          <MMCell {...cellProps} title='优惠券'>
            <GoodPrice value={couponDeductionAmount} {...basicPriceProps} prefix='-' />
          </MMCell>
        )}

        {activities.exchangeCoupon.map((li) => (
          <MMCell {...cellProps} title='兑换券' key={li.relNo}>
            <GoodPrice value={li.discountAmount!} {...basicPriceProps} prefix='-' />
          </MMCell>
        ))}

        {/* 赠品券 */}
        {activities.PresentCoupon.map((li) => (
          <MMCell {...cellProps} title='赠品券' key={li.relNo}>
            {order.items?.find(({ couponNo }) => couponNo === li.relNo)?.goodsName}
          </MMCell>
        ))}

        {/* 免邮券 */}
        {activities.FreeShippingCoupont.map((li) => (
          <MMCell {...cellProps} title='免邮券' key={li.relNo}>
            <GoodPrice value={li.discountAmount!} {...basicPriceProps} prefix='-' />
          </MMCell>
        ))}

        {/*{!!scoreDeductionAmount && (*/}
        {/*  <MMCell {...cellProps} title='积分抵扣'>*/}
        {/*    <GoodPrice value={scoreDeductionAmount!} {...basicPriceProps} prefix='-' />*/}
        {/*  </MMCell>*/}
        {/*)}*/}
        {/*积分抵扣显示扣除积分不是金额.*/}
        {!!scoreDeductionCount && (
          <MMCell {...cellProps} title='积分抵扣'>
            -{scoreDeductionCount}积分
          </MMCell>
        )}

        {!!memberDeductionAmount && (
          <MMCell {...cellProps} title='会员减免'>
            <GoodPrice value={memberDeductionAmount!} {...basicPriceProps} prefix='-' />
          </MMCell>
        )}

        <MMCell {...cellProps} title={[EOrderStatus.PENDING_PAYMENT].includes(orderState!) ? '应付款' : '实付款'}>
          <GoodsPriceWithIntegral salePrice={order.payAmount!}
                                  exchangeIntegral={order.exchangeIntegral} {...basicPriceProps} />
        </MMCell>

        <MMDivider style={dividerStyle} />

        <MMCell {...cellProps}>
          <View className={styles.contact}>
            <Image src={icon_service} className={styles.service}/>
            {/*<MMIconFont value={MMIconFontName.Service} size={shopVariable.fontSize} />*/}
            <View className={styles.contactText}>联系客服</View>
            <MMCustomerServiceButton onClick={()=>(Taro.navigateTo({ url: '/pages/customerService/index' }))} className={styles.contactButton}/>
          </View>
        </MMCell>
      </MMCellGroup>

      <View className='spacing' />

      <MMCellGroup>
        <MMCell {...cellProps} title='订单编号'>
          <MMSpace>
            {order.orderNo}
            <View className={styles.copy} onClick={() => copy(order.orderNo!)}>
              复制
            </View>
          </MMSpace>
        </MMCell>

        <MMCell {...cellProps} title='下单时间'>
          {order.gmtCreated}
        </MMCell>

        {!!order.userComments && (
          <MMCell {...cellProps} title='订单备注'>
            {order.userComments}
          </MMCell>
        )}

        {!!order.payAt && (
          <MMCell {...cellProps} title='支付时间'>
            {order.payAt}
          </MMCell>
        )}

        {!!order.transactionId && (
          <MMCell {...cellProps} title='支付流水号'>
            {order.transactionId}
          </MMCell>
        )}

        {!!order.shippingAt && (
          <MMCell {...cellProps} title='发货时间'>
            {order.shippingAt}
          </MMCell>
        )}

        {!!order.receiptAt && (
          <MMCell {...cellProps} title='收货时间'>
            {order.receiptAt}
          </MMCell>
        )}

        {!!order.closedAt && (
          <MMCell {...cellProps} title='关闭时间'>
            {order.closedAt}
          </MMCell>
        )}

        {!!order.closedReason && (
          <MMCell {...cellProps} title='关闭原因'>
            {order.closedReason}
          </MMCell>
        )}
      </MMCellGroup>

      <View className='spacing' />
    </>
  )
}

const OrderInfo = memo(Component)
export default OrderInfo
