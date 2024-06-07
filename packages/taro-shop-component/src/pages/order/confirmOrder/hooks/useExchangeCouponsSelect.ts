import { useAtom, useAtomValue } from 'jotai'
import { ICouponSelectProps } from '../components/couponSelect'
import { exchangeCouponNoAtom, orderCouponsInfo, showExchangeCouponPopAtom } from '../store'

/** 兑换优惠券选择逻辑 */
export default function useExchangeCouponSelect({ orderCalculate }: { orderCalculate(couponNo: string): Promise<void> }) {
  const [visible, onVisibleChange] = useAtom(showExchangeCouponPopAtom)
  const [couponNo, setCouponNo] = useAtom(exchangeCouponNoAtom)

  const { exchangeCoupons } = useAtomValue(orderCouponsInfo)

  const couponSelectProps: ICouponSelectProps = {
    data: exchangeCoupons,
    visible,
    selected: !couponNo ? undefined : couponNo,
    onVisibleChange,
    onOk: (_couponNo) => {
      orderCalculate(_couponNo)
      setCouponNo(_couponNo)
      onVisibleChange(false)
    }
  }

  return couponSelectProps
}
