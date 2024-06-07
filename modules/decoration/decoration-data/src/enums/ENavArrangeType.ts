/** 导航排列类型 */
export enum ENavArrangeType {
  /** 平均分布 */
  Average = 1,
  /** 固定宽度 */
  Fixed
}

export const MNavArrangeType = {
  [ENavArrangeType.Average]: '平均分布',
  [ENavArrangeType.Fixed]: '固定宽度'
}

export const ONavArrangeType = [
  { label: '平均分布', value: ENavArrangeType.Average },
  { label: '固定宽度', value: ENavArrangeType.Fixed }
]
