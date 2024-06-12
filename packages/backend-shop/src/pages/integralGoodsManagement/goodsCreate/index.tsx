import { ProFormDigit, ProFormSwitch, ProFormText } from '@ant-design/pro-form'
import MMGoodsCreatePage, { ImageList, useService } from '@wmeimob-modules/goods-backend/src/pages/goodscreate'
import { Form } from 'antd'
import { history } from 'umi'
import { api } from '~/request'
import { systemConfig } from '~/config'
import { ColumnType } from 'antd/lib/table'
import { EGoodsType } from '@wmeimob/shop-data/goods/enums/EGoodsType'
import { upload } from '~/components/tencent-cloud'

export default function Page() {
  const goodsType = EGoodsType.Integral
  // 业务
  const service = useService({
    query: history.location.query as any,
    api: {
      query: api['/admin/goods/{no}_GET'],
      save: (data) => api['/admin/goods/save_POST']({ ...data, goodsType })
    }
  })

  const skuColumnsRender = ({ itemName }) => {
    return [
      {
        dataIndex: 'skuImg',
        title: 'sku图片',
        width: 375,
        render: (_v, _, index) => {
          return (
            <>
              <ProFormText name={itemName(index, 'skuName')} hidden />
              <ProFormDigit name={itemName(index, 'score')} initialValue={0} hidden />
              <Form.Item name={itemName(index, 'skuImg')} rules={[{ required: true, message: '请至少选择一张图片' }]}>
                <ImageList multiple={false} badge={false} />
              </Form.Item>
            </>
          )
        }
      },
      {
        dataIndex: 'skuNo',
        title: 'sku编码',
        width: 200,
        render: (skuNo, _, index) => {
          return (
            <>
              <div>{skuNo || '自动生成'}</div>
              <div style={{ display: 'none' }}>
                <ProFormDigit name={itemName(index, 'id')} />
              </div>
            </>
          )
        }
      },
      systemConfig.config.enableIntegralGoodsPrice && {
        dataIndex: 'salesPrice',
        title: '销售价（元)',
        width: 140,
        render: (val, _, index) => {
          return <ProFormDigit name={itemName(index, 'salesPrice')} fieldProps={{ precision: 2, min: 0, max: 999999 }} rules={[{ required: true }]} />
        }
      },
      {
        dataIndex: 'exchangeIntegral',
        title: '兑换积分',
        width: 140,
        render: (_, __, index) => (
          <ProFormDigit name={itemName(index, 'exchangeIntegral')} fieldProps={{ min: 1, max: 999999, precision: 0 }} rules={[{ required: true }]} />
        )
      },
      {
        dataIndex: 'weight',
        title: `重量(${systemConfig.goodConfig.weightUnit})`,
        width: 140,
        render: (val, _, index) => {
          return <ProFormDigit name={itemName(index, 'weight')} fieldProps={{ precision: 2, min: 0, max: 999999 }} rules={[{ required: true }]} />
        }
      },
      {
        dataIndex: 'volume',
        title: `体积(${systemConfig.goodConfig.volumeUnit})`,
        width: 140,
        render: (val, _, index) => {
          return <ProFormDigit name={itemName(index, 'volume')} fieldProps={{ precision: 2, min: 0, max: 999999 }} rules={[{ required: true }]} />
        }
      },
      {
        dataIndex: 'stock',
        title: '库存',
        width: 140,
        render: (val, record, index) => {
          return (
            <ProFormDigit
              name={itemName(index, 'stock')}
              disabled={!!record.id}
              fieldProps={{ min: 1, max: 999999, precision: 0 }}
              rules={[{ required: true }]}
            />
          )
        }
      },
      {
        dataIndex: 'stock',
        title: '虚拟销量',
        width: 140,
        render: (val, record, index) => {
          return <ProFormDigit name={itemName(index, 'customStartSales')} fieldProps={{ min: 0, max: 999999, precision: 0 }} rules={[{ required: true }]} />
        }
      },
      {
        dataIndex: 'enabled',
        title: '启用',
        width: 100,
        fixed: 'right',
        render: (val, _, index) => <ProFormSwitch name={itemName(index, 'enabled')} />
      }
    ].filter((item) => item !== false) as unknown as ColumnType<any>[]
  }

  return <MMGoodsCreatePage service={service} skuColumnsRender={skuColumnsRender} goodsType={goodsType} formConfig={{ enableScore: false }} upload={upload} />
}
