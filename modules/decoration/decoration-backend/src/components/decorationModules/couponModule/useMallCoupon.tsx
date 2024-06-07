import { useMemo } from 'react'
import dayjs from 'dayjs'
import { ECouponType } from '@wmeimob/shop-data/coupon/enums/ECouponType'
import { CouponTemplateVo, MemCouponVo } from '@wmeimob/backend-api/src/request/data-contracts'
import { IMMShopCouponData } from './shop-coupon/const'

// 优惠券生效时间条件
export enum ECouponExpireDateType {
  /** 无限制 */
  UNLIMITED = 0,
  /** 指定时间 */
  DESIGNATE,
  /** 动态时间 */
  DYNAMIC
}

/**
 * 将商城优惠券数据进行转化
 */
export default function useMallCoupon(data: CouponTemplateVo | MemCouponVo) {
  function isMemCouponVo(coupon: CouponTemplateVo | MemCouponVo): coupon is MemCouponVo {
    return (coupon as MemCouponVo).couponName !== undefined
  }

  const couponData = useMemo<IMMShopCouponData>(() => {
    const { price, discount = 0, couponType, expireDateType, termStart, termEnd, demandPrice } = data

    const isPrice = couponType === ECouponType.Deduction

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
      count: isPrice ? price : discount * 10,
      title,
      subTitle: data.detail,
      description,
      demandPrice
    }
  }, [data])

  return { couponData }
}
