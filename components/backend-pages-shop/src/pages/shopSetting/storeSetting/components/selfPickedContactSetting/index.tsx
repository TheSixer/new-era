import mmFormRule from '@wmeimob/form-rules'
import { ESettingKey } from '@wmeimob/shop-data/src/enums/ESettingKey'
import { Button, Card, Form, Input } from 'antd'
import { FC, memo } from 'react'
import { defaultFormProps } from '../../../setting/components/formProps'
import useSettingService from '../../../setting/hooks/useSettingService'

interface IProps {
  disabled?: boolean
}

const { takeout_self_picked_telephone } = ESettingKey

const Component: FC<IProps> = (props) => {
  const { disabled } = props

  const { onFinish, form, loading } = useSettingService({ key: [takeout_self_picked_telephone] })

  return (
    <Card
      title="联系方式设置"
      extra={
        !disabled && (
          <Button type="primary" loading={loading} onClick={onFinish}>
            保存
          </Button>
        )
      }
    >
      <Form {...defaultFormProps} form={form}>
        <Form.Item label="客服电话" name={takeout_self_picked_telephone} rules={mmFormRule.mobileAndFixedTelephone}>
          <Input disabled={disabled} style={{ width: 300 }} maxLength={20} placeholder="请输入有效电话" />
        </Form.Item>
      </Form>
    </Card>
  )
}

Component.displayName = 'SelfPickedContactSetting'

const SelfPickedContactSetting = memo(Component)
export default SelfPickedContactSetting
