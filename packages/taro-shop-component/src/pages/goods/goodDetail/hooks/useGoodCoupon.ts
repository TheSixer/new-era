import { useState, useMemo, useEffect } from 'react'
import { useToast } from '@wmeimob/taro-design'
import { api } from '@wmeimob/taro-api'
import { CouponTemplateVo } from '@wmeimob/taro-api'
import { useGlobalStore } from '@wmeimob/taro-store'
import { getCouponOperationText } from '../../../../utils/coupon'
import { useSuperLock } from '@wmeimob/utils/src/hooks/useSuperLock'

/**
 * 优惠券业务
 *
 * @export
 * @param {string} [goodsNo=''] 商品编号
 * @return {*}
 */
export default function useGoodCoupon(goodsNo = '') {
  const [toast] = useToast()
  const { user } = useGlobalStore()
  const [couponVisible, setCouponVisible] = useState(false)
  const [couponList, setCouponList] = useState<CouponTemplateVo[]>([])

  // 显示在领取栏的优惠券
  const couponCell = useMemo(() => couponList.slice(0, 2), [couponList])

  /**
   * 获取优惠券
   */
  async function getCoupon() {
    const res = await api['/wechat/web/memCoupon/receiveGoodsCoupon_POST']({ goodsNoList: [goodsNo] })
    setCouponList(res.data || [])
  }

  useEffect(() => {
    if (goodsNo && user.mobile) {
      getCoupon()
    }
  }, [goodsNo, user.mobile])

  /**
   * 领取优惠券
   * @param coupon
   */
  const [handleReceiveCoupon] = useSuperLock(async (coupon: CouponTemplateVo) => {
    const { templateNo = '', receiveNum = 0, stock = 0 } = coupon
    toast?.loading()
    try {
      await api['/wechat/web/memCoupon/receive_GET']({ templateNo })
      const newCoupon = { ...coupon, stock: stock - 1, receiveNum: receiveNum + 1 }
      const { receivedStock } = getCouponOperationText(newCoupon)
      toast?.message('领取成功!' + (receivedStock ? `还可领取${receivedStock}张` : ''))

      setCouponList((list) =>
        list.map((item) => {
          return item.templateNo === templateNo ? { ...item, receiveNum: receiveNum + 1, stock: stock - 1 } : { ...item }
        })
      )
    } catch (error) {
      await getCoupon()
    }
    toast?.hideLoading()
  })

  return {
    couponList,
    couponCell,
    couponVisible,
    setCouponVisible,
    handleReceiveCoupon
  }
}
