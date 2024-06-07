import { FC, memo } from 'react'
import { IDecorationsProps } from './const'
import { Space } from 'antd'
import { api } from '~/request'
import ProTable from '@ant-design/pro-table'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import { HomeFilled } from '@ant-design/icons'

const isHomePage = (home?: number) => home === 1

const Component: FC<IDecorationsProps> = (props) => {
  const { value, onChange } = props

  const { request } = useProTableRequest((params) => {
    const { name, ...rest } = params
    if (name) {
      rest.condition = name
    }
    return api['/admin/mall/page/query_GET'](rest)
  })

  return (
    <ProTable
      columns={[
        { title: 'ID', dataIndex: 'id', hideInSearch: true },
        {
          title: '页面名称',
          dataIndex: 'name',
          render: (value, record) => {
            return (
              <Space>
                {isHomePage(record.homePage) && <HomeFilled style={{ color: '#108ee9' }} />}
                <span>{value}</span>
              </Space>
            )
          }
        },
        { title: '页面标题', dataIndex: 'title', hideInSearch: true }
      ]}
      rowKey="id"
      toolBarRender={false}
      tableAlertRender={false}
      rowSelection={{
        selectedRowKeys: value ? [value.id!] : [],
        type: 'radio',
        getCheckboxProps: (record) => ({ disabled: isHomePage(record.homePage) }),
        onChange(_ks, [row]) {
          onChange?.(row)
        }
      }}
      request={request}
    />
  )
}

Component.displayName = 'Decorations'

const Decorations = memo(Component)
export default Decorations
