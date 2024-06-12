import { FC, memo, useEffect } from 'react'
import { Avatar, Card, Form, Space, Table, Typography } from 'antd'
import styles from './index.module.less'
import { RefundItemDto } from '@wmeimob/backend-api'
import { afterDetailAtom, refundGoodsListAtom } from '../../store'
import { useAtomValue } from 'jotai'
import { ERefundStatus } from '@wmeimob/shop-data/src/enums/refund/ERefundStatus'
import mmCurrenty, { mmAdds } from '@wmeimob/utils/src/mmCurrency'
import { getResizeUrl } from '@wmeimob/tencent-cloud'
import { IGoodsCardProps } from './const'
import ProTable, { ProColumns } from '@ant-design/pro-table'
import { ProFormDigit } from '@ant-design/pro-form'
import { ERefundType } from '@wmeimob/shop-data/src/enums/refund/ERefundType'
import { EFreightState } from '~/enums/aftersale/EFreightState'
import ProFormInfo from '@wmeimob/backend-pro/src/components/form/proFormInfo'
import { MGoodShippingStatus } from '~/enums/order/EGoodShippingStatus'
import currency from 'currency.js'
import { systemConfig } from '~/config'
const { config } = systemConfig

const GoodCardColumn: FC<{ goods?: RefundItemDto }> = (props) => {
  const { goods = {} } = props

  return (
    <Space>
      <Avatar src={goods.skuImg + getResizeUrl({ width: 64 })} size={64} shape="square" />

      <div className={styles.goodsItem}>
        <Space direction="vertical" size={4} style={{ width: '100%' }}>
          <b>{goods.goodsName}</b>
          <span>sku编码: {goods.skuNo}</span>
          <span>商品规格: {goods.model}</span>
          <span>退货数量:{goods.refundQuantity}</span>
        </Space>
      </div>
    </Space>
  )
}

const Component: FC<IGoodsCardProps> = ({ form }) => {
  const detail = useAtomValue(afterDetailAtom)
  const refundGoodsList = useAtomValue(refundGoodsListAtom)

  const { refundType, freightState, refundStatus, orderFreightAmount = 0 } = detail
  /**
   * 是否渲染退款金额
   * 退款同意 或者 退货退款-商家验货同意
   */
  const isRenderAmount =
    (refundType === ERefundType.Refund && refundStatus === ERefundStatus.StoreProcess) ||
    (refundType === ERefundType.Every && refundStatus === ERefundStatus.StoreCheck)

  // 是否可以退运费
  const isRenderFreigthAmount = isRenderAmount && freightState === EFreightState.Can

  const isComplete = [ERefundStatus.Complete, ERefundStatus.Process].includes(refundStatus!) // 售后单是否完成

  const refundAmountColumn = { title: '退款金额', dataIndex: 'refundAmount', width: 140, fixed: 'right', valueType: 'money' }
  const refundScoreColumn = { title: '可退积分', dataIndex: 'refundScore', width: 140, fixed: 'right' }

  const columns = (
    [
      {
        title: '商品',
        dataIndex: 'goodsName',
        width: 400,
        render: (value, record) => <GoodCardColumn goods={record} />
      },
      { title: '货物状态', dataIndex: 'goodShippingStatus', width: 100, valueEnum: MGoodShippingStatus },
      { title: '销售价', dataIndex: 'goodsPrice', width: 100, valueType: 'money' },
      { title: '购买价', dataIndex: 'realAmount', width: 100, valueType: 'money' },
      { title: '申请金额', dataIndex: 'applyRefundAmount', width: 100, valueType: 'money' },
      isComplete && refundAmountColumn,
      isComplete && refundScoreColumn,
      isRenderAmount && {
        ...refundAmountColumn,
        render: (_, { realAmount = 0 }, index) => {
          return (
            <>
              <ProFormInfo name={['data', index, 'skuNo']} hidden />
              <ProFormInfo name={['data', index, 'goodsNo']} hidden />
              <ProFormDigit
                name={['data', index, 'refundAmount']}
                wrapperCol={{ span: 24 }}
                rules={[{ required: true }]}
                fieldProps={{ min: 0, max: realAmount, precision: 2 }}
                extra={`最多可退${mmCurrenty(realAmount)}`}
              />
            </>
          )
        }
      },
      config.enableScore &&
        isRenderAmount && {
          ...refundScoreColumn,
          render: (_, record, index) => {
            const { applyRefundScore = 0 } = record
            return (
              <ProFormDigit
                name={['data', index, 'refundScore']}
                wrapperCol={{ span: 24 }}
                rules={[{ required: true }]}
                fieldProps={{ precision: 0, min: 0, max: applyRefundScore }}
                extra={`使用${applyRefundScore}积分`}
              />
            )
          }
        }
    ] as (ProColumns<RefundItemDto> | false)[]
  ).filter((item) => item !== false) as ProColumns<RefundItemDto>[]

  const x = columns.reduce((total, item) => mmAdds(total, item.width || 100), 0)

  /**
   * 退货明细表单默认给予值填充
   */
  useEffect(() => {
    const data = refundGoodsList.map((it) => ({ ...it, refundScore: it.applyRefundScore || 0 }))
    form.setFieldsValue({ data, freightAmount: currency(orderFreightAmount) })
  }, [refundGoodsList])

  return (
    <Card title="退货明细" className={styles.card}>
      <Form form={form}>
        <ProTable
          dataSource={refundGoodsList}
          columns={columns}
          scroll={{ x }}
          summary={() =>
            isRenderFreigthAmount && (
              <>
                <Table.Summary.Row className={styles.tableRow}>
                  <Table.Summary.Cell index={0} colSpan={columns.length}>
                    <Space>
                      <span>退运费金额:</span>

                      <div style={{ width: 150 }}>
                        <ProFormDigit
                          name="freightAmount"
                          fieldProps={{ max: orderFreightAmount, min: 0, precision: 2 }}
                          rules={[{ required: true }]}
                          wrapperCol={{ span: 24 }}
                        />
                      </div>

                      <Typography.Text type="secondary">{`订单运费仅可退一次。本次最多可退${mmCurrenty(orderFreightAmount)}元`}</Typography.Text>
                    </Space>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </>
            )
          }
          rowKey="skuNo"
          toolBarRender={false}
          search={false}
          bordered
          pagination={false}
        />
      </Form>
    </Card>
  )
}
Component.displayName = 'GoodsCard'

const GoodsCard = memo(Component)
export default GoodsCard
