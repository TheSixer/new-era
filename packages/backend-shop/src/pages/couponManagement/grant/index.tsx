import { FC, memo, useEffect, useState } from 'react'
import { DrawerForm, ProFormDigit, ProFormSelect } from '@ant-design/pro-form'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable, { ProColumns } from '@ant-design/pro-table'
import { message, Button, Form } from 'antd'
import OperationsColumns from '@wmeimob/backend-pro/src/components/table/operationsColumns'
import useProTableForm from '@wmeimob/backend-pro/src/hooks/useProTableForm'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import { api, CouponRecordOutputDto } from '@wmeimob/backend-api'
import { MCouponType } from '@wmeimob/shop-data/coupon/enums/ECouponType'
import GrantMobile from './components/grantMobile'
import { getCouponUseCondition, getCouponUseExpiredCondition } from '../../../utils/coupon'
import { useSuperLock } from '@wmeimob/utils/src/hooks/useSuperLock'
import { debounce } from 'lodash'
import { downloadStaticFile } from '~/utils/static'
import { history } from 'umi'
import { routeNames } from '~/routes'

interface IGrantProps {}

const Component: FC<IGrantProps> = (props) => {
  const { actionRef, setVisible, columns, request, modalProps, handleFormFinish } = useService()

  const { options, handleSearch } = useCouponSelectService(modalProps.visible)

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
          optionRender: (searchConfig, formProps, dom) => [
            ...dom,
            <Button
              type="primary"
              key="out"
              onClick={() => {
                setVisible(true)
              }}
            >
              选择优惠券并发放
            </Button>
          ]
        }}
      />

      <DrawerForm {...modalProps} onFinish={handleFormFinish}>
        <ProFormSelect
          label="优惠券名称"
          name="templateNo"
          options={options}
          fieldProps={{
            showSearch: true,
            placeholder: '输入优惠券名称搜索',
            defaultActiveFirstOption: false,
            showArrow: false,
            filterOption: false,
            onSearch: handleSearch
          }}
          rules={[{ required: true }]}
        />

        <ProFormDigit label="发放数量" name="num" extra="数量为人均发放数量" rules={[{ required: true }]} fieldProps={{ precision: 0, min: 1, max: 9999 }} />

        <Form.Item
          label="发放人群"
          name="mobiles"
          rules={[
            {
              required: true,
              validator: (_r, value) => {
                if (!value || !value.length) {
                  return Promise.reject(new Error(`请至少添加一个有效的手机号`))
                }
                return Promise.resolve(true)
              }
            }
          ]}
        >
          <GrantMobile onTemplateDownload={() => downloadStaticFile('templates/优惠券_手机号导入模板.xlsx')} />
        </Form.Item>
      </DrawerForm>
    </PageContainer>
  )
}

Component.displayName = 'CouponGrantPage'

const CouponGrantPage = memo(Component)
export default CouponGrantPage

function useService() {
  const [columns] = useState<ProColumns<CouponRecordOutputDto>[]>([
    {
      title: '优惠券名称',
      dataIndex: 'name',
      formItemProps: { label: '', labelCol: { span: 0 }, colon: false },
      fieldProps: { placeholder: '输入优惠券名称' }
    },
    { title: '优惠券类型', dataIndex: 'couponType', hideInSearch: true, valueEnum: MCouponType },
    { title: '满足条件', dataIndex: 'demandPrice', hideInSearch: true, render: (_, record) => getCouponUseCondition(record) },
    {
      title: '使用有效期',
      dataIndex: 'termEnd',
      hideInSearch: true,
      render: (_, record) => getCouponUseExpiredCondition(record)
    },
    { title: '发放数量（人均）', dataIndex: 'num', hideInSearch: true },
    { title: '发放时间', dataIndex: 'gmtCreated', hideInSearch: true },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      width: 100,
      render: (_, record) => (
        <OperationsColumns
          operations={[
            {
              id: 'detail',
              text: <a onClick={() => history.push({ pathname: routeNames.couponManagementGrantDetail, search: `?id=${record.id}` })}>发放详情</a>
            }
          ]}
        />
      )
    }
  ])

  const { request, actionRef } = useProTableRequest((params) => api['/admin/mall/coupon/list_POST'](params))

  const { modalProps, setVisible } = useProTableForm({ title: () => '选择优惠券并发放' })

  const [handleFormFinish] = useSuperLock(async (data) => {
    try {
      await api['/admin/mall/coupon/receive_POST'](data)
      message.success('操作成功 请在发放详情中查看发放明细')
      setVisible(false)
      actionRef.current?.reload()
    } catch (error) {
      // message.error('发放失败')
    }
  })

  return {
    setVisible,
    actionRef,
    columns,
    request,
    modalProps,
    handleFormFinish
  }
}

/** 选择优惠券 */
function useCouponSelectService(visible: boolean) {
  const [options, setOptions] = useState<any[]>([])

  const request = async (name?: string) => {
    const { data = {} } = await api['/admin/mallCouponTemplate/queryList_GET']({ pageNum: 1, pageSize: 100, name, status: 3 })
    const { list = [] } = data
    setOptions(list.map((it) => ({ label: it.name, value: it.templateNo })))
  }

  const handleSearch = debounce((value: string) => {
    request(value)
  }, 200)

  useEffect(() => {
    if (visible) {
      request()
    } else {
      setOptions([])
    }
  }, [visible])

  return {
    options,
    handleSearch
  }
}
