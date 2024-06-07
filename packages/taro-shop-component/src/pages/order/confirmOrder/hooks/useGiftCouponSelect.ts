import { useAtom, useAtomValue } from 'jotai'
import { ICouponSelectProps } from '../components/couponSelect'
import { giftCouponNoAtom, orderCouponsInfo, showGiftCouponNoAtom } from '../store'

/** 赠品优惠券选择逻辑 */
export default function useGiftCouponSelect({ orderCalculate }: { orderCalculate(couponNo: string): Promise<void> }) {
  const [visible, onVisibleChange] = useAtom(showGiftCouponNoAtom)
  const [couponNo, setCouponNo] = useAtom(giftCouponNoAtom)

  const { presentCoupons } = useAtomValue(orderCouponsInfo)

  const couponSelectProps: ICouponSelectProps = {
    data: presentCoupons,
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
