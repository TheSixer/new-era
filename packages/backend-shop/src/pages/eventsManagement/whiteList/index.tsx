import { FC, memo, useState } from 'react'
import styles from './index.module.less'
import { IListProps } from './const'
import OperationsColumns from '@wmeimob/backend-pro/src/components/table/operationsColumns'
import ProTable, { ProColumns } from '@ant-design/pro-table'
import { PageContainer } from '@ant-design/pro-layout'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import { ActivityWhiteCreateInputDto, api } from '~/request'
import { Button, Input, message } from 'antd'
import useProTableForm from '@wmeimob/backend-pro/src/hooks/useProTableForm'
import { ModalForm } from '@ant-design/pro-form'
import ProFormLimitInput from '@wmeimob/backend-pro/src/components/form/proFormLimitInput'
import { EJumpType } from '~/components/jumpType/enums/EJumpType'

const Component: FC<IListProps> = (props) => {
  const editModal = useProTableForm<ActivityWhiteCreateInputDto>()

  const [columns] = useState<ProColumns<ActivityWhiteCreateInputDto>[]>([
    {
      dataIndex: 'name',
      hideInTable: true,
      formItemProps: { labelCol: { span: 0 }, colon: false },
      renderFormItem: () => {
        return <Input placeholder="姓名/手机号" maxLength={20} allowClear />
      }
    },
    { title: '姓名', dataIndex: 'name', hideInSearch: true },
    { title: '手机号', dataIndex: 'mobile', hideInSearch: true },
    { title: '创建时间', dataIndex: 'gmtCreate', hideInSearch: true },
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
                    await api['/admin/mall/activityWhite/delete/{id}_DELETE'](record.id!)
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

  const { request, actionRef } = useProTableRequest(api['/admin/mall/activityWhite/queryList_GET'])

  async function handleEditFormFinish(values: ActivityWhiteCreateInputDto) {
    const isAdd = !editModal.editData?.id

    const params = {
      ...values,
      id: editModal.editData?.id
    }

    try {
      isAdd ? await api['/admin/mall/activityWhite/add_POST'](params) : await api['/admin/mall/activityWhite/update_PUT'](params)

      actionRef.current?.reload()
      message.success(isAdd ? '添加成功' : '修改成功')

      return true
    } catch {}

    return false
  }

  /** 弹窗 */
  const modal = (
    <ModalForm<ActivityWhiteCreateInputDto>
      {...editModal.modalProps}
      width={600}
      title={`白名单${editModal.editData?.id?'编辑':'新增'}`}
      layout="horizontal"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ url: { type: EJumpType.None, content: {} } }}
      onFinish={handleEditFormFinish}
    >
      <ProFormLimitInput label="姓名" name="name" rules={[{ required: true }]} maxLength={20} />

      <ProFormLimitInput label="手机号" name="mobile" rules={[{ required: true }, { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }]} maxLength={11} />

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
