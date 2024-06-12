import { FC, memo, useState } from 'react'
import styles from './index.module.less'
import { ICustomerListProps } from './const'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable, { ProColumns } from '@ant-design/pro-table'
import { Button, Input, Upload, message } from 'antd'
import OperationsColumns from '@wmeimob/backend-pro/src/components/table/operationsColumns'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import { ActivityOrderOutputDto, api } from '~/request'
import { routeNames } from '~/routes'
import { history } from 'umi'
import { apiUrl } from '~/config'
import { OActivityStatus } from '~/enums/event/EActivity'
import { UploadOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd';

const Component: FC<ICustomerListProps> = (props) => {
  const [columns] = useState<ProColumns<ActivityOrderOutputDto>[]>([
    {
      dataIndex: 'searchString',
      hideInTable: true,
      formItemProps: { labelCol: { span: 0 }, colon: false },
      renderFormItem: () => {
        return <Input placeholder="用户名称/手机号/id" maxLength={20} allowClear />
      }
    },
    { title: '用户id', dataIndex: 'id', width: 60,hideInSearch: true },
    { title: '用户昵称', dataIndex: 'nickName', width: 80, hideInSearch: true },
    { title: '用户手机号', dataIndex: 'mobile', width: 100, hideInSearch: true },
    { title: '会员等级', dataIndex: 'openId', width: 80, hideInSearch: true },
    { title: '报名编号', dataIndex: 'id', width: 80, hideInSearch: true },
    { title: '姓名', dataIndex: 'modifyUser', width: 80, hideInSearch: true },
    { title: '证件类型', dataIndex: 'cardType', width: 80, hideInSearch: true },
    { title: '证件号', dataIndex: 'cardNo', width: 150, hideInSearch: true },
    { title: '报名场次', dataIndex: 'unifyId', valueType: 'select', renderText: (value?: number) => value || '统一场次' },
    { title: '报名费用', dataIndex: 'activity.bookFree', width: 80, hideInSearch: true },
    { title: '报名时间', dataIndex: 'bookStartTime', width: 120, hideInSearch: true, renderText: (value?: number, record?: any) => `${value}-${record.bookEndTime}` },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      fieldProps: () => ({ options: OActivityStatus }),
      width: 80,
      renderText: (value: number) => OActivityStatus[value]
    },
    { title: '座位区域', dataIndex: 'cardNo', width: 80, hideInSearch: true },
    { title: '排号', dataIndex: 'cardNo', width: 80, hideInSearch: true },
    { title: '座位号', dataIndex: 'cardNo', width: 80, hideInSearch: true },
    { title: '核销码', dataIndex: 'qrCode', width: 80, hideInSearch: true },
    { title: '核销人', dataIndex: 'modifyUser', width: 80, hideInSearch: true },
    { title: '核销时间', dataIndex: 'gmtCreated', valueType: 'date', width: 120, hideInSearch: true },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 150,
      fixed: 'right',
      render: (_, record) => {
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
              }
            ]}
          />
        )
      }
    }
  ])
  const Authorization = window.localStorage.getItem('Authorization') || ''

  const uploadProps: UploadProps = {
    name: 'file',
    action: `${apiUrl}/admin/mall/activityOrder/orderImport/{activityId}`,
    headers: {
      Authorization
    },
    accept: '.xml,.xlsx',
    maxCount: 1,
    showUploadList: false,
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };

  const { request, exportLoading, exportTable, actionRef } = useProTableRequest((params) => api['/admin/mall/activityOrder/queryList_GET'](params), {
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
            ...dom,
            <Button type="primary" key="export" loading={exportLoading} onClick={() => exportTable()}>
              导出
            </Button>,
            <Upload {...uploadProps} key="upload">
              <Button icon={<UploadOutlined />}>导入</Button>
            </Upload>,
            <Button type="primary" key="link"
              onClick={() => {
                // history.push({
                //   pathname: routeNames.mallManagementCustomerList
                // })
              }}
            >
              座位设置
            </Button>
          ]
        }}
      />
    </PageContainer>
  )
}

function useImport() {
  const [importLoading, setImportLoading] = useState(false)
  const importData = async (formData: any) => {
    setImportLoading(true)
    try {
      const res = await api['/admin/mall/activityOrder/import_POST'](formData)
      setImportLoading(false)
      message.success('导入成功')
    } catch (error) {
      setImportLoading(false)
      message.error('导入失败')
    }
  }
  return { importLoading, importData }
}

Component.displayName = 'CustomerList'

const CustomerList = memo(Component)
export default CustomerList
