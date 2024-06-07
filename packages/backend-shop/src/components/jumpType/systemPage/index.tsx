import { Table } from 'antd'
import { FC, memo } from 'react'
import { OSystemPage } from '../enums/ESystemPage'

export interface IProps {
  /** 值 */
  value: string
  /** 变化事件 */
  onChange(val: string): void
}

const Component: FC<IProps> = (props) => {
  return (
    <Table
      columns={[{ title: '页面名称', dataIndex: 'label' }]}
      dataSource={OSystemPage}
      rowSelection={{
        type: 'radio',
        selectedRowKeys: props.value ? [props.value] : [],
        onChange: ([key]) => {
          props.onChange(key as any)
        }
      }}
      pagination={false}
      rowKey="value"
    />
  )
}

Component.displayName = 'SystemPage'

const SystemPage = memo(Component)
export default SystemPage
