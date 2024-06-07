import { FC, memo, useEffect, useRef, useState } from 'react'
import styles from './index.module.less'
import { IDeptManagementProps } from './const'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable, { ProColumns } from '@ant-design/pro-table'
import { Button, Form, message, TreeSelect } from 'antd'
import { api } from '@wmeimob/backend-api'
import { MenuTreeOutputDto, SysUserVo } from '@wmeimob/backend-api/src/request/data-contracts'
import { ModalForm } from '@ant-design/pro-form'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import OperationsColumns from '@wmeimob/backend-pro/src/components/table/operationsColumns'
import useProTableForm from '@wmeimob/backend-pro/src/hooks/useProTableForm'
import { ICoventTree } from '@wmeimob/utils/src/tree/types'
import convertToTree from '@wmeimob/utils/src/tree/convertToTree'
import ProFormLimitInput from '@wmeimob/backend-pro/src/components/form/proFormLimitInput'

const Component: FC<IDeptManagementProps> = (props) => {
  const [columns] = useState<ProColumns<SysUserVo>[]>([
    { title: '部门名称', dataIndex: 'name' },
    // { title: '员工数量', dataIndex: 'userNum', hideInSearch: true }, // FIXME: 这个数量统计有问题
    { title: '创建时间', dataIndex: 'gmtCreated', hideInSearch: true },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 100,
      render: (_, record) => (
        <OperationsColumns
          operations={[
            {
              id: 'edit',
              onClick: () => {
                modalProps.form.setFieldsValue(record)
                eidtId.current = record.id
                setEditData(record)
                setVisible(true)
              }
            },
            {
              id: 'del',
              onClick: async () => {
                await api['/admin/api/sysDept/delete_DELETE']({ id: record.id })
                actionRef.current?.reload()
              }
            }
          ]}
        />
      )
    }
  ])

  const { request: tableRequest, actionRef } = useProTableRequest((params) => api['/admin/api/sysDept/query_GET'](params), { dataFormat: formatData })
  function formatData(data) {
    return data.map((item) => {
      const { children, ...rest } = item
      if (children?.length) {
        return Object.assign(rest, { children: formatData(children) })
      }
      return rest
    })
  }

  const { modalProps, editData, setEditData, setVisible } = useProTableForm()
  const handleFormFinish = async (data) => {
    try {
      if (editData) {
        await api['/admin/api/sysDept/update_PUT']({ ...editData, ...data })
      } else {
        await api['/admin/api/sysDept/add_POST'](data)
      }
      message.success('保存成功')
      setVisible(false)
      actionRef.current?.reload()
    } catch (error) {
      message.error('保存失败')
    }
  }

  const [depts, eidtId] = useDeptService(modalProps.visible)

  return (
    <PageContainer className={styles.deptManagementStyle}>
      <ProTable
        actionRef={actionRef}
        rowKey="id"
        columns={columns}
        request={tableRequest}
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
        <ProFormLimitInput label="部门名称" name="name" rules={[{ required: true }]} />

        <Form.Item label="上级部门" name="pid">
          <TreeSelect defaultValue={0} treeData={depts} />
        </Form.Item>
      </ModalForm>
    </PageContainer>
  )
}

Component.displayName = 'MMDeptManagementPage'

const MMDeptManagementPage = memo(Component)
export default MMDeptManagementPage

function useDeptService(show: boolean) {
  const [depts, setDepts] = useState<ICoventTree<MenuTreeOutputDto>[]>([])

  const eidtId = useRef<number>()

  useEffect(() => {
    if (show) {
      getDepts()
    }
  }, [show])

  function filterById(data: ICoventTree<MenuTreeOutputDto>[], id: any) {
    const newData: ICoventTree<MenuTreeOutputDto>[] = []
    data.forEach((item) => {
      if (item.value !== id) {
        let { children, ...rest } = item
        if (children?.length) {
          children = filterById(children, id)
        }

        newData.push({ ...rest, children })
      }
    })

    return newData
  }

  async function getDepts() {
    const { data = [] } = await api['/admin/api/sysDept/queryAll_GET']()
    let treeData = convertToTree([{ name: '全部', id: 0, pid: 0 } as MenuTreeOutputDto].concat(data), { title: 'name', value: 'id' })

    if (eidtId.current) {
      treeData = filterById(treeData, eidtId.current)
    }
    return setDepts(treeData)
  }

  return [depts, eidtId] as const
}
