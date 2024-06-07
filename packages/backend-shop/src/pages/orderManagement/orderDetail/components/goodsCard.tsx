import { FC, memo } from 'react'
import { Card } from 'antd'
import styles from './styles.module.less'
import { OrderItemsVO } from '@wmeimob/backend-api'
import { useAtomValue } from 'jotai'
import { orderDetailAtom } from '../store'
import GoodCardColumn from './goodCardColumn'
import ProTable from '@ant-design/pro-table'
import { MMProColumns } from 'MMProType'

export interface IProps {}

const Component: FC<IProps> = (props) => {
  const detail = useAtomValue(orderDetailAtom)

  const columns: MMProColumns<OrderItemsVO>[] = [
    {
      title: '商品',
      dataIndex: 'goodsName',
      render: (value, record) => <GoodCardColumn good={record} />
    },

    { title: '单价', dataIndex: 'salePriceStr' },
    { title: '数量', dataIndex: 'saleQuantity' },
    { title: '优惠减免', dataIndex: 'discountAmountStr' },
    { title: '小计', dataIndex: 'itemsPayAmountStr' }
  ]

  return (
    <Card title="商品信息" className={styles.card}>
      <ProTable search={false} toolBarRender={false} dataSource={detail.items} columns={columns} rowKey="skuNo" bordered pagination={false} />
    </Card>
  )
}
Component.displayName = 'GoodsCard'

const GoodsCard = memo(Component)
export default GoodsCard
