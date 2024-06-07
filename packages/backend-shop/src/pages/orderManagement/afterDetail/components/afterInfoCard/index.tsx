import { FC, memo } from 'react'
import { IAfterInfoCardProps } from './const'
import { Card, Descriptions } from 'antd'
import { useAtomValue } from 'jotai'
import { afterDetailAtom } from '../../store'
import AlbumColumn from '@wmeimob/backend-pro/src/components/table/albumColumn'
import RefundAmount from '~/components/refund/refundAmount'

const Component: FC<IAfterInfoCardProps> = (props) => {
  const detail = useAtomValue(afterDetailAtom)

  return (
    <Card title="售后信息">
      <Descriptions column={1} labelStyle={{ width: 100 }}>
        <Descriptions.Item label="订单编号">{detail.orderNo}</Descriptions.Item>

        <Descriptions.Item label="申请人">{detail.userName}</Descriptions.Item>

        <Descriptions.Item label="手机号">{detail.userMobile}</Descriptions.Item>

        <Descriptions.Item label="申请时间">{detail.gmtCreated}</Descriptions.Item>

        <Descriptions.Item label="申请退款金额">
          <RefundAmount data={detail} />
        </Descriptions.Item>

        <Descriptions.Item label="申请原因">{detail.reasonTxt}</Descriptions.Item>

        <>
          <Descriptions.Item label="申请凭证">
            <div>{detail?.refundNote}</div>
          </Descriptions.Item>
          <div>
            <div style={{ width: '100px' }} />
            <AlbumColumn value={detail.images!} mode="list" width={80} height={80} />
          </div>
        </>
        {/* <Descriptions.Item label="申请人">{detail.userName}</Descriptions.Item>

        <Descriptions.Item label="手机号">{detail.userMobile}</Descriptions.Item>

        <Descriptions.Item label="申请时间">{detail.gmtCreated}</Descriptions.Item>

        <Descriptions.Item label="售后原因">{detail.reasonTxt}</Descriptions.Item>

        <Descriptions.Item label="退款原因">{detail.refundNote}</Descriptions.Item>

        <Descriptions.Item label="申请退款金额">￥{detail.applyRefundAmount}</Descriptions.Item>

        {detail.images && (
          <Descriptions.Item label="申请凭证">
            <AlbumColumn value={detail.images} mode="list" width={80} height={120} />
          </Descriptions.Item>
        )} */}
      </Descriptions>
    </Card>
  )
}

Component.displayName = 'AfterInfoCard'

const AfterInfoCard = memo(Component)
export default AfterInfoCard
