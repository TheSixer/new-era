import MMIntegralGoodsListPage, { useService } from '@wmeimob-modules/goods-backend/src/pages/integralGoodsList'
import { history } from 'umi'
import { routeNames } from '~/routes'

export default function Page() {
  const service = useService({
    onEdit: (record) => history.push({ pathname: routeNames.integralGoodsManagementGoodsListGoodsCreate, query: { goodsNo: `${record.goodsNo}` } }),
    onCopy: (record) => history.push({ pathname: routeNames.integralGoodsManagementGoodsListGoodsCreate, query: { goodsNo: `${record.goodsNo}`, type: 'copy' } }),
    onDetail: (record) => history.push({ pathname: routeNames.integralGoodsManagementGoodsListGoodsDetail, query: { goodsNo: `${record.goodsNo}` } }),
    onStock: (record) => history.push({ pathname: routeNames.integralGoodsManagementGoodsListGoodsStock, query: { goodsNo: `${record.goodsNo}` } })
  })

  return <MMIntegralGoodsListPage service={service} onAdd={() => history.push(routeNames.integralGoodsManagementGoodsListGoodsCreate)} />
}
