import { FC, memo, useRef, useState } from 'react'
import { Button } from 'antd'
import { api } from '~/request'
import { EJumpType, MJumpType } from '~/components/jumpType/enums/EJumpType'
import JumpTypeValue from '~/components/jumpType/jumpTypeValue'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table'
import OperationsColumns from '@wmeimob/backend-pro/src/components/table/operationsColumns'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import { BannerOutputDto } from '@wmeimob/backend-api'
import { MAdvertisingPosition } from '@wmeimob/shop-data/src/enums/EAdvertisingPosition'
import StatusSwitchColumn from '@wmeimob/backend-pro/src/components/table/statusSwitchColumn'
import { routeNames } from '~/routes'

const Component: FC<any> = ({ history }) => {
  const [columns] = useState<ProColumns<BannerOutputDto>[]>([
    { title: '广告名称', dataIndex: 'name' },
    { title: 'banner图片', dataIndex: 'imgUrl', valueType: 'image', hideInSearch: true, width: 100 },
    {
      title: '显示位置',
      dataIndex: 'position',
      hideInSearch: true,
      render(value: any) {
        return (
          <span>
            {value
              .split(',')
              .map((item) => MAdvertisingPosition[item])
              .join('、')}
          </span>
        )
      }
    },
    {
      title: '跳转类型',
      dataIndex: 'urlType',
      width: 90,
      hideInSearch: true,
      render(value: any) {
        return <span>{MJumpType[value]}</span>
      }
    },
    {
      title: '跳转内容',
      dataIndex: 'url',
      hideInSearch: true,
      render: (value, record) => <JumpTypeValue jumpValue={{ type: record.urlType as unknown as EJumpType, content: record.url as any }} />
    },
    { title: '排序值', dataIndex: 'sort', width: 80, hideInSearch: true },
    {
      title: '显示状态',
      dataIndex: 'showStatus',
      width: 90,
      valueType: 'select',
      valueEnum: { 1: '显示', 0: '不显示' },
      render: (_v, record) => {
        return (
          <StatusSwitchColumn
            checked={!!record.showStatus}
            onSwitch={async () => {
              await api['/admin/mall/banner/updateStatus_PUT']({ id: record.id, showStatus: record.showStatus === 1 ? 0 : 1 })
              actionRef.current?.reload()
            }}
          />
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 80,
      render: (_, record) => (
        <OperationsColumns
          operations={[
            {
              id: 'edit',
              onClick: () => {
                history.push({ pathname: routeNames.basicSettingAdvertisingSpaceAdd, search: `?id=${record.id}` })
              }
            },
            {
              id: 'del',
              onClick: async () => {
                await api['/admin/mall/banner/delete/{id}_DELETE'](record.id!)
                actionRef.current?.reload()
              }
            }
          ]}
        />
      )
    }
  ])

  const { request, actionRef } = useProTableRequest((params) => api['/admin/mall/banner/queryList_GET'](params), {
    dataFormat: (data) =>
      data.map((item) => {
        return item
      })
  })

  return (
    <PageContainer>
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
                history.push(routeNames.basicSettingAdvertisingSpaceAdd)
              }}
            >
              新增广告位
            </Button>
          ]
        }}
      />
    </PageContainer>
  )
}

Component.displayName = 'AdvertisingSpace'

const AdvertisingSpace = memo(Component)
export default AdvertisingSpace
