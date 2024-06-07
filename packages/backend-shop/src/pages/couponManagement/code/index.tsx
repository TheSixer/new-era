import { ModalForm, ProFormDependency, ProFormDigit, ProFormSelect } from '@ant-design/pro-form'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import OperationsColumns from '@wmeimob/backend-pro/src/components/table/operationsColumns'
import useExport from '@wmeimob/backend-pro/src/hooks/useExport'
import useProTableForm from '@wmeimob/backend-pro/src/hooks/useProTableForm'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import mmFormRule from '@wmeimob/form-rules'
import { ECouponCodeBuildStatus, MCouponCodeBuildStatus } from '@wmeimob/shop-data/coupon/enums/ECouponCodeBuildStatus'
import { ECouponStatus } from '@wmeimob/shop-data/coupon/enums/ECouponStatus'
import { MCouponType } from '@wmeimob/shop-data/coupon/enums/ECouponType'
import { useDebounceFunction } from '@wmeimob/utils/src/hooks/useDebounceFunction'
import { useSuperLock } from '@wmeimob/utils/src/hooks/useSuperLock'
import { Button } from 'antd'
import { MMProColumns } from 'MMProType'
import { FC, memo, useCallback, useMemo, useState } from 'react'
import { history } from 'umi'
import { apiUrl } from '~/config'
import { api, CouponCodeOutputDto, CouponTemplateVo } from '~/request'
import { routeNames } from '~/routes'
import { getCouponUseCondition, getCouponUseExpiredCondition } from '../../../utils/coupon'

interface ICodeProps {}

const Component: FC<ICodeProps> = (props) => {
  const { columns, request, actionRef, formModal, getCouponTemplates, couponOptions, couponTemplates, handleSelectCoupon } = useService(props)

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
          optionRender: (_, __, dom) => [
            ...dom,
            <Button type="primary" key="out" onClick={handleSelectCoupon}>
              选择优惠券并生成优惠码
            </Button>
          ]
        }}
      />

      <ModalForm {...formModal.modalProps}>
        <ProFormSelect
          label="优惠券名称"
          name="templateNo"
          allowClear={false}
          rules={mmFormRule.required}
          options={couponOptions}
          extra="*仅能选择“生效中”状态优惠券"
          fieldProps={{
            showSearch: true,
            placeholder: '输入优惠券名称搜索',
            defaultActiveFirstOption: false,
            showArrow: false,
            filterOption: false,
            onSearch: getCouponTemplates
          }}
        />

        <ProFormDependency name={['templateNo']}>
          {({ templateNo }) => {
            const templateInfo = couponTemplates.find((item) => item.templateNo === templateNo)
            return (
              <ProFormDigit
                label="生成优惠码数量"
                name="num"
                min={1}
                max={templateInfo?.stock}
                rules={mmFormRule.required}
                fieldProps={{ precision: 0, placeholder: '不得超过优惠券剩余数量' }}
                extra="*一个优惠码对应一张优惠券"
              />
            )
          }}
        </ProFormDependency>
      </ModalForm>
    </PageContainer>
  )
}

const Code = memo(Component)
export default Code

const Download: FC<{ id: number }> = (props) => {
  const [exportTable] = useExport(`${apiUrl}/admin/mall/couponCode/export/${props.id}`)
  const [download] = useSuperLock(exportTable)

  return <a onClick={() => download()}>下载</a>
}

function useService(props: ICodeProps) {
  const [couponTemplates, setCouponTemplates] = useState<CouponTemplateVo[]>([])

  const [columns] = useState<MMProColumns<CouponCodeOutputDto>[]>([
    { title: '优惠券编号', dataIndex: 'templateNo', hideInSearch: true },
    { title: '优惠券名称', dataIndex: 'name', hideInSearch: true },
    { title: '优惠券名称', dataIndex: 'couponName', hideInTable: true },
    { title: '优惠券类型', dataIndex: 'couponType', valueType: 'select', valueEnum: MCouponType, hideInSearch: true },
    { title: '满足条件', dataIndex: 'demandPrice', renderText: (_, record) => getCouponUseCondition(record), hideInSearch: true },
    { title: '使用有效期', dataIndex: 'termStart', hideInSearch: true, render: (_, record) => getCouponUseExpiredCondition(record) },
    {
      title: '生成优惠码数量',
      dataIndex: 'quantity',
      hideInSearch: true,
      renderText: (text = 0, record) => (isBuildSuccess(record) ? text : null)
    },
    {
      title: '已核销优惠码数量',
      dataIndex: 'bindQuantity',
      hideInSearch: true,
      renderText: (text = 0, record) => (isBuildSuccess(record) ? text : null)
    },
    { title: '任务状态', dataIndex: 'buildStatus', hideInSearch: true, valueType: 'select', valueEnum: MCouponCodeBuildStatus },
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
              show: isBuildSuccess(record),
              text: <a onClick={() => history.push({ pathname: routeNames.couponManagementCodeDetail, query: { id: `${record.id}` } })}>详情</a>
            },
            { id: 'download', show: isBuildSuccess(record), text: <Download id={record.id!} /> }
          ]}
        />
      )
    }
  ])

  const couponOptions = useMemo(() => couponTemplates.map((item) => ({ label: item.name, value: item.templateNo })), [couponTemplates])

  const { request, actionRef } = useProTableRequest(api['/admin/mall/couponCode_GET'])

  const formModal = useProTableForm({
    title: () => '选择优惠券并生成优惠码',
    modalProps: {
      width: 500,
      modalProps: { destroyOnClose: true },
      onFinish: async (values: any) => {
        try {
          await api['/admin/mall/couponCode_PUT'](values)
          actionRef.current?.reload()
          return true
        } catch (error) {}

        return false
      }
    }
  })

  const isBuildSuccess = (record: CouponCodeOutputDto) => {
    return record.buildStatus === ECouponCodeBuildStatus.Success
  }

  const getCouponTemplates = useDebounceFunction(async (name?: string) => {
    const { data } = await api['/admin/mallCouponTemplate/queryList_GET']({ name, stock: true, status: ECouponStatus.Valid })
    setCouponTemplates(data?.list || [])
  }, 800)

  const handleSelectCoupon = useCallback(() => {
    getCouponTemplates()
    formModal.setVisible(true)
  }, [])

  return {
    columns,
    request,
    actionRef,
    formModal,
    couponOptions,
    couponTemplates,
    getCouponTemplates,
    handleSelectCoupon
  }
}
