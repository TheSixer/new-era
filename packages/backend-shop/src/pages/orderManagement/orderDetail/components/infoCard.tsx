import { FC, memo, useMemo } from 'react'
import { Card, Descriptions } from 'antd'
import { useAtomValue } from 'jotai'
import { orderDescriptionsPropsAtom, orderDetailAtom } from '../store'
import useOrderTypes from '~/hooks/useOrderTypes'
import { EActivityType } from '@wmeimob/shop-data/src/enums/activity/EActivityType'
import dayjs from 'dayjs'
import { MOrderChannelType } from '@wmeimob/shop-data/src/enums/order/EOrderChannelType'

const Component: FC<any> = (props) => {
  const { orderNo, orderStatus, orderMasterMarketingList,orderChannelType } = useAtomValue(orderDetailAtom)
  const descriptionsProps = useAtomValue(orderDescriptionsPropsAtom)
  const { orderText } = useOrderTypes(orderStatus)

  const preSale = useMemo(() => orderMasterMarketingList?.find((item) => item.marketingType === EActivityType.PreSale), [orderMasterMarketingList])

  return (
    <Card>
      <Descriptions {...descriptionsProps}>
        <Descriptions.Item label="订单编号">{orderNo}</Descriptions.Item>

        <Descriptions.Item label="订单状态">{orderText}</Descriptions.Item>
        <Descriptions.Item label="订单渠道">{MOrderChannelType[orderChannelType!] || '/'}</Descriptions.Item>

        {!!preSale && <Descriptions.Item label="预售发货时间">{dayjs(preSale.shippingTime).format('YYYY年MM月DD日')}后发货</Descriptions.Item>}
      </Descriptions>
    </Card>
  )
}
Component.displayName = 'InfoCard'

const InfoCard = memo(Component)
export default InfoCard
