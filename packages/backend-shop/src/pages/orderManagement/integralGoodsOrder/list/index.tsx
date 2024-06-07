import MMIntegralGoodsOrderListPage from '@wmeimob-modules/order-backend/src/integralGoodsOrder/list'
import { useIntegralGoodsOrderListService } from '@wmeimob-modules/order-backend/src/integralGoodsOrder/list/hooks/useIntegralGoodsOrderListService'
import { FC, memo } from 'react'
import { history } from 'umi'
import { routeNames } from '~/routes'

interface IListProps {}

const Component: FC<IListProps> = (props) => {
  const service = useIntegralGoodsOrderListService({
    onDetail: ({ orderNo = '' }) => history.push({ pathname: routeNames.orderManagementIntegralGoodsOrderDetail, query: { orderNo } })
  })

  return <MMIntegralGoodsOrderListPage service={service} />
}

const List = memo(Component)
export default List
