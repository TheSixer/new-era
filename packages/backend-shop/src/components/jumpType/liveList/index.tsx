import { FC, memo, useState } from 'react'
import ProTable, { ProColumns } from '@ant-design/pro-table'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import { api, LivePage } from '~/request'
import OperationsColumns from '@wmeimob/backend-pro/src/components/table/operationsColumns'
import { MLivePageType } from '~/pages/liveBroadcastManagement/list/components/pageManagement/const'

export interface IProps {
  value: object
  onChange?(data): void
}

/**
 *  直播页面选择列表
 *
 * @param {*} props
 * @return {*}
 */
const Component: FC<IProps> = (props) => {
  const { value, onChange } = props

  console.log(value)
  const { request } = useProTableRequest((params) =>
    api['/admin/livePage_GET']({
      ...params
    })
  )

  const [chooseColumns] = useState<ProColumns<LivePage>[]>([
    { title: '页面ID', dataIndex: 'id', hideInSearch: true },
    { title: '页面名称', dataIndex: 'name' },
    { title: '页面类型', dataIndex: 'type', hideInSearch: true, valueType: 'radio', valueEnum: MLivePageType }
  ])

  return (
    <ProTable
      columns={chooseColumns}
      rowKey='id'
      toolBarRender={false}
      tableAlertRender={false}
      request={request}
      rowSelection={{
        selectedRowKeys: value ? [value.id!] : [],
        type: 'radio',
        onChange(_ks, [row]) {
          onChange?.(row)
        }
      }}
    />
  )
}

const GoodsList = memo(Component)
export default GoodsList
