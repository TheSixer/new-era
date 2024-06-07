import { FC, memo, useEffect, useMemo, useState } from 'react'
import ProTable from '@ant-design/pro-table'
import { Card } from 'antd'
import { api, GoodsVO } from '@wmeimob/backend-api'
import useGoodSkuColumns from '../../hooks/useGoodSkuColumns'

interface IGoodsSkuProps {
  goodsNo: string

  onSkuChecked(skuNo: string): void
}

const Component: FC<IGoodsSkuProps> = ({ goodsNo, onSkuChecked }) => {
  const [loading, setLoading] = useState(true)
  const [detail, setDetail] = useState<GoodsVO>({})
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])

  const [skuColumns] = useGoodSkuColumns(detail)

  const columns = useMemo(() => {
    const commonColumns: any[] = [
      { dataIndex: 'salesPrice', title: '销售价（元)', valueType: 'money' },
      { dataIndex: 'marketPrice', title: '市场价（元)', valueType: 'money' },
      { dataIndex: 'stock', title: '库存' },
      { dataIndex: 'enabled', title: '启用', render: (val, _) => (val ? '是' : '否') }
    ]
    return skuColumns.concat(commonColumns)
  }, [skuColumns])

  useEffect(() => {
    getDetail()
  }, [])

  async function getDetail() {
    if (goodsNo) {
      setLoading(true)
      const { data = {} } = await api['/admin/goods/{no}_GET'](goodsNo)
      setDetail(data)
      setLoading(false)
    }
  }

  return (
    <Card>
      <ProTable
        toolBarRender={false}
        search={false}
        columns={columns}
        dataSource={detail.goodsSkuDetailList || []}
        rowKey="skuNo"
        pagination={false}
        tableAlertRender={false}
        rowSelection={{
          type: 'radio',
          selectedRowKeys,
          getCheckboxProps: (record) => ({ disabled: !record.stock }),
          onChange: (keys: any[]) => {
            setSelectedRowKeys(keys)
            onSkuChecked(keys[0])
          }
        }}
      />
    </Card>
  )
}

Component.displayName = 'GoodsSku'

const GoodsSku = memo(Component)
export default GoodsSku
