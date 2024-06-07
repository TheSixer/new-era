import { FC, memo, useState } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable, { ProColumns } from '@ant-design/pro-table'
import { Button } from 'antd'
import OperationsColumns from '@wmeimob/backend-pro/src/components/table/operationsColumns'
import useProTableRequest from '@wmeimob/backend-pro/src/hooks/useProTableRequest'
import { api } from '@wmeimob/backend-api'
import { ExpressTemplateListOutputDto } from '@wmeimob/backend-api/src/request/data-contracts'
import { MValuationType } from '../../../../enums/freight/EValuationType'
import { EShippingType, MShippingType } from '../../../../enums/freight/EShippingType'

interface IFreightListProps {
  /** 点击新增 */
  onAdd(): void
  /** 点击编辑 */
  onEdit(record: ExpressTemplateListOutputDto, index: number): void
}

const Component: FC<IFreightListProps> = ({ onAdd, onEdit }) => {
  const [columns] = useState<ProColumns<ExpressTemplateListOutputDto>[]>([
    { title: '模板名称', dataIndex: 'name' },
    { title: '模板类型', dataIndex: 'shippingType', valueEnum: MShippingType, hideInSearch: true },
    {
      title: '计价方式',
      dataIndex: 'valuationType',
      hideInSearch: true,
      render: (_v, { shippingType, valuationType }) => (shippingType === EShippingType.BuyerBear ? MValuationType[valuationType!] : '-')
    },
    { title: '创建时间', dataIndex: 'gmtCreated', hideInSearch: true },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 100,
      render: (_, record, index) => (
        <OperationsColumns
          operations={[
            {
              id: 'edit',
              onClick: () => onEdit(record, index)
            },
            {
              id: 'del',
              onClick: async () => {
                await api['/admin/mall/express/delete/{id}_DELETE'](record.id!)
                actionRef.current?.reload()
              }
            }
          ]}
        />
      )
    }
  ])

  const { request, actionRef } = useProTableRequest((params) => api['/admin/mall/express/query_GET'](params))

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
            <Button type="primary" key="out" onClick={onAdd}>
              新增
            </Button>
          ]
        }}
      />
    </PageContainer>
  )
}

const MMFreightListPage = memo(Component)
export default MMFreightListPage
