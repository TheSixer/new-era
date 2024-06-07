import { FC, memo } from 'react'
import { Card, Descriptions } from 'antd'
import { useAtomValue } from 'jotai'
import { orderDescriptionsPropsAtom, orderDetailAtom } from '../store'
import useOrderAmount from '@wmeimob/shop-data/src/hooks/order/useOrderAmount'
import mmCurrenty from '@wmeimob/utils/src/mmCurrency'
import OrderAmount from '@wmeimob/backend-pages-shop/src/pages/orderManagement/orderList/components/orderAmount'
import PayableAmount from '@wmeimob/backend-pages-shop/src/pages/orderManagement/orderList/components/payableAmount'
import PaidAmount from '@wmeimob/backend-pages-shop/src/pages/orderManagement/orderList/components/paidAmount'
import { EActivityType, MActivityType } from '@wmeimob/shop-data/src/enums/activity/EActivityType'
import { ECouponType, MCouponType } from '@wmeimob/shop-data/coupon/enums/ECouponType'

const Component: FC<any> = (props) => {
  const data = useAtomValue(orderDetailAtom)
  const descriptionsProps = useAtomValue(orderDescriptionsPropsAtom)

  const { payAmount, activeDeductionAmount, couponDeductionAmount, memberDeductionAmount, freeShippingDeductionAmount,scoreDeductionAmount } = useOrderAmount(data)

  const { orderMasterMarketingList = [] } = data

  const isFreeShipping = orderMasterMarketingList.find((item) => item.marketingType === EActivityType.FreeShipping)

  // 优惠券类型
  const couponDeductionType =  MCouponType[orderMasterMarketingList.find((item)=>item.marketingType === EActivityType.Coupon)?.discountType];

  // 活动类型
  const activeDeductionType = [...new Set(orderMasterMarketingList.map((item)=>{
    if ([EActivityType.Deduction,EActivityType.Discount].includes(item.marketingType)){
      return  MActivityType[item.marketingType]
    }
  }).filter(item=>item))].join('/');

  const isFreeShippingCoupon = orderMasterMarketingList.find(
    (item) => item.marketingType === EActivityType.Coupon && item.discountType === ECouponType.FreeShipping
  )

  const giftCouponActivity = orderMasterMarketingList.find((item) => item.marketingType === EActivityType.Coupon && item.discountType === ECouponType.Present)

  const exchangeCouponActivity = orderMasterMarketingList.find(
    (item) => item.marketingType === EActivityType.Coupon && item.discountType === ECouponType.Exchange
  )

  return (
    <Card title="订单信息">
      <Descriptions {...descriptionsProps}>
        <Descriptions.Item label="下单人">{data.userName}</Descriptions.Item>

        <Descriptions.Item label="手机号">{data.userMobile}</Descriptions.Item>

        <Descriptions.Item label="下单时间">{data.gmtCreated}</Descriptions.Item>

        <Descriptions.Item label="支付时间">{data.payAt || '/'}</Descriptions.Item>

        <Descriptions.Item label="支付流水号">{data.transactionId || '/'}</Descriptions.Item>

        <Descriptions.Item label="下单备注">{data.userComments || '/'}</Descriptions.Item>
      </Descriptions>

      <Descriptions {...descriptionsProps} title="订单金额">
        <Descriptions.Item label="订单金额">
          <OrderAmount data={data} />
        </Descriptions.Item>

        {!!activeDeductionAmount && <Descriptions.Item label="活动减免">{activeDeductionType}{mmCurrenty(-activeDeductionAmount)}</Descriptions.Item>}

        {isFreeShipping && <Descriptions.Item label="包邮活动">{mmCurrenty(-freeShippingDeductionAmount)}</Descriptions.Item>}

        {!!couponDeductionAmount && <Descriptions.Item label="优惠券减免">{couponDeductionType}{mmCurrenty(-couponDeductionAmount)}</Descriptions.Item>}

        {!!exchangeCouponActivity && <Descriptions.Item label="兑换券">{mmCurrenty(-exchangeCouponActivity.discountAmount)}</Descriptions.Item>}

        {!!giftCouponActivity && (
          <Descriptions.Item label="赠品券">{data.items?.find((item) => item.couponNo === giftCouponActivity.relNo)?.goodsName}</Descriptions.Item>
        )}

        {isFreeShippingCoupon && <Descriptions.Item label="免邮券">{mmCurrenty(-freeShippingDeductionAmount)}</Descriptions.Item>}

        {!!memberDeductionAmount && <Descriptions.Item label="会员减免">{mmCurrenty(-memberDeductionAmount)}</Descriptions.Item>}
        {!!scoreDeductionAmount && <Descriptions.Item label="积分抵扣">{mmCurrenty(-scoreDeductionAmount)}</Descriptions.Item>}

        <Descriptions.Item label="应付金额">
          <PayableAmount data={data} />
        </Descriptions.Item>

        {data.payStatus === 1 && (
          <Descriptions.Item label="实付金额">
            <PaidAmount data={data} />
          </Descriptions.Item>
        )}
      </Descriptions>
    </Card>
  )
}
Component.displayName = 'DetailInfoCard'

const DetailInfoCard = memo(Component)
export default DetailInfoCard
