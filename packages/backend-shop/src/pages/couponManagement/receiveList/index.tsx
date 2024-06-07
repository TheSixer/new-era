import { apiUrl } from '~/config'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable, { ProColumns } from '@ant-design/pro-table'
import { MCouponAcceptType } from '@wmeimob/shop-data/coupon/enums/ECouponAcceptType'
import { ECouponUseStatus, MCouponUseStatus } from '@wmeimob/shop-data/coupon/enums/ECouponUseStatus'
import { api, MemCouponRecordVo } from '@wmeimob/backend-api'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import { Button, Input } from 'antd'
import dayjs from 'dayjs'
import { FC, memo, useState } from 'react'
import { getCouponUseCondition } from '../../../utils/coupon'

interface IReceiveListProps {}

const Component: FC<IReceiveListProps> = (props) => {
  const service = useService()

  return (
    <PageContainer>
      <ProTable
        actionRef={service.actionRef}
        rowKey="id"
        columns={service.columns}
        request={service.request}
        scroll={{ x: 1500 }}
        search={{
          defaultCollapsed: false,
          labelWidth: 'auto',
          optionRender: (searchConfig, formProps, dom) => [
            <Button type="primary" key="export" loading={service.exportLoading} onClick={() => service.exportTable()}>
              导出
            </Button>,
            ...dom
          ]
        }}
      />
    </PageContainer>
  )
}

Component.displayName = 'CouponReceiveListPage'

const CouponReceiveListPage = memo(Component)
export default CouponReceiveListPage

function useService() {
  const [columns] = useState<ProColumns<MemCouponRecordVo>[]>([
    { title: '昵称', dataIndex: 'nickName', hideInSearch: true },
    {
      title: '手机号',
      dataIndex: 'mobile',
      formItemProps: { label: ' ', colon: false },
      renderFormItem: (_, config, form) => {
        return <Input placeholder="输入用户昵称/手机号/优惠券名称" maxLength={20} allowClear />
      }
    },
    { title: '优惠券名称', dataIndex: 'couponName', hideInSearch: true },
    { title: '使用条件', dataIndex: 'demandPrice', render: (_, record) => getCouponUseCondition(record), hideInSearch: true },
    { title: '获取时间', dataIndex: 'receive', valueType: 'dateRange', render: (_v, record) => record.receive },
    { title: '获取方式', dataIndex: 'acceptType', hideInSearch: true, valueEnum: MCouponAcceptType },
    {
      title: '有效期',
      dataIndex: 'termEnd',
      hideInSearch: true,
      render: (_v, record) => {
        return `${dayjs(record.termStart).format('YYYY-MM-DD')}~${dayjs(record.termEnd).format('YYYY-MM-DD')}`
      }
    },
    { title: '使用状态', dataIndex: 'useStatus', valueType: 'select', valueEnum: MCouponUseStatus, fixed: 'right', width: 100 }
  ])

  const { request, actionRef, exportLoading, exportTable } = useProTableRequest(api['/admin/memCoupon/queryList_GET'], {
    exportUrl: `${apiUrl}/admin/memCoupon/export`,
    paramsFormat(params) {
      const { mobile, receive, ...rest } = params
      if (mobile) {
        rest.searchString = mobile
      }
      if (receive) {
        rest.beginTime = receive[0] + ' 00:00:00'
        rest.endTime = receive[1] + ' 23:59:59'
      }
      return rest
    },
    dataFormat: (data) => data.map((item) => ({ ...item, useStatus: calcUseStatus(item) }))
  })

  /**
   * 计算优惠券使用状态
   * @param item
   * @returns
   */
  function calcUseStatus(item: MemCouponRecordVo) {
    const { useStatus, termEnd } = item
    // 如果是未使用并且超过使用时间了。则是已过期
    if (useStatus === ECouponUseStatus.NotUse && termEnd && dayjs().isAfter(dayjs(termEnd), 'minutes')) {
      return ECouponUseStatus.OutDate
    }
    return useStatus
  }

  return {
    actionRef,
    columns,
    request,
    exportLoading,
    exportTable
  }
}
