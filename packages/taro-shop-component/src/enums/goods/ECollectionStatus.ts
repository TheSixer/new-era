/** 商品的收藏状态 */
export enum ECollectionStatus {
  /** 删除、下架 */
  Lose,
  /** 正常 */
  Normal
}

export const MCollectionStatus = {
  [ECollectionStatus.Normal]: '正常',
  [ECollectionStatus.Lose]: '已失效'
}
