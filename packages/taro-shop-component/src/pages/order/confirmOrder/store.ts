import { ECouponType } from '@wmeimob/shop-data/coupon/enums/ECouponType'
import { atom, useSetAtom } from 'jotai'
import { plus } from 'number-precision'
import { useEffect } from 'react'
import { ItemGoodsInfo, OrderCalculateResponse, UserAddressOutPutDto } from '@wmeimob/taro-api'

// 地址atom
export const addressAtom = atom<UserAddressOutPutDto>({})
// 备注
export const remarkAtom = atom('')

// 商品列表
// export const confirmOrderGoodsAtom = atom<IConfirmOrderGood[]>([])

// 确认订单商品
export const confirmGoodsAtom = atom<ItemGoodsInfo[]>([])

/** 确认订单商品总件数 */
export const confirmGoodsQtyTotal = atom((get) =>
  get(confirmGoodsAtom)?.reduce((qty, { buyCounts }) => {
    return plus(qty, buyCounts || 0)
  }, 0)
)

/** ---------- 优惠券 ---------- */
// 是否显示优惠券弹窗
export const showCouponPopAtom = atom(false)
/** 选中的优惠券编号 */
export const checkedCouponNoAtom = atom('')
// 是否显示兑换优惠券弹窗
export const showExchangeCouponPopAtom = atom(false)
// 兑换礼券号
export const exchangeCouponNoAtom = atom('')
// 是否显示包邮礼券弹窗
export const showFreeShippingCouponNoAtom = atom(false)
// 包邮礼券号
export const freeShippingCouponNoAtom = atom('')
// 是否显示赠品礼券弹窗
export const showGiftCouponNoAtom = atom(false)
// 赠品礼券号
export const giftCouponNoAtom = atom('')

// 是否显示订单详情弹窗
export const showOrderDetailAtom = atom(false)
/**
 * 是否禁用备注输入框
 * 因为input框的层级是最高的。所以在弹窗显示的时候禁用掉输入框
 */
export const disableInputAtom = atom(
  (get) =>
    get(showCouponPopAtom) || get(showExchangeCouponPopAtom) || get(showFreeShippingCouponNoAtom) || get(showGiftCouponNoAtom) || get(showOrderDetailAtom)
)

/**
 * 订单计算信息
 */
export const orderCalculateInfoAtom = atom<OrderCalculateResponse>({})

/**
 * 订单可用券信息
 */
export const orderCouponsInfo = atom((get) => {
  const { memCouponVoList = [] } = get(orderCalculateInfoAtom)

  const commonCoupons = memCouponVoList.filter((item) => item.couponType === ECouponType.Deduction || item.couponType === ECouponType.Discount)

  const exchangeCoupons = memCouponVoList.filter((item) => item.couponType === ECouponType.Exchange)

  const presentCoupons = memCouponVoList.filter((item) => item.couponType === ECouponType.Present)

  const noFreightCoupons = memCouponVoList.filter((item) => item.couponType === ECouponType.FreeShipping)

  return {
    /**
     * 可用普通优惠券列表
     * 满减/满折
     */
    commonCoupons,
    /**
     * 可用兑换优惠券列表
     */
    exchangeCoupons,
    /**
     * 可用赠品优惠券列表
     */
    presentCoupons,
    /**
     * 可用免邮优惠券列表
     */
    noFreightCoupons
  }
})

/** 重置store变量 */
export const useResetStore = () => {
  // 弹窗部分
  const showCoupon = useSetAtom(showCouponPopAtom)
  const showExchangeCoupon = useSetAtom(showExchangeCouponPopAtom)
  const showFreeShippingCouponNo = useSetAtom(showFreeShippingCouponNoAtom)
  const showGiftCouponNo = useSetAtom(showGiftCouponNoAtom)

  // 选择的券
  const setCheckedCouponNo = useSetAtom(checkedCouponNoAtom)
  const setExchangeCouponNo = useSetAtom(exchangeCouponNoAtom)
  const setFreeShippingCouponNo = useSetAtom(freeShippingCouponNoAtom)
  const setGiftCouponNo = useSetAtom(giftCouponNoAtom)

  // 其他
  const setAddress = useSetAtom(addressAtom)
  const setRemark = useSetAtom(remarkAtom)
  const setItemGoodsInfoList = useSetAtom(confirmGoodsAtom)
  const setOrderCalculateInfo = useSetAtom(orderCalculateInfoAtom)

  useEffect(
    () => () => {
      showCoupon(false)
      showExchangeCoupon(false)
      showFreeShippingCouponNo(false)
      showGiftCouponNo(false)

      setCheckedCouponNo('')
      setExchangeCouponNo('')
      setFreeShippingCouponNo('')
      setGiftCouponNo('')

      setAddress({})
      setRemark('')
      setItemGoodsInfoList([])
      setOrderCalculateInfo({})
    },
    []
  )
}
