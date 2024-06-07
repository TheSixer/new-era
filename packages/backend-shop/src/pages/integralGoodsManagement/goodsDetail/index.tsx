import MMGoodsDetailPage, { useService } from '@wmeimob-modules/goods-backend/src/pages/goodsDetail'
import { history } from 'umi'
import { systemConfig } from '~/config'

export default function Page() {
  const { query = {} } = history.location

  const service = useService({
    goodsNo: query.goodsNo as string,
    goodsType: 1,
    columns: (
      [
        systemConfig.config.enableIntegralGoodsPrice ? { dataIndex: 'salesPrice', title: '销售价（元)', valueType: 'money' } : false,
        { dataIndex: 'exchangeIntegral', title: '兑换积分' },
        // { dataIndex: 'marketPrice', title: '市场价（元)', valueType: 'money' },
        { dataIndex: 'weight', title: `重量(${systemConfig.goodConfig.weightUnit})` },
        { dataIndex: 'volume', title: `体积(${systemConfig.goodConfig.volumeUnit})` },
        { dataIndex: 'stock', title: '库存' },
        { dataIndex: 'customStartSales', title: '虚拟销量' },
        {
          dataIndex: 'enabled',
          title: '启用',
          render: (val) => (val ? '是' : '否')
        }
      ] as any[]
    ).filter((it) => !!it)
  })

  return <MMGoodsDetailPage service={service} />
}
