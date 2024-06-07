import { convertEnum } from '@wmeimob/utils/src/enumUtil'

/**
 * 用户性别
 */
export enum EGender {
  /** 未知 */
  Unknown,
  /** 男性 */
  Male,
  /** 女性 */
  Female
}

export const [MGender, OGender] = convertEnum([
  [EGender.Unknown, '未知'],
  [EGender.Male, '男'],
  [EGender.Female, '女']
])
