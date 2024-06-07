import { convertEnum } from '@wmeimob/utils/src/enumUtil'

/**
 * 优惠码兑换状态
 */
export enum ECouponCodeBindStatus {
  /** 未兑换 */
  UnBind = 1,
  /** 已兑换 */
  Bind = 2,
  /** 过期未兑换 */
  Expired = 4
}

export const [MCouponCodeBindStatus, OCouponCodeBindStatus] = convertEnum([
  [ECouponCodeBindStatus.UnBind, '未兑换'],
  [ECouponCodeBindStatus.Bind, '已兑换'],
  [ECouponCodeBindStatus.Expired, '过期未兑换']
])
