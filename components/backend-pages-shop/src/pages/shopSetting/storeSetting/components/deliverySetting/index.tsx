import LocationInput from '@wmeimob/backend-pro/src/components/locationInput'
import { validatePosition } from '@wmeimob/backend-pro/src/components/locationInput/const'
import { ESettingKey } from '@wmeimob/shop-data/src/enums/ESettingKey'
import { Button, Card, Form, InputNumber } from 'antd'
import { FC, memo } from 'react'
import AreaAmountList from '../areaAmountList'
import { defaultFormProps } from '../../../setting/components/formProps'
import useSettingService from '../../../setting/hooks/useSettingService'

interface IProps {
  disabled?: boolean
}

const { takeout_shop_location, takeout_distributable_range, takeout_over_amount_free_shipping, takeout_scheduled_time, takeout_range_amount } = ESettingKey

const Component: FC<IProps> = (props) => {
  const { disabled } = props

  const { onFinish, form, loading } = useSettingService({
    key: [takeout_shop_location, takeout_distributable_range, takeout_over_amount_free_shipping, takeout_scheduled_time, takeout_range_amount]
  })

  return (
    <Card
      title="外送设置"
      extra={
        !disabled && (
          <Button type="primary" loading={loading} onClick={onFinish}>
            保存
          </Button>
        )
      }
    >
      <Form {...defaultFormProps} form={form}>
        <Card bordered={false} size="small">
          <Form.Item label="外送预计时间设置" name={takeout_scheduled_time} extra="*不填则系统默认30分钟">
            <InputNumber disabled={disabled} min={10} max={24 * 60} precision={0} addonAfter="下单后分钟送达" />
          </Form.Item>
        </Card>

        <Card title="配送费设置" bordered={false} size="small">
          <Form.Item label="免配送设置" name={takeout_over_amount_free_shipping}>
            <InputNumber disabled={disabled} min={0.01} max={99999} precision={2} addonBefore="满" addonAfter="元免配送费" />
          </Form.Item>

          <Form.Item label="门店定位">
            <Form.Item name={takeout_distributable_range} extra="*不填写，默认配送范围为3km，且不能设置范围金额，默认为免配送费">
              <InputNumber disabled={disabled} min={1} max={99999} precision={0} addonBefore="可配送范围" addonAfter="km" />
            </Form.Item>
            <Form.Item
              name={takeout_shop_location}
              noStyle
              rules={[{ required: true, message: '请填写经纬度' }, { validator: (_, position: string) => validatePosition(position) }]}
            >
              <LocationInput disabled={disabled} />
            </Form.Item>
          </Form.Item>

          <Form.Item label="范围金额设置">
            <AreaAmountList form={form} name={takeout_range_amount} disabled={disabled} />
          </Form.Item>
        </Card>
      </Form>
    </Card>
  )
}

Component.displayName = 'DeliverySetting'

const DeliverySetting = memo(Component)
export default DeliverySetting
