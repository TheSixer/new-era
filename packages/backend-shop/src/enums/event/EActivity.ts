import { convertEnum } from '@wmeimob/utils/src/enumUtil'

/** 报名启态 */
export enum EActivityStatus {
  /** 全部 */
  All = 0,
  /** 待分配座位 */
  Dispatching = 1,
  /** 已分配座位 */
  Dispatched = 2,
  /** 已核销 */
  Used = 3,
  /** 已取消 */
  Canceled =4
}

export const [MActivityStatus, OActivityStatus] = convertEnum([
  [EActivityStatus.All, '全部'],
  [EActivityStatus.Dispatching, '待分配座位'],
  [EActivityStatus.Dispatched, '已分配座位'],
  [EActivityStatus.Used, '已核销'],
  [EActivityStatus.Canceled, '已取消']
])
