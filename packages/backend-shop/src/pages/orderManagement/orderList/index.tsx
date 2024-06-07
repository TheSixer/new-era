import { FC, memo, useMemo, useState } from 'react'
import styles from './index.module.less'
import { IOrderListProps, IOrderVo } from './const'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable, { ProColumns } from '@ant-design/pro-table'
import OperationsColumns from '@wmeimob/backend-pro/src/components/table/operationsColumns'
import useProTableForm from '@wmeimob/backend-pro/src/hooks/useProTableForm'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import { api } from '~/request'
import { EOrderStatus, MBackendOrderStatus } from '@wmeimob/shop-data/src/enums/order/EOrderStatus'
import { MOrderChannelType } from '@wmeimob/shop-data/src/enums/order/EOrderChannelType'
import useOrderTypes from '~/hooks/useOrderTypes'
import { history } from 'umi'
import { routeNames } from '~/routes'
import DeliverModal from './components/deliverModal'
import { OrderVO } from '@wmeimob/backend-api'
import { Button } from 'antd'
import { mmAdds } from '@wmeimob/utils/src/mmCurrency'
import OrderAmount from '@wmeimob/backend-pages-shop/src/pages/orderManagement/orderList/components/orderAmount'
import PayableAmount from '@wmeimob/backend-pages-shop/src/pages/orderManagement/orderList/components/payableAmount'
import PaidAmount from '@wmeimob/backend-pages-shop/src/pages/orderManagement/orderList/components/paidAmount'
import { MOrderType } from '@wmeimob/shop-data/src/enums/order/EOrderType'
import { apiUrl } from '~/config'
// import { AfterOrderTypeName } from '~/enums/order/EAfterOrderType'

const Component: FC<IOrderListProps> = (props) => {
  const [columns] = useState<ProColumns<OrderVO>[]>([
    { title: '订单编号', dataIndex: 'orderNo', width: 200 },
    {
      title: '订单渠道',
      dataIndex: 'orderChannelType',
      valueType: 'select',
      valueEnum: MOrderChannelType,
      width: 80
    },
    { title: '订单类型', dataIndex: 'orderType', hideInSearch: true, valueType: 'select', valueEnum: MOrderType },
    { title: '下单人', dataIndex: 'userName', hideInSearch: true },
    { title: '下单人手机号', dataIndex: 'userMobile', hideInSearch: true },

    { title: '订单金额', dataIndex: 'orderAmount', hideInSearch: true, width: 150, render: (_, data) => <OrderAmount data={data} /> },
    { title: '下单时间', dataIndex: 'gmtCreated', valueType: 'dateRange', width: 200, render: (_v, record) => record.gmtCreated },
    { title: '应付金额', dataIndex: 'payAmount', hideInSearch: true, width: 150, render: (_, data) => <PayableAmount data={data} /> },
    { title: '实付金额', dataIndex: 'payAmount', hideInSearch: true, width: 150, render: (_, data) => <PaidAmount data={data} /> },
    { title: '收货人', dataIndex: 'shippingName' },
    { title: '收货人手机', dataIndex: 'shippingMobile' },
    {
      title: '订单状态',
      dataIndex: 'queryType',
      valueType: 'select',
      valueEnum: MBackendOrderStatus,
      width: 80,
      fixed: 'right'
    },

    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      width: 80,
      render: (_, record) => (
        <OperationsColumns
          operations={[
            {
              id: 'detail',
              text: <a onClick={() => history.push({ pathname: routeNames.orderManagementOrderListOrderDetail, search: `?orderNo=${record.orderNo}` })}>详情</a>
            },
            {
              id: 'deliver',
              show: (record as IOrderVo).queryType === EOrderStatus.UNSHIPPED,
              text: (
                <a
                  onClick={() => {
                    modalProps.form.setFieldsValue(record)
                    setEditData(record)
                    setVisible(true)
                  }}
                >
                  发货
                </a>
              )
            }
          ]}
        />
      )
    }
  ])

  const x = useMemo(() => columns.reduce((result, { width = 120 }) => mmAdds(result, width), 0), [columns])

  const { converType } = useOrderTypes()

  const { request, params, exportTable, exportLoading, actionRef } = useProTableRequest((params) => api['/admin/orders_GET'](params), {
    exportUrl: `${apiUrl}/admin/orders/export`,
    paramsFormat: ({ gmtCreated, ...rest }) => {
      if (gmtCreated) {
        rest.beginTime = gmtCreated[0] + ' 00:00:00'
        rest.endTime = gmtCreated[1] + ' 23:59:59'
      }
      return rest
    },
    dataFormat: (data) => data.map((it) => ({ ...it, queryType: converType(it.orderStatus) }))
  })

  const { modalProps, editData, setEditData, setVisible } = useProTableForm({ title: () => '订单发货' })

  return (
    <PageContainer className={styles.employeeManagementStyle}>
      <ProTable
        actionRef={actionRef}
        rowKey="id"
        columns={columns}
        request={request}
        scroll={{ x }}
        search={{
          defaultCollapsed: false,
          labelWidth: 'auto',
          optionRender: (searchConfig, formProps, dom) => [
            <Button type="primary" key="export" loading={exportLoading} onClick={() => exportTable(params.current)}>
              导出
            </Button>,
            ...dom
          ]
        }}
      />

      <DeliverModal
        order={editData as any}
        modalProps={{ ...modalProps }}
        onFinish={() => {
          setVisible(false)
          actionRef.current?.reload()
        }}
      />
    </PageContainer>
  )
}

Component.displayName = 'OrderList'

const OrderList = memo(Component)
export default OrderList
