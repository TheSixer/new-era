import { FC, memo } from 'react'
import { Card, Descriptions } from 'antd'
import { useAtomValue } from 'jotai'
import { afterDetailAtom } from '../../store'
import { IAfterExpressCardProps } from './const'

const Component: FC<IAfterExpressCardProps> = (props) => {
  const detail = useAtomValue(afterDetailAtom)

  return detail.expressCompany ? (
    <Card title="退货物流">
      <Descriptions column={1} labelStyle={{ width: 120 }}>
        <Descriptions.Item label="快递公司">{detail.expressCompany}</Descriptions.Item>

        <Descriptions.Item label="物流单号">{detail.expressNo}</Descriptions.Item>
      </Descriptions>
    </Card>
  ) : null
}

Component.displayName = 'AfterExpressCard'

const AfterExpressCard = memo(Component)
export default AfterExpressCard
