import { convertEnum } from '@wmeimob/utils/src/enumUtil'

/** 签到方式 */
export enum ESignType {
  /** 自动签到 */
  Auto = 1,
  /** 手动签到 */
  Manual,
}

export const [MSignType, OSignType] = convertEnum([
  [ESignType.Manual, '手动签到'],
  [ESignType.Auto, '自动签到']
])
