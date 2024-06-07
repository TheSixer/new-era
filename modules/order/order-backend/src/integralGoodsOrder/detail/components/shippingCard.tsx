import { Card, Descriptions } from 'antd'
import { useAtomValue } from 'jotai'
import { FC, memo } from 'react'
import { orderDescriptionsPropsAtom, orderDetailAtom } from '../store'

const Component: FC<any> = (props) => {
  const descriptionsProps = useAtomValue(orderDescriptionsPropsAtom)
  const { shippingAddress = '', shippingCity = '', shippingProvince = '', shippingDistrict = '', selfPicked, ...detail } = useAtomValue(orderDetailAtom)

  const address = [shippingProvince, shippingCity, shippingDistrict, shippingAddress].join(' ')

  return (
    <Card title="收件信息">
      <Descriptions {...descriptionsProps}>
        <Descriptions.Item label="收件人">{detail.shippingName}</Descriptions.Item>

        <Descriptions.Item label="联系电话">{detail.shippingMobile}</Descriptions.Item>

        <Descriptions.Item label="收货地址">{address}</Descriptions.Item>

        {!!detail.shippingAt && <Descriptions.Item label="发货时间">{detail.shippingAt}</Descriptions.Item>}

        {!!detail.receiptAt && <Descriptions.Item label="收货时间">{detail.receiptAt}</Descriptions.Item>}
      </Descriptions>
    </Card>
  )
}

Component.displayName = 'ShippingCard'

const ShippingCard = memo(Component)
export default ShippingCard
