import { FC, memo, useEffect, useMemo, useRef, useState } from 'react'
import styles from './index.module.less'
import { ICreateProps } from './const'
import { PageContainer } from '@ant-design/pro-layout'
import useQuery from '~/hooks/useQuery'
import { Button, Card, Form, Input, message, Space, Tooltip } from 'antd'
import { useSuperLock } from '@wmeimob/utils/src/hooks/useSuperLock'
import { useForm } from 'antd/lib/form/Form'
import ProFormLimitInput from '@wmeimob/backend-pro/src/components/form/proFormLimitInput'
import { ProFormDateTimeRangePicker, ProFormRadio, ProFormSelect } from '@ant-design/pro-form'
import { EActivityType } from '@wmeimob/shop-data/src/enums/activity/EActivityType'
import { EActivityCompletedGoods, OActivityCompletedGoods } from '~/enums/activity/EActivityCompletedGoods'
import ProFormRichText from '@wmeimob/backend-pro/src/components/form/proFormRichText'
import ActivitySettingCard from './components/activitySettingCard'
import { EActivityConditionType } from '~/enums/activity/EActivityConditionType'
import { EActivityPromotionType } from '~/enums/activity/EActivityPromotionType'
import AssignActivityGoods, { AssignActivityGoodsRef } from '~/components/goods/assignActivityGoods'
import { MarketingActivityDto, MarketingActivityGoodsParam, MarketingActivityOfFullDto, MarketingActivityPromotionParam } from '@wmeimob/backend-api'
import { EventTypeDto, api } from '~/request'
import dayjs from 'dayjs'
import { EActivityStatus } from '~/enums/activity/EActivityStatus'
import { divide, times } from 'number-precision'
import useDisableActivityTime from '~/hooks/activity/useDisableActivityTime'
import { history } from 'umi'
import ProFormMaterial from '@wmeimob/backend-pages/src/components/form/proFormMaterial'
import mmFormRule from '@wmeimob/form-rules'
import moment from 'moment'
import ProFormCityCascader from '@wmeimob/backend-pro/src/components/form/proFormCityCascader'
import EventCountCard from './components/eventCountCard'

const Component: FC<ICreateProps> = () => {
  const query = useQuery()
  const activityNo = query.get('activityNo') || ''
  const [loading, setLoading] = useState(false)
  const [eventTypes, setEventTypes] = useState<EventTypeDto[]>([])
  const [activity, setActivity] = useState<MarketingActivityDto>({})
  const [goodNos, setGoodNos] = useState<string[]>([])
  const [form] = useForm()

  // 活动开始和结束阶段不能编辑
  const disabled = useMemo(
    () => activity.activityStatus !== undefined && [EActivityStatus.Use, EActivityStatus.Finish].includes(activity.activityStatus),
    [activity]
  )

  const stepListRef = useRef<any[]>([])
  const circleListRef = useRef<any[]>([{ con: '', promo: '' }])

  const assignActivityGoodsRef = useRef<AssignActivityGoodsRef>(null)

  useEffect(() => {
    async function init() {
      if (activityNo) {
        setLoading(true)
        // 获取id
        const { data = {} } = await api['/admin/activity/full/{activityNo}_GET'](activityNo)

        // 处理活动设置
        const { promotionParam = {}, activityType } = data
        const { promotionConditionList = [] } = promotionParam
        if (!promotionConditionList.length) {
          return message.warn('请设置活动区间')
        }

        promotionParam.promotionConditionList = promotionConditionList.map((item) => {
          // 折扣需要处理乘10
          const promo = activityType === EActivityType.Discount ? parseFloat(times(item.promo || 0, 10).toFixed(2)) : item.promo
          return { ...item, promo }
        })

        form.setFieldsValue({
          ...data,
          promotionParam,
          activityTime: [data.startTime, data.endTime]
        })

        const nos = data.marketingActivityGoodsParams?.map((it) => it.goodsNo!) || []
        setGoodNos(nos)

        setActivity(data)
        setLoading(false)
      }
    }

    async function queryEventTypes() {
      // 获取类型
      const { data = [] } = await api['/admin/mall/activityClassify/queryClassifyList_GET']({})
      
      setEventTypes(data)
    }

    init()
    queryEventTypes()
  }, [])

  const [handleSave, saveLock] = useSuperLock(async () => {
    const { activityTime, activityType, promotionParam, ...result } = await form.validateFields()
    const [startTime, endTime] = activityTime

    // 处理活动设置
    const { promotionConditionList = [] } = promotionParam as MarketingActivityPromotionParam
    if (!promotionConditionList.length) {
      return message.warn('请设置活动区间')
    }

    promotionParam.promotionConditionList = promotionConditionList.map((item) => {
      // 折扣需要处理除法
      const promo = activityType === EActivityType.Discount ? parseFloat(divide(item.promo || 0, 10).toFixed(3)) : item.promo
      return { ...item, promo }
    })

    // 处理商品
    const dataSource = assignActivityGoodsRef.current?.getDataSource() || []
    if (!dataSource.length) {
      return message.warn('请至少选择一个商品')
    }
    const orginParams = activity.marketingActivityGoodsParams || []
    const marketingActivityGoodsParams = dataSource?.map((it) => {
      const result = orginParams.find(({ goodsNo }) => it.goodsNo === goodsNo)
      return {
        ...result,
        categoryNames: it.classifyName,
        coverImg: it.coverImg,
        goodsName: it.goodsName,
        goodsNo: it.goodsNo,
        groupBuyingNum: 0,
        marketPrice: it.marketPrice,
        marketingActivitySkuParams: [], // 商品SKU
        maxPrice: it.salePrice, // 商品价格（默认取sku最高价）
        orderBuyLimit: 0,
        price: it.salePrice, // 商品价格（默认取sku最低价）
        saleNum: it.customStartSales,
        sortNum: 0,
        userBuyLimit: 0
      } as MarketingActivityGoodsParam
    })

    const params: MarketingActivityOfFullDto = {
      ...activity,
      ...result,
      activityType,
      promotionParam,
      startTime: dayjs(startTime).format('YYYY-MM-DD HH:mm') + ':00',
      endTime: dayjs(endTime).format('YYYY-MM-DD HH:mm') + ':59',
      marketingActivityGoodsParams,
      shareImage: '', // 分享图片
      shareTitle: '', // 分享标题
      useStoreCoupon: 0 // 是否可用店铺优惠券 0：否 1：是
    }
    await api['/admin/activity/full_POST'](params)
    message.success('保存成功')
    history.goBack()
  })

  const disableActivityTimeProps = useDisableActivityTime()

  return (
    <PageContainer
      loading={loading}
      footer={[
        <Button key="back" onClick={() => history.goBack()}>
          返回
        </Button>,
        !disabled && (
          <Button key="save" type="primary" loading={saveLock} onClick={handleSave}>
            保存
          </Button>
        )
      ]}
      className={styles.createStyle}
    >
      <Form
        form={form}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 12 }}
        initialValues={{
          activityType: EActivityType.Deduction,
          completed: EActivityCompletedGoods.Normal,
          promotionParam: {
            promotionConditionType: EActivityConditionType.Price,
            promotionType: EActivityPromotionType.Step
          }
        }}
        onValuesChange={(changedValues) => {
          // console.log(...args)
          const { promotionParam = {}, activityType } = changedValues

          if (activityType !== undefined) {
            form.setFields([{ name: ['promotionParam', 'promotionConditionList'], value: [] }])
          }

          // 优惠计算方式变化
          const { promotionType } = promotionParam
          // 缓存
          if (promotionType !== undefined) {
            if (promotionType === EActivityPromotionType.Step) {
              circleListRef.current = form.getFieldValue(['promotionParam', 'promotionConditionList']) || []
              form.setFieldsValue({
                promotionParam: {
                  promotionConditionList: [...stepListRef.current]
                }
              })
            } else {
              stepListRef.current = form.getFieldValue(['promotionParam', 'promotionConditionList']) || []
              form.setFieldsValue({
                promotionParam: {
                  promotionConditionList: [...circleListRef.current]
                }
              })
            }
          }
        }}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Card title="基本设置">
            <ProFormLimitInput label="活动名称" name="activityName" disabled={disabled} maxLength={32} placeholder={'请输入活动名称'} rules={mmFormRule.required} />

            <ProFormSelect
              label="活动类型"
              name="couponType"
              rules={[{ required: true, message: '请选择活动类型!' }]}
              options={eventTypes.map((it) => ({ label: it.name, value: it.id }))}

            />

            <ProFormDateTimeRangePicker
              label="活动时间"
              name="activityTime"
              rules={[
                ...mmFormRule.required,
                {
                  validator: (_, value: [moment.Moment?, moment.Moment?]) => {
                    if (!value?.length) return Promise.resolve()
                    return moment().isBefore(value[1], 'days') ? Promise.resolve() : Promise.reject(new Error('活动结束时间必须晚于当前时间'))
                  }
                }
              ]}
              disabled={disabled}
              // extra={!!activityNo && '编辑活动无法修改时间'}
              fieldProps={{
                format: 'YYYY-MM-DD',
                // showTime: { format: 'HH:mm:ss' },
                ...disableActivityTimeProps
              }}
            />

            <ProFormDateTimeRangePicker
              label="报名时间"
              name="activityTime"
              rules={[
                ...mmFormRule.required,
                {
                  validator: (_, value: [moment.Moment?, moment.Moment?]) => {
                    if (!value?.length) return Promise.resolve()
                    return moment().isBefore(value[1], 'seconds') ? Promise.resolve() : Promise.reject(new Error('报名结束时间必须晚于当前时间'))
                  }
                }
              ]}
              disabled={disabled}
              // extra={!!activityNo && '编辑活动无法修改时间'}
              fieldProps={{
                format: 'YYYY-MM-DD HH:mm:ss',
                showTime: { format: 'HH:mm:ss' },
                ...disableActivityTimeProps
              }}
            />

            <ProFormCityCascader label="地区" name="citys" disabled={disabled} rules={[{ required: true }]} />

            <ProFormLimitInput label="详细地址" name="singleAddress" placeholder={'请输入详细地址'} disabled={disabled} rules={[{ required: true }]} maxLength={100} />

            <ProFormLimitInput label="经度" name="longitude" placeholder={'请输入经度'} disabled={disabled} maxLength={32} rules={mmFormRule.required} />

            <ProFormLimitInput label="纬度" name="latitude" placeholder={'请输入纬度'} disabled={disabled} maxLength={32} rules={mmFormRule.required} />

            <Form.Item label="报名费用">
              <Space>
                <Form.Item
                  name="bookFree"
                  noStyle
                  rules={[{ required: true, message: '报名费用不能为空' }]}
                >
                  <Input
                    style={{ width: '100%' }}
                    addonAfter="积分"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Please input"
                  />
                </Form.Item>
                <Tooltip title="Useful information">
                *若为0则视为免费
                </Tooltip>
              </Space>
            </Form.Item>

            <ProFormMaterial label="活动封面" name="cover" disabled={disabled} fieldProps={{ measure: [750, 360] }} rules={mmFormRule.required} />

            <ProFormMaterial label="活动图片" name="imgs" disabled={disabled} fieldProps={{ measure: [750, 360] }} rules={mmFormRule.required} />

            <ProFormRichText
              label="活动详情"
              name="detail"
              disabled={disabled}
              rules={mmFormRule.required}
              wrapperCol={{ span: 21 }}
              fieldProps={{
                toolbarConfig: {
                  excludeKeys: [
                    'blockquote',
                    'group-more-style',
                    'bgColor',
                    'fontFamily',
                    'todo',
                    'emotion',
                    'insertLink',
                    'group-image',
                    'group-video',
                    'insertTable',
                    'codeBlock'
                  ]
                }
              }}
            />
        
            {/* <ProFormRadio.Group
              label="活动结束后商品"
              name="completed"
              disabled={disabled}
              options={OActivityCompletedGoods}
              rules={mmFormRule.required}
              extra="设置活动结束或活动库存售罄后商品状态"
            /> */}

            {/* <ProFormRadio.Group
              label="活动结束状态"
              name="finishCompleted"
              disabled={disabled}
              options={OActivityCompleted}
              rules={mmFormRule.required}
              extra="活动结束后是否自动下架前台显示"
            /> */}
          </Card>

          <EventCountCard disabled={disabled || !!activityNo} />

          <ActivitySettingCard disabled={disabled || !!activityNo} />

          <AssignActivityGoods ref={assignActivityGoodsRef} value={goodNos} disabled={disabled} onChange={(data) => setGoodNos(data)} />

          <Card title="活动说明">
            {disabled ? (
              <div className={styles.richTextContent} dangerouslySetInnerHTML={{ __html: activity.content! }} />
            ) : (
              <ProFormRichText
                label="活动说明"
                name="content"
                rules={mmFormRule.required}
                wrapperCol={{ span: 21 }}
                fieldProps={{
                  toolbarConfig: {
                    excludeKeys: [
                      'blockquote',
                      'group-more-style',
                      'bgColor',
                      'fontFamily',
                      'todo',
                      'emotion',
                      'insertLink',
                      'group-image',
                      'group-video',
                      'insertTable',
                      'codeBlock'
                    ]
                  }
                }}
              />
            )}
          </Card>
        </Space>
      </Form>
    </PageContainer>
  )
}

Component.displayName = 'Create'

const Create = memo(Component)
export default Create
