import MMIntegralGoodsOrderDetailPage from '@wmeimob-modules/order-backend/src/integralGoodsOrder/detail'
import { useIntegralGoodsOrderDetailService } from '@wmeimob-modules/order-backend/src/integralGoodsOrder/detail/hooks/useIntegralGoodsOrderDetailService'
import { FC, memo } from 'react'
import { history } from 'umi'

interface IDetailProps {}

const Component: FC<IDetailProps> = (props) => {
  const { query }: any = history.location

  const service = useIntegralGoodsOrderDetailService({
    orderNo: query.orderNo
  })

  return <MMIntegralGoodsOrderDetailPage service={service} />
}

const Detail = memo(Component)
export default Detail
