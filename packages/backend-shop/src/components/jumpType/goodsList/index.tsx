import { FC, memo, useState } from 'react'
import ProTable from '@ant-design/pro-table'
import { EGoodStatus } from '~/enums/good/EGoodStatus'
import { MMProColumns } from 'MMProType'
import AlbumColumn from '@wmeimob/backend-pro/src/components/table/albumColumn'
import useGoodClassifyColumn from '~/hooks/good/useGoodClassifyColumn'
import useGoodRequest from '~/hooks/good/useGoodRequest'
import { GoodsVO } from '@wmeimob/backend-api'
export interface IProps {
  value?: GoodsVO
  onChange?(data: GoodsVO): void
}

/**
 *  商品列表选择
 *
 * @param {*} props
 * @return {*}
 */
const Component: FC<IProps> = (props) => {
  const { value, onChange } = props

  const [classifyColumn] = useGoodClassifyColumn()
  const { request } = useGoodRequest()

  const [chooseColumns] = useState<MMProColumns<GoodsVO>[]>([
    { title: '商品编号', dataIndex: 'goodsNo' },
    { title: '商品名称', dataIndex: 'goodsName' },
    { title: '商品icon', dataIndex: 'coverImg', hideInSearch: true, render: (value: any) => <AlbumColumn value={value} /> },
    classifyColumn,
    { title: '价格', dataIndex: 'salePrice', valueType: 'money', hideInSearch: true },
    { title: '总库存', dataIndex: 'stock', hideInSearch: true },
    { title: '销量', dataIndex: 'actualSales', hideInSearch: true }
  ])

  return (
    <ProTable
      columns={chooseColumns}
      rowKey="goodsNo"
      toolBarRender={false}
      tableAlertRender={false}
      params={{ shelved: EGoodStatus.shelved }}
      rowSelection={{
        selectedRowKeys: value ? [value.goodsNo!] : [],
        type: 'radio',
        onChange(_ks, [row]) {
          onChange?.(row)
        }
      }}
      request={request}
    />
  )
}

const GoodsList = memo(Component)
export default GoodsList
