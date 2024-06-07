import ProForm, { ProFormDigit, ProFormInstance, ProFormRadio, ProFormSelect, ProFormSwitch } from '@ant-design/pro-form'
import { ESignType } from '@wmeimob-modules/task-data/src/enums/ESignType'
import { ETaskReward, OTaskReward } from '@wmeimob-modules/task-data/src/enums/ETaskReward'
import { api } from '@wmeimob/backend-api'
import ProFormMaterial from '@wmeimob/backend-pages/src/components/form/proFormMaterial'
import ProFormRichText from '@wmeimob/backend-pro/src/components/form/proFormRichText'
import mmFormRule from '@wmeimob/form-rules'
import { useSuperLock } from '@wmeimob/utils/src/hooks/useSuperLock'
import { Button, message, Space } from 'antd'
import { FC, memo, ReactNode, useEffect, useRef, useState } from 'react'

interface ISignTaskProps {}

interface IFormValues {
  enabled: boolean
  iconUrl: string
  num: number
  cycle: number
  description: string
  rewardType: ETaskReward
  type: ESignType
}

const Component: FC<ISignTaskProps> = (props) => {
  const { formRef, loading, handleFinish } = useService()

  const renderTips = (tips: ReactNode) => <div style={{ color: '#999' }}>{tips}</div>

  return (
    <ProForm
      formRef={formRef}
      layout="horizontal"
      labelCol={{ style: { width: 100 } }}
      submitter={false}
      onFinish={handleFinish}
      initialValues={{
        enabled: false,
        type: ESignType.Manual,
        cycle: 1,
        rewardType: ETaskReward.Integral
      }}
    >
      <ProFormSwitch label="任务状态" name="enabled" />

      <ProFormMaterial label="任务图标" name="iconUrl" rules={mmFormRule.required} />

      <ProFormRadio.Group
        label="签到方式"
        name="type"
        layout="vertical"
        options={[
          { label: <Space>手动签到{renderTips('*用户主动点击具体控件完成签到')}</Space>, value: ESignType.Manual },
          { label: <Space>自动签到{renderTips('*用户登录产品，即累计一次签到')}</Space>, value: ESignType.Auto }
        ]}
      />

      <ProForm.Item label="签到设置">
        <Space>每日签到{renderTips('*每日完成签到任务，获得奖励')}</Space>

        <ProForm.Group>
          <ProFormDigit label="签到周期" name="cycle" disabled colon={false} fieldProps={{ addonAfter: '天' }} />

          <ProFormSelect label="奖励内容" name="rewardType" colon={false} options={OTaskReward} allowClear={false} />

          <ProFormDigit label="奖励数量" name="num" colon={false} min={1} fieldProps={{ precision: 0 }} rules={mmFormRule.required} />
        </ProForm.Group>
      </ProForm.Item>

      <ProFormRichText label="签到说明" name="description" fieldProps={{ plain: 'minimalism' }} wrapperCol={{ span: 10 }} />

      <ProForm.Item wrapperCol={{ style: { marginLeft: 100 } }}>
        <Space>
          <Button type="primary" htmlType="submit" loading={loading}>
            保存
          </Button>
        </Space>
      </ProForm.Item>
    </ProForm>
  )
}

const SignTask = memo(Component)
export default SignTask

export function useService() {
  const formRef = useRef<ProFormInstance<IFormValues>>()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getConfig()
  }, [])

  const getConfig = async () => {
    setLoading(true)

    try {
      const { data } = await api['/admin/mall/signin_GET']()
      formRef.current?.setFieldsValue(data)
    } catch (error) {}

    setLoading(false)
  }

  const [handleFinish] = useSuperLock(async (values: IFormValues) => {
    setLoading(true)

    try {
      await api['/admin/mall/signin_POST'](values)
      await getConfig()
      message.success('保存成功')
    } catch (error) {}

    setLoading(false)
  })

  return {
    formRef,
    loading,
    getConfig,
    handleFinish
  }
}
