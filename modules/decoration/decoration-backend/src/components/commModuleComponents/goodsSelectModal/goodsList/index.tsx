import { FC, memo, useMemo, useState } from 'react'
import { BasicModuleProductGood } from '@wmeimob-modules/decoration-data'
import ProTable from '@ant-design/pro-table'
import useGood from '@wmeimob/backend-pages-shop/src/hooks/good/useGood'
import { EGoodStatus } from '@wmeimob/backend-pages-shop/src/enums/good/EGoodStatus'

export interface IProps {
  value?: BasicModuleProductGood[]
  onChange?(data: BasicModuleProductGood[]): void
}

const Component: FC<IProps> = (props) => {
  const { value = [], onChange } = props
  const selectedRowKeys = useMemo(() => value.map((item) => item.id), [value])

  const { request, dataSourceRef, column, actionRef } = useGood()
  const [columns] = useState<any[]>([
    { title: '商品编号', dataIndex: 'goodsNo' },
    { title: '商品名称', dataIndex: 'goodsName' },
    column.classifyColumn,
    { title: '价格', dataIndex: 'salePrice', hideInSearch: true, valueType: 'money' },
    { title: '实际销量', dataIndex: 'actualSales', hideInSearch: true },
    { title: '库存', dataIndex: 'stock', hideInSearch: true },
    { title: '排序值', dataIndex: 'sort', hideInSearch: true }
  ])

  return (
    <ProTable
      actionRef={actionRef}
      rowKey="id"
      columns={columns}
      request={request}
      rowSelection={{
        selectedRowKeys,
        onChange(_ks, rows) {
          const currentRowIds = dataSourceRef.current!.map((item) => item.id!)
          const otherKeys = selectedRowKeys.filter((key) => currentRowIds.indexOf(key) === -1)
          const otherValues = value.filter((item) => otherKeys.indexOf(item.id) !== -1)

          const cValues = otherValues.concat(
            rows.map((item) => {
              return {
                id: item.id!,
                goodsName: item.goodsName!,
                goodsNo: item.goodsNo!,
                coverImg: item.coverImg!,
                price: item.salePrice!,
                marketPrice: item.marketPrice!
              }
            })
          )
          onChange?.(cValues)
        }
      }}
      size="small"
      toolBarRender={false}
    />
  )
}

Component.displayName = 'GoodsList'

const GoodsList = memo(Component)
export default GoodsList
