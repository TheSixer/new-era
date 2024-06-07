export enum EActivityConditionType {
  /** 满N件 */
  Packages = 0,

  /** 满N元 */
  Price = 1
}

export const MActivityConditionType = {
  [EActivityConditionType.Packages]: '满N件',
  [EActivityConditionType.Price]: '满N元'
}

export const OActivityConditionType = [EActivityConditionType.Packages, EActivityConditionType.Price].map((value) => ({
  label: MActivityConditionType[value],
  value
}))
