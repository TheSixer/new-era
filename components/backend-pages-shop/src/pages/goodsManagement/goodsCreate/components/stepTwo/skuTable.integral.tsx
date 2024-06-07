/* eslint-disable id-length */
import { ProFormDigit, ProFormSwitch, ProFormText } from '@ant-design/pro-form'
import { Form, Table, Typography } from 'antd'
import { DefaultOptionType } from 'antd/lib/select'
import { ColumnType } from 'antd/lib/table'
import { FC, memo, useEffect, useMemo, useState } from 'react'
import { GoodsSkuDTO } from '@wmeimob/backend-api/src/request/data-contracts'
import ImageList from '../imageList'
import { mmAdds } from '@wmeimob/utils/src/mmCurrency'
import { getGlobalData } from '@wmeimob/backend-store'

const { goodConfig } = getGlobalData('systemConfig')

interface ISkuTableProps {
  value?: GoodsSkuDTO[]

  topSkus: DefaultOptionType[]

  onChange?(data: GoodsSkuDTO[]): void
}

const Component: FC<ISkuTableProps> = (props) => {
  const { value = [], topSkus = [] } = props
  const [current, setCurrent] = useState(1)
  const pageSize = 10

  useEffect(() => {
    setCurrent(1)
  }, [topSkus])

  const columns = useMemo(() => {
    const getIndex = (index: number) => (current - 1) * pageSize + index
    const commonColumns = [
      {
        dataIndex: 'skuImg',
        title: 'sku图片',
        with: 375,
        render: (val, _, index) => {
          return (
            <>
              <ProFormText name={['goodsSkuList', getIndex(index), 'skuName']} hidden />
              <ProFormDigit name={['goodsSkuList', getIndex(index), 'score']} initialValue={0} hidden />
              <Form.Item name={['goodsSkuList', getIndex(index), 'skuImg']} rules={[{ required: true, message: '请至少选择一张图片' }]}>
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
                <ProFormDigit name={['goodsSkuList', getIndex(index), 'id']} />
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
          return (
            <ProFormDigit
              name={['goodsSkuList', getIndex(index), 'salesPrice']}
              fieldProps={{ precision: 2, min: 0, max: 999999 }}
              rules={[{ required: true }]}
            />
          )
        }
      },
      {
        dataIndex: 'exchangeIntegral',
        title: '兑换积分',
        width: 140,
        render: (_, __, index) => (
          <ProFormDigit
            name={['goodsSkuList', getIndex(index), 'exchangeIntegral']}
            fieldProps={{ min: 1, max: 999999, precision: 0 }}
            rules={[{ required: true }]}
          />
        )
      },
      // {
      //   dataIndex: 'marketPrice',
      //   title: '市场价（元)',
      //   width: 140,
      //   render: (val, _, index) => {
      //     return (
      //       <ProFormDigit
      //         name={['goodsSkuList', getIndex(index), 'marketPrice']}
      //         fieldProps={{ precision: 2, min: 0, max: 999999 }}
      //         rules={[{ required: true }]}
      //       />
      //     )
      //   }
      // },
      {
        dataIndex: 'weight',
        title: `重量(${goodConfig.weightUnit})`,
        width: 140,
        render: (val, _, index) => {
          return (
            <ProFormDigit name={['goodsSkuList', getIndex(index), 'weight']} fieldProps={{ precision: 2, min: 0, max: 999999 }} rules={[{ required: true }]} />
          )
        }
      },
      {
        dataIndex: 'volume',
        title: `体积(${goodConfig.volumeUnit})`,
        width: 140,
        render: (val, _, index) => {
          return (
            <ProFormDigit name={['goodsSkuList', getIndex(index), 'volume']} fieldProps={{ precision: 2, min: 0, max: 999999 }} rules={[{ required: true }]} />
          )
        }
      },
      {
        dataIndex: 'stock',
        title: '库存',
        width: 140,
        render: (val, record, index) => {
          return (
            <ProFormDigit
              name={['goodsSkuList', getIndex(index), 'stock']}
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
          return (
            <ProFormDigit
              name={['goodsSkuList', getIndex(index), 'customStartSales']}
              fieldProps={{ min: 0, max: 999999, precision: 0 }}
              rules={[{ required: true }]}
            />
          )
        }
      },

      {
        dataIndex: 'enabled',
        title: '启用',
        width: 100,
        fixed: 'right',
        render: (val, _, index) => {
          return <ProFormSwitch name={['goodsSkuList', getIndex(index), 'enabled']} />
        }
      }
    ] as ColumnType<GoodsSkuDTO>[]

    return topSkus
      .map((it, index) => {
        return {
          dataIndex: it.value,
          title: it.label,
          render: (_, record: GoodsSkuDTO) => {
            const { specNames = '' } = record
            return specNames.split(',')[index]
          }
        } as ColumnType<GoodsSkuDTO>
      })
      .concat(commonColumns)
  }, [topSkus, current])

  const x = useMemo(() => columns.reduce((total, item) => mmAdds(total, item.width || 120), 0), [columns])

  return (
    <>
      {!!value.length && <Typography.Text type="secondary">已组合{value.length}项</Typography.Text>}
      <Table
        columns={columns}
        dataSource={value}
        rowKey="specIds"
        scroll={{ x }}
        pagination={{ current, pageSize, showSizeChanger: false }}
        onChange={(pagination) => {
          setCurrent(pagination.current!)
        }}
        style={{ marginTop: 5 }}
      />
    </>
  )
}

Component.displayName = 'SkuTable'

const SkuTable = memo(Component)
export default SkuTable
