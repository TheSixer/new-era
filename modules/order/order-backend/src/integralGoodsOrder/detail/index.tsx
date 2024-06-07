import { PageContainer } from '@ant-design/pro-layout'
import { EOrderStatus } from '@wmeimob/shop-data/src/enums/order/EOrderStatus'
import { Button, Space } from 'antd'
import { FC, memo } from 'react'
import DeliverModal from '../list/components/deliverModal'
import CloseCard from './components/closeCard'
import DetailInfoCard from './components/detailInfoCard'
import ExpressCard from './components/expressCard'
import GoodsCard from './components/goodsCard'
import InfoCard from './components/infoCard'
import ShippingCard from './components/shippingCard'
import { useIntegralGoodsOrderDetailService } from './hooks/useIntegralGoodsOrderDetailService'

interface IDetailProps {
  service: ReturnType<typeof useIntegralGoodsOrderDetailService>
}

const Component: FC<IDetailProps> = (props) => {
  const { loading, orderState, deliverForm, onShipping } = props.service

  return (
    <PageContainer
      loading={loading}
      footer={[
        <Button key="back" type="primary" onClick={() => window.history.back()}>
          返回
        </Button>,
        orderState === EOrderStatus.UNSHIPPED && (
          <Button key="shipping" type="primary" onClick={onShipping}>
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

        {/* 收件/自提信息 */}
        <ShippingCard />

        {/* 商品明细 */}
        <GoodsCard />

        {/* 物流信息 */}
        <ExpressCard />

        {/* 关闭信息 */}
        <CloseCard />
      </Space>

      <DeliverModal
        order={deliverForm.editData as any}
        modalProps={{ ...deliverForm.modalProps }}
        onFinish={() => {
          deliverForm.setVisible(false)
          window.history.back()
        }}
      />
    </PageContainer>
  )
}

const MMIntegralGoodsOrderDetailPage = memo(Component)
export default MMIntegralGoodsOrderDetailPage
