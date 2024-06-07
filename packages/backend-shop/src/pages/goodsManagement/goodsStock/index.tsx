import MMGoodsStockPage, { useService } from '@wmeimob-modules/goods-backend/src/pages/goodsStock'
import { history } from 'umi'

export default function Page() {
  const { query = {} } = history.location

  const service = useService({
    goodsNo: query.goodsNo as string
  })

  return <MMGoodsStockPage service={service} />
}
