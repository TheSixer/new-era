import { FC, memo, useState } from 'react'
import styles from './index.module.less'
import { IEditFormValues, IListProps } from './const'
import OperationsColumns from '@wmeimob/backend-pro/src/components/table/operationsColumns'
import ProTable, { ProColumns } from '@ant-design/pro-table'
import { PageContainer } from '@ant-design/pro-layout'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import { api } from '~/request'
import { Button, message } from 'antd'
import useProTableForm from '@wmeimob/backend-pro/src/hooks/useProTableForm'
import { ModalForm } from '@ant-design/pro-form'
import ProFormLimitInput from '@wmeimob/backend-pro/src/components/form/proFormLimitInput'
import { EventTypeDto } from '@wmeimob/backend-api'
import { EJumpType } from '~/components/jumpType/enums/EJumpType'

const Component: FC<IListProps> = (props) => {
  const editModal = useProTableForm<EventTypeDto>()

  const [columns] = useState<ProColumns<EventTypeDto>[]>([
    { title: '类型id', dataIndex: 'id', hideInSearch: true },
    { title: '活动类型', dataIndex: 'name', fieldProps: () => ({ placeholder: '输入活动类型' }) },
    { title: '创建时间', dataIndex: 'gmtModified', hideInSearch: true },
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
                    ...record
                  })
                }
              },
              {
                id: 'del',
                onClick: async () => {
                  try {
                    await api['/admin/mall/activityClassify/delete/{id}_DELETE'](record.id!)
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

  const { request, actionRef } = useProTableRequest(api['/admin/mall/activityClassify/queryList_GET'])

  async function handleEditFormFinish(values: IEditFormValues) {
    const isAdd = !editModal.editData?.id

    const params = {
      ...values,
      id: editModal.editData?.id
    }

    try {
      isAdd ? await api['/admin/mall/activityClassify/add_POST'](params) : await api['/admin/mall/activityClassify/update_PUT'](params)

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
      title={`活动类型${editModal.editData?.id?'编辑':'新增'}`}
      layout="horizontal"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ url: { type: EJumpType.None, content: {} } }}
      onFinish={handleEditFormFinish}
    >
      <ProFormLimitInput label="活动类型名称" name="name" rules={[{ required: true }]} maxLength={20} />
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
