import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import { DrawerForm, ProFormTextArea } from '@ant-design/pro-form'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable, { ProColumns } from '@ant-design/pro-table'
import { Button, message, Tree } from 'antd'
import { FC, memo, useState } from 'react'
import useAuthTree from './useAuthTree'
import OperationsColumns from '@wmeimob/backend-pro/src/components/table/operationsColumns'
import useProTableForm from '@wmeimob/backend-pro/src/hooks/useProTableForm'
import ProFormLimitInput from '@wmeimob/backend-pro/src/components/form/proFormLimitInput'
import ProFormInfo from '@wmeimob/backend-pro/src/components/form/proFormInfo'
import { api } from '@wmeimob/backend-api'
import { SysRoleOutputDto } from '@wmeimob/backend-api/src/request/data-contracts'

const Component: FC = (props) => {
  const [columns] = useState<ProColumns<SysRoleOutputDto>[]>([
    { title: '角色名称', dataIndex: 'name' },
    { title: '员工数量', dataIndex: 'userNum', hideInSearch: true },
    { title: '创建时间', dataIndex: 'gmtCreated', hideInSearch: true, hideInForm: true },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <OperationsColumns
          operations={[
            {
              id: 'edit',
              onClick: () => {
                setEditData(record)
                setVisible(true)
              }
            },
            {
              id: 'del',
              onClick: async () => {
                await api['/admin/api/sysRole/delete_DELETE']({ id: record.id })
                actionRef.current?.reload()
              }
            }
          ]}
        />
      )
    }
  ])
  const [params, setParams] = useState<Record<string, any>>({})

  const { request, actionRef } = useProTableRequest((params) => api['/admin/api/sysRole/query_GET'](params))

  const { modalProps, editData, setEditData, setVisible } = useProTableForm()
  const { treeData, checkedMenus, handleMenusCheck } = useAuthTree({ data: editData, visible: modalProps.visible, form: modalProps.form })

  const handleFormFinish = async (value) => {
    const resourceIds: number[] = [...checkedMenus.checked, ...checkedMenus.halfChecked]
    try {
      if (editData) {
        await api['/admin/api/sysRole/update_PUT']({ ...editData, ...value, resourceIds })
      } else {
        await api['/admin/api/sysRole/add_POST']({ ...value, resourceIds })
      }
      message.success('保存成功')
      setVisible(false)
      actionRef.current?.reload()
    } catch (error) {
      message.error('保存失败')
    }
  }

  return (
    <PageContainer>
      <ProTable
        actionRef={actionRef}
        columns={columns}
        search={false}
        params={params}
        rowKey="id"
        request={request}
        toolbar={{
          search: {
            placeholder: '请输入角色名称',
            onSearch: (name = '') => {
              setParams((pre) => ({ ...pre, name }))
            }
          },
          actions: [
            <Button key="add" type="primary" onClick={() => setVisible(true)}>
              添加
            </Button>
          ]
        }}
      />

      <DrawerForm {...modalProps} width={400} onFinish={handleFormFinish}>
        <ProFormInfo name="authority" label="权限编码" info="系统生成" />

        <ProFormLimitInput name="name" label="角色名称" rules={[{ required: true }]} maxLength={12} />

        <ProFormTextArea name="description" label="描述" fieldProps={{ maxLength: 255 }} />

        {!!treeData.length && <Tree checkedKeys={checkedMenus} treeData={treeData} checkable defaultExpandAll height={500} onCheck={handleMenusCheck} />}
      </DrawerForm>
    </PageContainer>
  )
}

Component.displayName = 'MMRoleManagementPage'

const MMRoleManagementPage = memo(Component)
export default MMRoleManagementPage
