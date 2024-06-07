import { atom, useAtom } from 'jotai'
import { ENewcomerCouponReceiveResult } from '../../enums/coupon/ENewcomerCouponReceiveResult'
import { api } from '@wmeimob/taro-api'
import { useToast } from '@wmeimob/taro-design'

/** 新人设置 */
export const newcomerAtom = atom<{
  /** 需要显示新人券弹窗 */
  shouldShowCouponDialog: boolean
}>({
  shouldShowCouponDialog: false
})

/** 新人券相关设置 */
export default function useNewcomer() {
  const [toast] = useToast()

  const [newcomer, setNewcomer] = useAtom(newcomerAtom)

  // 领取新人优惠券
  const receiveNewcomerCoupon = async () => {
    // 成功、部分成功 都需要提示领取成功
    const SUCCESSFUL = [ENewcomerCouponReceiveResult.Success, ENewcomerCouponReceiveResult.PartialStockLow]

    const { data } = await api['/wechat/web/member/presentNewcomerGift_POST']()
    const res: ENewcomerCouponReceiveResult = data?.newcomerCouponResult as any

    if (!SUCCESSFUL.includes(res)) return

    setNewcomer((prev) => ({ ...prev, shouldShowCouponDialog: true }))
  }

  // 提示新人券领取成功
  const toastReceiveNewcomerCouponSuccess = (closedCallback?: Function) => {
    if (!newcomer.shouldShowCouponDialog) {
      closedCallback?.()
      return
    }

    const TEXT = '一大波福利已领取至卡包~'
    toast?.message(TEXT, () => {
      closedCallback?.()
    })

    clearShouldShowCouponDialog()
  }

  // 关闭弹窗
  const clearShouldShowCouponDialog = () => {
    setNewcomer((prev) => ({ ...prev, shouldShowCouponDialog: false }))
  }

  return {
    receiveNewcomerCoupon,
    clearShouldShowCouponDialog,
    toastReceiveNewcomerCouponSuccess
  }
}
