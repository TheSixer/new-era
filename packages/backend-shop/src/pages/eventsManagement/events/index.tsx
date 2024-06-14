import { FC, memo, useState } from 'react'
import styles from './index.module.less'
import { IActivitysProps, IMarketingEvent } from './const'
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
import { OCheckType, OEventStatus } from '~/enums/event/EActivity'

const Component: FC<IActivitysProps> = () => {
  const [columns] = useState<ProColumns<IMarketingEvent>[]>([
    { title: '活动名称', dataIndex: 'name', width: '10%' },
    {
      title: '活动时间',
      dataIndex: 'startTime',
      valueType: 'dateRange',
      render: (_d, record) => (
        <Space direction="vertical">
          <span>{record.startTime}</span>
          <span>{record.endTime}</span>
        </Space>
      )
    },
    {
      title: '活动地址',
      dataIndex: 'address',
      render: (_v, { provinceName = '', cityName = '', areaName = '', address = '' }) => [provinceName, cityName, areaName, address].join(' ')
    },
    {
      title: '报名时间',
      dataIndex: 'bookStartTime',
      valueType: 'dateRange',
      render: (_d, record) => (
        <Space direction="vertical">
          <span>{record.bookStartTime}</span>
          <span>{record.bookEndTime}</span>
        </Space>
      )
    },
    {
      title: '活动状态',
      dataIndex: 'activityStatus',
      valueType: 'select',
      fieldProps: () => ({ options: OEventStatus }),
      width: 80,
      renderText: (value: number) => OEventStatus[value]
    },
    {
      title: '核销方式',
      dataIndex: 'checkType',
      valueType: 'select',
      renderText: (value: number) => OCheckType[value]
    },
    { title: '参与用户', dataIndex: 'participate', hideInSearch: true, renderText: (value: number) => value ? '白名单' : '全部用户' },
    {
      title: '显示状态',
      dataIndex: 'status',
      valueEnum: {
        [EActivityStatus.NoUse]: '已下架',
        [EActivityStatus.Use]: '上架中',
        [EActivityStatus.Finish]: '已结束'
      },
      render: (_v, record) => {
        const { id, status, _isFinish } = record
        const checked = status === EActivityStatus.Use
        return [EActivityStatus.Use, EActivityStatus.NoUse].includes(status!) ? (
          <StatusSwitchColumn
            checked={checked}
            disabled={_isFinish}
            unCheckedChildren="已下架"
            checkedChildren="上架中"
            onSwitch={async () => {
              await api['/admin/mall/activity/updateStatus_PUT']({ id, showStatus: checked ? 0 : 1 })
              actionRef.current?.reload()
            }}
          />
        ) : (
          MActivityStatus[status!]
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
                id: 'recored',
                text: (
                  <a
                    onClick={() => {
                      history.push({ pathname: routeNames.eventsManagementActivityOrders, search: `?activityId=${record.id}` })
                    }}
                  >
                    报名记录
                  </a>
                )
              },
              ...(record.participate ? [
                {
                  id: 'whitelist',
                  text: (
                    <a
                      onClick={() => {
                        history.push({ pathname: routeNames.eventsManagementWhiteList, search: `?activityId=${record.id}` })
                      }}
                    >
                      白名单
                    </a>
                  )
                }
              ] : []),
              {
                id: 'custom',
                text: (
                  <a
                    onClick={() => {
                      history.push({ pathname: routeNames.eventsManagementEventsCreate, search: `?activityId=${record.id}` })
                    }}
                  >
                    {activityStatus === EActivityStatus.NoUse && !_isFinish ? '编辑' : '详情'}
                  </a>
                )
              },
              {
                id: 'del',
                onClick: async () => {
                  await api['/admin/mall/activity/delete/{id}_DELETE'](`${record.id}`)
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
