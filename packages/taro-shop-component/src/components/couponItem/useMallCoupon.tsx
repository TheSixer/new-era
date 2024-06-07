import { CouponTemplateVo, MemCouponVo } from '@wmeimob/taro-api'
import { IMMShopCouponData } from '@wmeimob/taro-shop-coupon/src/components/shop-coupon/const'
import { useMemo } from 'react'
import { ECouponExpireDateType, ECouponType } from '../../enums/ECoupon'
import dayjs from 'dayjs'
import { times } from 'number-precision'

/**
 * 将商城优惠券数据进行转化
 */
export default function useMallCoupon(data: CouponTemplateVo | MemCouponVo) {
  function isMemCouponVo(coupon: CouponTemplateVo | MemCouponVo): coupon is MemCouponVo {
    return (coupon as MemCouponVo).couponName !== undefined
  }

  const couponData = useMemo(() => {
    const { acceptGoodsType, price, discount = 0, couponType, expireDateType, termStart, termEnd, demandPrice } = data

    const isPrice = couponType === ECouponType.PRICE

    let title = ''
    let description = ''

    if (expireDateType === ECouponExpireDateType.DESIGNATE || (expireDateType === ECouponExpireDateType.DYNAMIC && termStart && termEnd)) {
      description = `${dayjs(termStart).format('YYYY.MM.DD')}~${dayjs(termEnd).format('YYYY.MM.DD')}`
    }

    if (isMemCouponVo(data)) {
      title = data.couponName!
    } else {
      const { name, startDayCount, expDayCount } = data
      title = name!

      if (expireDateType === ECouponExpireDateType.DYNAMIC) {
        description = !startDayCount ? '领取后生效' : `领取${startDayCount}后天生效,`
        description += `有效${expDayCount}天`
      }
    }

    return {
      type: couponType,
      count: isPrice ? price : times(discount, 10),
      title,
      subTitle: acceptGoodsType === 1 ? '指定商品可用' : '全部商品可用',
      detail: data.detail,
      description,
      demandPrice
    } as IMMShopCouponData
  }, [data])

  return { couponData }
}
