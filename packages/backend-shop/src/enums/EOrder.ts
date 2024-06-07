import { LabeledValue } from 'antd/es/select'

/** 订单状态 */
export enum OrderStatusEnum {
  /** 交易中 */
  Trading,
  /** 交易成功 */
  TradingSuccess,
  /** 交易关闭 */
  TradingClose,
  /** 待支付 */
  PendingPayment = 100,
  /** 待支付定金 */
  PendingDownPayment,
  /** 待支付尾款 */
  PendingFinalPayment,
  /** 拼团中 */
  PendingGroupon,
  /** 未发货 */
  UnShipped = 200,
  /** 部分发货 */
  PartialShipped,
  /** 待收货 */
  WaitReceiving = 300,
  /** 自动收货 */
  SystemCompleted = 400,
  /** 用户确认收货 */
  UserCompleted,
  /* 部分确认收货 */
  PartialCompleted,
  /** 系统自动评价 */
  SystemComment = 500,
  /** 用户评价 */
  UserComment,
  /** 超时自动关闭 */
  SystemCancel = 900,
  /** 用户主动取消 */
  UserCancel,
  /** 全部退货退款 */
  RefundCancel,
  /** 支付异常 */
  PayError
}
export const OrderStatusName = {
  [OrderStatusEnum.Trading]: '交易中',
  [OrderStatusEnum.TradingSuccess]: '交易成功',
  [OrderStatusEnum.TradingClose]: '交易关闭',
  [OrderStatusEnum.PendingFinalPayment]: '等待支付定金',
  [OrderStatusEnum.PendingFinalPayment]: '等待支付尾款',
  [OrderStatusEnum.PendingGroupon]: '拼团中',
  [OrderStatusEnum.UnShipped]: '已付款，待发货',
  [OrderStatusEnum.PartialShipped]: '部分发货',
  [OrderStatusEnum.WaitReceiving]: '已发货，等待买家收货',
  [OrderStatusEnum.SystemCompleted]: '系统自动收货',
  [OrderStatusEnum.UserCompleted]: '用户确认收货',
  [OrderStatusEnum.PartialCompleted]: '部分确认收货',
  [OrderStatusEnum.SystemComment]: '已评价',
  [OrderStatusEnum.UserComment]: '已评价',
  [OrderStatusEnum.SystemCancel]: '交易关闭',
  [OrderStatusEnum.UserCancel]: '交易关闭',
  [OrderStatusEnum.RefundCancel]: '交易关闭',
  [OrderStatusEnum.PayError]: '交易关闭'
}

export const OrderStatusVirtualName = {
  ...OrderStatusName,
  [OrderStatusEnum.WaitReceiving]: '待核销',
  [OrderStatusEnum.UserCompleted]: '已完成（已核销）',
  [OrderStatusEnum.PartialCompleted]: '已完成（部分核销）'
}

/** 支付类型 */
export enum OrderPayTypeEnum {
  /** 微信支付 */
  Wechat,
  /** 支付宝支付 */
  Alipay
}
export const OrderPayTypeName = {
  [OrderPayTypeEnum.Alipay]: '支付宝支付',
  [OrderPayTypeEnum.Wechat]: '微信支付'
}

/** 配送方式 */
export enum OrderShipMethodEnum {
  /** 商家配送 */
  Store,
  /** 无需物流 */
  NoShip
}
export const OrderShipMethodName = {
  [OrderShipMethodEnum.Store]: '商家配送',
  [OrderShipMethodEnum.NoShip]: '无需物流'
}
export const orderShipMethodOptions: LabeledValue[] = [
  { label: '商家配送', value: OrderShipMethodEnum.Store },
  { label: '无需物流', value: OrderShipMethodEnum.NoShip }
]

/** 销售模式 */
export enum OrderSaleModeEnum {
  /** 现货 */
  Presale,
  /** 预售 */
  Sale
}
export const OrderSaleModeName = {
  [OrderSaleModeEnum.Presale]: '现货',
  [OrderSaleModeEnum.Sale]: '预售'
}

/** 订单来源 */
export enum OrderSourceTypeEnum {
  /** 微信小程序 */
  WechatApplet,
  /** 微信公众号 */
  WechatOfficial,
  /** APP */
  App,
  /** 视频号 */
  VideoChannel
}
export const OrderSourceTypeName = {
  [OrderSourceTypeEnum.WechatApplet]: '微信小程序',
  [OrderSourceTypeEnum.WechatOfficial]: '微信公众号',
  [OrderSourceTypeEnum.App]: 'APP',
  [OrderSourceTypeEnum.VideoChannel]: '视频号'
}

/** 发货 */
export enum OrderShipStatusEnum {
  /** 未发货 */
  UnShipped,
  /** 部分发货 */
  PartialShipped,
  /** 发货 */
  Shipped
}

/** 配送时间 */
export enum OrderShipDateEnum {
  /** 随时 */
  AllTime,
  /** 工作日 */
  WorkingDay,
  /** 节假日 */
  Holidays
}
export const OrderShipDateName = {
  [OrderShipDateEnum.AllTime]: '随时',
  [OrderShipDateEnum.WorkingDay]: '工作日',
  [OrderShipDateEnum.Holidays]: '节假日'
}

/**
 * 卡券订单核销状态
 */
export enum OrderVirtualStatusEnum {
  /** 预留(未付款) */
  Reserve,
  /** 未使用 */
  NoUsed,
  /** 已使用 */
  Used,
  /** 已取消 */
  Cancel,
  /** 已过期 */
  Expire,
  /** 退款锁定 */
  RefundLock,
  /** 已退款 */
  Refund,
}

export const OrderVirtualStatusName = {
  [OrderVirtualStatusEnum.Reserve]: '未付款',
  [OrderVirtualStatusEnum.NoUsed]: '未使用',
  [OrderVirtualStatusEnum.Used]: '已使用',
  [OrderVirtualStatusEnum.Cancel]: '已取消',
  [OrderVirtualStatusEnum.Expire]: '已过期',
  [OrderVirtualStatusEnum.RefundLock]: '退款锁定',
  [OrderVirtualStatusEnum.Refund]: '已退款'
}
