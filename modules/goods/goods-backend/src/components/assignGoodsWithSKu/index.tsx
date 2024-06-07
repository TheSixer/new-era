import ProTable from '@ant-design/pro-table'
import { EGoodStatus } from '@wmeimob-modules/goods-data/src/enums/EGoodStatus'
import { GoodsVO } from '@wmeimob/backend-api'
import AlbumColumn from '@wmeimob/backend-pro/src/components/table/albumColumn'
import { Button, Drawer, DrawerProps, message, Space } from 'antd'
import { MMProColumns } from 'MMProType'
import { FC, memo, useEffect, useState } from 'react'
import useGoodClassifyColumn from '../../hooks/useGoodClassifyColumn'
import useGoodRequest from '../../hooks/useGoodRequest'
import GoodsSku from '../goodsSku'

interface IAssignGoodsWithSKuProps extends DrawerProps {
  value?: IValue

  onOk(value: IValue): void
}

interface IValue {
  goodsNo: string
  skuNo: string
}

/**
 * 选择商品sku
 * @param props
 * @returns
 */
const Component: FC<IAssignGoodsWithSKuProps> = (props) => {
  const { value, visible, onClose, onOk } = props

  const [classifyColumn] = useGoodClassifyColumn()
  const { request } = useGoodRequest()
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])

  const [selectSkuNo, setSelectSkuNo] = useState('')

  const [chooseColumns] = useState<MMProColumns<GoodsVO>[]>([
    { title: '商品编号', dataIndex: 'goodsNo' },
    { title: '商品名称', dataIndex: 'goodsName' },
    { title: '商品icon', dataIndex: 'coverImg', hideInSearch: true, render: (value: any) => <AlbumColumn value={value} /> },
    classifyColumn,
    { title: '价格', dataIndex: 'salePrice', valueType: 'money', hideInSearch: true },
    { title: '总库存', dataIndex: 'stock', hideInSearch: true },
    { title: '销量', dataIndex: 'actualSales', hideInSearch: true },
    { title: '上架状态', dataIndex: 'shelved', hideInSearch: true, renderText: (shelved: boolean) => (shelved ? '上架' : '下架') }
  ])

  useEffect(() => {
    setSelectedRowKeys(visible && value ? [value.goodsNo] : [])
  }, [visible, value])

  const handleOk = () => {
    // const values = [...new Set(value.concat(selectedRowKeys))]
    if (selectedRowKeys.length && selectSkuNo) {
      onOk({
        goodsNo: selectedRowKeys[0],
        skuNo: selectSkuNo
      })
    } else {
      message.warning('请选择一个商品sku')
    }
  }

  return (
    <Drawer
      title="选择商品"
      width="80%"
      visible={visible}
      closable={false}
      maskClosable={false}
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Space>
            <Button onClick={(ev: any) => onClose?.(ev)}>取消</Button>
            <Button type="primary" onClick={handleOk}>
              确定
            </Button>
          </Space>
        </div>
      }
    >
      <ProTable
        columns={chooseColumns}
        rowKey="goodsNo"
        toolBarRender={false}
        // params={{ shelved: EGoodStatus.shelved }}
        tableAlertRender={false}
        rowSelection={{
          type: 'radio',
          selectedRowKeys,
          onChange: (keys: any[]) => {
            setSelectSkuNo('')
            setSelectedRowKeys(keys)
          }
        }}
        expandable={{
          expandedRowKeys: selectedRowKeys,
          rowExpandable: ({ goodsNo }) => selectedRowKeys.includes(goodsNo!),
          expandedRowRender: (record) => <GoodsSku goodsNo={record.goodsNo!} onSkuChecked={(skuNo) => setSelectSkuNo(skuNo)} />
        }}
        request={request}
      />
    </Drawer>
  )
}

Component.displayName = 'AssignGoodsWithSKu'

const AssignGoodsWithSKu = memo(Component)
export default AssignGoodsWithSKu
