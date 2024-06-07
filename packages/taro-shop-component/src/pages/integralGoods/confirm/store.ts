import { atom } from 'jotai'
import { plus } from 'number-precision'
import { ItemGoodsInfo, UserAddressOutPutDto } from '@wmeimob/taro-api'

// 地址atom
export const addressAtom = atom<UserAddressOutPutDto>({})
// 备注
export const remarkAtom = atom('')

// 商品列表
// export const confirmOrderGoodsAtom = atom<IConfirmOrderGood[]>([])

// 确认订单商品
export const confirmGoodsAtom = atom<ItemGoodsInfo[]>([])

/** 确认订单商品总件数 */
export const confirmGoodsQtyTotal = atom((get) => get(confirmGoodsAtom)?.reduce((qty, { buyCounts }) => {
  return plus(qty, buyCounts || 0)
}, 0))

// 是否显示优惠券弹窗
export const showCouponPopAtom = atom(false)
// 是否显示订单详情弹窗
export const showOrderDetailAtom = atom(false)
/**
 * 是否禁用备注输入框
 * 因为input框的层级是最高的。所以在弹窗显示的时候禁用掉输入框
 */
export const disableInputAtom = atom(get => get(showCouponPopAtom) || get(showOrderDetailAtom))
