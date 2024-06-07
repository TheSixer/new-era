import { FC, memo, useMemo, useState } from 'react'
import { IShippingGoodsTableProps } from './const'
import { Space, Tabs, Image, Tag } from 'antd'
import ProTable from '@ant-design/pro-table'
import { MMProColumns } from 'MMProType'
import { MOrderRefundStatus, EOrderRefundStatus } from '@wmeimob/shop-data/src/enums/refund/EOrderRefundStatus'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import useOrderGoodsShipStatus from '../../hooks/useOrderGoodsShipStatus'
import { OrderItemsVO, OrderShippingItemDto } from '@wmeimob/backend-api/src/request/data-contracts'

const Component: FC<IShippingGoodsTableProps> = (props) => {
  const { value, order, isSplit } = props
  const [activeKey, setActiveKey] = useState('unDelivery')

  const selectedRowKeys = useMemo(() => {
    return (value || []).map((it) => it.skuNo + it.orderItemId)
  }, [value])

  const { unShippedGoods, shippedGoods } = useOrderGoodsShipStatus(order?.items)

  const [tableProps] = useState<any>({
    tableAlertRender: false,
    rowKey: (it) => it.skuNo + it.id,
    search: false,
    pagination: false,
    toolBarRender: false
  })

  const [columns] = useState<MMProColumns<OrderItemsVO>[]>([
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      render: (_v, record) => {
        const { goodsName, skuName, refundStatus, skuImg } = record
        return (
          <Space>
            <Image src={skuImg} width={64} height={64} />
            <Space direction="vertical">
              <Space>
                {record.gift && <Tag color="blue">赠品</Tag>}
                <strong>{goodsName}</strong>
              </Space>
              <div>{skuName}</div>
              {refundStatus !== EOrderRefundStatus.None && (
                <Tag color="processing" icon={<ExclamationCircleOutlined />}>
                  {MOrderRefundStatus[refundStatus!]}
                </Tag>
              )}
            </Space>
          </Space>
        )
      }
    },
    { title: '数量', dataIndex: 'saleQuantity' }
  ])

  return isSplit ? (
    <Tabs activeKey={activeKey} size="small" onChange={setActiveKey}>
      <Tabs.TabPane tab="未发货" key="unDelivery">
        <ProTable
          {...tableProps}
          columns={columns}
          dataSource={unShippedGoods}
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys,
            onChange(values: any[]) {
              const goods = unShippedGoods
                .filter((item) => values.includes(item.skuNo! + item.id))
                .map((item) => {
                  return {
                    orderItemId: item.id,
                    goodsImg: item.goodsImg,
                    goodsName: item.goodsName,
                    goodsNo: item.goodsNo,
                    model: item.skuName,
                    quantity: item.saleQuantity,
                    skuNo: item.skuNo
                  } as OrderShippingItemDto
                })

              props.onChange?.(goods)
            }
          }}
        />
      </Tabs.TabPane>
      <Tabs.TabPane tab="已发货" key="inDelivery">
        <ProTable {...tableProps} columns={columns} dataSource={shippedGoods} />
      </Tabs.TabPane>
    </Tabs>
  ) : (
    <ProTable {...tableProps} columns={columns} dataSource={unShippedGoods} />
  )
}

Component.displayName = 'ShippingGoodsTable'

const ShippingGoodsTable = memo(Component)
export default ShippingGoodsTable
