import { ProColumns, ProTableProps } from '@ant-design/pro-table'
import { useRef, useState } from 'react'
import { MCouponType } from '@wmeimob/shop-data/coupon/enums//ECouponType'
import { api } from '@wmeimob/backend-api/src/request'
import { CouponTemplateVo } from '@wmeimob/backend-api/src/request/data-contracts'
import { getCouponUseCondition, getCouponUseExpiredCondition } from '../../utils/coupon'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import { ECouponStatus } from '@wmeimob/shop-data/coupon/enums//ECouponStatus'

export default function useCouponChoose() {
  const [columns] = useState<ProColumns<CouponTemplateVo>[]>([
    { title: '优惠券编号', dataIndex: 'templateNo' },
    { title: '优惠券名称', dataIndex: 'name' },
    { title: '优惠券类型', dataIndex: 'couponType', valueType: 'select', valueEnum: MCouponType },
    { title: '使用条件', dataIndex: 'demandPrice', render: (_, record) => getCouponUseCondition(record), hideInSearch: true },
    {
      title: '使用有效期',
      dataIndex: 'termStart',
      hideInSearch: true,
      render: (_, record) => getCouponUseExpiredCondition(record)
    },
    { title: '已领取', dataIndex: 'sendNum', hideInSearch: true },
    { title: '剩余(张)', dataIndex: 'stock', hideInSearch: true }
  ])

  const dataSourceRef = useRef<CouponTemplateVo[]>([])

  const { request, actionRef } = useProTableRequest(async (params) => {
    const result = await api['/admin/mallCouponTemplate/queryList_GET']({ ...params, stock: true, status: ECouponStatus.Valid })
    dataSourceRef.current = result.data?.list || []
    return result
  })

  const rowKey = 'templateNo'

  return {
    tableProps: {
      actionRef,
      columns,
      request,
      rowKey,
      tableAlertRender: false,
      toolBarRender: false
    } as ProTableProps<CouponTemplateVo, any, any>,
    rowKey,
    dataSource: dataSourceRef
  }
}
