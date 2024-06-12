import { FC, memo, useState } from 'react'
import styles from './index.module.less'
import { IEditFormValues, IListProps } from './const'
import OperationsColumns from '@wmeimob/backend-pro/src/components/table/operationsColumns'
import ProTable, { ProColumns } from '@ant-design/pro-table'
import { PageContainer } from '@ant-design/pro-layout'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import { TagOutputDto, api } from '~/request'
import { Button, message } from 'antd'
import useProTableForm from '@wmeimob/backend-pro/src/hooks/useProTableForm'
import { ModalForm, ProFormRadio } from '@ant-design/pro-form'
import ProFormLimitInput from '@wmeimob/backend-pro/src/components/form/proFormLimitInput'
import mmFormRule from '@wmeimob/form-rules'

const Component: FC<IListProps> = (props) => {
  const editModal = useProTableForm<TagOutputDto>()

  const [columns] = useState<ProColumns<TagOutputDto>[]>([
    { title: '序号', dataIndex: 'index', hideInSearch: true, render: (_, __, index) => index + 1 },
    { title: '标签名称', dataIndex: 'name', fieldProps: () => ({ placeholder: '输入标签名称' }) },
    { title: '特殊用户标签', dataIndex: 'special', hideInSearch: true, render: (_, entity) => <>{entity.special? '是' : '否'}</> },
    { title: '创建时间', dataIndex: 'gmtCreated', hideInSearch: true },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        return (
          <OperationsColumns
            operations={[
              {
                id: 'edit',
                onClick: async () => {
                  editModal.setVisible(true)
                  editModal.setEditData(record)
                  editModal.modalProps.form.setFieldsValue({
                    ...record,
                    special: record.special ? 1 : 0
                  })
                }
              },
              {
                id: 'del',
                onClick: async () => {
                  try {
                    await api['/admin/mall/tag/delete/{id}_DELETE'](record.id!)
                    message.success('删除成功')
                    actionRef.current?.reload()
                  } catch (error) {}
                }
              }
            ]}
          />
        )
      }
    }
  ])

  const { request, actionRef } = useProTableRequest(api['/admin/mall/tag/queryList_GET'])

  async function handleEditFormFinish(values: TagOutputDto) {
    const isAdd = !editModal.editData?.id

    const params = {
      ...values,
      id: editModal.editData?.id
    }

    try {
      isAdd ? await api['/admin/mall/tag/add_POST'](params) : await api['/admin/mall/tag/update_PUT'](params)

      actionRef.current?.reload()
      message.success(isAdd ? '添加成功' : '修改成功')

      return true
    } catch {}

    return false
  }

  /** 弹窗 */
  const modal = (
    <ModalForm<IEditFormValues>
      {...editModal.modalProps}
      width={600}
      title={`用户标签${editModal.editData?.id?'编辑':'新增'}`}
      layout="horizontal"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ special: 1 }}
      onFinish={handleEditFormFinish}
    >
      <ProFormLimitInput label="用户标签" name="name" rules={[{ required: true }]} maxLength={20} />

      <ProFormRadio.Group
        label="特殊用户"
        name="special"
        options={[{label: '是', value: 1}, {label: '否', value: 0}]}
        rules={mmFormRule.required}
      />
    </ModalForm>
  )

  return (
    <PageContainer className={styles.employeeManagementStyle}>
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
                editModal.modalProps.form.resetFields()
                editModal.setEditData(undefined)
                editModal.setVisible(true)
              }}
            >
              新增
            </Button>
          ]
        }}
      />

      {modal}
    </PageContainer>
  )
}

Component.displayName = 'List'

const List = memo(Component)
export default List
