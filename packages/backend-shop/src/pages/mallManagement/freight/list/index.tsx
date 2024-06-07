import MMFreightListPage from '@wmeimob/backend-pages-shop/src/pages/mallManagement/freight/list'
import { history } from 'umi'
import { routeNames } from '~/routes'

export default function Page() {
  return (
    <MMFreightListPage
      onAdd={() => history.push(routeNames.mallManagementFreightListDetail)}
      onEdit={({ id }) => {
        history.push({
          pathname: routeNames.mallManagementFreightListDetail,
          query: { id: `${id}` }
        })
      }}
    />
  )
}
