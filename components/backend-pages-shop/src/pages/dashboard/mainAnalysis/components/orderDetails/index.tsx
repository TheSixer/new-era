import { api } from '@wmeimob/backend-api'
import { OrderVO } from '@wmeimob/backend-api/src/request/data-contracts'
import useExport from '@wmeimob/backend-pro/src/hooks/useExport'
import { getGlobalData } from '@wmeimob/backend-store'
import { Button, Space, Table, Typography } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { FC, memo, useEffect, useState } from 'react'
import OrderAmount from '../../../../orderManagement/orderList/components/orderAmount'
import PaidAmount from '../../../../orderManagement/orderList/components/paidAmount'
import { MOrderChannelType } from '@wmeimob/shop-data/src/enums/order/EOrderChannelType'
import PayableAmount from '../../../../orderManagement/orderList/components/payableAmount'

export interface IOrderDetailsProps {
  params: Record<string, any>

  onOrderDetail(data: OrderVO): void
}

const Component: FC<IOrderDetailsProps> = (props) => {
  const [loading, setLoading] = useState(false)
  const [columns] = useState<ColumnsType<OrderVO>>([
    { dataIndex: 'orderNo', title: '订单号', width: 375 },
    {
      dataIndex: 'orderChannelType', title: '订单渠道', width: 150, render: (value) => {
        return MOrderChannelType[value]
      }
    },
    { title: '订单金额 (含运费)', dataIndex: 'orderAmount', width: 250, render: (_, data) => <OrderAmount data={data} /> },
    { title: '应付金额', dataIndex: 'payableAmount', width: 150, render: (_, data) => <PayableAmount data={data} /> },

    { title: '实际支付金额', dataIndex: 'payAmount', width: 150, render: (_, data) => <PaidAmount data={data} /> },
    {
      dataIndex: 'detail',
      title: '订单详情',
      width: 375,
      render: (_, record) => <a onClick={() => props.onOrderDetail(record)}>查看详情</a>
    }
  ])

  const [current, setCurrent] = useState(1)
  const [total, setTotal] = useState(0)
  const pageSize = 20
  const [dataSource, setDataSource] = useState<OrderVO[]>([])

  useEffect(() => {
    if (current === 1){
      getData(1)
    }else {
      setCurrent(1)
    }
  }, [ props.params])

  useEffect(()=>{
    getData(current)
  },[current])

  async function getData(pageNum) {
    setLoading(true)
    try {
      const { data = {} } = await api['/admin/mall/statistics/orderDetailsStatistics_GET']({
        pageNum: pageNum||current,
        pageSize, ...props.params
      })
      const { total = 0, list = [] } = data
      setTotal(total)
      setDataSource(list)
    } catch (error) {
    }
    setLoading(false)
  }

  const [exportTable, exportLoading] = useExport(`${getGlobalData('apiUrl')}/admin/mall/statistics/exportOrderDetailsStatistics`)

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography.Title level={4} style={{ marginBottom: 0 }}>
          营业额明细
        </Typography.Title>
        <Button type='primary' loading={exportLoading} onClick={() => exportTable(props.params)}>
          导出
        </Button>
      </Space>

      <Table
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        rowKey='id'
        pagination={{ current, pageSize, total, showSizeChanger: false,showTotal: (total)=>`共${total}条数据` }}
        onChange={(pagination) => setCurrent(pagination.current!)}
      />
    </Space>
  )
}

const OrderDetails = memo(Component)
export default OrderDetails
