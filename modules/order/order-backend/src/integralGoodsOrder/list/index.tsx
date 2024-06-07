import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import { Button } from 'antd'
import { FC, memo } from 'react'
import DeliverModal from './components/deliverModal'
import { useIntegralGoodsOrderListService } from './hooks/useIntegralGoodsOrderListService'

interface IIntegralGoodsOrderListProps {
  service: ReturnType<typeof useIntegralGoodsOrderListService>
}

const Component: FC<IIntegralGoodsOrderListProps> = (props) => {
  const { request, params, exportTable, exportLoading, deliverForm, scrollX, actionRef, columns } = props.service

  return (
    <PageContainer>
      <ProTable
        actionRef={actionRef}
        rowKey="orderNo"
        columns={columns}
        request={request}
        scroll={{ x: scrollX }}
        search={{
          defaultCollapsed: false,
          labelWidth: 'auto',
          optionRender: (_, __, dom) => [
            <Button type="primary" key="export" loading={exportLoading} onClick={() => exportTable(params.current)}>
              导出
            </Button>,
            ...dom
          ]
        }}
      />

      <DeliverModal
        order={deliverForm.editData as any}
        modalProps={{ ...deliverForm.modalProps }}
        onFinish={() => {
          deliverForm.setVisible(false)
          actionRef.current?.reload()
        }}
      />
    </PageContainer>
  )
}

const MMIntegralGoodsOrderListPage = memo(Component)
export default MMIntegralGoodsOrderListPage
