import { useAtom, useAtomValue } from 'jotai'
import { ICouponSelectProps } from '../components/couponSelect'
import { checkedCouponNoAtom, orderCouponsInfo, showCouponPopAtom } from '../store'

/** 满减、满折优惠券选择逻辑 */
export default function useCommonCouponSelect({ orderCalculate }: { orderCalculate(couponNo: string): Promise<void> }) {
  const [checkedCouponNo, setCheckedCouponNo] = useAtom(checkedCouponNoAtom)
  const [visible, onVisibleChange] = useAtom(showCouponPopAtom)

  const { commonCoupons } = useAtomValue(orderCouponsInfo)

  const couponSelectProps: ICouponSelectProps = {
    data: commonCoupons,
    visible,
    selected: checkedCouponNo,
    onVisibleChange,
    onOk: (couponNo) => {
      const no = couponNo === '' ? 'NOSELECT' : couponNo
      orderCalculate(no)
      setCheckedCouponNo(no)
      onVisibleChange(false)
    }
  }

  return couponSelectProps
}
