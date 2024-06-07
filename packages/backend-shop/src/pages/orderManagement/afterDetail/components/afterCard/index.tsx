import { FC, memo } from 'react'
import { IAfterCardProps } from './const'
import { Card, Descriptions } from 'antd'
import { useAtomValue } from 'jotai'
import { afterDetailAtom } from '../../store'
import { MRefundType } from '@wmeimob/shop-data/src/enums/refund/ERefundType'
import { MRefundStatus } from '@wmeimob/shop-data/src/enums/refund/ERefundStatus'

const Component: FC<IAfterCardProps> = (props) => {
  const detail = useAtomValue(afterDetailAtom)

  return (
    <Card>
      <Descriptions column={1} labelStyle={{ width: 100 }}>
        <Descriptions.Item label="售后编号">{detail.refundNo}</Descriptions.Item>

        <Descriptions.Item label="售后类型">{MRefundType[detail.refundType!]}</Descriptions.Item>

        <Descriptions.Item label="售后状态">{MRefundStatus[detail.refundStatus!]}</Descriptions.Item>
      </Descriptions>
    </Card>
  )
}

Component.displayName = 'AfterCard'

const AfterCard = memo(Component)
export default AfterCard
