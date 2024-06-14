import { createEnumOptions } from '../utils'

/**
 * 活动状态
 * 0：未启用 1：启用 2：结束 3：待审核 4：审核失败 状态为0和1时前端展示启用和未启用功能
 */
export enum EEventStatus {
  /** 未核销 */
  NoUse = 0,

  /** 已核销 */
  Used = 2,

  /** 已取消 */
  Canceled = 3,
}

export const MEventStatus = {
  [EEventStatus.NoUse]: '未核销',
  [EEventStatus.Used]: '已核销',
  [EEventStatus.Canceled]: '已取消'
}

export const OEventStatus = createEnumOptions(MEventStatus)
