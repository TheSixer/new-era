import { FC, memo } from 'react'
import { Card, Table, Space, Descriptions, Typography, Empty } from 'antd'
import { useAtomValue } from 'jotai'
import { orderDescriptionsPropsAtom, orderDetailAtom } from '../store'
import GoodCardColumn from './goodCardColumn'
import styles from './styles.module.less'
import { EOrderType } from '@wmeimob/shop-data/src/enums/order/EOrderType'

const Component: FC<any> = (props) => {
  const descriptionsProps = useAtomValue(orderDescriptionsPropsAtom)
  const { shippingList = [], selfPicked, orderType } = useAtomValue(orderDetailAtom)

  const columns = [
    {
      title: '商品',
      dataIndex: 'goodsName',
      render: (value, record) => <GoodCardColumn good={{ ...record, skuName: record.model }} />
    },
    { title: '数量', dataIndex: 'quantity' }
  ]

  if (orderType === EOrderType.Integral) {
    return (
      <Card title="物流信息" className={styles.expressCard}>
        {shippingList.length ? (
          shippingList.map((item) => {
            return (
              <Descriptions
                {...descriptionsProps}
                title={
                  <Space size={15}>
                    <Typography.Paragraph copyable={{ text: item.expressNo }}>运单编号: {item.expressNo}</Typography.Paragraph>
                    <span style={{ fontWeight: 'normal' }}>物流公司: {item.expressCompany}</span>
                    <span style={{ fontWeight: 'normal' }}>发货时间: {item.shippingTime}</span>
                  </Space>
                }
                key={item.expressNo}
                layout="vertical"
              >
                <Descriptions.Item label="发货明细">
                  <Table dataSource={item.orderShippingItemDtoList} columns={columns} rowKey="skuNo" bordered pagination={false} style={{ width: '100%' }} />
                </Descriptions.Item>
              </Descriptions>
            )
          })
        ) : (
          <Empty description={selfPicked ? '订单无需物流' : '无物流信息'} />
        )}
      </Card>
    )
  }

  return (
    <Card title="配送信息" className={styles.expressCard}>
      {shippingList.length ? (
        shippingList.map((item) => {
          return (
            <Descriptions {...descriptionsProps} key={item.expressNo} layout="vertical">
              <Descriptions.Item label="" labelStyle={{ width: 0 }}>
                <Space size={20}>
                  <span style={{ fontWeight: 'normal' }}>配送员: {item.rider?.name}</span>
                  <span style={{ fontWeight: 'normal' }}>联系电话: {item.rider?.mobile}</span>
                </Space>
              </Descriptions.Item>

              <Descriptions.Item label="发货明细">
                <Table dataSource={item.orderShippingItemDtoList} columns={columns} rowKey="skuNo" bordered pagination={false} style={{ width: '100%' }} />
              </Descriptions.Item>
            </Descriptions>
          )
        })
      ) : (
        <Empty description={selfPicked ? '订单无需物流' : '无物流信息'} />
      )}
    </Card>
  )
}
Component.displayName = 'ExpressCard'

const ExpressCard = memo(Component)
export default ExpressCard
