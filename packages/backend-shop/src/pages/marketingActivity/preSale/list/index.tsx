import MMPreSaleActivityListPage, { useService } from '@wmeimob-modules/activity-backend/src/pages/preSale/list'
import { history } from 'umi'
import { routeNames } from '~/routes'

const Page = () => (
  <MMPreSaleActivityListPage
    service={useService({
      onAdd: () => history.push({ pathname: routeNames.marketingActivityPreSaleCreate }),
      onEdit: (activity) => history.push({ pathname: routeNames.marketingActivityPreSaleCreate, query: { activityNo: activity.activityNo! } })
    })}
  />
)

export default Page
