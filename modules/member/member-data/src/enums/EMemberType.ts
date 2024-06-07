import { convertEnum } from '@wmeimob/utils/src/enumUtil'

/** 用户的会员类型 */
export enum EMemberType {
  /** 普通用户 */
  Normal = 1,
  /** 会员用户 */
  Member = 2
}

export const [MMemberType, OMemberType] = convertEnum([
  [EMemberType.Normal, '普通用户'],
  [EMemberType.Member, '会员用户']
])
