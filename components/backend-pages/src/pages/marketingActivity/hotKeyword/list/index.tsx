import { ModalForm, ProFormDigit, ProFormTextArea } from '@ant-design/pro-form'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable, { ProColumns } from '@ant-design/pro-table'
import MaterialSelect from '../../../../components/material/components/materialSelect'
import { MaterialType } from '../../../../components/material/const'
import OperationsColumns from '@wmeimob/backend-pro/src/components/table/operationsColumns'
import StatusSwitchColumn from '@wmeimob/backend-pro/src/components/table/statusSwitchColumn'
import useProTableForm from '@wmeimob/backend-pro/src/hooks/useProTableForm'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import { Button, Form, message } from 'antd'
import { FC, memo, useState } from 'react'
import { EJumpType } from '@wmeimob/backend-pro/src/components/jumpType/enums/EJumpType'
import ProFormLimitInput from '@wmeimob/backend-pro/src/components/form/proFormLimitInput'
import ProFormJumpType from '@wmeimob/backend-pro/src/components/form/proFormJumpType'
import { api } from '@wmeimob/backend-api'
import { HotKeywordDto } from '@wmeimob/backend-api/src/request/data-contracts'
import { IEditFormValues, IListProps } from './const'
import styles from './index.module.less'

const Component: FC<IListProps> = (props) => {
  const editModal = useProTableForm<HotKeywordDto>()

  const [columns] = useState<ProColumns<HotKeywordDto>[]>([
    { title: '热门搜索词', dataIndex: 'hotKeyword', fieldProps: () => ({ placeholder: '请输入热门搜索词' }) },
    { title: '搜索词说明', dataIndex: 'hotKeywordDescription', hideInSearch: true },
    { title: '更新时间', dataIndex: 'gmtModified', hideInSearch: true },
    { title: '排序值', dataIndex: 'sort', hideInSearch: true, valueType: 'digit' },
    {
      title: '前端显示',
      dataIndex: 'show',
      width: 100,
      hideInSearch: true,
      render: (__, record) => (
        <StatusSwitchColumn
          checked={record.show}
          checkedChildren="显示"
          unCheckedChildren="隐藏"
          onSwitch={async (status) => {
            try {
              await api['/admin/hotKeyword/{id}/show_PUT'](record.id!, { show: status })
              actionRef.current?.reload()
              message.success('切换成功')
            } catch (error) {}
          }}
        />
      )
    },
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
                    url: record.url ? JSON.parse(record.url) : {}
                  })
                }
              },
              {
                id: 'del',
                onClick: async () => {
                  try {
                    await api['/admin/hotKeyword/{id}_DELETE'](record.id!)
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

  const { request, actionRef } = useProTableRequest(api['/admin/hotKeyword_GET'])

  async function handleEditFormFinish(values: IEditFormValues) {
    const isAdd = !editModal.editData?.id

    const params = {
      ...values,
      show: editModal.editData?.show ?? true, // 默认显示
      url: JSON.stringify(values.url)
    }

    try {
      isAdd ? await api['/admin/hotKeyword_POST'](params) : await api['/admin/hotKeyword/{id}_PUT'](editModal.editData!.id!, params)

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
      title="搜索词编辑"
      layout="horizontal"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ url: { type: EJumpType.None, content: {} } }}
      onFinish={handleEditFormFinish}
    >
      <ProFormLimitInput label="热门搜索词" name="hotKeyword" rules={[{ required: true }]} maxLength={20} />
      <Form.Item label="选择热词icon" name="icon">
        <MaterialSelect multiple={false} type={MaterialType.Image} maxLength={1} repeatTip measure={20} />
      </Form.Item>
      <ProFormJumpType label="配置跳转链接" name="url" extra="*不配置跳转链接默认搜索热词" />
      <ProFormDigit label="热门排序值" name="sort" min={0} max={9999} fieldProps={{ precision: 0 }} />
      <ProFormTextArea label="搜索词说明" name="hotKeywordDescription" fieldProps={{ maxLength: 50 }} />
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
                editModal.setEditData({})
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

Component.displayName = 'MMHotKeywordListPage'

const MMHotKeywordListPage = memo(Component)
export default MMHotKeywordListPage
