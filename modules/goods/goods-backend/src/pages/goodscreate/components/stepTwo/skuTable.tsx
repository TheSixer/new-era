/* eslint-disable id-length */
import { Table, Typography } from 'antd'
import { DefaultOptionType } from 'antd/lib/select'
import { ColumnType } from 'antd/lib/table'
import { FC, memo, useEffect, useState } from 'react'
import { GoodsSkuDTO } from '@wmeimob/backend-api/src/request/data-contracts'
import { mmAdds } from '@wmeimob/utils/src/mmCurrency'
import { NamePath } from 'antd/lib/form/interface'

export type SkuColumnsRender = (option: {
  /**
   * 处理表单名称
   */
  itemName(index: number, feildName: string): NamePath[]
}) => ColumnType<any>[]

interface ISkuTableProps {
  value?: GoodsSkuDTO[]

  topSkus: DefaultOptionType[]

  /**
   * sku列渲染
   */
  skuColumnsRender: SkuColumnsRender

  onChange?(data: GoodsSkuDTO[]): void
}

const Component: FC<ISkuTableProps> = (props) => {
  const { value = [], topSkus = [], skuColumnsRender = () => [] } = props
  const [current, setCurrent] = useState(1)
  const pageSize = 10

  useEffect(() => {
    setCurrent(1)
  }, [topSkus])

  const getIndex = (index: number) => (current - 1) * pageSize + index

  const commonColumns = skuColumnsRender({
    itemName: (index, feildName) => ['goodsSkuList', getIndex(index), feildName]
  })

  const columns = topSkus
    .map((it, index) => {
      return {
        dataIndex: it.value,
        title: it.label,
        render: (_, record: GoodsSkuDTO) => {
          const { specNames = '' } = record
          return specNames.split(',')[index]
        }
      } as ColumnType<GoodsSkuDTO>
    })
    .concat(commonColumns)

  const x = columns.reduce((total, item) => mmAdds(total, item.width || 120), 0)

  return (
    <>
      {!!value.length && <Typography.Text type="secondary">已组合{value.length}项</Typography.Text>}
      <Table
        columns={columns}
        dataSource={value}
        rowKey="specIds"
        scroll={{ x }}
        size="small"
        pagination={false}
        onChange={(pagination) => {
          setCurrent(pagination.current!)
        }}
        style={{ marginTop: 5 }}
      />
    </>
  )
}

Component.displayName = 'SkuTable'

const SkuTable = memo(Component)
export default SkuTable
