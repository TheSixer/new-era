import { convertEnum } from '@wmeimob/utils/src/enumUtil'

/**
 * 活动状态
 * 0：未启用 1：启用 2：结束 3：待审核 4：审核失败 状态为0和1时前端展示启用和未启用功能
 */
export enum EActivityStatus {
  /** 未启用 */
  NoUse = 0,

  /** 启用 */
  Use = 1,

  /** 结束 */
  Finish,

  /** 待审核 */
  PendingAudit,

  /** 审核失败 */
  AuditFailure
}

export const [MActivityStatus, OActivityStatus] = convertEnum([
  [EActivityStatus.NoUse, '未启用'],
  [EActivityStatus.Use, '启用'],
  [EActivityStatus.Finish, '结束'],
  [EActivityStatus.PendingAudit, '待审核'],
  [EActivityStatus.AuditFailure, '审核失败']
])
