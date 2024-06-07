import { memo, FC } from 'react'
import { ICouponItemProps } from './const'

import MMShopCoupon from '@wmeimob/taro-shop-coupon/src/components/shop-coupon2'
import useMallCoupon from './useMallCoupon'

const Component: FC<ICouponItemProps> = (props) => {
  const { data = {}, size, ...rest } = props
  const { couponData } = useMallCoupon(data)

  return size === 'small' ? <MMShopCoupon.Small {...rest} data={couponData} /> : <MMShopCoupon {...rest} data={couponData} />
}

const CouponItem = memo(Component)
export default CouponItem
