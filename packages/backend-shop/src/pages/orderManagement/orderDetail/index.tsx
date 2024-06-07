import { FC, memo, useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { PageContainer } from '@ant-design/pro-layout'
import { api } from '~/request'
import useOrderTypes from '~/hooks/useOrderTypes'
import { EOrderStatus } from '@wmeimob/shop-data/src/enums/order/EOrderStatus'
import { useAtom } from 'jotai'
import { orderDetailAtom } from './store'
import { Button, Space } from 'antd'
import CloseCard from './components/closeCard'
import DetailInfoCard from './components/detailInfoCard'
import GoodsCard from './components/goodsCard'
import InfoCard from './components/infoCard'
import ShippingCard from './components/shippingCard'
import ExpressCard from './components/expressCard'
import useProTableForm from '@wmeimob/backend-pro/src/hooks/useProTableForm'
import DeliverModal from '../orderList/components/deliverModal'

const Component: FC<RouteComponentProps> = (props) => {
  const { history } = props

  const [loading, setLoading] = useState(true)
  const [detail, setDetail] = useAtom(orderDetailAtom)
  const { orderNo } = history.location.query as { orderNo?: string }

  const { orderState } = useOrderTypes(detail.orderStatus)

  async function getDetail(orderNo: string) {
    setLoading(true)
    const { data = {} } = await api['/admin/orders/{orderNo}_GET'](orderNo)
    setDetail(data)
    setLoading(false)
  }

  useEffect(() => {
    orderNo && getDetail(orderNo)
  }, [orderNo])

  const { modalProps, editData, setEditData, setVisible } = useProTableForm({ title: () => '订单发货' })

  return (
    <PageContainer
      loading={loading}
      footer={[
        <Button key="back" type="primary" onClick={() => history.goBack()}>
          返回
        </Button>,
        orderState === EOrderStatus.UNSHIPPED && (
          <Button
            key="express"
            type="primary"
            onClick={() => {
              modalProps.form.setFieldsValue(detail)
              setEditData(detail)
              setVisible(true)
            }}
          >
            发货
          </Button>
        )
      ]}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        {/* 订单信息 */}
        <InfoCard />
        {/* 订单信息 */}
        <DetailInfoCard />
        {/* 收件信息 */}
        <ShippingCard />

        {/* 商品明细 */}
        <GoodsCard />
        {/* 物流信息 */}
        <ExpressCard />
        {/* 关闭信息 */}
        <CloseCard />
      </Space>

      <DeliverModal
        order={editData as any}
        modalProps={{ ...modalProps }}
        onFinish={() => {
          setVisible(false)
          history.goBack()
        }}
      />
    </PageContainer>
  )
}

Component.displayName = 'OrderDetail'

const OrderDetail = memo(Component)
export default OrderDetail
