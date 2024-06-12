import { FC, memo, useEffect, useMemo, useRef, useState } from 'react'
import styles from './index.module.less'
import { ICreateProps } from './const'
import { PageContainer } from '@ant-design/pro-layout'
import useQuery from '~/hooks/useQuery'
import { Button, Card, Form, Input, message, Space, Tooltip } from 'antd'
import { useSuperLock } from '@wmeimob/utils/src/hooks/useSuperLock'
import { useForm } from 'antd/lib/form/Form'
import ProFormLimitInput from '@wmeimob/backend-pro/src/components/form/proFormLimitInput'
import { ProFormDateRangePicker, ProFormDateTimeRangePicker, ProFormSelect } from '@ant-design/pro-form'
import { EActivityType } from '@wmeimob/shop-data/src/enums/activity/EActivityType'
import ProFormRichText from '@wmeimob/backend-pro/src/components/form/proFormRichText'
import { EActivityPromotionType } from '~/enums/activity/EActivityPromotionType'
import { MarketingActivityDto } from '@wmeimob/backend-api'
import { ActivityCreateInputDto, EventTypeDto, api } from '~/request'
import dayjs from 'dayjs'
import { EActivityStatus } from '~/enums/activity/EActivityStatus'
import { times } from 'number-precision'
import useDisableActivityTime from '~/hooks/activity/useDisableActivityTime'
import { history } from 'umi'
import ProFormMaterial from '@wmeimob/backend-pages/src/components/form/proFormMaterial'
import mmFormRule from '@wmeimob/form-rules'
import moment from 'moment'
import ProFormCityCascader from '@wmeimob/backend-pro/src/components/form/proFormCityCascader'
import EventCountCard from './components/eventCountCard'
import SeatSettingCard from './components/seatSettingCard'
import EventSettingCard from './components/eventSettingCard'

const Component: FC<ICreateProps> = () => {
  const query = useQuery()
  const activityNo = query.get('activityNo') || ''
  const [loading, setLoading] = useState(false)
  const [eventTypes, setEventTypes] = useState<EventTypeDto[]>([])
  const [activity, setActivity] = useState<MarketingActivityDto>({})
  const [form] = useForm()

  // 活动开始和结束阶段不能编辑
  const disabled = useMemo(
    () => activity.activityStatus !== undefined && [EActivityStatus.Use, EActivityStatus.Finish].includes(activity.activityStatus),
    [activity]
  )

  const stepListRef = useRef<any[]>([])
  const circleListRef = useRef<any[]>([{ con: '', promo: '' }])

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
    const { activityTime, signTime, citys, imgs, seatRuleCreateInputDtos, unifyCreateInputDtos, ...result } = await form.validateFields()
    const [startTime, endTime] = activityTime
    const [bookStartTime, bookEndTime] = signTime
    const [province, city, area] = citys

    const params: ActivityCreateInputDto = {
      ...activity,
      ...result,
      startTime: dayjs(startTime).format('YYYY-MM-DD'),
      endTime: dayjs(endTime).format('YYYY-MM-DD'),
      bookStartTime: dayjs(bookStartTime).format('YYYY-MM-DD HH:mm') + ':00',
      bookEndTime: dayjs(bookEndTime).format('YYYY-MM-DD HH:mm') + ':59',
      province,
      city,
      area,
      imgs: imgs?.join?.(','),
      seatRuleCreateInputDtos: seatRuleCreateInputDtos?.map?.((item, idx) => ({...item, seatIds: item.seatIds.join(','), sort: idx})),
      unifyCreateInputDtos: unifyCreateInputDtos?.map?.((item) => ({
        ...item,
        unifyDate: dayjs(item.unifyDate).format('YYYY-MM-DD'),
        unifyTime: item?.unifyTime?.map?.((it) => dayjs(it).format('HH:mm'))?.join?.('-')
      }))
    }
    await api['/admin/mall/activity/add_POST'](params)
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
          unify: 1,
          level: 0,
          checkType: 0,
          indexView: 1,
          viewSeatNo: 1,
          participate: 0
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
            <ProFormLimitInput label="活动名称" name="name" disabled={disabled} maxLength={32} placeholder={'请输入活动名称'} rules={mmFormRule.required} />

            <ProFormSelect
              label="活动类型"
              name="classifyId"
              rules={[{ required: true, message: '请选择活动类型!' }]}
              options={eventTypes.map((it) => ({ label: it.name, value: it.id }))}
            />

            <ProFormDateRangePicker
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
              name="signTime"
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

            <ProFormLimitInput label="详细地址" name="address" placeholder={'请输入详细地址'} disabled={disabled} rules={[{ required: true }]} maxLength={100} />

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
                    placeholder="请输入报名费用"
                  />
                </Form.Item>
                <Tooltip title="*若为0则视为免费">
                *若为0则视为免费
                </Tooltip>
              </Space>
            </Form.Item>

            <ProFormMaterial label="活动封面" name="cover" disabled={disabled} fieldProps={{ measure: [750, 360] }} rules={mmFormRule.required} />

            <ProFormMaterial label="活动图片" name="imgs"  disabled={disabled} fieldProps={{ multiple: true, measure: [750, 360] }} rules={mmFormRule.required} />

            <ProFormRichText
              label="活动详情"
              name="details"
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

          <SeatSettingCard disabled={disabled || !!activityNo} />

          <EventSettingCard disabled={disabled || !!activityNo} />

        </Space>
      </Form>
    </PageContainer>
  )
}

Component.displayName = 'Create'

const Create = memo(Component)
export default Create
