import ProForm, { ProFormDatePicker, ProFormDateTimeRangePicker, ProFormDependency, ProFormInstance, ProFormItem, ProFormRadio } from '@ant-design/pro-form'
import { PageContainer } from '@ant-design/pro-layout'
import { EActivityCompletedGoods, OActivityCompletedGoods } from '@wmeimob-modules/activity-data/src/enums/EActivityCompletedGoods'
import { EActivityStatus } from '@wmeimob-modules/activity-data/src/enums/EActivityStatus'
import { api, GoodsVO, MarketingActivityDto, MarketingActivityGoodsParam, MarketingActivityOfPreSaleDto } from '@wmeimob/backend-api'
import ProFormLimitInput from '@wmeimob/backend-pro/src/components/form/proFormLimitInput'
import ProFormRichText from '@wmeimob/backend-pro/src/components/form/proFormRichText'
import mmFormRule from '@wmeimob/form-rules'
import { useSuperLock } from '@wmeimob/utils/src/hooks/useSuperLock'
import { Button, Card, message, Space } from 'antd'
import moment, { Moment } from 'moment'
import { FC, memo, useEffect, useMemo, useRef, useState } from 'react'
import AssignActivityGoods from '../../../components/assignActivityGoods'
import commonProps from '../../../utils/commonProps'
import GoodsSetting, { useGoodsSetting } from './components/goodsSetting'

interface IEditProps {
  service: ReturnType<typeof useService>
}

const Component: FC<IEditProps> = (props) => {
  const { goodsSetting, initialValues, loading, title, formRef, disabled, basicInfoDisabled, handleSave, loadingHandleSave } = props.service

  return (
    <PageContainer
      title={title}
      footer={[
        <Button key="back" onClick={() => window.history.back()}>
          返回
        </Button>,
        !disabled && (
          <Button key="save" type="primary" loading={loadingHandleSave} onClick={handleSave}>
            保存
          </Button>
        )
      ]}
    >
      <ProForm formRef={formRef} layout="horizontal" labelCol={{ span: 3 }} wrapperCol={{ span: 8 }} initialValues={initialValues} submitter={false}>
        <Card title="基本设置" loading={loading}>
          <ProFormLimitInput {...commonProps.activityName} disabled={basicInfoDisabled} />
          <ProFormLimitInput {...commonProps.description} disabled={basicInfoDisabled} />
          <ProFormDateTimeRangePicker {...commonProps.activityTime} disabled={disabled} />
          <ProFormRadio.Group
            {...commonProps.completed}
            options={OActivityCompletedGoods.filter((item) => item.value === EActivityCompletedGoods.Undercarriage)}
            disabled={basicInfoDisabled}
          />

          <ProFormDependency name={['activityTime']}>
            {({ endTime }) => (
              <ProFormDatePicker
                label="开始发货时间"
                name="shippingTime"
                width="md"
                allowClear={false}
                disabled={disabled}
                fieldProps={{ format: 'YYYY-MM-DD' }}
                transform={(date: string) => ({ shippingTime: `${date} 23:59:59` })}
                rules={[
                  ...mmFormRule.required,
                  {
                    validator: (_, value?: Moment) => {
                      if (!endTime) return Promise.resolve()
                      return value?.isAfter(moment(endTime).add(-1, 'day'), 'day')
                        ? Promise.resolve()
                        : Promise.reject(new Error('发货时间不可早于活动结束时间'))
                    }
                  }
                ]}
                extra={
                  <>
                    <div>*设置预售商品开始发货时间，不可早于活动结束时间；</div>
                    <div>该时间的年月日显示在预售商品详情页【购买】按钮</div>
                  </>
                }
              />
            )}
          </ProFormDependency>
        </Card>

        <br />

        <ProFormItem name="marketingActivityGoodsParams" wrapperCol={{ span: 24 }} rules={[{ required: true, message: '请设置活动商品' }]}>
          {!loading && (
            <AssignActivityGoods
              disabled={disabled}
              goodsDrawerProps={{
                title: (
                  <Space>
                    <span>选择商品</span>
                    <span style={{ color: '#999' }}>*仅可选择 “商品状态为已上架和前台可见开关为关”的商品</span>
                  </Space>
                ),
                requestParams: () => ({ shelved: true, frontShow: false })
              }}
              concatColumns={(options) => [
                {
                  title: '操作',
                  dataIndex: '_ops',
                  render: (_, record: GoodsVO) => (
                    <Space>
                      <Button type="primary" onClick={() => goodsSetting.open(record)}>
                        {disabled ? '查看' : '商品设置'}
                      </Button>

                      {!disabled && (
                        <Button type="primary" danger onClick={() => options.remove(record.goodsNo!)}>
                          删除
                        </Button>
                      )}
                    </Space>
                  )
                }
              ]}
            />
          )}
        </ProFormItem>

        <Card title="活动说明">
          <ProFormRichText {...commonProps.content} readonly={disabled} />
        </Card>
      </ProForm>

      <GoodsSetting service={goodsSetting} />
    </PageContainer>
  )
}

const Edit = memo(Component)
export default Edit

export function useService(options: { activityNo?: string }) {
  const { activityNo } = options

  const formRef = useRef<ProFormInstance>()

  const { current: initialValues } = useRef({
    completed: EActivityCompletedGoods.Undercarriage
  })

  const [loading, setLoading] = useState(false)
  const [activity, setActivity] = useState<MarketingActivityDto>({})

  const title = useMemo(() => {
    if (!activityNo) return '预售活动新增'
    return activity.activityStatus === EActivityStatus.NoUse ? '预售活动编辑' : '预售活动详情'
  }, [activityNo, activity])

  /** 活动结束或活动启用中，所有字段不可再编辑 */
  const disabled = useMemo(
    () => activity.activityStatus !== undefined && [EActivityStatus.Use, EActivityStatus.Finish].indexOf(activity.activityStatus!) !== -1,
    [activity]
  )

  // 【基本设置】部分只要创建后就不允许编辑
  // 但可延长发货时间
  const basicInfoDisabled = !!activityNo

  const goodsSetting = useGoodsSetting({
    disabled,
    onOk: (goods) => {
      const prev: MarketingActivityGoodsParam[] = formRef.current?.getFieldValue('marketingActivityGoodsParams')
      const next = prev.map((it) => (it.goodsNo === goods.goodsNo ? goods : it))
      formRef.current?.setFieldValue('marketingActivityGoodsParams', next)
    }
  })

  useEffect(() => {
    activityNo && getActivity()
  }, [activityNo])

  const getActivity = async () => {
    setLoading(true)

    try {
      const { data = {} } = await api['/admin/activity/presale/{activityNo}_GET'](activityNo!)
      setActivity(data)
      formRef.current?.setFieldsValue({
        ...data,
        activityTime: [moment(data.startTime), moment(data.endTime)],
        shippingTime: moment(data.shippingTime)
      })
    } catch (error) {}

    setLoading(false)
  }

  /** 验证商品参数设置 */
  const validGoodsParams = (params: MarketingActivityGoodsParam[] = []) => {
    if (!params.length) {
      message.error(`请至少选择一个商品`)
      return false
    }

    return !params.some((it) => {
      const { marketingActivitySkuParams = [], userBuyLimit, orderBuyLimit, sortNum } = it
      // 验证是否有空值
      let noValid = [userBuyLimit, orderBuyLimit, sortNum].some((va) => va === undefined)

      if (noValid) {
        message.error(`请完善商品【${it.goodsName}】设置`)
        return true
      }

      if (!marketingActivitySkuParams.length) {
        message.error(`请完善商品【${it.goodsName}】SKU设置`)
        return true
      }

      noValid = marketingActivitySkuParams.some((sku) => {
        if (!!sku.skuShow && [sku.activityNum, sku.activityPrice].some((va) => va === undefined)) {
          return true
        }
        return false
      })
      return noValid
    })
  }

  const [handleSave, loadingHandleSave] = useSuperLock(async () => {
    const values = await formRef.current?.validateFieldsReturnFormatValue?.()
    if (!validGoodsParams(values.marketingActivityGoodsParams)) {
      return
    }

    const params: MarketingActivityOfPreSaleDto = {
      ...activity,
      ...values
    }

    await api['/admin/activity/presale_POST'](params)

    message.success('保存成功')
    window.history.back()
  })

  return {
    formRef,
    initialValues,
    activity,
    goodsSetting,
    title,
    loading,
    basicInfoDisabled,
    disabled,
    handleSave,
    loadingHandleSave
  }
}
