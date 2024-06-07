import { FC, memo, useEffect, useMemo, useState } from 'react'
import { IGoodsSkuProps } from './const'
import ProTable from '@ant-design/pro-table'
import { Card } from 'antd'
import { api } from '~/request'
import { GoodsSkuDTO, GoodsVO } from '@wmeimob/backend-api'
import { MMProColumns } from 'MMProType'

const Component: FC<IGoodsSkuProps> = ({ goodsNo, onSkuChecked }) => {
  const [loading, setLoading] = useState(true)
  const [detail, setDetail] = useState<GoodsVO>({})
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])

  const columns = useMemo(() => {
    const commonColumns: MMProColumns<GoodsSkuDTO>[] = [
      { dataIndex: 'skuImg', title: 'sku图片', valueType: 'image' },
      { dataIndex: 'skuNo', title: 'sku编码' },
      {
        dataIndex: 'salesPrice',
        title: '销售价（元)',
        valueType: 'money'
      },
      { dataIndex: 'marketPrice', title: '市场价（元)', valueType: 'money', render: (val, record) => {
          return !!record.marketPrice ? val : '-'
        } },
      {
        dataIndex: 'stock',
        title: '库存'
      },
      {
        dataIndex: 'enabled',
        title: '启用',
        render: (val, _) => {
          return val ? '是' : '否'
        }
      }
    ]
    return (detail.goodsSpecRelationList || [])
      .filter((it) => !it.specPid)
      .map((it, index) => {
        return {
          dataIndex: it.specId,
          title: it.specName,
          render: (_, record: GoodsSkuDTO) => {
            const { specNames = '' } = record
            return specNames.split(',')[index]
          }
        } as MMProColumns<GoodsSkuDTO>
      })
      .concat(commonColumns)
  }, [detail.goodsSpecRelationList])

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
