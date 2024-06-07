import { ESettingKey } from '@wmeimob/shop-data/src/enums/ESettingKey'
import { Button, Card, Divider, Form } from 'antd'
import { FC, memo } from 'react'
import { defaultFormProps } from '../../../setting/components/formProps'
import TimeRangeSelect from '../timeRangeSelect'
import useSettingService from '../../../setting/hooks/useSettingService'

interface IProps {
  disabled?: boolean
}

const { takeout_distribution_time_range, takeout_self_picked_time_range } = ESettingKey

const Component: FC<IProps> = (props) => {
  const { disabled } = props

  const { onFinish, form, loading } = useSettingService({
    key: [takeout_distribution_time_range, takeout_self_picked_time_range]
  })

  return (
    <Card
      title="下单时间段配置"
      extra={
        !disabled && (
          <Button type="primary" loading={loading} onClick={onFinish}>
            保存
          </Button>
        )
      }
    >
      <Form
        {...defaultFormProps}
        form={form}
        initialValues={{
          [takeout_distribution_time_range]: [],
          [takeout_self_picked_time_range]: []
        }}
      >
        <Form.Item label="送货上门时间配置" extra="*不设置开始、结束时间默认为全天，不设置可接单数量默认不限制">
          <TimeRangeSelect disabled={disabled} form={form} name={takeout_distribution_time_range} />
        </Form.Item>

        <Divider />

        <Form.Item label="到店自提时间配置" extra="*不设置开始、结束时间默认为全天，不设置可接单数量默认不限制">
          <TimeRangeSelect disabled={disabled} form={form} name={takeout_self_picked_time_range} />
        </Form.Item>
      </Form>
    </Card>
  )
}

Component.displayName = 'DeliveryOrderTimeRangeSetting'

const DeliveryOrderTimeRangeSetting = memo(Component)
export default DeliveryOrderTimeRangeSetting
