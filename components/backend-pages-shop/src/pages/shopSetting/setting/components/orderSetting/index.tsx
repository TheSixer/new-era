import mmFormRule from '@wmeimob/form-rules'
import { ESettingKey } from '@wmeimob/shop-data/src/enums/ESettingKey'
import { Button, Card, Form } from 'antd'
import { FC, memo } from 'react'
import useSettingService from '../../hooks/useSettingService'
import { defaultFormProps } from '../formProps'
import ItemNumber from '../ItemNumber'

interface IOrderSettingProps {
  disabled?: boolean
}

const Component: FC<IOrderSettingProps> = (props) => {
  const { disabled = false } = props
  const { order_payment_waiting_time_minutes, order_receiving_waiting_time_day, order_receiving_close } = ESettingKey

  const { onFinish, form, loading } = useSettingService({ key: [order_payment_waiting_time_minutes, order_receiving_waiting_time_day, order_receiving_close] })

  return (
    <Card
      title="订单流程设置"
      extra={
        !disabled && (
          <Button type="primary" loading={loading} onClick={onFinish}>
            保存
          </Button>
        )
      }
    >
      <Form {...defaultFormProps} form={form}>
        <Form.Item label="订单支付时间" name={order_payment_waiting_time_minutes}>
          <ItemNumber addonAfter="分钟" disabled={disabled} min={1} max={9999} precision={0} extra="*不填则系统默认30分钟" />
        </Form.Item>

        <Form.Item label="发货后自动收货时间" name={order_receiving_waiting_time_day}>
          <ItemNumber addonAfter="天" extra="*最长可设置30天,填0则无自动收货" disabled={disabled} min={0} max={30} precision={0} />
        </Form.Item>

        <Form.Item label="收货后可维权时间" name={order_receiving_close} rules={mmFormRule.required}>
          <ItemNumber addonAfter="天" extra="*最长可设置365天" disabled={disabled} min={1} max={365} precision={0} />
        </Form.Item>
      </Form>
    </Card>
  )
}

const OrderSetting = memo(Component)
export default OrderSetting
