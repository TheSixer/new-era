import { convertEnum } from '@wmeimob/utils/src/enumUtil'
/**
 * 任务类型
 */
export enum ETaskType {
  /** 固定任务 */
  Fixed = 1
}

export const [MTaskType, OTaskType] = convertEnum([[ETaskType.Fixed, '固定任务']])
