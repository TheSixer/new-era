
/** 图片排列类型 */
export enum EArrangeType {
  /** 纵向平铺 */
  Vertical = 1,
  /** 横向平铺 */
  Orientation,
  /** 横向滚动 */
  Scroll,
}

export const MArrangeType = {
  [EArrangeType.Orientation]: '横向平铺',
  [EArrangeType.Vertical]: '纵向平铺',
  [EArrangeType.Scroll]: '横向滚动'
}