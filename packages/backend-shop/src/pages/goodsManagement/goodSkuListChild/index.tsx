import { FC, memo } from 'react'
import { history } from 'umi'
import PageGoodsSkuList, { useService } from '@wmeimob-modules/goods-backend/src/pages/goodsSkuList'

const Component: FC = () => {
  const { pid = '' }: any = history.location.query || {}

  const service = useService({ pid })

  return <PageGoodsSkuList service={service} />
}

const GoodSkuList = memo(Component)
export default GoodSkuList
