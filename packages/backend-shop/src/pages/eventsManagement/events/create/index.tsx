import { FC, memo, useEffect, useMemo, useRef, useState } from 'react'
import styles from './index.module.less'
import { ICreateProps } from './const'
import { PageContainer } from '@ant-design/pro-layout'
import useQuery from '~/hooks/useQuery'
import { Button, Card, Form, message, Space } from 'antd'
import { useSuperLock } from '@wmeimob/utils/src/hooks/useSuperLock'
import { useForm } from 'antd/lib/form/Form'
import ProFormLimitInput from '@wmeimob/backend-pro/src/components/form/proFormLimitInput'
import { ProFormDateRangePicker, ProFormDateTimeRangePicker, ProFormDependency, ProFormDigit, ProFormSelect } from '@ant-design/pro-form'
import ProFormRichText from '@wmeimob/backend-pro/src/components/form/proFormRichText'
import { EActivityPromotionType } from '~/enums/activity/EActivityPromotionType'
import { ActivityCreateInputDto, ActivityOutputDto, EventTypeDto, api } from '~/request'
import dayjs from 'dayjs'
import useDisableActivityTime from '~/hooks/activity/useDisableActivityTime'
import { history } from 'umi'
import ProFormMaterial from '@wmeimob/backend-pages/src/components/form/proFormMaterial'
import mmFormRule from '@wmeimob/form-rules'
import moment from 'moment'
import ProFormCityCascader from '@wmeimob/backend-pro/src/components/form/proFormCityCascader'
import EventCountCard from './components/eventCountCard'
import SeatSettingCard from './components/seatSettingCard'
import EventSettingCard from './components/eventSettingCard'
import getCityInfoById from '@wmeimob/backend-pro/src/utils/getCityInfoByIds'
import { upload } from '~/components/tencent-cloud'

const Component: FC<ICreateProps> = () => {
  const query = useQuery()
  const activityId = query.get('activityId') || ''
  const [loading, setLoading] = useState(false)
  const [eventTypes, setEventTypes] = useState<EventTypeDto[]>([])
  const [activity, setActivity] = useState<ActivityOutputDto>()
  const [hasOrder, setHasOrder] = useState(false)
  const [form] = useForm()

  // 活动开始和结束阶段不能编辑
  // const disabled = useMemo(
  //   () => activity?.status !== undefined && [EActivityStatus.Use, EActivityStatus.Finish].includes(activity?.status),
  //   [activity]
  // )
  const disabled = !!activityId

  const stepListRef = useRef<any[]>([])
  const circleListRef = useRef<any[]>([{ con: '', promo: '' }])

  useEffect(() => {
    async function init() {
      if (activityId) {
        setLoading(true)
        // 获取id
        const { data } = await api['/admin/mall/activity/get/{activityId}_GET'](activityId)

        form.setFieldsValue({
          ...data,
          activityTime: [data?.startTime, data?.endTime],
          signTime: [data?.bookStartTime, data?.bookEndTime],
          citys: [data?.provinceId, data?.cityId, data?.areaId],
          imgs: data?.imgs?.split?.(','),
          seatRuleCreateInputDtos: data?.seatRuleCreateInputDtos?.map?.((item) => ({ ...item, seatIds: JSON.parse(item?.seatIds) })),
          unifyCreateInputDtos: data?.unifyCreateInputDtos?.map?.((item) => ({
            ...item,
            unifyDate: moment(item.unifyDate).format('YYYY-MM-DD'),
            unifyTime: item.unifyTime?.split?.('-')?.map?.((it) => moment(it, 'HH:mm'))
          })),
          unify: data?.unify ? 1 : 0,
          viewSeatNo: data?.viewSeatNo ? 1 : 0,
          indexView: data?.viewSeatNo ? 1 : 0
          // seatCreateInputListDtos: data?.seatCreateInputListDtos?.map?.((item) => ({...item, seatCreateInputDtos: item.seatCreateInputDtos?.map?.((it) => ({...it, areaCode: it.areaId}))}))
        })

        setActivity(data)
        setLoading(false)

        queryEventOrders(activityId)
      }
    }

    async function queryEventOrders(activityId) {
      // 获取类型
      const {
        data: { list = [] }
      } = await api['/admin/mall/activityOrder/queryList_GET']({ activityId: activityId })

      setHasOrder(list.length > 0)
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
    const { activityTime, signTime, citys, imgs, seatRuleCreateInputDtos, unifyCreateInputDtos, seatCreateInputListDtos, ...result } =
      await form.validateFields()
    const [startTime, endTime] = activityTime
    const [bookStartTime, bookEndTime] = signTime
    const [provinceId, cityId, areaId] = citys

    const { province, city, district } = getCityInfoById({ province: provinceId, city: cityId, district: areaId })

    const params: ActivityCreateInputDto = {
      ...activity,
      ...result,
      startTime: dayjs(startTime).format('YYYY-MM-DD') + ' 00:00:00',
      endTime: dayjs(endTime).format('YYYY-MM-DD') + ' 23:59:59',
      bookStartTime: dayjs(bookStartTime).format('YYYY-MM-DD HH:mm:ss'),
      bookEndTime: dayjs(bookEndTime).format('YYYY-MM-DD HH:mm:ss'),
      provinceId,
      province: province!.label,
      cityId,
      city: city!.label,
      areaId,
      area: district?.label || '',
      imgs: imgs?.join?.(','),
      level: 0, //  等级默认先设置为0
      seatRuleCreateInputDtos: seatRuleCreateInputDtos?.map?.((item, idx) => ({
        ...item,
        seatIds: item.seatIds?.length && JSON?.stringify?.(item.seatIds),
        sort: idx
      })),
      unifyCreateInputDtos: unifyCreateInputDtos?.map?.((item) => ({
        ...item,
        unifyDate: dayjs(item.unifyDate).format('YYYY-MM-DD') + ' 00:00:00',
        unifyTime: item?.unifyTime?.map?.((it) => dayjs(it).format('HH:mm'))?.join?.('-')
      })),
      seatCreateInputListDtos: seatCreateInputListDtos?.map?.((item, index) => ({
        ...item,
        seatCreateInputDtos: item?.seatCreateInputDtos?.map?.((it, i) => ({ ...it, areaCode: `${index}-${i}` }))
      })),
      id: activityId
    }
    !activityId ? await api['/admin/mall/activity/add_POST'](params) : await api['/admin/mall/activity/update_PUT'](params)
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
        <Button key="save" type="primary" loading={saveLock} onClick={handleSave}>
          保存
        </Button>
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
          checkType: 1,
          indexView: 1,
          viewSeatNo: 1,
          participate: 0,
          unifyCreateInputDtos: [
            {
              // unifyDate: '',
              unifyTime: '',
              seat: ''
            }
          ],
          seatCreateInputListDtos: [
            {
              areaName: '',
              seatCreateInputDtos: [
                {
                  rowNumber: '',
                  seat: ''
                }
              ]
            }
          ]
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
            <ProFormLimitInput
              label="活动名称"
              name="name"
              disabled={disabled}
              maxLength={32}
              placeholder={'请输入活动名称'} rules={mmFormRule.required} />

            <ProFormSelect
              label="活动类型"
              name="classifyId"
              disabled={disabled}
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
                    if (!value?.length) return Promise.reject(new Error('选择活动时间'))
                    return Promise.resolve()
                  }
                }
              ]}
              disabled={disabled && activity?.activityStatus !== 0}
              // extra={!!activityNo && '编辑活动无法修改时间'}
              fieldProps={{
                format: 'YYYY-MM-DD',
                disabledDate: (current) => current && current < moment().startOf('day')
                // showTime: { format: 'HH:mm:ss' },
                // ...disableActivityTimeProps
              }}
            />

            <ProFormDependency name={['activityTime']}>
              {({ activityTime }, form) => {
                const endTime = activityTime?.length && dayjs(activityTime?.[1]).format('YYYY-MM-DD 23:59:59')
                return (
                  <ProFormDateTimeRangePicker
                    label="报名时间"
                    name="signTime"
                    rules={[
                      ...mmFormRule.required,
                      {
                        validator: (_, value: [moment.Moment?, moment.Moment?]) => {
                          if (!value?.length) return Promise.resolve()
                          if (activityTime?.length && !moment(value?.[1]).isBefore(endTime, 'seconds')) return Promise.reject(new Error('报名结束时间不能晚于活动结束时间'))
                          return !activityId && !moment().isBefore(value[1], 'seconds') ? Promise.reject(new Error('报名结束时间必须晚于当前时间')) : Promise.resolve()
                        }
                      }
                    ]}
                    disabled={disabled && activity?.activityStatus !== 0}
                    // extra={!!activityNo && '编辑活动无法修改时间'}
                    fieldProps={{
                      format: 'YYYY-MM-DD HH:mm:ss',
                      showTime: { format: 'HH:mm:ss' },
                      ...disableActivityTimeProps
                    }}
                  />
                )
              }}
            </ProFormDependency>

            <ProFormCityCascader label="地区" name="citys" disabled={disabled} rules={[{ required: true }]} />

            <ProFormLimitInput
              label="详细地址"
              name="address"
              placeholder={'请输入详细地址'}
              disabled={disabled}
              rules={[{ required: true }]}
              maxLength={100}
            />

            <ProFormLimitInput label="经度" name="longitude" placeholder={'请输入经度'} disabled={disabled} maxLength={32} rules={mmFormRule.required} />

            <ProFormLimitInput label="纬度" name="latitude" placeholder={'请输入纬度'} disabled={disabled} maxLength={32} rules={mmFormRule.required} />

            <ProFormDigit
              label="报名费用"
              name="bookFree"
              placeholder={'请输入报名费用'}
              disabled={disabled}
              min={0}
              max={99999}
              rules={mmFormRule.required}
              addonAfter="积分"
              tooltip="*若为0则视为免费"
            />

            <ProFormMaterial label="活动封面" name="cover" fieldProps={{ measure: [750, 360] }} rules={mmFormRule.required} />

            <ProFormMaterial
              label="活动图片"
              name="imgs"
              fieldProps={{ multiple: true, measure: [750, 360] }}
              rules={mmFormRule.required}
            />

            <ProFormRichText
              label="活动详情"
              name="details"
              // readonly={disabled}
              upload={upload}
              rules={mmFormRule.required}
              wrapperCol={{ span: 21 }}
              fieldProps={{
                toolbarConfig: {
                  excludeKeys: [
                    'group-more-style',
                    'fontFamily',
                    'todo',
                    'group-video',
                    'emotion',
                    'insertLink',
                    'insertTable'
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

          <EventCountCard disabled={hasOrder} />

          <SeatSettingCard disabled={false} />

          <EventSettingCard disabled={disabled} />
        </Space>
      </Form>
    </PageContainer>
  )
}

Component.displayName = 'Create'

const Create = memo(Component)
export default Create
