import { FC, memo, useState } from 'react'
import styles from './index.module.less'
import { ILiveProps } from './const'
import ProTable, { ProColumns } from '@ant-design/pro-table'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import { api, LivePage } from '~/request'
import { Button, Input } from 'antd'
import { apiUrl } from '~/config'

const Component: FC<ILiveProps> = (props) => {

  const [columns] = useState<ProColumns<LivePage>[]>([
    {
      title: '直播间',
      dataIndex: 'liveKeyword',
      width: 120,
      ellipsis: true,
      hideInTable: true,
      formItemProps: { label: '直播间：', colon: false },
      renderFormItem: (_) => {
        return <Input placeholder="请输入直播ID/直播名称" maxLength={20} allowClear />
      }
    },{
      title: '商品',
      dataIndex: 'goodsKeyword',
      width: 120,
      ellipsis: true,
      hideInTable: true,
      formItemProps: { label: '商品：', colon: false },
      renderFormItem: (_) => {
        return <Input placeholder="请输入商品编号/商品名称/规格编号" maxLength={20} allowClear />
      }
    },
    { title: '直播ID', dataIndex: 'liveId', hideInSearch: true },
    { title: '直播名称', dataIndex: 'liveName', hideInSearch: true },
    { title: '商品编号', dataIndex: 'goodsNo', hideInSearch: true },
    { title: '商品名称', dataIndex: 'goodsName', hideInSearch: true,width:150 },
    { title: '规格编号', dataIndex: 'goodsSkuNo', hideInSearch: true },
    { title: '规格名称', dataIndex: 'goodsSkuName', hideInSearch: true },
    { title: '浏览量', dataIndex: 'pageView', hideInSearch: true,width:80 },
    { title: '销售数量', dataIndex: 'actualSales', hideInSearch: true,width:80 },
    { title: '销售额', dataIndex: 'salesVolume', hideInSearch: true,width:80 }
  ])

  const { request, actionRef, exportLoading, exportTable } = useProTableRequest(api['/admin/live/statistics_GET'], {
    exportUrl: `${apiUrl}/admin/live/statistics/export`})

  return (
    <div className={styles.deptManagementStyle}>
      <ProTable
        actionRef={actionRef}
        rowKey='id'
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
            </Button>
          ]
        }}
      />
    </div>
  )
}

Component.displayName = 'MarketingStatistics'

const MarketingStatistics = memo(Component)
export default MarketingStatistics
