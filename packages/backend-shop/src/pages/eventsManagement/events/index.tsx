import { FC, memo, useState } from 'react'
import styles from './index.module.less'
import { IActivitysProps, IMarketingActivity } from './const'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable, { ProColumns } from '@ant-design/pro-table'
import { Button, Space } from 'antd'
import OperationsColumns from '@wmeimob/backend-pro/src/components/table/operationsColumns'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import { api } from '~/request'
import { routeNames } from '~/routes'
import { EActivityStatus, MActivityStatus } from '~/enums/activity/EActivityStatus'
import StatusSwitchColumn from '@wmeimob/backend-pro/src/components/table/statusSwitchColumn'
import dayjs from 'dayjs'
import { history } from 'umi'

const Component: FC<IActivitysProps> = () => {
  const [columns] = useState<ProColumns<IMarketingActivity>[]>([
    { title: '活动名称', dataIndex: 'activityName', width: '30%' },
    { title: '活动编号', dataIndex: 'activityNo' },
    {
      title: '活动开始时间',
      dataIndex: 'activityTime',
      valueType: 'dateRange',
      render: (_d, record) => (
        <Space direction="vertical">
          <span>{record.startTime}</span>
          <span>{record.endTime}</span>
        </Space>
      )
    },
    {
      title: '活动状态',
      dataIndex: 'activityStatus',
      valueEnum: {
        [EActivityStatus.NoUse]: '已下架',
        [EActivityStatus.Use]: '上架中',
        [EActivityStatus.Finish]: '已结束'
      },
      render: (_v, record) => {
        const { activityNo, activityStatus, _isFinish } = record
        const checked = activityStatus === EActivityStatus.Use
        return [EActivityStatus.Use, EActivityStatus.NoUse].includes(activityStatus!) ? (
          <StatusSwitchColumn
            checked={checked}
            disabled={_isFinish}
            unCheckedChildren="已下架"
            checkedChildren="上架中"
            onSwitch={async () => {
              await api['/admin/activity/full/updateStatus_PUT']({ activityNo, open: checked ? 0 : 1 })
              actionRef.current?.reload()
            }}
          />
        ) : (
          MActivityStatus[activityStatus!]
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        const { _isFinish, activityStatus } = record
        // console.log(isFinish, record.activityNo)
        return (
          <OperationsColumns
            operations={[
              {
                id: 'custom',
                text: (
                  <a
                    onClick={() => {
                      history.push({ pathname: routeNames.marketingActivityActivitysCreate, search: `?activityNo=${record.activityNo}` })
                    }}
                  >
                    {activityStatus === EActivityStatus.NoUse && !_isFinish ? '编辑' : '详情'}
                  </a>
                )
              },
              {
                id: 'del',
                onClick: async () => {
                  await api['/admin/activity/full/{activityNo}_DELETE'](`${record.activityNo}`)
                  actionRef.current?.reload()
                }
              }
            ]}
          />
        )
      }
    }
  ])

  const { request, actionRef } = useProTableRequest(
    (params) => {
      const { activityTime, ...rest } = params
      if (activityTime) {
        const [startStartTime, endStartTime] = activityTime
        rest.startStartTime = startStartTime + ' 00:00:00'
        rest.endStartTime = endStartTime + ' 23:59:59'
      }

      return api['/admin/mall/activity/queryList_GET'](rest)
    },
    {
      dataFormat: (data) => data.map((item) => ({ ...item, _isFinish: dayjs().isAfter(dayjs(item.endTime), 'second') }))
    }
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
                history.push({ pathname: routeNames.eventsManagementEventsCreate })
              }}
            >
              新增
            </Button>
          ]
        }}
      />
    </PageContainer>
  )
}

Component.displayName = 'Activitys'

const Activitys = memo(Component)
export default Activitys