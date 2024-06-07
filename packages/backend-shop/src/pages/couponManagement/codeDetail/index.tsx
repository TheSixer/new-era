import { history } from 'umi'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import { MCouponCodeBindStatus } from '@wmeimob/shop-data/coupon/enums/ECouponCodeBindStatus'
import { MCouponType } from '@wmeimob/shop-data/coupon/enums/ECouponType'
import { MMProColumns } from 'MMProType'
import { FC, memo, useState } from 'react'
import { api, CouponCodeDetailOutputDto } from '@wmeimob/backend-api'

interface ICodeDetailProps {}

const Component: FC<ICodeDetailProps> = (props) => {
  const { columns, request, actionRef } = useService()

  return (
    <PageContainer>
      <ProTable actionRef={actionRef} rowKey="id" columns={columns} request={request as any} search={{ defaultCollapsed: false, labelWidth: 'auto' }} />
    </PageContainer>
  )
}

const CodeDetail = memo(Component)
export default CodeDetail

function useService() {
  const { id }: any = history.location.query || {}

  const [columns] = useState<MMProColumns<CouponCodeDetailOutputDto>[]>([
    { title: '优惠券编号', dataIndex: 'templateNo', hideInSearch: true },
    { title: '优惠券名称', dataIndex: 'name', hideInSearch: true },
    { title: '优惠券类型', dataIndex: 'couponType', valueType: 'select', valueEnum: MCouponType, hideInSearch: true },
    { title: '优惠码', dataIndex: 'code', hideInSearch: true },
    { title: '状态', dataIndex: 'bindStatusName', hideInSearch: true }, // 需根据当前时间判断，后端处理
    { title: '状态', dataIndex: 'bindStatus', valueType: 'select', valueEnum: MCouponCodeBindStatus, hideInTable: true },
    { title: '核销用户昵称', dataIndex: 'nickName' },
    { title: '核销用户电话', dataIndex: 'userMobile' }
  ])

  const { request, actionRef } = useProTableRequest((params) =>
    api['/admin/mall/couponCode/detail_GET']({
      ...params,
      id
    })
  )

  return {
    columns,
    request,
    actionRef
  }
}
