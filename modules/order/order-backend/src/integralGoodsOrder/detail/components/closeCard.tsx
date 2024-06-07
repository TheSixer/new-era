import { FC, memo } from 'react'
import { Card, Descriptions } from 'antd'
import { useAtomValue } from 'jotai'
import { orderDescriptionsPropsAtom, orderDetailAtom } from '../store'
import useOrderCloseReason from '../hooks/useOrderCloseReason'

const Component: FC<any> = (props) => {
  const descriptionsProps = useAtomValue(orderDescriptionsPropsAtom)
  const { closedAt, closedReason, orderStatus } = useAtomValue(orderDetailAtom)

  const reason = useOrderCloseReason(orderStatus, closedReason)

  return !closedAt ? null : (
    <Card title="关闭信息">
      <Descriptions {...descriptionsProps}>
        <Descriptions.Item label="关闭时间">{closedAt}</Descriptions.Item>

        <Descriptions.Item label="关闭原因">{reason}</Descriptions.Item>
      </Descriptions>
    </Card>
  )
}
Component.displayName = 'CloseCard'

const CloseCard = memo(Component)
export default CloseCard
