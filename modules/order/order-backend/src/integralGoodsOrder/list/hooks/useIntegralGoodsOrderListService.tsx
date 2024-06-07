import { ProColumns } from '@ant-design/pro-table'
import { api } from '@wmeimob/backend-api'
import { OrderVO } from '@wmeimob/backend-api/src/request/data-contracts'
import OperationsColumns from '@wmeimob/backend-pro/src/components/table/operationsColumns'
import useProTableForm from '@wmeimob/backend-pro/src/hooks/useProTableForm'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import { getGlobalData } from '@wmeimob/backend-store'
import { EOrderStatus, MBackendOrderStatus } from '@wmeimob/shop-data/src/enums/order/EOrderStatus'
import { mmAdds } from '@wmeimob/utils/src/mmCurrency'
import { useMemo } from 'react'
import OrderAmount from '../../../components/orderAmount'
import PaidAmount from '../../../components/paidAmount'
import PayableAmount from '../../../components/payableAmount'
import { IOrderVo } from '../const'
import useOrderTypes from './useOrderTypes'

// const { enableMultipleStore } = config.systemConfig.config

export function useIntegralGoodsOrderListService(options: { onDetail(record: OrderVO): void }) {
  const { onDetail } = options

  const columns = useMemo<ProColumns<OrderVO>[]>(
    () => [
      { title: '订单编号', dataIndex: 'orderNo', width: 200 },
      // { title: '成交店铺', dataIndex: 'storeName', hideInSearch: true, hideInTable: !enableMultipleStore },
      { title: '下单人', dataIndex: 'userName', hideInSearch: true },
      { title: '下单人手机号', dataIndex: 'userMobile', hideInSearch: true },
      { title: '订单金额', dataIndex: 'orderAmount', hideInSearch: true, width: 250, render: (_, data) => <OrderAmount data={data} /> },
      {
        title: '下单时间',
        dataIndex: 'gmtCreated',
        valueType: 'dateRange',
        width: 200,
        search: {
          transform: ([beginTime, endTime]) => ({
            beginTime: `${beginTime} 00:00:00`,
            endTime: `${endTime} 23:59:59`
          })
        },
        render: (_v, record) => record.gmtCreated
      },
      { title: '应付金额', dataIndex: 'payAmount', hideInSearch: true, width: 150, render: (_, data) => <PayableAmount data={data} /> },
      { title: '实付金额', dataIndex: 'payAmount', hideInSearch: true, width: 150, render: (_, data) => <PaidAmount data={data} /> },
      { title: '收货人', dataIndex: 'shippingName' },
      { title: '收货人手机', dataIndex: 'shippingMobile' },
      { title: '订单状态', dataIndex: 'queryType', valueType: 'select', valueEnum: MBackendOrderStatus, width: 80, fixed: 'right' },
      {
        title: '操作',
        dataIndex: 'option',
        valueType: 'option',
        fixed: 'right',
        width: 200,
        render: (_, record) => (
          <OperationsColumns
            operations={[
              { id: 'detail', text: <a onClick={() => onDetail(record)}>详情</a> },
              {
                id: 'deliverGoods',
                show: (record as IOrderVo).queryType === EOrderStatus.UNSHIPPED,
                text: (
                  <a
                    onClick={() => {
                      deliverForm.modalProps.form.setFieldsValue(record)
                      deliverForm.setEditData(record)
                      deliverForm.setVisible(true)
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
    ],
    []
  )

  const scrollX = useMemo(() => columns.reduce((result, { width = 120 }) => mmAdds(result, width), 0), [columns])

  const deliverForm = useProTableForm({ title: () => '订单发货' })

  const { converType } = useOrderTypes()

  const { request, params, actionRef, exportTable, exportLoading } = useProTableRequest((params) => api['/admin/scoreOrders_GET'](params), {
    exportUrl: `${getGlobalData('apiUrl')}/admin/scoreOrders/export`,
    dataFormat: (data) => data.map((it) => ({ ...it, queryType: converType(it.orderStatus) }))
  })

  // useEffect(() => {
  //   enableMultipleStore && getAllStore().then((data) => setStores(data))
  // }, [])

  // async function getAllStore() {
  //   try {
  //     const { data = [] } = await api['/admin/mall/store/select_GET']()
  //     return data
  //   } catch (error) {}

  //   return []
  // }

  return {
    request,
    params,
    exportTable,
    exportLoading,
    deliverForm,
    scrollX,
    actionRef,
    columns
  }
}
