import { FC, memo, useEffect, useState } from 'react'
import styles from './index.module.less'
import { ICustomerListProps, IEditFormValues } from './const'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable, { ProColumns } from '@ant-design/pro-table'
import { Button, Input, Modal, message, Form } from 'antd'
import OperationsColumns from '@wmeimob/backend-pro/src/components/table/operationsColumns'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import { api } from '~/request'
import { MemberInfoPageVo } from '@wmeimob/backend-api'
import { ECustomerStatus, OCustomerStatus } from '~/enums/customer/ECustomerStatus'
import { apiUrl } from '~/config'
import useProTableForm from '@wmeimob/backend-pro/src/hooks/useProTableForm'
import { ModalForm, ProFormDateRangePicker, ProFormSelect } from '@ant-design/pro-form'
import ProFormInfo from '@wmeimob/backend-pro/src/components/form/proFormInfo'
import dayjs from 'dayjs'

const Component: FC<ICustomerListProps> = (props) => {
  const editModal = useProTableForm<IEditFormValues>()
  const { options } = useTagsService()

  useEffect(() => {
    options.length > 0 &&
      setColumns((pre) => [...pre.slice(0, 1), { title: '标签', dataIndex: 'tagId', valueType: 'select', hideInTable: true, fieldProps: () => ({ options }) }, ...pre.slice(1)])
  }, [options])

  const [columns, setColumns] = useState<ProColumns<MemberInfoPageVo>[]>([
    {
      dataIndex: 'beginTime',
      hideInTable: true,
      formItemProps: { labelCol: { span: 0 }, colon: false },
      renderFormItem: () => {
        return <ProFormDateRangePicker label="注册时间" placeholder={['开始时间', '结束时间']} />
      }
    },
    {
      dataIndex: 'searchString',
      hideInTable: true,
      formItemProps: { labelCol: { span: 0 }, colon: false },
      renderFormItem: () => {
        return <Form.Item label="关键字">
          <Input placeholder="用户名称/手机号/id" maxLength={20} allowClear />
        </Form.Item>
      }
    },
    { title: '用户id', dataIndex: 'id', hideInSearch: true },
    { title: '用户昵称', dataIndex: 'nickName', hideInSearch: true },
    { title: '用户手机号', dataIndex: 'mobile', hideInSearch: true },
    // { title: '用户openid', dataIndex: 'openId', hideInSearch: true },
    { title: '当前积分', dataIndex: 'availableScore', valueType: 'digit', hideInSearch: true, renderText: (value?: number) => value || 0 },
    { title: '标签', dataIndex: 'tagNames', hideInSearch: true },
    { title: '注册来源', dataIndex: 'registerSource', hideInSearch: true },
    { title: '注册时间', dataIndex: 'registerDate', valueType: 'date', hideInSearch: true },
    // { title: '会员状态', dataIndex: 'memberType', valueType: 'select', valueEnum: MMemberType },
    // { title: '累计积分', dataIndex: 'totalScore', valueType: 'digit', hideInSearch: true, renderText: (value?: number) => value || 0 },
    // { title: '可用积分', dataIndex: 'availableScore', valueType: 'digit', hideInSearch: true, renderText: (value?: number) => value || 0 },
    {
      title: '账户状态',
      dataIndex: 'status',
      valueType: 'select',
      fieldProps: () => ({ options: OCustomerStatus }),
      width: 80
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 150,
      fixed: 'right',
      render: (_, record) => {
        const isDisable = record.status === ECustomerStatus.Disabled
        return (
          <OperationsColumns
            operations={[
              {
                id: 'disableStatus',
                text: <a onClick={() => handleToggleMemberStatus(record)}>{isDisable ? '解除禁用' : '禁用'}</a>
              },
              {
                id: 'signal',
                text: (
                  <a
                    onClick={() => {
                      editModal.setVisible(true)
                      editModal.setEditData({
                        type: 0,
                        userIds: [record?.id || ''],
                        tags: record.tagNames || '无',
                        tagNames: record?.tagId?.split?.(',') || []
                      })
                      editModal.modalProps.form.setFieldsValue({
                        ...record
                      })
                    }}
                  >
                    标签
                  </a>
                )
              }
            ]}
          />
        )
      }
    }
  ])

  function handleToggleMemberStatus(record: MemberInfoPageVo) {
    const { status, nickName, id } = record
    const isDisable = status === ECustomerStatus.Disabled
    const title = isDisable ? '解禁' : '禁用'
    Modal.confirm({
      title,
      content: `确认${title}用户${nickName}?`,
      onOk: async () => {
        await api['/admin/api/member/changeStatus_POST']({
          id,
          status: status === ECustomerStatus.Disabled ? ECustomerStatus.Enabled : ECustomerStatus.Disabled
        })
        actionRef.current?.reload()
      }
    })
  }

  const { request, exportLoading, exportTable, actionRef } = useProTableRequest(
    (params) =>
      api['/admin/api/member/query_GET'](params),
    {
      exportUrl: `${apiUrl}/admin/api/member/export`,
      paramsFormat: (params) => ({
        ...params,
        beginTime: params?.beginTime ? dayjs(params?.beginTime?.[0]).format('YYYY-MM-DD') + ' 00:00:00' : '',
        endTime: params?.beginTime ? dayjs(params?.beginTime?.[1]).format('YYYY-MM-DD') + ' 23:59:59' : ''
      })
    }
  )

  async function handleEditFormFinish(values: IEditFormValues) {
    const params = {
      ...values,
      type: 1,
      userIds: editModal.editData?.userIds
    }

    try {
      await api['/admin/api/member/tag_POST'](params)
      message.success('修改成功')
      actionRef.current?.reload()

      return true
    } catch {}

    return false
  }

  /** 弹窗 */
  const modal = (
    <ModalForm<IEditFormValues>
      {...editModal.modalProps}
      width={600}
      title="标签"
      layout="horizontal"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      onFinish={handleEditFormFinish}
    >
      <ProFormInfo label="现有标签" info={editModal.editData?.tags || '无'} />

      <ProFormSelect label="选择标签" name="tagIds" mode="multiple" options={options} rules={[{ required: true, message: '请选择标签' }]} />
    </ModalForm>
  )

  return (
    <PageContainer className={styles.deptManagementStyle}>
      <ProTable
        actionRef={actionRef}
        rowKey="id"
        columns={columns}
        request={request}
        scroll={{ x: 1000 }}
        search={{
          defaultCollapsed: false,
          labelWidth: 'auto',
          optionRender: (searchConfig, formProps, dom) => [
            <Button type="primary" key="export" loading={exportLoading} onClick={() => {
              console.log(actionRef.current)
              exportTable()
            }}>
              导出
            </Button>,
            ...dom
          ]
        }}
      />

      {modal}
    </PageContainer>
  )
}

Component.displayName = 'CustomerList'

const CustomerList = memo(Component)
export default CustomerList

function useTagsService() {
  const [options, setOptions] = useState<any[]>([])

  useEffect(() => {
    handleGetTags()
  }, [])

  async function handleGetTags() {
    const {
      data: { list = [] }
    } = await api['/admin/mall/tag/queryList_GET']({})
    setOptions(list?.map((item) => ({ label: item.name, value: item.id })))
  }

  return {
    options,
    handleGetTags
  }
}
