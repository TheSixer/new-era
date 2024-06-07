import { history } from 'umi'
import { apiUrl } from '~/config'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable, { ProColumns } from '@ant-design/pro-table'
import { api, CouponRecordOutputDto } from '@wmeimob/backend-api'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import { guid } from '@wmeimob/utils/src/guid'
import { Button } from 'antd'
import { FC, memo, useState } from 'react'

interface IGrantDetailProps {}

const Component: FC<IGrantDetailProps> = (props) => {
  const service = useService()

  return (
    <PageContainer>
      <ProTable
        actionRef={service.actionRef}
        rowKey="uid"
        columns={service.columns}
        request={service.request}
        search={{
          defaultCollapsed: false,
          labelWidth: 'auto',
          optionRender: (searchConfig, formProps, dom) => [
            <Button type="primary" key="out" loading={service.exportLoading} onClick={() => service.exportTable()}>
              导出
            </Button>,
            ...dom
          ]
        }}
      />
    </PageContainer>
  )
}

Component.displayName = 'MMGrantDetailPage'

const MMGrantDetailPage = memo(Component)
export default MMGrantDetailPage

function useService() {
  const couponId = history.location.query?.id as string
  const [columns] = useState<ProColumns<CouponRecordOutputDto>[]>([
    { title: '手机号', dataIndex: 'mobile' },
    { title: '用户昵称', dataIndex: 'nickName', hideInSearch: true },
    { title: '发放时间', dataIndex: 'gmtCreated', valueType: 'dateRange', render: (_, { gmtCreated }) => gmtCreated },
    { title: '发放结果', dataIndex: 'status', valueEnum: { 0: '失败', 1: '成功' } },
    { title: '失败原因', dataIndex: 'remark', hideInSearch: true }
  ])

  const { request, actionRef, exportTable, exportLoading } = useProTableRequest((params) => api['/admin/mall/coupon/detail_POST'](params), {
    exportUrl: `${apiUrl}/admin/mall/coupon/export`,
    paramsFormat(params) {
      const { gmtCreated, ...rest } = params

      if (gmtCreated) {
        rest.beginTime = gmtCreated[0] + ' 00:00:00'
        rest.endTime = gmtCreated[1] + ' 23:59:59'
      }

      return { ...rest, couponId }
    },
    dataFormat: (data) => data.map((item) => ({ ...item, uid: guid(), status: item.result === '成功' ? 1 : 0 }))
  })

  return {
    columns,
    request,
    actionRef,
    exportTable,
    exportLoading
  }
}
