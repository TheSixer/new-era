import { history } from 'umi'
import { routeNames } from '~/routes'
import { FC, memo, useState } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable, { ProColumns } from '@ant-design/pro-table'
import { Button, message, Modal, Typography } from 'antd'
import OperationsColumns from '@wmeimob/backend-pro/src/components/table/operationsColumns'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import { api, CouponTemplateVo } from '@wmeimob/backend-api'
import StatusSwitchColumn from '@wmeimob/backend-pro/src/components/table/statusSwitchColumn'
import { MCouponType } from '@wmeimob/shop-data/coupon/enums/ECouponType'
import { canEditCoupon, getCouponStatusOption, getCouponUseCondition, getCouponUseExpiredCondition } from '../../../utils/coupon'
import { ECouponStatus, MCouponStatus } from '@wmeimob/shop-data/coupon/enums/ECouponStatus'

interface IListProps {}

const Component: FC<IListProps> = (props) => {
  const { actionRef, columns, request } = useService()

  return (
    <PageContainer>
      <ProTable
        actionRef={actionRef}
        rowKey="id"
        columns={columns}
        request={request as any}
        search={{
          defaultCollapsed: false,
          labelWidth: 'auto',
          optionRender: (searchConfig, formProps, dom) => [
            ...dom,
            <Button type="primary" key="out" onClick={() => history.push(routeNames.couponManagementListAdd)}>
              添加优惠券
            </Button>
          ]
        }}
      />
    </PageContainer>
  )
}

const CouponListPage = memo(Component)
export default CouponListPage

function useService() {
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

    { title: '已领取(张)', dataIndex: 'sendNum', hideInSearch: true },
    { title: '剩余(张)', dataIndex: 'stock', hideInSearch: true },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: MCouponStatus,
      // render: (_, record) => getCouponStatusOption(record).label,
      tooltip: (
        <div>
          <div>已作废:优惠券作废</div>
          <div>未生效:未到可领取时间</div>
          <div>生效中:在领取时间内可领取</div>
          <div>已过期:已超过领取时间不可领取</div>
        </div>
      )
    },
    {
      title: '显示状态',
      dataIndex: 'isPublic',
      hideInSearch: true,
      render: (_v, record) => {
        const disabled = [ECouponStatus.Expired, ECouponStatus.Void].includes(record.status!)

        return (
          <StatusSwitchColumn
            checked={!!record.isPublic}
            disabled={disabled}
            onSwitch={async () => {
              await api['/admin/mallCouponTemplate/updatePublicStatus_PUT']({ ...record, isPublic: record.isPublic === 0 ? 1 : 0 })
              actionRef.current?.reload()
            }}
          />
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 120,
      render: (_, record) => (
        <OperationsColumns
          operations={[
            {
              id: 'detail',
              text: (
                <a
                  onClick={() => {
                    history.push(`${routeNames.couponManagementListDetail}?id=${record.id}`)
                  }}
                >
                  详情
                </a>
              )
            },
            {
              id: 'edit',
              show: canEditCoupon(record),
              onClick: () => history.push(`${routeNames.couponManagementListAdd}?id=${record.id}`)
            },
            {
              id: 'cancellation',
              show: !!record.status,
              text: (
                <a
                  onClick={async () => {
                    Modal.confirm({
                      title: '作废',
                      content: (
                        <div>
                          <Typography.Text type="danger">优惠券作废后不可恢复，已经发放、领取且未使用的券也会立即失效</Typography.Text>
                          <div>
                            <Typography.Text strong>是否确定作废?</Typography.Text>
                          </div>
                        </div>
                      ),
                      onOk: async () => {
                        await api['/admin/mallCouponTemplate/delete_DELETE']({ id: record.id! })
                        message.success('操作成功')
                        actionRef.current?.reload()
                      }
                    })
                  }}
                >
                  作废
                </a>
              )
            }
          ]}
        />
      )
    }
  ])

  const { request, actionRef } = useProTableRequest(
    (params) => {
      return api['/admin/mallCouponTemplate/queryList_GET'](params)
    },
    { dataFormat: (data) => data.map((item) => ({ ...item, status: getCouponStatusOption(item).value })) }
  )

  return {
    actionRef,
    columns,
    request
  }
}
