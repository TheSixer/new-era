import ProTable from '@ant-design/pro-table'
import { AdminGoodsGetParams, GoodsVO } from '@wmeimob/backend-api/src/request/data-contracts'
import AlbumColumn from '@wmeimob/backend-pro/src/components/table/albumColumn'
import { Button, Drawer, DrawerProps, Space } from 'antd'
import { MMProColumns } from 'MMProType'
import { FC, memo, useEffect, useState } from 'react'
import useGoodClassifyColumn from '../../../hooks/good/useGoodClassifyColumn'
import useGoodRequest from '../../../hooks/good/useGoodRequest'

export interface IChooseGoodsDrawerProps extends DrawerProps {
  value: string[]

  /** 额外请求参数 */
  requestParams?(): { [P in keyof AdminGoodsGetParams]: any }

  onOk(value: string[]): void
}

/**
 *
 * FIXME: 此文件是复制的backend-shop/src/components/goods中的文件。文件内容
 * 基本一致，后期可直接使用此组件替换
 * @param props
 * @returns
 */
const Component: FC<IChooseGoodsDrawerProps> = (props) => {
  const { value, visible, requestParams, onClose, onOk, ...drawerProps } = props

  const [classifyColumn] = useGoodClassifyColumn()
  const { request, dataSource: dataSourceRef } = useGoodRequest()
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])

  const [chooseColumns] = useState<MMProColumns<GoodsVO>[]>([
    { title: '商品编号', dataIndex: 'goodsNo' },
    { title: '商品名称', dataIndex: 'goodsName' },
    { title: '商品icon', dataIndex: 'coverImg', hideInSearch: true, render: (value: any) => <AlbumColumn value={value} width={60} /> },
    classifyColumn,
    { title: '价格', dataIndex: 'salePrice', valueType: 'money', hideInSearch: true },
    { title: '总库存', dataIndex: 'stock', hideInSearch: true },
    { title: '销量', dataIndex: 'actualSales', hideInSearch: true },
    { title: '上架状态', dataIndex: 'shelved', hideInSearch: true, renderText: (shelved: boolean) => (shelved ? '上架' : '下架') }
  ])

  useEffect(() => {
    setSelectedRowKeys(visible ? [...value] : [])
  }, [visible])

  const handleOk = () => {
    // const values = [...new Set(value.concat(selectedRowKeys))]
    onOk(selectedRowKeys)
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
      {...drawerProps}
    >
      <ProTable
        columns={chooseColumns}
        rowKey="goodsNo"
        toolBarRender={false}
        size="small"
        rowSelection={{
          selectedRowKeys,
          onChange: (keys: any[]) => {
            // 去除当前列的keys
            const currentRowIds = dataSourceRef.current!.map((item) => item.goodsNo)
            const otherKeys = value.filter((item) => currentRowIds.indexOf(item) === -1)
            // 合并所有的列
            setSelectedRowKeys([...new Set([...keys, ...otherKeys])])
          }
        }}
        request={(params, ...args) => {
          return request({ ...params, ...requestParams?.() }, ...args)
        }}
      />
    </Drawer>
  )
}

Component.displayName = 'ChooseGoodsDrawer'

const ChooseGoodsDrawer = memo(Component)
export default ChooseGoodsDrawer
