import { FC, memo, useEffect, useRef, useState } from 'react'
import styles from './index.module.less'
import { IEmployeeManagementProps } from './const'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table'
import { Button, message, Modal, Alert, Space } from 'antd'
import { ModalForm, ProFormSelect } from '@ant-design/pro-form'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import OperationsColumns from '@wmeimob/backend-pro/src/components/table/operationsColumns'
import useProTableForm from '@wmeimob/backend-pro/src/hooks/useProTableForm'
import ProFormEmail from '@wmeimob/backend-pro/src/components/form/proFormEmail'
import ProFormMobile from '@wmeimob/backend-pro/src/components/form/proFormMobile'
import useExport from '@wmeimob/backend-pro/src/hooks/useExport'
import ProFormLimitInput from '@wmeimob/backend-pro/src/components/form/proFormLimitInput'
import Clipboard from '@wmeimob/backend-pro/src/components/clipboard'
import { api } from '@wmeimob/backend-api'
import { SysUserVo, LoginOutputDto } from '@wmeimob/backend-api/src/request/data-contracts'
import { getGlobalData } from '@wmeimob/backend-store'

const Component: FC<IEmployeeManagementProps> = (props) => {
  const [columns] = useState<ProColumns<SysUserVo>[]>([
    { title: '用户名称', dataIndex: 'username' },
    { title: '联系电话', dataIndex: 'mobile', hideInSearch: true },
    { title: '用户邮箱', dataIndex: 'email', hideInSearch: true },
    // { title: '所属部门', dataIndex: 'deptNames', hideInSearch: true },
    { title: '角色', dataIndex: 'roleNames', hideInSearch: true },
    { title: '创建时间', dataIndex: 'gmtCreated', hideInSearch: true },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        const isDisable = record.status === 1
        return (
          <OperationsColumns
            operations={[
              {
                id: 'edit',
                onClick: () => {
                  // 这里忽略deptIds. 在ProFormTreeSelect中需要重新组装数据
                  const { deptIds, ...rest } = record
                  modalProps.form.setFieldsValue(rest)
                  setEditData(record)
                  setVisible(true)
                }
              },
              {
                id: 'del',
                onClick: async () => {
                  await api['/admin/api/sysUser/delete_DELETE']({ id: record.id })
                  actionRef.current?.reload()
                }
              },
              {
                id: 'rest',
                text: (
                  <a
                    onClick={() => {
                      Modal.confirm({
                        title: '重置密码',
                        content: `确认重置用户${record.username}的密码?`,
                        onOk: async () => {
                          try {
                            const { data = {} } = await api['/admin/api/sysUser/resetDefault_DELETE']({ id: record.id as any })
                            setAccount({ ...data, type: 'change' })
                            setVisible(true)
                          } catch (error) {
                            message.success('重置失败')
                          }
                          Modal.destroyAll()
                        }
                      })
                    }}
                  >
                    重置密码
                  </a>
                )
              },
              {
                id: 'disableStatus',
                text: <a onClick={() => handleToggleMemberStatus(record)}>{isDisable ? '禁用' : '解禁'}</a>
              }
            ]}
          />
        )
      }
    }
  ])
  const [account, setAccount] = useState<LoginOutputDto & { type?: 'change' }>({})

  function handleToggleMemberStatus(record: SysUserVo) {
    const isDisable = record.status === 1
    const text = isDisable ? '禁用' : '解禁'
    Modal.confirm({
      title: text,
      content: `确认${text}用户${record.username}?`,
      onOk: async () => {
        await api['/admin/api/sysUser/changeStatus_POST']({ id: record.id, status: isDisable ? 0 : 1 })
        actionRef.current?.reload()
      }
    })
  }

  const { request, params, actionRef } = useProTableRequest((params) => api['/admin/api/sysUser/query_GET'](params), {
    dataFormat: (data) =>
      data.map((item) => {
        const { deptIds, roleIds, ...rest } = item
        return { ...rest, deptIds: deptIds ? JSON.parse(deptIds) : [], roleIds: roleIds ? JSON.parse(roleIds) : [] }
      })
  })

  const { modalProps, editData, setEditData, setVisible } = useProTableForm()
  const handleFormFinish = async (data) => {
    if (account.password) {
      setVisible(false)
      return
    }
    try {
      let { deptIds, ...rest } = data
      if (deptIds) {
        deptIds = deptIds.map((item) => item.value)
      }
      const saveData = { ...editData, ...rest, roleIds: data.roleIds, deptIds }
      if (editData) {
        await api['/admin/api/sysUser/update_PUT'](saveData)
        setVisible(false)
        message.success('保存成功')
      } else {
        const { data = {} } = await api['/admin/api/sysUser/add_POST'](saveData)
        setAccount(data)
      }
      actionRef.current?.reload()
    } catch (error) {
      message.error('保存失败')
    }
  }

  useEffect(() => {
    if (!modalProps.visible) {
      setAccount({})
    }
  }, [modalProps.visible])

  const [exportTable, loading] = useExport(`${getGlobalData('apiUrl')}/admin/api/sysUser/export`)

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
            <Button key="export" loading={loading} onClick={() => exportTable(params.current)}>
              导出
            </Button>,
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

      <ModalForm {...modalProps} modalProps={{ closable: false }} onFinish={handleFormFinish}>
        {!account.password ? (
          <>
            <ProFormMobile
              label="登录账号(手机号码)"
              name="mobile"
              rules={[{ required: true }]}
              disabled={!!editData}
              fieldProps={{ placeholder: '请输入登录账号(用户手机)' }}
            />

            <ProFormLimitInput label="用户名称" name="username" rules={[{ required: true }]} maxLength={12} />

            <ProFormEmail label="用户邮箱" name="email" rules={[{ required: true }]} />

            {/* 部门选择 -- 默认不提供 */}
            {/* <ProFormTreeSelect
              label="部门"
              name="deptIds"
              // rules={[{ required: true }]}
              request={async () => {
                const { data = [] } = await api['/admin/api/sysDept/queryAll_GET']()
                const treeData = convertToTree(data, { title: 'name', value: 'id' })
                // 重组deptids
                const fTree = flatTreeData(treeData)
                if (editData && editData.deptIds) {
                  const deptIds = (editData.deptIds as unknown as number[])
                    .map((id) => {
                      const item = fTree.find((item) => item.value === id)
                      return item ? { label: item.title, value: id } : undefined
                    })
                    .filter((it) => !!it)
                  modalProps.form.setFieldsValue({ deptIds })
                }

                return treeData
              }}
              fieldProps={{
                treeDefaultExpandAll: true,
                treeCheckable: true,
                showCheckedStrategy: TreeSelect.SHOW_ALL,
                treeCheckStrictly: true
              }}
            /> */}

            <ProFormSelect
              label="角色"
              name="roleIds"
              rules={[{ required: true }]}
              fieldProps={{ mode: 'multiple' }}
              request={async () => {
                const { data = [] } = await api['/admin/api/sysRole/queryAll_GET']({})
                return data.map((item) => ({ label: item.name || '', value: item.id }))
              }}
            />
          </>
        ) : (
          <Alert
            message={account.type === 'change' ? `密码修改成功,请妥善保存账户密码` : `账户创建成功,请妥善保存账户密码`}
            description={
              <div>
                <Space>
                  <span>账户:</span>
                  <span>{account.username}</span>
                  <span>密码:</span>
                  <span>{account.password}</span>

                  <Clipboard
                    text={`账号: ${account.username} 密码: ${account.password}`}
                    onSuccess={() => {
                      message.success('账户密码已复制')
                    }}
                  >
                    点此复制
                  </Clipboard>
                </Space>
              </div>
            }
            type="info"
            showIcon
          />
        )}
      </ModalForm>
    </PageContainer>
  )
}

Component.displayName = 'MMEmployeeManagementPage'

const MMEmployeeManagementPage = memo(Component)
export default MMEmployeeManagementPage
