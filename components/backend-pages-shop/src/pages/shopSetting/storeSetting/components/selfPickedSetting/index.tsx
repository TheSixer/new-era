import LocationInput from '@wmeimob/backend-pro/src/components/locationInput'
import { validatePosition } from '@wmeimob/backend-pro/src/components/locationInput/const'
import { ESettingKey } from '@wmeimob/shop-data/src/enums/ESettingKey'
import { Button, Card, Divider, Form, Input, InputNumber } from 'antd'
import { FC, memo } from 'react'
import { defaultFormProps } from '../../../setting/components/formProps'
import useSettingService from '../../../setting/hooks/useSettingService'

interface IProps {
  disabled?: boolean
}

const { takeout_no_verification_cancel_time, takeout_self_picked_location, takeout_self_picked_address, takeout_self_picked_meal_preparation_time } =
  ESettingKey

const Component: FC<IProps> = (props) => {
  const { disabled } = props

  const { onFinish, form, loading } = useSettingService({
    key: [takeout_no_verification_cancel_time, takeout_self_picked_location, takeout_self_picked_address, takeout_self_picked_meal_preparation_time]
  })

  return (
    <Card
      title="自提设置"
      extra={
        !disabled && (
          <Button type="primary" loading={loading} onClick={onFinish}>
            保存
          </Button>
        )
      }
    >
      <Form {...defaultFormProps} form={form}>
        <Form.Item label="备餐时间设置" name={takeout_self_picked_meal_preparation_time} extra="*不填则系统默认30分钟">
          <InputNumber disabled={disabled} min={10} max={24 * 60} precision={0} addonAfter="下单后分钟送达" />
        </Form.Item>

        <Form.Item
          label="自提点定位"
          name={takeout_self_picked_location}
          rules={[{ required: true, message: '请填写经纬度' }, { validator: (_, position: string) => validatePosition(position) }]}
        >
          <LocationInput disabled={disabled} />
        </Form.Item>

        <Form.Item label="详细地址" name={takeout_self_picked_address} extra="*不填写，默认不开启自提功能">
          <Input disabled={disabled} style={{ width: 500 }} maxLength={50} placeholder="输入自提点详细地址" />
        </Form.Item>

        <Divider />

        <Form.Item label="未核销过期自动取消" name={takeout_no_verification_cancel_time} extra="*填0或不填则过核销时间后就自动取消">
          <InputNumber disabled={disabled} min={0} max={9999} precision={0} placeholder="取消时间" addonAfter="分钟后" />
        </Form.Item>
      </Form>
    </Card>
  )
}

Component.displayName = 'SelfPickedSetting'

const SelfPickedSetting = memo(Component)
export default SelfPickedSetting
