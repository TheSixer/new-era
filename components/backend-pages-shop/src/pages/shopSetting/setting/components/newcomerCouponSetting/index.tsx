import { DeleteOutlined } from '@ant-design/icons'
import { MCouponType } from '@wmeimob/shop-data/coupon/enums//ECouponType'
import { ESettingKey } from '@wmeimob/shop-data/src/enums/ESettingKey'
import { Button, Card, Form, Space } from 'antd'
import { FC, memo } from 'react'
import { getCouponUseCondition } from '../../../../../utils/coupon'
import useSettingService from '../../hooks/useSettingService'
import CouponSelectDrawer from '../couponSelectDrawer'
import { ICouponSelectDrawerChildrenParams } from '../couponSelectDrawer/const'
import { defaultFormProps } from '../formProps'
import styles from './index.module.less'

const { present_newcomer_coupon } = ESettingKey

interface INewcomerCouponSettingProps {
  disabled?: boolean
}

const Component: FC<INewcomerCouponSettingProps> = (props) => {
  const { disabled } = props

  const { onFinish, form, loading } = useSettingService({ key: [present_newcomer_coupon] })

  const renderCouponSelectDrawerSlot = ({ coupons, add: open, remove: clear }: ICouponSelectDrawerChildrenParams) => {
    const list = coupons.length ? (
      <div className={styles.selectedList}>
        {coupons.map((coupon, idx) => (
          <Space key={idx} style={{ display: 'flex' }}>
            <span>
              {coupon.name}【{MCouponType[coupon.couponType!]}】【{getCouponUseCondition(coupon)}】
            </span>
            {!disabled && <DeleteOutlined onClick={() => clear(idx)} />}
          </Space>
        ))}
      </div>
    ) : (
      <div>不赠送</div>
    )

    return (
      <>
        {list}
        {!disabled && (
          <Button type="primary" size="small" onClick={open}>
            添加优惠
          </Button>
        )}
      </>
    )
  }

  return (
    <Card
      title="新人券设置"
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
          [present_newcomer_coupon]: JSON.stringify([])
        }}
      >
        <Form.Item label="赠送优惠券" name={present_newcomer_coupon} extra="*开启后仅限新注册且未下单用户自动发放至券包">
          <CouponSelectDrawer render={renderCouponSelectDrawerSlot} />
        </Form.Item>
      </Form>
    </Card>
  )
}

Component.displayName = 'NewcomerCouponSetting'

const NewcomerCouponSetting = memo(Component)
export default NewcomerCouponSetting
