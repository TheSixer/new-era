import { FC, memo, useState } from 'react'
import styles from './index.module.less'
import { ICustomerListProps } from './const'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable, { ProColumns } from '@ant-design/pro-table'
import { Button, Input, Modal } from 'antd'
import OperationsColumns from '@wmeimob/backend-pro/src/components/table/operationsColumns'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import { MMemberType } from '@wmeimob-modules/member-data/src/enums/EMemberType'
import { api } from '~/request'
import { MemberInfoPageVo } from '@wmeimob/backend-api'
import { ECustomerStatus, OCustomerStatus } from '~/enums/customer/ECustomerStatus'
import { routeNames } from '~/routes'
import { history } from 'umi'
import { apiUrl } from '~/config'

const Component: FC<ICustomerListProps> = (props) => {
  const [columns] = useState<ProColumns<MemberInfoPageVo>[]>([
    {
      dataIndex: 'searchString',
      hideInTable: true,
      formItemProps: { labelCol: { span: 0 }, colon: false },
      renderFormItem: () => {
        return <Input placeholder="用户名称/手机号/id" maxLength={20} allowClear />
      }
    },
    { title: '用户昵称', dataIndex: 'nickName', hideInSearch: true },
    { title: '用户手机号', dataIndex: 'mobile', hideInSearch: true },
    { title: '用户id', dataIndex: 'id', hideInSearch: true },
    { title: '用户openid', dataIndex: 'openId', hideInSearch: true },
    { title: '生成时间', dataIndex: 'gmtCreated', valueType: 'date', hideInSearch: true },
    { title: '会员状态', dataIndex: 'memberType', valueType: 'select', valueEnum: MMemberType },
    { title: '累计积分', dataIndex: 'totalScore', valueType: 'digit', hideInSearch: true, renderText: (value?: number) => value || 0 },
    { title: '可用积分', dataIndex: 'availableScore', valueType: 'digit', hideInSearch: true, renderText: (value?: number) => value || 0 },
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
                id: 'detail',
                text: (
                  <a
                    onClick={() =>
                      history.push({
                        pathname: routeNames.mallManagementCustomerDetail,
                        query: { id: `${record.id}` }
                      })
                    }
                  >
                    会员详情
                  </a>
                )
              },
              {
                id: 'disableStatus',
                text: <a onClick={() => handleToggleMemberStatus(record)}>{isDisable ? '解除禁用' : '禁用'}</a>
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

  const { request, exportLoading, exportTable, actionRef } = useProTableRequest((params) => api['/admin/api/member/query_GET'](params), {
    exportUrl: `${apiUrl}/admin/api/member/export`
  })

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
            <Button type="primary" key="export" loading={exportLoading} onClick={() => exportTable()}>
              导出
            </Button>,
            ...dom
          ]
        }}
      />
    </PageContainer>
  )
}

Component.displayName = 'CustomerList'

const CustomerList = memo(Component)
export default CustomerList
