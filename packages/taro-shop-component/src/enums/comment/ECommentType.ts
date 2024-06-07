/**
 * 评论类型
 */
export enum ECommentType {
  /** 待评价 */
  Pending = '0',

  /** 已评价 */
  Done = '1'
}

export const MCommentType = {
  [ECommentType.Pending]: '待评价',
  [ECommentType.Done]: '已评价'
}
