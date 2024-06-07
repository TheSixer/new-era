import ProTable from '@ant-design/pro-table'
import { EActivityStatus, MActivityStatus } from '@wmeimob-modules/activity-data/src/enums/EActivityStatus'
import { api, MarketingActivityDto } from '@wmeimob/backend-api'
import OperationsColumns from '@wmeimob/backend-pro/src/components/table/operationsColumns'
import StatusSwitchColumn from '@wmeimob/backend-pro/src/components/table/statusSwitchColumn'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import { useSuperLock } from '@wmeimob/utils/src/hooks/useSuperLock'
import { Button, Space } from 'antd'
import dayjs from 'dayjs'
import { MMProColumns } from 'MMProType'
import { FC, memo, useState } from 'react'

interface IMMFreeShippingActivityListPageProps {
  onAdd(): void
  onEdit(activity: MarketingActivityDto): void
}

const Component: FC<IMMFreeShippingActivityListPageProps> = (props) => {
  const { onAdd } = props
  const { columns, request, actionRef } = useService(props)

  return (
    <ProTable
      actionRef={actionRef}
      columns={columns}
      request={request}
      rowKey="id"
      search={{
        defaultCollapsed: false,
        labelWidth: 'auto',
        optionRender: (_, __, dom) => [
          ...dom,
          <Button type="primary" key="out" onClick={onAdd}>
            新增
          </Button>
        ]
      }}
    />
  )
}

const MMFreeShippingActivityListPage = memo(Component)
export default MMFreeShippingActivityListPage

function useService(props: IMMFreeShippingActivityListPageProps) {
  const [columns] = useState<MMProColumns<MarketingActivityDto>[]>([
    { title: '活动名称', dataIndex: 'activityName', width: '30%' },
    { title: '活动编号', dataIndex: 'activityNo' },
    {
      title: '活动开始时间',
      dataIndex: 'activityTime',
      valueType: 'dateRange',
      search: {
        transform: ([startStartTime, endStartTime]) => ({
          startStartTime: `${startStartTime} 00:00:00`,
          endStartTime: `${endStartTime} 23:59:59`
        })
      },
      render: (_, record) => (
        <Space direction="vertical">
          <span>{dayjs(record.startTime).format('YYYY-MM-DD HH:mm')}</span>
          <span>{dayjs(record.endTime).format('YYYY-MM-DD HH:mm')}</span>
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
      render: (_, record) => {
        const { activityNo, activityStatus, _isFinish } = record as any
        const checked = activityStatus === EActivityStatus.Use
        const showSwitch = [EActivityStatus.Use, EActivityStatus.NoUse].includes(activityStatus)

        return showSwitch ? (
          <StatusSwitchColumn
            checked={checked}
            disabled={_isFinish}
            unCheckedChildren="已下架"
            checkedChildren="上架中"
            onSwitch={(checked) => handleToggleEnableStatus(Number(checked), activityNo)}
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
        const { _isFinish, activityStatus } = record as any
        return (
          <OperationsColumns
            operations={[
              {
                id: 'custom',
                text: <a onClick={() => props.onEdit(record)}>{activityStatus === EActivityStatus.NoUse && !_isFinish ? '编辑' : '详情'}</a>
              },
              {
                id: 'del',
                onClick: async () => {
                  await api['/admin/activity/freeShipping/{activityNo}_DELETE'](`${record.activityNo}`)
                  actionRef.current?.reload()
                }
              }
            ]}
          />
        )
      }
    }
  ])

  const { request, actionRef } = useProTableRequest((params) =>
    api['/admin/activity/freeShipping_GET'](params, {
      // 后端定时器不准
      dataFormat: (data) => data.map((item) => ({ ...item, _isFinish: dayjs().isAfter(dayjs(item.endTime), 'second') }))
    })
  )

  const [handleToggleEnableStatus] = useSuperLock(async (open: number, activityNo?: string) => {
    await api['/admin/activity/freeShipping/updateStatus_PUT']({ open, activityNo })
    actionRef.current?.reload()
  })

  return {
    columns,
    request,
    actionRef,
    handleToggleEnableStatus
  }
}
