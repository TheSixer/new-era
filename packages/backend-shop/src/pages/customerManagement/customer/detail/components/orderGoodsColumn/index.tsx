import { FC, memo } from 'react'
import { IOrderGoodsColumnProps } from './const'
import { Avatar, Space, Tag } from 'antd'
import { assembleResizeUrl } from '@wmeimob/tencent-cloud'

const Component: FC<IOrderGoodsColumnProps> = (props) => {
  const { orderGoods = [] } = props

  if (!orderGoods.length) return null

  return (
    <Space direction="vertical">
      {orderGoods.map((item) => (
        <Space key={item.id}>
          <Avatar src={assembleResizeUrl(item.skuImg, { width: 64 })} size={64} shape="square" />
          <div>
            {item.gift && <Tag color="red">赠品</Tag>}
            {item.goodsName}
            <br />
            <span style={{ color: '#999' }}>规格: [{item.skuName}]</span>
          </div>
        </Space>
      ))}
    </Space>
  )
}

Component.displayName = 'OrderGoodsColumn'

const OrderGoodsColumn = memo(Component)
export default OrderGoodsColumn
