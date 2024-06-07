import { FC, memo, useMemo, useState } from 'react'
import styles from './index.module.less'
import { IAftersaleListProps } from './const'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable, { ProColumns } from '@ant-design/pro-table'
import OperationsColumns from '@wmeimob/backend-pro/src/components/table/operationsColumns'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import { api } from '~/request'
import { RefundMasterDto } from '@wmeimob/backend-api'
import { MRefundType } from '@wmeimob/shop-data/src/enums/refund/ERefundType'
import { history } from 'umi'
import { routeNames } from '~/routes'
import { ERefundStatus, MRefundStatus } from '@wmeimob/shop-data/src/enums/refund/ERefundStatus'
import { omit } from 'lodash'
import RefundAmount from '~/components/refund/refundAmount'
import { mmAdds } from '@wmeimob/utils/src/mmCurrency'
import { Input } from 'antd'
import calcRefundScore from '~/utils/refund/calcRefundScore'

const Component: FC<IAftersaleListProps> = (props) => {
  const [columns] = useState<ProColumns<RefundMasterDto>[]>([
    {
      title: '售后编号',
      dataIndex: 'refundNo',
      width: 160,
      formItemProps: { label: ' ', colon: false, wrapperCol: { span: 24 }, labelCol: { span: 0 } },
      renderFormItem: (_, config, form) => {
        return <Input placeholder="输入用户昵称/手机号/售后编号/订单编号" maxLength={20} allowClear />
      }
    },
    { title: '订单编号', dataIndex: 'orderNo', width: 200, hideInSearch: true },
    // { title: '订单类型', dataIndex: 'reasonTxt', valueType: 'select', valueEnum: AfterOrderTypeName },
    { title: '售后类型', dataIndex: 'refundType', valueType: 'select', valueEnum: MRefundType, width: 100 },
    {
      title: '售后状态',
      dataIndex: 'refundStatus',
      valueType: 'select',
      valueEnum: omit(MRefundStatus, [ERefundStatus.Process, ERefundStatus.CompleteRefundFail]),
      width: 100,
      render: (_v, { refundStatus }) => MRefundStatus[refundStatus!]
    },
    { title: '退款原因', dataIndex: 'reasonTxt', hideInSearch: true, width: 160 },
    {
      title: '申请退款金额',
      dataIndex: 'applyRefundAmount',
      hideInSearch: true,
      valueType: 'money',
      width: 200,
      render: (_, data) => <RefundAmount data={data} />
    },
    { title: '申请退积分数额', dataIndex: '_refundScore', hideInSearch: true },
    { title: '申请时间', dataIndex: 'applyTime', valueType: 'dateRange', render: (_v, record) => record.applyTime },
    { title: '用户昵称', dataIndex: 'userName', hideInSearch: true },
    { title: '用户手机', dataIndex: 'userMobile', hideInSearch: true },
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
              text: (
                <a onClick={() => history.push({ pathname: routeNames.orderManagementAftersaleListAfterDetail, query: { refundNo: record.refundNo! } })}>
                  {[ERefundStatus.StoreProcess, ERefundStatus.StoreCheck].includes(record.refundStatus!) ? '审核' : '详情'}
                </a>
              )
            }
          ]}
        />
      )
    }
  ])

  const x = useMemo(() => columns.reduce((result, { width = 120 }) => mmAdds(result, width), 0), [columns])

  function convertParams(params: any) {
    const { refundNo, applyTime, ...rest } = params
    if (refundNo) {
      rest.condition = refundNo
    }
    if (applyTime) {
      rest.beginTime = applyTime[0] + ' 00:00:00'
      rest.endTime = applyTime[1] + ' 23:59:59'
    }
    return rest
  }

  const { request, actionRef } = useProTableRequest((params) => api['/admin/refund/list_GET'](convertParams(params)), {
    dataFormat: (data) => data.map((it) => ({ ...it, _refundScore: calcRefundScore(it, 'applyRefundScore') }))
  })

  return (
    <PageContainer className={styles.employeeManagementStyle}>
      <ProTable
        actionRef={actionRef}
        rowKey="refundNo"
        columns={columns}
        request={request}
        scroll={{ x }}
        search={{
          defaultColsNumber: 16,
          labelWidth: 'auto'
        }}
      />
    </PageContainer>
  )
}

Component.displayName = 'AftersaleList'

const AftersaleList = memo(Component)
export default AftersaleList
