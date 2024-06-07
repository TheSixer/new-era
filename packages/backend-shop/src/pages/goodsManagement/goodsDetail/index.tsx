import { ProColumns } from '@ant-design/pro-table'
import MMGoodsDetailPage, { useService } from '@wmeimob-modules/goods-backend/src/pages/goodsDetail'
import { history } from 'umi'
import { systemConfig } from '~/config'
import { GoodsSkuDTO } from '@wmeimob/backend-api'

export default function Page() {
  const { query = {} } = history.location

  const service = useService({
    goodsNo: query.goodsNo as string,
    columns: [
      { dataIndex: 'salesPrice', title: '销售价（元)', valueType: 'money' },
      {
        dataIndex: 'marketPrice', title: '市场价（元)', valueType: 'money', render: (val, record) => {
          return !!record.marketPrice ? val : '-'
        }
      },
      { dataIndex: 'weight', title: `重量(${systemConfig.goodConfig.weightUnit})` },
      { dataIndex: 'volume', title: `体积(${systemConfig.goodConfig.volumeUnit})` },
      { dataIndex: 'stock', title: '库存' },
      { dataIndex: 'customStartSales', title: '虚拟销量' },
      systemConfig.config.enableScore && { dataIndex: 'score', title: '奖励积分' },
      {
        dataIndex: 'enabled',
        title: '启用',
        render: (val) => (val ? '是' : '否')
      }
    ].filter((item) => item !== false) as unknown as ProColumns<GoodsSkuDTO>[]
  })

  return <MMGoodsDetailPage service={service} enableScore={systemConfig.config.enableScore} />
}
