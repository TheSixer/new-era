import { MPayType } from '@wmeimob/shop-data/src/enums/order/EPayType'
import useOrderAmount from '@wmeimob/shop-data/src/hooks/order/useOrderAmount'
import mmCurrenty from '@wmeimob/utils/src/mmCurrency'
import { Card, Descriptions } from 'antd'
import { useAtomValue } from 'jotai'
import { FC, memo } from 'react'
import OrderAmount from '../../../components/orderAmount'
import PaidAmount from '../../../components/paidAmount'
import PayableAmount from '../../../components/payableAmount'
import { orderDescriptionsPropsAtom, orderDetailAtom } from '../store'

const Component: FC<any> = (props) => {
  const data = useAtomValue(orderDetailAtom)
  const descriptionsProps = useAtomValue(orderDescriptionsPropsAtom)

  const { payAmount, activeDeductionAmount, couponDeductionAmount } = useOrderAmount(data)

  return (
    <Card title="订单信息">
      <Descriptions {...descriptionsProps}>
        <Descriptions.Item label="下单人">{data.userName}</Descriptions.Item>

        <Descriptions.Item label="手机号">{data.userMobile}</Descriptions.Item>

        <Descriptions.Item label="下单时间">{data.gmtCreated}</Descriptions.Item>

        <Descriptions.Item label="支付方式">{data.payType !== undefined ? MPayType[data.payType] : '/'}</Descriptions.Item>

        <Descriptions.Item label="支付时间">{data.payAt ?? '/'}</Descriptions.Item>

        <Descriptions.Item label="支付流水号">{data.transactionId || '/'}</Descriptions.Item>

        <Descriptions.Item label="下单备注">{data.userComments || '/'}</Descriptions.Item>
      </Descriptions>

      <Descriptions {...descriptionsProps} title="订单金额">
        <Descriptions.Item label="订单金额">
          <OrderAmount data={data} />
        </Descriptions.Item>

        {!!activeDeductionAmount && <Descriptions.Item label="活动减免">{mmCurrenty(-activeDeductionAmount)}</Descriptions.Item>}

        {!!couponDeductionAmount && <Descriptions.Item label="优惠券减免">{mmCurrenty(-couponDeductionAmount)}</Descriptions.Item>}

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
