import { convertEnum } from '@wmeimob/utils/src/enumUtil'

/** 报名启态 */
export enum EActivityStatus {
  /** 全部 */
  All = -1,
  /** 待分配座位 */
  Dispatching = 0,
  /** 已分配座位 */
  Dispatched = 1,
  /** 已核销 */
  Used = 2,
  /** 已取消 */
  Canceled = 3
}

export const [MActivityStatus, OActivityStatus] = convertEnum([
  [EActivityStatus.All, '全部'],
  [EActivityStatus.Dispatching, '待分配座位'],
  [EActivityStatus.Dispatched, '已分配座位'],
  [EActivityStatus.Used, '已核销'],
  [EActivityStatus.Canceled, '已取消']
])

/** 活动状态 */
export enum EEventStatus {
  /** 未开始 */
  Begining = 0,
  /** 进行中 */
  InProgress = 1,
  /** 已结束 */
  Done = 2,
}

export const [MEventStatus, OEventStatus] = convertEnum([
  [EEventStatus.Begining, '未开始'],
  [EEventStatus.InProgress, '进行中'],
  [EEventStatus.Done, '已结束']
])

/** 核销方式 */
export enum ECheckType {
  /** 用户扫码 */
  UserScan = 0,
  /** 员工扫码 */
  StaffScan = 1,
  /** 用户手动确认 */
  UserCheck = 2,
}

export const [MCheckType, OCheckType] = convertEnum([
  [ECheckType.UserScan, '用户扫码'],
  [ECheckType.StaffScan, '员工扫码'],
  [ECheckType.UserCheck, '用户手动确认']
])
