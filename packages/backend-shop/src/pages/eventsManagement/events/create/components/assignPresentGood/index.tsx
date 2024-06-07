import { FC, memo, useEffect, useState } from 'react'
import { IAssignPresentGoodProps } from './const'
import ProTable from '@ant-design/pro-table'
import { Drawer, Space, Button, message } from 'antd'
import { EGoodStatus } from '~/enums/good/EGoodStatus'
import { MMProColumns } from 'MMProType'
import { GoodsVO } from '@wmeimob/backend-api'
import useGoodClassifyColumn from '~/hooks/good/useGoodClassifyColumn'
import useGoodRequest from '~/hooks/good/useGoodRequest'
import AlbumColumn from '@wmeimob/backend-pro/src/components/table/albumColumn'
import GoodsSku from '../goodsSku'

const Component: FC<IAssignPresentGoodProps> = (props) => {
  const { value = [], visible, onClose, onOk } = props

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
    { title: '销量', dataIndex: 'actualSales', hideInSearch: true }
  ])

  useEffect(() => {
    setSelectedRowKeys(visible ? [...value] : [])
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
        params={{ shelved: EGoodStatus.shelved }}
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

Component.displayName = 'AssignPresentGood'

const AssignPresentGood = memo(Component)
export default AssignPresentGood
