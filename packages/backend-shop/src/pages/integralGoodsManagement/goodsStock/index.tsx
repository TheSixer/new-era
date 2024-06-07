import MMGoodsStockPage, { useService } from '@wmeimob-modules/goods-backend/src/pages/goodsStock'
import { history } from 'umi'
import { systemConfig } from '~/config'

export default function Page() {
  const { query = {} } = history.location

  const service = useService({
    goodsNo: query.goodsNo as string,
    showPrice: systemConfig.config.enableIntegralGoodsPrice
  })

  return <MMGoodsStockPage service={service} />
}
