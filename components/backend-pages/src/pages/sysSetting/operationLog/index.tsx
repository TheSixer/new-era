import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import { api } from '@wmeimob/backend-api'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import { getGlobalData } from '@wmeimob/backend-store'
import { Button } from 'antd'
import { MMProColumns } from 'MMProType'
import { FC, memo, useState } from 'react'

interface IOperationLogProps {}

const Component: FC<IOperationLogProps> = (props) => {
  // const {} = props

  const { columns, request, actionRef, exportLoading, exportTable } = useService()

  return (
    <PageContainer>
      <ProTable
        actionRef={actionRef}
        rowKey="id"
        columns={columns}
        request={request}
        search={{
          defaultCollapsed: false,
          labelWidth: 'auto',
          optionRender: (_, __, dom) => [
            ...dom,
            <Button type="primary" key="out" loading={exportLoading} onClick={exportTable}>
              导出
            </Button>
          ]
        }}
      />
    </PageContainer>
  )
}

const OperationLog = memo(Component)
export default OperationLog

function useService() {
  const [columns] = useState<MMProColumns[]>([
    { title: '用户名称', dataIndex: 'operatorName' },
    { title: '联系电话', dataIndex: 'mobile' },
    { title: '时间', dataIndex: 'gmtCreated', valueType: 'dateTime', hideInSearch: true },
    {
      title: '时间',
      dataIndex: 'beginTime',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: ([beginTime, endTime]) => ({
          beginTime: `${beginTime} 00:00:00`,
          endTime: `${endTime} 23:59:59`
        })
      }
    },
    {
      title: '操作类型',
      dataIndex: 'operateType',
      valueType: 'select',
      request: async () => {
        const { data = [] } = await api['/admin/operate/logs/operateTypeEnums_GET']()
        return data.map((text) => ({ label: text, value: text }))
      }
    },
    { title: '操作结果', dataIndex: 'success', hideInSearch: true, renderText: (success: boolean) => (success ? '成功' : '失败') },
    { title: '模块', dataIndex: 'module' },
    { title: '描述', dataIndex: 'details', width: '40%', hideInSearch: true, ellipsis: true }
  ])

  const { request, actionRef, exportLoading, exportTable } = useProTableRequest(api['/admin/operate/logs_GET'], {
    exportUrl: `${getGlobalData('apiUrl')}/admin/operate/logs/export`
  })

  return {
    columns,
    request,
    actionRef,
    exportLoading,
    exportTable
  }
}
