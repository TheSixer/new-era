import MMFreeShippingActivityCreatePage from '@wmeimob-modules/activity-backend/src/pages/freeShipping/create'
import { history } from 'umi'

const Page = () => {
  const query = history.location.query as { activityNo?: string }
return <MMFreeShippingActivityCreatePage activityNo={query.activityNo} />}

export default Page
