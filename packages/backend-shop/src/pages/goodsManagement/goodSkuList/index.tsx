import { FC, memo } from 'react'
import { history } from 'umi'
import { routeNames } from '~/routes'
import PageGoodsSkuList, { useService } from '@wmeimob-modules/goods-backend/src/pages/goodsSkuList'

const Component: FC = () => {
  const service = useService({
    onChildSkuClick: (record) => {
      history.push({ pathname: routeNames.goodsManagementGoodSkuListGoodSkuListChild, query: { pid: `${record.id}` } })
    }
  })

  return <PageGoodsSkuList service={service} />
}

Component.displayName = 'GoodSkuList'

const GoodSkuList = memo(Component)
export default GoodSkuList
