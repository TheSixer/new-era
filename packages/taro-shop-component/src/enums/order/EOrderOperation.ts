/**
 * 订单操作类型
 */
export enum EOrderOperation {
  /** 付款 */
  Paying,

  /** 取消订单 */
  Cancel,

  /** 物流信息 */
  Logistics,

  /** 确认收货 */
  Confirm,

  /** 删除订单 */
  Del,

  /** 评价 */
  Comment,

  /** 查看评价 */
  SeeComment,

  /** 整单售后 */
  AfterSales,

  /** 更多 */
  More
}

/**
 * 订单操作类型中文描述
 */
export const MOrderOperation = {
  [EOrderOperation.Paying]: '去付款',
  [EOrderOperation.Cancel]: '取消订单',
  [EOrderOperation.Logistics]: '查看物流',
  [EOrderOperation.Confirm]: '确认收货',
  [EOrderOperation.Del]: '删除订单',
  [EOrderOperation.Comment]: '评价',
  [EOrderOperation.SeeComment]: '查看评价',
  [EOrderOperation.AfterSales]: '整单售后',
  [EOrderOperation.More]: '更多'
}
