import { DeleteOutlined } from '@ant-design/icons'
import { ESettingKey } from '@wmeimob/shop-data/src/enums/ESettingKey'
import { Button, Card, Divider, Form, Space } from 'antd'
import { FC, memo } from 'react'
import { EPresentCouponType } from '../../../../../enums/coupon/EPresentCouponType'
import useSettingService from '../../hooks/useSettingService'
import CouponSelectDrawer from '../couponSelectDrawer'
import { ICouponSelectDrawerChildrenParams } from '../couponSelectDrawer/const'
import { defaultFormProps } from '../formProps'
import ItemNumber from '../ItemNumber'

interface IFormProps {
  disabled?: boolean
}

const { present_coupon_when_order_finished, present_coupon_order_amount, present_coupon_when_order_commented } = ESettingKey

const Component: FC<IFormProps> = (props) => {
  const { disabled } = props

  const { onFinish, form, loading } = useSettingService({
    key: [present_coupon_when_order_finished, present_coupon_order_amount, present_coupon_when_order_commented]
  })

  const renderCouponSelectDrawerSlot = ({ coupons, add, remove }: ICouponSelectDrawerChildrenParams) => {
    const { name, _invalid } = coupons[0] ?? {}
    if (disabled) {
      return coupons.length ? <span>{name || '-'}</span> : <span>不赠送</span>
    }

    return coupons.length ? (
      <Space>
        <a onClick={add} style={{ color: _invalid ? 'red' : undefined }}>
          {name || '-'}
          {_invalid && '(已失效)'}
        </a>
        <DeleteOutlined onClick={() => remove()} />
      </Space>
    ) : (
      <a onClick={add}>不赠送</a>
    )
  }

  return (
    <Card
      title="赠送设置"
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
          [present_coupon_when_order_finished]: JSON.stringify([]),
          // [ESettingKey.present_coupon_when_order_finished_type]: [1],
          [present_coupon_order_amount]: 0,
          [present_coupon_when_order_commented]: JSON.stringify([])
          // [ESettingKey.present_coupon_when_order_commented_type]: [1]
        }}
      >
        <Form.Item label="订单完成赠送优惠券" name={present_coupon_when_order_finished}>
          <CouponSelectDrawer max={1} render={renderCouponSelectDrawerSlot} />
        </Form.Item>

        {/* <ProFormCheckbox.Group
        label="适用订单类型"
        name={ESettingKey.present_coupon_when_order_finished_type}
        options={[
          { label: '普通订单', value: 1 },
          { label: '限时抢购订单', value: 2 }
        ]}
        hidden
      /> */}

        <Form.Item label="订单金额" name={present_coupon_order_amount}>
          <ItemNumber addonAfter="元" extra="*订单金额达到后赠送，填0则无限制" disabled={disabled} min={0} max={999999} />
        </Form.Item>

        <Divider />

        <Form.Item label="评价完成赠送优惠券" name={present_coupon_when_order_commented}>
          <CouponSelectDrawer max={1} render={renderCouponSelectDrawerSlot} />
        </Form.Item>

        {/* <ProFormCheckbox.Group
        label="适用订单类型"
        name={ESettingKey.present_coupon_when_order_commented_type}
        options={[
          { label: '普通订单', value: 1 },
          { label: '限时抢购订单', value: 2 }
        ]}
        hidden
      /> */}
      </Form>
    </Card>
  )
}

Component.displayName = 'OrderPresentSetting'

const OrderPresentSetting = memo(Component)

export default OrderPresentSetting
