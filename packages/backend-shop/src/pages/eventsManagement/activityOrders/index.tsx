import { FC, memo, useEffect, useState } from 'react'
import styles from './index.module.less'
import { ICustomerListProps } from './const'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable, { ProColumns } from '@ant-design/pro-table'
import { Button, Input, Upload, message } from 'antd'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import { ActivityOrderOutputDto, api } from '~/request'
import { apiUrl } from '~/config'
import { MActivityStatus, OActivityStatus } from '~/enums/event/EActivity'
import { UploadOutlined } from '@ant-design/icons'
import { history } from 'umi'
import type { UploadProps } from 'antd';
import { MCardType } from '~/enums/event/EReservationStatus'
import { routeNames } from '~/routes'
import useQuery from '~/hooks/useQuery'
import dayjs from 'dayjs'

const Component: FC<ICustomerListProps> = (props) => {
  const query = useQuery()
  const activityId = query.get('activityId') || ''
  const { unifies } = useBasicService(activityId)

  const [columns, setColumns] = useState<ProColumns<ActivityOrderOutputDto>[]>([
    {
      dataIndex: 'name',
      hideInTable: true,
      formItemProps: { labelCol: { span: 0 }, colon: false },
      renderFormItem: () => {
        return <Input placeholder="输入用户昵称/手机号/姓名/报名编号" maxLength={100} allowClear />
      }
    },
    { title: '用户id', dataIndex: 'userId', width: 60,hideInSearch: true },
    { title: '用户昵称', dataIndex: 'nickname', width: 80, hideInSearch: true },
    { title: '用户手机号', dataIndex: 'mobile', width: 100, hideInSearch: true },
    { title: '会员等级', dataIndex: 'openId', width: 80, hideInSearch: true },
    { title: '报名编号', dataIndex: 'orderNo', width: 80, hideInSearch: true },
    { title: '姓名', dataIndex: 'name', width: 80, hideInSearch: true },
    { title: '证件类型', dataIndex: 'cardType', width: 80, hideInSearch: true, renderText: (value: number) => MCardType[value] },
    { title: '证件号', dataIndex: 'cardNo', width: 150, hideInSearch: true },
    { title: '报名场次', dataIndex: 'unifyName', width: 80, hideInSearch: true },
    { title: '报名费用', dataIndex: 'bookFee', width: 80, hideInSearch: true },
    { title: '报名时间', dataIndex: 'bookTime', width: 120, hideInSearch: true },
    {
      title: '状态',
      dataIndex: 'orderStatus',
      valueType: 'select',
      fieldProps: () => ({ options: OActivityStatus }),
      width: 80,
      renderText: (value: number) => MActivityStatus[value]
    },
    { title: '座位区域', dataIndex: 'areaName', width: 80, hideInSearch: true },
    { title: '排号', dataIndex: 'rowNumber', width: 80, hideInSearch: true },
    { title: '座位号', dataIndex: 'seatNo', width: 80, hideInSearch: true },
    { title: '核销码', dataIndex: 'verifyCode', width: 80, hideInSearch: true },
    { title: '核销人', dataIndex: 'checkUserName', width: 80, hideInSearch: true },
    { title: '核销时间', dataIndex: 'checkTime', valueType: 'date', width: 120, hideInSearch: true }
  ])
  const Authorization = window.localStorage.getItem('Authorization') || ''

  const uploadProps: UploadProps = {
    name: 'file',
    action: `${apiUrl}/admin/mall/activityOrder/orderImport/${activityId}`,
    headers: {
      Authorization
    },
    accept: '.xml,.xls,.xlsx',
    maxCount: 1,
    showUploadList: false,
    onChange(info) {
      if (info.file.status === 'done') {
        if (info.file.response?.data?.errorList?.length > 0) {
          message.error(`${info.file.response?.data?.errorList?.length}条数据格式错误`);
        } else {
          message[!info.file.response.code ? 'success' : 'error'](!info.file.response.code ? '导入成功' : info.file.response.msg);
        }
        actionRef.current?.reload()
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 导入失败.`);
      }
    }
  };

  const { request, exportLoading, exportTable, actionRef } = useProTableRequest((params) => api['/admin/mall/activityOrder/queryList_GET'](params), {
    exportUrl: `${apiUrl}/admin/mall/activityOrder/export`
  })

  useEffect(() => {
    unifies.length > 0 && setColumns((pre) => [...pre.slice(0, 12), 
      {
        title: '报名场次',
        dataIndex: 'unifyId',
        valueType: 'select',
        fieldProps: () => ({ options: unifies }),
        hideInTable: true
      },
      ...pre.slice(12)])
  }, [unifies])

  return (
    <PageContainer className={styles.deptManagementStyle}>
      <ProTable
        actionRef={actionRef}
        rowKey="id"
        columns={columns}
        request={request}
        params={{ activityId }}
        scroll={{ x: 1000 }}
        search={{
          defaultCollapsed: false,
          labelWidth: 'auto',
          optionRender: (searchConfig, formProps, dom) => [
            ...dom,
            <Button type="primary" key="export" loading={exportLoading} onClick={() => exportTable()}>
              导出
            </Button>,
            <Button key="modal" href='https://newera-1324768017.cos.ap-nanjing.myqcloud.com/newera_temp/%E6%8A%A5%E5%90%8D%E8%AE%B0%E5%BD%95%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx'>
              下载导入模板
            </Button>,
            <Upload {...uploadProps} key="upload">
              <Button type='primary' icon={<UploadOutlined />}>导入</Button>
            </Upload>,
            <Button type="primary" key="link"
              onClick={() => {
                history.push({ pathname: routeNames.eventsManagementSeatSettings, search: `?activityId=${activityId}` })
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

function useBasicService(activityId) {
  const [unifies, setUnifies] = useState<any[]>([])

  useEffect(() => {
    activityId && fetchUnifies()
  }, [activityId])

  async function fetchUnifies() {
    const { data = [] } = await api['/admin/mall/activity/queryUnifyList_GET']({ activityId })
    setUnifies(data.map(({ unifyDate, unifyTime, id }) => ({ label: id === 0 ? '统一场次' : `${dayjs(unifyDate).format('YYYY-MM-DD')} ${unifyTime}`, value: id })))
  }

  return { unifies, fetchUnifies }
}
