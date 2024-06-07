import { FC, memo } from 'react'
import { Card, Descriptions } from 'antd'
import { useAtomValue } from 'jotai'
import { orderDescriptionsPropsAtom, orderDetailAtom } from '../store'
import useOrderTypes from '../../list/hooks/useOrderTypes'

// const { enableMultipleStore } = config.systemConfig.config

const Component: FC<any> = (props) => {
  const { orderNo, orderStatus } = useAtomValue(orderDetailAtom)
  const descriptionsProps = useAtomValue(orderDescriptionsPropsAtom)
  const { orderText } = useOrderTypes(orderStatus)

  return (
    <Card>
      <Descriptions {...descriptionsProps}>
        <Descriptions.Item label="订单编号">{orderNo}</Descriptions.Item>

        {/* {enableMultipleStore && <Descriptions.Item label="成交店铺">{storeName}</Descriptions.Item>} */}

        <Descriptions.Item label="订单状态">{orderText}</Descriptions.Item>
      </Descriptions>
    </Card>
  )
}
Component.displayName = 'InfoCard'

const InfoCard = memo(Component)
export default InfoCard
