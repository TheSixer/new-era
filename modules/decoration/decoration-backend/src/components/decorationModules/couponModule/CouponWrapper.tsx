import MMShopCoupon from './shop-coupon'
import useMallCoupon from './useMallCoupon'

export default function CouponWrapper(props) {
  const { couponData } = useMallCoupon(props.data)
  return props.size === 'small' ? <MMShopCoupon.Small data={couponData} rightText="立即领取" /> : <MMShopCoupon data={couponData} rightText="立即领取" />
}
