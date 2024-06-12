import { FC, memo, useState } from 'react'
import { IOrderProps } from './const'
import OperationsColumns from '@wmeimob/backend-pro/src/components/table/operationsColumns'
import { history } from 'umi'
import ProTable, { ProColumns } from '@ant-design/pro-table'
import { OrderVO } from '@wmeimob/backend-api'
import { routeNames } from '~/routes'
import { Space } from 'antd'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import { api } from '~/request'
import OrderGoodsColumn from '../orderGoodsColumn'
import { MBackendOrderStatus } from '@wmeimob/shop-data/src/enums/order/EOrderStatus'
import useOrderTypes from '~/hooks/useOrderTypes'
import OrderAmount from '@wmeimob-modules/order-backend/src/components/orderAmount'
import { EOrderType } from '@wmeimob/shop-data/src/enums/order/EOrderType'

const Component: FC<IOrderProps> = (props) => {
  const { detail } = props

  const [columns] = useState<ProColumns<OrderVO>[]>([
    { title: '订单编号', dataIndex: 'orderNo' },
    { title: '商品信息', dataIndex: 'items', render: (_, record) => <OrderGoodsColumn orderGoods={record.items} /> },
    { title: '订单金额', dataIndex: 'orderAmount', width: 250, render: (_, record) => <OrderAmount data={record} /> },
    { title: '下单时间', dataIndex: 'gmtCreated', valueType: 'dateTime' },
    { title: '订单状态', dataIndex: 'queryType', valueType: 'select', valueEnum: MBackendOrderStatus, width: 100 },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 100,
      render: (_, record) => (
        <OperationsColumns
          operations={[
            {
              id: 'detail',
              text: (
                <a
                  onClick={() => {
                    if (EOrderType.Integral === record.orderType) {
                      history.push({
                        pathname: routeNames.orderManagementIntegralGoodsOrderDetail,
                        query: { orderNo: record.orderNo! }
                      })
                    } else {
                      history.push({
                        pathname: routeNames.orderManagementOrderListOrderDetail,
                        query: { orderNo: record.orderNo! }
                      })
                    }
                  }}
                >
                  详情
                </a>
              )
            }
          ]}
        />
      )
    }
  ])

  const { converType } = useOrderTypes()

  const { request } = useProTableRequest((params) => api['/admin/orders/list_GET']({ ...params, userId: detail.id }), {
    dataFormat: (data) => data.map((it) => ({ ...it, queryType: converType(it.orderStatus) }))
  })

  return (
    <Space direction="vertical" style={{ display: 'flex' }}>
      {/* <Typography.Title level={5}>订单信息</Typography.Title> */}
      <ProTable rowKey="id" columns={columns} cardProps={{ bodyStyle: { padding: 0 } }} request={request} search={false} />
    </Space>
  )
}

Component.displayName = 'Order'

const Order = memo(Component)
export default Order
