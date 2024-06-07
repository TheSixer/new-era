import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import MMNavigation from '@wmeimob/taro-design/src/components/navigation'
import { FC, useState } from 'react'
import MMShopCoupon from '~/components/shop-coupon2'
import { IMMShopCouponData } from '~/components/shop-coupon/const'

const Component: FC<any> = () => {
  const { coupon, discountCoupon, checkCoupon, setCheckCoupon } = usePageCouponService()
  return (
    <View>
      <MMNavigation title="优惠券2" />

      <View style={{ padding: 15 }}>
        <MMShopCoupon data={coupon} />

        <MMShopCoupon data={discountCoupon} />

        <MMShopCoupon data={coupon} rightText="立即领取" />

        <MMShopCoupon data={coupon} rightText="已过期" disabled />

        <MMShopCoupon data={coupon} checked={checkCoupon.checked} onClick={(checked) => setCheckCoupon((pre) => ({ ...pre, checked }))} />

        <View style={{ display: 'flex' }}>
          <MMShopCoupon.Small data={coupon} rightText="立即领取" />
          <MMShopCoupon.Small data={coupon} rightText="立即领取" />
        </View>

        <MMShopCoupon data={{ ...coupon, count: 888.8 }} />
        <MMShopCoupon data={{ ...coupon, count: 888.88 }} />

        <MMShopCoupon data={{ ...coupon, count: 398.999 }} />
        <MMShopCoupon data={{ ...coupon, count: 398.9999 }} />
        <MMShopCoupon data={{ ...coupon, count: 398.99999 }} />
      </View>
    </View>
  )
}

export default Component

function usePageCouponService() {
  const [coupon] = useState<IMMShopCouponData>({
    type: 'money',
    count: 120,
    title: '优惠券名称',
    subTitle: '指定商品可用',
    description: '2020.01.05～2020.02.25'
  })

  const [discountCoupon] = useState<IMMShopCouponData>({
    type: 'discount',
    count: 8,
    title: '优惠券名称',
    subTitle: '指定商品可用',
    description: '2020.01.05～2020.02.25'
  })

  const [checkCoupon, setCheckCoupon] = useState<IMMShopCouponData & { checked: boolean }>({
    checked: true,
    type: 'discount',
    count: 8,
    title: '优惠券名称',
    subTitle: '指定商品可用',
    description: '2020.01.05～2020.02.25'
  })

  return {
    coupon,
    discountCoupon,
    checkCoupon,
    setCheckCoupon
  }
}
