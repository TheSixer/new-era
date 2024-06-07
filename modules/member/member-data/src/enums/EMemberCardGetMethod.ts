import { convertEnum } from '@wmeimob/utils/src/enumUtil'

/**
 * 会员卡获得方式
 */
export enum EMemberCardGetMethod {
  /** 自动发放 */
  AutoSend = 1,

  /** 用户领取 */
  UserReceive = 2,

  /** 后台发放 */
  BackendSend = 3,

  /** 付费 */
  Pay = 4
}

export const [MMemberCardGetMethod, OMemberCardGetMethod] = convertEnum([
  [EMemberCardGetMethod.AutoSend, '自动发放'],
  [EMemberCardGetMethod.UserReceive, '用户领取'],
  [EMemberCardGetMethod.BackendSend, '后台发放'],
  [EMemberCardGetMethod.Pay, '付费']
])
