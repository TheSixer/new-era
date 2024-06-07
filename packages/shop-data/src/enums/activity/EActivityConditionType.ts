import { convertEnum } from '@wmeimob/utils/src/enumUtil'

export enum EActivityConditionType {
  /** 满N件 */
  Packages = 0,

  /** 满N元 */
  Price = 1
}

export const [MActivityConditionType, OActivityConditionType] = convertEnum([
  [EActivityConditionType.Packages, '满N件'],
  [EActivityConditionType.Price, '满N元']
])
