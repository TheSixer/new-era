import ProForm, { ProFormDateTimeRangePicker, ProFormInstance, ProFormItem } from '@ant-design/pro-form'
import { PageContainer } from '@ant-design/pro-layout'
import { EActivityConditionType } from '@wmeimob-modules/activity-data/src/enums/EActivityConditionType'
import { EActivityStatus } from '@wmeimob-modules/activity-data/src/enums/EActivityStatus'
import { api, GoodsVO, MarketingActivityDto } from '@wmeimob/backend-api'
import ProFormMaterial from '@wmeimob/backend-pages/src/components/form/proFormMaterial'
import city from '@wmeimob/backend-pro/assets/json/district.json'
import ProFormLimitInput from '@wmeimob/backend-pro/src/components/form/proFormLimitInput'
import ProFormRichText from '@wmeimob/backend-pro/src/components/form/proFormRichText'
import { useSuperLock } from '@wmeimob/utils/src/hooks/useSuperLock'
import { Button, Card, message } from 'antd'
import moment from 'moment'
import { FC, memo, useEffect, useMemo, useRef, useState } from 'react'
import AssignActivityGoods from '../../../components/assignActivityGoods'
import { translateAllArea } from '../../../components/selectAreaModal/utils'
import commonProps from '../../../utils/commonProps'
import ActivitySetting from './components/activitySetting'

interface ICreateProps {
  activityNo?: string
}

const Component: FC<ICreateProps> = (props) => {
  const { initialValues, loading, formRef, disabled, handleSave, loadingHandleSave } = useService(props)

  return (
    <PageContainer
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
          <ProFormLimitInput {...commonProps.activityName} disabled={disabled} />
          <ProFormLimitInput {...commonProps.description} disabled={disabled} />
          <ProFormMaterial {...commonProps.coverImg} disabled={disabled} />
          <ProFormDateTimeRangePicker {...commonProps.activityTime} disabled={disabled} />
        </Card>

        <br />

        <ActivitySetting disabled={disabled} formRef={formRef} />

        <br />

        <ProFormItem name="marketingActivityGoodsParams" wrapperCol={{ span: 24 }} rules={[{ required: true, message: '请至少选择一个商品' }]}>
          {!loading && (
            <AssignActivityGoods
              disabled={disabled}
              concatColumns={(options) =>
                disabled
                  ? []
                  : [
                      {
                        title: '操作',
                        dataIndex: '_ops',
                        render: (_, record: GoodsVO) =>
                          !disabled && (
                            <Button type="primary" danger onClick={() => options.remove(record.goodsNo!)}>
                              删除
                            </Button>
                          )
                      }
                    ]
              }
            />
          )}
        </ProFormItem>

        <Card title="活动说明">
          <ProFormRichText {...commonProps.content} readonly={disabled} />
        </Card>
      </ProForm>
    </PageContainer>
  )
}

const MMFreeShippingActivityCreatePage = memo(Component)
export default MMFreeShippingActivityCreatePage

export function useService(options: { activityNo?: string }) {
  const { activityNo } = options

  const formRef = useRef<ProFormInstance>()

  const { current: initialValues } = useRef({
    promotionParam: {
      promotionConditionType: EActivityConditionType.Packages
    }
  })

  const [loading, setLoading] = useState(false)
  const [activity, setActivity] = useState<MarketingActivityDto>({})

  // 活动开始和结束阶段不能编辑
  const disabled = useMemo(
    () => activity.activityStatus !== undefined && [EActivityStatus.Use, EActivityStatus.Finish].includes(activity.activityStatus),
    [activity]
  )

  useEffect(() => {
    activityNo && getActivity()
  }, [activityNo])

  const getActivity = async () => {
    setLoading(true)

    try {
      const { data = {} } = await api['/admin/activity/freeShipping/{activityNo}_GET'](activityNo!)
      setActivity(data)
      formRef.current?.setFieldsValue({
        ...data,
        activityTime: [moment(data.startTime), moment(data.endTime)],
        promotionParam: {
          ...data.promotionParam,
          area: {
            area: translateAllArea(city, data.promotionParam?.area),
            text: data.promotionParam?.text
          }
        }
      })
    } catch (error) {}

    setLoading(false)
  }

  const [handleSave, loadingHandleSave] = useSuperLock(async () => {
    const values = await formRef.current?.validateFieldsReturnFormatValue?.()

    await api['/admin/activity/freeShipping_POST']({
      ...activity,
      ...values
    })

    message.success('保存成功')
    window.history.back()
  })

  return {
    formRef,
    initialValues,
    activity,
    loading,
    disabled,
    handleSave,
    loadingHandleSave
  }
}
