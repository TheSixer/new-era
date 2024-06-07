import { useAtom, useAtomValue } from 'jotai'
import { ICouponSelectProps } from '../components/couponSelect'
import { freeShippingCouponNoAtom, orderCouponsInfo, showFreeShippingCouponNoAtom } from '../store'

/** 免邮优惠券选择逻辑 */
export default function useFreeShippingCouponSelect({ orderCalculate }: { orderCalculate(couponNo: string): Promise<void> }) {
  const [visible, onVisibleChange] = useAtom(showFreeShippingCouponNoAtom)
  const [couponNo, setCouponNo] = useAtom(freeShippingCouponNoAtom)

  const { noFreightCoupons } = useAtomValue(orderCouponsInfo)

  const couponSelectProps: ICouponSelectProps = {
    data: noFreightCoupons,
    visible,
    selected: couponNo,
    onVisibleChange,
    onOk: (_couponNo) => {
      orderCalculate(_couponNo)
      setCouponNo(_couponNo)
      onVisibleChange(false)
    }
  }

  return couponSelectProps
}
