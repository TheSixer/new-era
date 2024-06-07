import MMFreeShippingActivityListPage from '@wmeimob-modules/activity-backend/src/pages/freeShipping/list'
import { history } from 'umi'
import { routeNames } from '~/routes'

const Page = () => (
  <MMFreeShippingActivityListPage
    onAdd={() => history.push({ pathname: routeNames.marketingActivityFreeShippingCreate })}
    onEdit={(activity) =>
      history.push({
        pathname: routeNames.marketingActivityFreeShippingCreate,
        query: {
          activityNo: activity.activityNo!
        }
      })
    }
  />
)

export default Page
