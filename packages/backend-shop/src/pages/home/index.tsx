import MMMainAnalysisPage from '@wmeimob/backend-pages-shop/src/pages/dashboard/mainAnalysis'
import { history } from 'umi'
import { routeNames } from '~/routes'

export default function Page() {
  return (
    <MMMainAnalysisPage onOrderDetail={({ orderNo = '' }) => history.push({ pathname: routeNames.orderManagementOrderListOrderDetail, query: { orderNo } })} />
  )
}
