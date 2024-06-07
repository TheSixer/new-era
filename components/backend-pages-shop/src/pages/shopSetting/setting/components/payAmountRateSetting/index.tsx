import { FC, memo } from 'react'
import { Card, Form } from 'antd'
import { ESettingKey } from '@wmeimob/shop-data/src/enums/ESettingKey'
import useSettingService from '../../hooks/useSettingService'
import { defaultFormProps } from '../formProps'
import ItemNumber from '../ItemNumber'

const { use_integral_limit, use_integral_amount } = ESettingKey

interface IProps {}

const Component: FC<IProps> = (props) => {
  // const {} = props

  const { form } = useSettingService({ key: [use_integral_limit, use_integral_amount] })

  return (
    <Card title="支付金额比例设置">
      <Form
        {...defaultFormProps}
        form={form}
        initialValues={{
          [use_integral_limit]: 100
        }}
      >
        <Form.Item label="积分最多抵扣订单实际金额" name={use_integral_limit}>
          <ItemNumber disabled addonAfter="%" min={1} max={100} precision={0} />
        </Form.Item>

        <Form.Item label="一元等于积分" name={use_integral_amount}>
          <ItemNumber disabled addonAfter="积分" min={1} max={99999} precision={0} />
        </Form.Item>
      </Form>
    </Card>
  )
}

Component.displayName = 'PayAmountRateSetting'

const PayAmountRateSetting = memo(Component)
export default PayAmountRateSetting
