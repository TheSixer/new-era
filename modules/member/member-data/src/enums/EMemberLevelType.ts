import { convertEnum } from '@wmeimob/utils/src/enumUtil'

/** 会员升级制度 */
export enum EMemberLevelType {
  /** 消费金额 */
  Monetary = 1,
  /** 积分总量 */
  Intergal = 2
}

export const [MMemberLevelType, OMemberLevelType] = convertEnum([
  [EMemberLevelType.Monetary, '消费金额']
  // [EMemberLevelType.Intergal, '积分总量']
])
