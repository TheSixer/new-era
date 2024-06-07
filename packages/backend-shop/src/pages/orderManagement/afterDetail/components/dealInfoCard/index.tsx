import { FC, memo } from 'react'
import { IDealInfoCardProps } from './const'
import { Card, Descriptions, Space } from 'antd'
import { useAtomValue } from 'jotai'
import { afterDetailAtom } from '../../store'
import { MMoneybackStatus } from '@wmeimob/shop-data/src/enums/refund/EMoneybackStatus'
import { getProcessResult } from '@wmeimob/shop-data/src/enums/refund/EProcessResult'
import mmCurrenty from '@wmeimob/utils/src/mmCurrency'
import useRefundAmount from '~/hooks/refund/useRefundAmount'
import RefundScore from '~/components/refund/refundScore'
import { ERefundStatus } from '@wmeimob/shop-data/src/enums/refund/ERefundStatus'

const Component: FC<IDealInfoCardProps> = (props) => {
  const detail = useAtomValue(afterDetailAtom)

  const { realTotalAmount, realFreightAmount } = useRefundAmount(detail)
  console.log(realTotalAmount)
  return detail.processTime ? (
    <Card title='处理信息'>
      <Descriptions column={1} labelStyle={{ width: 100 }}>
        <Descriptions.Item label='处理时间'>{detail.processTime}</Descriptions.Item>

        <Descriptions.Item label='处理人'>{detail.processPerson}</Descriptions.Item>

        <Descriptions.Item
          label='处理结果'>{getProcessResult(detail.refundType!, detail.processResult!)}</Descriptions.Item>

        <Descriptions.Item label='处理说明'>{detail.storeNote}</Descriptions.Item>

        {!!detail.returnTime && <Descriptions.Item label='退货时间'>{detail.returnTime!}</Descriptions.Item>}

        {!!detail.completeResult &&
        <Descriptions.Item label='退款状态'>{MMoneybackStatus[detail.completeResult!]}</Descriptions.Item>}

        {!!detail.processCheckTime && <Descriptions.Item label='处理时间'>{detail.processCheckTime}</Descriptions.Item>}

        {!!detail.completePerson && <Descriptions.Item label='处理人'>{detail.completePerson}</Descriptions.Item>}

        {(typeof realTotalAmount === 'number' ? realTotalAmount >= 0 : !!realTotalAmount) &&detail.refundStatus === ERefundStatus.Complete && (
          <Descriptions.Item label='退款金额'>
            <Space>
              <span>{mmCurrenty(realTotalAmount)}</span>
              <span>{!!realFreightAmount && `（含运费${mmCurrenty(realFreightAmount)}）`}</span>

              <RefundScore data={detail} />
            </Space>
          </Descriptions.Item>
        )}

        {!!detail.processCheckNote && <Descriptions.Item label='处理备注'>{detail.processCheckNote}</Descriptions.Item>}
      </Descriptions>
    </Card>
  ) : null
}

Component.displayName = 'DealInfoCard'

const DealInfoCard = memo(Component)
export default DealInfoCard
