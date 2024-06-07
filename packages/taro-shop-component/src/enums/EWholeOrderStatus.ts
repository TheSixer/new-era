/**
 * 订单状态
 *
 * 此状态为后端返回所有的订单状态
 * 简化状态请查阅EOrderStatus
 */
export enum EWholeOrderStatus {
  /**
   * 待付款 可取消
   */
  ORDER_STATUS_PENDING_PAYMENT = 100,
  /**
   * 部分付款
   */
  ORDER_STATUS_PAY_ERROR = 190,

  /**
   * 待发货
   */
  ORDER_STATUS_UNSHIPPED = 200,
  /**
   * 待发货 - 部分发货
   */
  ORDER_STATUS_PART_SHIPPED = 201,

  /**
   * 待收货
   */
  ORDER_STATUS_WAIT_RECEIVING = 300,

  /**
   * 交易完成-待评价
   * 系统自动收货
   */
  ORDER_STATUS_SYS_COMPLETED = 400,
  /**
   * 交易完成-待评价
   * 用户确认收货
   */
  ORDER_STATUS_USER_COMPLETED = 401,
  /**
   * 交易完成-待评价
   * 部分确认收货
   */
  ORDER_STATUS_PART_COMPLETED = 402,

  /**
   * 交易完成-已评价
   * 系统自动评价
   */
  ORDER_STATUS_SYS_COMMENT = 500,
  /**
   * 交易完成-已评价
   * 用户评价
   */
  ORDER_STATUS_USER_COMMENT = 501,

  /**
   * 交易关闭
   * 超时自动取消
   */
  ORDER_STATUS_SYS_CANCEL = 900,
  /**
   * 交易关闭
   * 主动取消
   */
  ORDER_STATUS_USER_CANCEL = 901,
  /**
   * 交易关闭
   * 全部退货退款
   */
  ORDER_STATUS_REFUND_CANCEL = 902
}
