import { FC, memo, useState } from 'react'
import styles from './index.module.less'
import { INoticeListProps } from './const'
import ProTable, { ProColumns } from '@ant-design/pro-table'
import { api } from '../request'
import OperationsColumns from '@wmeimob/backend-pro/src/components/table/operationsColumns'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import { useUnRead } from '../store'
import { message } from 'antd'

const Component: FC<INoticeListProps> = (props) => {
  const { getUnReadList } = useUnRead()

  const [columns] = useState<ProColumns<any>[]>([
    { title: '消息标题', dataIndex: 'title', hideInSearch: true },
    { title: '是否已读', dataIndex: 'read', valueType: 'select', valueEnum: { 0: '未读', 1: '已读' }, render: (_, { read }) => (read ? '已读' : '未读') },
    { title: '创建时间', dataIndex: 'gmtCreated', hideInSearch: true },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 100,
      render: (_, record) => (
        <OperationsColumns
          operations={[
            ...(props.operations?.(record) || []),
            {
              id: 'read',
              show: !record.read,
              text: (
                <a
                  onClick={async () => {
                    await api['/notification/api/stationMessage/read/{id}_PUT'](record.id)
                    await getUnReadList()
                    message.success('操作成功')
                    actionRef.current?.reload()
                  }}
                >
                  设为已读
                </a>
              )
            }
          ]}
        />
      )
    }
  ])

  const { request: tableRequest, actionRef } = useProTableRequest((params) => api['/notification/api/stationMessage/query_GET'](params))

  return <ProTable actionRef={actionRef} rowKey="id" columns={columns} request={tableRequest} className={styles.noticeListStyle} />
}

Component.displayName = 'NoticeList'

const NoticeList = memo(Component)
export default NoticeList
