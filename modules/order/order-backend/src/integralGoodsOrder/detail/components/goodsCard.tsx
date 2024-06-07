import ProTable from '@ant-design/pro-table'
import { OrderItemsVO } from '@wmeimob/backend-api/src/request/data-contracts'
import { EGoodsType } from '@wmeimob/shop-data/goods/enums/EGoodsType'
import mmCurrenty from '@wmeimob/utils/src/mmCurrency'
import { Card } from 'antd'
import { useAtomValue } from 'jotai'
import { MMProColumns } from 'MMProType'
import { FC, memo } from 'react'
import { orderDetailAtom } from '../store'
import GoodCardColumn from './goodCardColumn'
import styles from './styles.module.less'

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

  // const summary: TableProps<OrderVO>['summary'] = (dataSource) => {
  //   return (
  //     <>
  //       <Table.Summary.Row>
  //         <Table.Summary.Cell index={0}>运费</Table.Summary.Cell>
  //         <Table.Summary.Cell index={1} colSpan={4}>
  //           {mmCurrenty(detail.freightAmount)}
  //         </Table.Summary.Cell>
  //       </Table.Summary.Row>

  //       <Table.Summary.Row>
  //         <Table.Summary.Cell index={0}>总计</Table.Summary.Cell>
  //         <Table.Summary.Cell index={1} colSpan={4}>
  //           {mmCurrenty(detail.payAmount)}
  //         </Table.Summary.Cell>
  //       </Table.Summary.Row>
  //     </>
  //   )
  // }

  function getGoodsPrice(goodsType: EGoodsType, salePrice = 0, exchangeIntegral = 0) {
    const price = mmCurrenty(salePrice)
    const integral = `${exchangeIntegral}积分`

    if (goodsType === EGoodsType.General) {
      return price
    }

    return salePrice ? `${price} + ${integral}` : integral
  }

  return (
    <Card title="商品信息" className={styles.card}>
      <ProTable search={false} toolBarRender={false} dataSource={detail.items} columns={columns} rowKey="skuNo" bordered pagination={false} />
    </Card>
  )
}
Component.displayName = 'GoodsCard'

const GoodsCard = memo(Component)
export default GoodsCard
