import { FC, memo, useEffect, useMemo, useState } from 'react'
import styles from './index.module.less'
import { ISetGoodModalProps } from './const'
import { DrawerForm, ProFormDependency, ProFormDigit, ProFormSwitch } from '@ant-design/pro-form'
import { api } from '~/request'
import { GoodsSkuDTO, GoodsVO, MarketingActivityGoodsParam } from '@wmeimob/backend-api'
import ProTable from '@ant-design/pro-table'
import { MMProColumns } from 'MMProType'
import { useForm } from 'antd/lib/form/Form'
import RequiredStar from '~/components/requiredStar'
import mmFormRule from '@wmeimob/form-rules'

const Component: FC<ISetGoodModalProps> = (props) => {
  const { visible, good = {}, disabled = false, onChange, ...rest } = props

  const [form] = useForm()
  const [detail, setDetail] = useState<GoodsVO>({})
  const [skuList, setSkuList] = useState<any[]>([])

  useEffect(() => {
    async function getDetail() {
      if (good.goodsNo) {
        const { data = {} } = await api['/admin/goods/{no}_GET'](good.goodsNo)
        const { goodsSkuDetailList = [] } = data
        const { marketingActivitySkuParams = [] } = good
        const list = goodsSkuDetailList.map((it) => {
          const result = marketingActivitySkuParams.find((sku) => sku.skuNo === it.skuNo)
          return result ? { ...it, ...result, skuShow: !!result.skuShow } : { ...it, price: it.salesPrice, skuShow: true }
        })
        form.setFieldsValue({
          ...good,
          marketingActivitySkuParams: list
        })

        setSkuList(list)
        setDetail(data)
      }
    }

    if (visible) {
      getDetail()
    } else {
      form.resetFields()
    }
  }, [visible, good.goodsNo])

  const columns = useMemo(() => {
    const commonColumns: MMProColumns<GoodsSkuDTO>[] = [
      { dataIndex: 'skuImg', title: 'sku图片', valueType: 'image' },
      { dataIndex: 'skuNo', title: 'sku编码' },
      { dataIndex: 'salesPrice', title: '销售价（元)', valueType: 'money' },

      { dataIndex: 'marketPrice', title: '市场价（元)', valueType: 'money', render: (val, record) => {
          return !!record.marketPrice ? val : '-'
        } },
      { dataIndex: 'stock', title: '库存' },
      {
        dataIndex: 'activityPrice',
        title: <RequiredStar>活动价格</RequiredStar>,
        render: (_v, _r, index) => {
          return (
            <ProFormDependency name={['marketingActivitySkuParams']}>
              {(param) => {
                const { skuShow } = param.marketingActivitySkuParams[index] || {}
                return (
                  <ProFormDigit
                    labelCol={{ span: 0 }}
                    name={['marketingActivitySkuParams', index, 'activityPrice']}
                    rules={skuShow ? mmFormRule.required : []}
                    fieldProps={{
                      min: 0,
                      max: 9999999,
                      precision: 2,
                      disabled: !skuShow || disabled
                    }}
                  />
                )
              }}
            </ProFormDependency>
          )
        }
      },
      {
        dataIndex: 'activityNum',
        title: <RequiredStar>活动数量</RequiredStar>,
        render: (_v, record, index) => {
          return (
            <ProFormDependency name={['marketingActivitySkuParams']}>
              {(param) => {
                const { skuShow } = param.marketingActivitySkuParams[index] || {}
                return (
                  <ProFormDigit
                    labelCol={{ span: 0 }}
                    name={['marketingActivitySkuParams', index, 'activityNum']}
                    rules={skuShow ? mmFormRule.required : []}
                    fieldProps={{
                      min: 1,
                      max: record.stock,
                      precision: 0,
                      disabled: !skuShow || disabled
                    }}
                  />
                )
              }}
            </ProFormDependency>
          )
        }
      },
      {
        dataIndex: 'skuShow',
        title: '启用',
        render: (val, _, index) => {
          return <ProFormSwitch labelCol={{ span: 0 }} disabled={disabled} initialValue={true} name={['marketingActivitySkuParams', index, 'skuShow']} />
        }
      }
    ]
    return (detail.goodsSpecRelationList || [])
      .filter((it) => !it.specPid)
      .map((it, index) => {
        return {
          dataIndex: it.specId,
          title: it.specName,
          render: (_, record: GoodsSkuDTO) => {
            const { specNames = '' } = record
            return specNames.split(',')[index]
          }
        } as MMProColumns<GoodsSkuDTO>
      })
      .concat(commonColumns)
  }, [detail, skuList, disabled])

  const handleFinish = async (data: MarketingActivityGoodsParam) => {
    const { marketingActivitySkuParams = [] } = data

    const params = marketingActivitySkuParams.map((it, index) => {
      const { id, ...rest } = skuList[index]
      return {
        ...good?.marketingActivitySkuParams?.[index],
        ...rest,
        ...it,
        skuShow: it.skuShow ? 1 : 0
      }
    })

    onChange?.({ ...good, ...data, marketingActivitySkuParams: params })

    return true
  }

  return (
    <DrawerForm<MarketingActivityGoodsParam> {...rest} visible={visible} form={form} width="80%" className={styles.setGoodModalStyle} onFinish={handleFinish}>
      <ProFormDigit
        label="单笔订单购买数量限制"
        name="orderBuyLimit"
        tooltip="单用户在一笔订单中的最大购买数量"
        disabled={disabled}
        rules={mmFormRule.required}
        fieldProps={{ min: 1, max: 9999, precision: 0 }}
      />
      <ProFormDigit
        label="单用户总购买数量限制"
        name="userBuyLimit"
        tooltip="单用户在本次活动最大可购买数量"
        disabled={disabled}
        rules={mmFormRule.required}
        fieldProps={{ min: 1, max: 9999, precision: 0 }}
      />
      <ProFormDigit label="排序值" name="sortNum" disabled={disabled} rules={mmFormRule.required} fieldProps={{ min: 0, max: 9999, precision: 0 }} />

      <ProTable columns={columns} dataSource={skuList} toolBarRender={false} search={false} rowKey="specIds" pagination={false} className={styles.skuTable} />
    </DrawerForm>
  )
}

Component.displayName = 'SetGoodModal'

const SetGoodModal = memo(Component)
export default SetGoodModal
