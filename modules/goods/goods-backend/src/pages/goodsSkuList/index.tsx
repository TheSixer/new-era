import { ModalForm, ProFormDigit } from '@ant-design/pro-form'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable, { ProColumns } from '@ant-design/pro-table'
import { api, GoodsSpecOutputDto } from '@wmeimob/backend-api'
import ProFormLimitInput from '@wmeimob/backend-pro/src/components/form/proFormLimitInput'
import OperationsColumns from '@wmeimob/backend-pro/src/components/table/operationsColumns'
import useProTableForm from '@wmeimob/backend-pro/src/hooks/useProTableForm'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import { concatRule } from '@wmeimob/form-rules'
import { Button, message } from 'antd'
import { FC, memo, useState } from 'react'

interface IGoodsSkuListProps {
  service: ReturnType<typeof useService>
}

const Component: FC<IGoodsSkuListProps> = (props) => {
  const { actionRef, columns, request, modalProps, setVisible, handleFormFinish } = props.service

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
              新增
            </Button>
          ]
        }}
      />

      <ModalForm {...modalProps} onFinish={handleFormFinish}>
        <ProFormLimitInput label="规格名称" name="specName" rules={concatRule(['required', 'emoji'])} maxLength={12} />

        <ProFormDigit label="排序值" name="sort" min={1} max={10000} fieldProps={{ precision: 0 }} rules={[{ required: true, message: '请输入排序值' }]} />
      </ModalForm>
    </PageContainer>
  )
}

Component.displayName = 'GoodSkuList'

const GoodSkuList = memo(Component)
export default GoodSkuList

interface IUseServiceProps {
  /** 父规格id */
  pid?: string

  /** 点击子规格管理 */
  onChildSkuClick?(data: GoodsSpecOutputDto): void
}

/**
 * 业务hook
 */
export function useService(props: IUseServiceProps) {
  const { pid } = props
  const isChildSku = !!pid // 是否是子规格

  const [columns] = useState<ProColumns<GoodsSpecOutputDto>[]>([
    { title: (isChildSku ? '子' : '') + '规格ID', dataIndex: 'id', hideInSearch: true },
    { title: (isChildSku ? '子' : '') + '规格名称', dataIndex: 'specName' },
    { title: '子规格数量', dataIndex: 'childrenNum', hideInSearch: true, hideInTable: isChildSku },
    { title: '排序值', dataIndex: 'sort', hideInSearch: true },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 200,
      render: (_, record) => (
        <OperationsColumns
          operations={[
            {
              id: 'edit',
              onClick: () => {
                setEditData(record)
                modalProps.form.setFieldsValue(record)
                setVisible(true)
              }
            },
            {
              id: 'del',
              onClick: async () => {
                await api['/admin/mall/spec/delete/{id}_DELETE'](record.id as any)
                actionRef.current?.reload()
              }
            },
            {
              id: 'custom',
              show: !isChildSku,
              text: <a onClick={() => props.onChildSkuClick?.(record)}>子规格管理</a>
            }
          ]}
        />
      )
    }
  ])

  const { request, actionRef } = useProTableRequest((params) => api['/admin/mall/spec/query_GET']({ ...params, pid }))

  const { modalProps, editData, setEditData, setVisible } = useProTableForm()
  const handleFormFinish = async (data) => {
    try {
      const saveData = { ...editData, ...data, pid: pid ?? 0 }
      if (editData) {
        await api['/admin/mall/spec/update_PUT'](saveData)
      } else {
        await api['/admin/mall/spec/add_POST'](saveData)
      }
      message.success('保存成功')
      setVisible(false)
      actionRef.current?.reload()
    } catch (error) {
      message.error('保存失败')
    }
  }

  return {
    modalProps,
    setVisible,
    actionRef,
    columns,
    request,
    handleFormFinish
  }
}
