import { ProFormDigit, ProFormSwitch, ProFormText } from '@ant-design/pro-form'
import MMGoodsCreatePage, { ImageList, useService } from '@wmeimob-modules/goods-backend/src/pages/goodscreate'
import { Form } from 'antd'
import { ColumnType } from 'antd/lib/table'
import { history } from 'umi'
import { upload } from '~/components/aliyun'
import { systemConfig } from '~/config'
import { api } from '~/request'
import { GoodsSkuDTO } from '@wmeimob/backend-api'

const { goodConfig, config } = systemConfig

export default function Page() {
  // 业务
  const service = useService({
    query: history.location.query as any,
    api: {
      query: api['/admin/goods/{no}_GET'],
      save: api['/admin/goods/save_POST']
    }
  })

  const skuColumnsRender = ({ itemName }) => {
    return [
      {
        dataIndex: 'skuImg',
        title: 'sku图片',
        with: 375,
        render: (val, _, index) => {
          return (
            <>
              <ProFormText name={itemName(index, 'skuName')} hidden />
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
      {
        dataIndex: 'salesPrice',
        title: '销售价（元)',
        width: 140,
        render: (val, _, index) => {
          return <ProFormDigit name={itemName(index, 'salesPrice')} fieldProps={{ precision: 2, min: 0.01, max: 999999 }} rules={[{ required: true }]} />
        }
      },
      {
        dataIndex: 'marketPrice',
        title: '市场价（元)',
        width: 140,
        render: (val, _, index) => {
          return <ProFormDigit name={itemName(index, 'marketPrice')} fieldProps={{ precision: 2, min: 0.01, max: 999999 }} />
        }
      },
      {
        dataIndex: 'weight',
        title: `重量(${goodConfig.weightUnit})`,
        width: 140,
        render: (val, _, index) => {
          return <ProFormDigit name={itemName(index, 'weight')} fieldProps={{ precision: 2, min: 0, max: 999999 }} rules={[{ required: true }]} />
        }
      },
      {
        dataIndex: 'volume',
        title: `体积(${goodConfig.volumeUnit})`,
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
        dataIndex: 'customStartSales',
        title: '虚拟销量',
        width: 140,
        render: (val, record, index) => {
          return <ProFormDigit name={itemName(index, 'customStartSales')} fieldProps={{ min: 0, max: 999999, precision: 0 }} rules={[{ required: true }]} />
        }
      },
      config.enableScore && {
        dataIndex: 'score',
        title: '奖励积分',
        width: 140,
        render: (_, __, index) => (
          <ProFormDigit name={itemName(index, 'score')} fieldProps={{ min: 0, max: 999999, precision: 0 }} rules={[{ required: true }]} />
        )
      },
      {
        dataIndex: 'enabled',
        title: '启用',
        width: 100,
        fixed: 'right',
        render: (val, _, index) => {
          return <ProFormSwitch name={itemName(index, 'enabled')} />
        }
      }
    ].filter((item) => item !== false) as unknown as ColumnType<GoodsSkuDTO>[]
  }

  return <MMGoodsCreatePage service={service} skuColumnsRender={skuColumnsRender} upload={upload} />
}
