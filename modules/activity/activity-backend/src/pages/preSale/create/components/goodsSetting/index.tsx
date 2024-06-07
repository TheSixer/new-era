import { DrawerForm, ProFormDependency, ProFormDigit, ProFormSwitch } from '@ant-design/pro-form'
import ProTable from '@ant-design/pro-table'
import { api, GoodsSkuDTO, GoodsVO, MarketingActivityGoodsParam } from '@wmeimob/backend-api'
import RequiredStar from '@wmeimob/backend-pro/src/components/requiredStar'
import useProTableForm from '@wmeimob/backend-pro/src/hooks/useProTableForm'
import mmFormRule from '@wmeimob/form-rules'
import { useSuperLock } from '@wmeimob/utils/src/hooks/useSuperLock'
import { MMProColumns } from 'MMProType'
import { FC, memo, useMemo, useState } from 'react'
import styles from './index.module.less'

interface IGoodsSettingProps {
  service: ReturnType<typeof useGoodsSetting>
}

const Component: FC<IGoodsSettingProps> = (props) => {
  const { disabled, columns, skuList, modalForm, onFinish } = props.service

  return (
    <DrawerForm {...modalForm.modalProps} drawerProps={{ maskClosable: false, keyboard: false }} width="80%" onFinish={onFinish}>
      <ProFormDigit
        label="单笔订单购买数量限制"
        name="orderBuyLimit"
        width="md"
        tooltip="单用户在一笔订单中的最大购买数量"
        disabled={disabled}
        rules={mmFormRule.required}
        fieldProps={{ min: 1, max: 9999, precision: 0 }}
      />

      <ProFormDigit
        label="单用户总购买数量限制"
        name="userBuyLimit"
        width="md"
        tooltip="单用户在本次活动最大可购买数量"
        disabled={disabled}
        rules={mmFormRule.required}
        fieldProps={{ min: 1, max: 9999, precision: 0 }}
      />

      <ProFormDigit label="排序值" name="sortNum" width="md" disabled={disabled} rules={mmFormRule.required} fieldProps={{ min: 0, max: 9999, precision: 0 }} />

      <ProTable columns={columns} dataSource={skuList} toolBarRender={false} search={false} rowKey="specIds" pagination={false} className={styles.skuTable} />
    </DrawerForm>
  )
}

const GoodsSetting = memo(Component)
export default GoodsSetting

export function useGoodsSetting(options?: { disabled?: boolean; onOk: (goods: MarketingActivityGoodsParam) => void }) {
  const modalForm = useProTableForm()

  const [detail, setDetail] = useState<GoodsVO>({})
  const [skuList, setSkuList] = useState<any[]>([])

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
        render: (_, __, index) => {
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
                      disabled: !skuShow || options?.disabled
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
                      disabled: !skuShow || options?.disabled
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
          return (
            <ProFormSwitch labelCol={{ span: 0 }} disabled={options?.disabled} initialValue={true} name={['marketingActivitySkuParams', index, 'skuShow']} />
          )
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
  }, [detail, skuList, options?.disabled])

  async function getDetail(goodsNo: string, goods: MarketingActivityGoodsParam) {
    const { data = {} } = await api['/admin/goods/{no}_GET'](goodsNo)
    const { goodsSkuDetailList = [] } = data
    const { marketingActivitySkuParams = [] } = goods as MarketingActivityGoodsParam

    const list = goodsSkuDetailList.map((it) => {
      const result = marketingActivitySkuParams.find((sku) => sku.skuNo === it.skuNo)
      return result ? { ...it, ...result, skuShow: !!result.skuShow } : { ...it, price: it.salesPrice, skuShow: true }
    })

    modalForm.modalProps.form.setFieldsValue({
      ...goods,
      marketingActivitySkuParams: list
    })

    setSkuList(list)
    setDetail(data)
  }

  const [open] = useSuperLock(async (goods: GoodsVO) => {
    modalForm.setShowModal(goods)

    await getDetail(goods.goodsNo!, goods)
  })

  async function onFinish(data: MarketingActivityGoodsParam) {
    const { marketingActivitySkuParams = [] } = data

    const params = marketingActivitySkuParams.map((it, index) => {
      const { id, ...rest } = skuList[index]
      return {
        ...modalForm.editData?.marketingActivitySkuParams?.[index],
        ...rest,
        ...it,
        skuShow: it.skuShow ? 1 : 0
      }
    })

    options?.onOk({ ...modalForm.editData, ...data, marketingActivitySkuParams: params })

    return true
  }

  return {
    open,
    disabled: options?.disabled,
    columns,
    skuList,
    modalForm,
    onFinish
  }
}
