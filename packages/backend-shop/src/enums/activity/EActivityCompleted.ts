import { convertEnum } from '@wmeimob/utils/src/enumUtil'

/**
 * 动结束后展示状态 0：不展示 1：展示
 */
export enum EActivityCompleted {
  /** 自动下架 */
  AutoHide = 0,

  /** 手动下架 */
  ManualHide = 1
}

export const [MActivityCompleted, OActivityCompleted] = convertEnum([
  [EActivityCompleted.AutoHide, '自动下架'],
  [EActivityCompleted.ManualHide, '手动下架']
])
