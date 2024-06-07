import MMPreSaleActivityCreatePage, { useService } from '@wmeimob-modules/activity-backend/src/pages/preSale/create'
import { history } from 'umi'

const Page = () => {
  const query = history.location.query as { activityNo?: string }
  return <MMPreSaleActivityCreatePage service={useService({ activityNo: query.activityNo })} />
}

export default Page
