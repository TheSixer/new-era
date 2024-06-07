export interface PagedResultMessageBroadcastOutputDto {
  list?: MessageBroadcastOutputDto[];

  /** @format int64 */
  total?: number;
}

export interface PagedResultStationMessagePublishOutputDto {
  list?: StationMessagePublishOutputDto[];

  /** @format int64 */
  total?: number;
}

export interface MessageBroadcastInputDto {
  content?: string;

  /** 消息事件类型 notice，message，todo */
  eventMessageType?: string;

  /** 消息事件源 如：order,refund,goods等等 */
  eventSource?: string;

  /** 事件订阅类型，客户端监听的名称 */
  eventSubscribeType?: string;

  /** 消息来源渠道 */
  from?: string;

  /** 消息类型 ws,sms,app,other */
  messageType?: string;
  outerId?: string;
  title?: string;
}

export interface StationMessagePublishInputDto {
  /** 消息内容 */
  content?: string;

  /** 消息事件类型 notice，message，todo */
  eventMessageType?: string;

  /** 消息事件源 如：order,refund,goods等等 */
  eventSource?: string;

  /** 事件订阅类型，客户端监听的名称 */
  eventSubscribeType?: string;

  /** 消息来源渠道，一般为应用方名称 */
  messageSource?: string;

  /** 外部系统编号标识 */
  outerId?: string;

  /** 发送渠道 ws,other */
  sendChannel?: string;

  /** 消息标题 */
  title?: string;
}

export interface JsonResultPagedResultStationMessageOutputDto {
  /** @format int32 */
  code?: number;
  data?: PagedResultStationMessageOutputDto;
  msg?: string;
}

export interface PagedResultSendRequestOutputDto {
  list?: SendRequestOutputDto[];

  /** @format int64 */
  total?: number;
}

export interface JsonResultVoid {
  /** @format int32 */
  code?: number;
  msg?: string;
}

export interface StationMessagePublishOutputDto {
  /** 消息内容 */
  content?: string;

  /** 消息事件类型 notice，message，todo */
  eventMessageType?: string;

  /** 消息事件源 如：order,refund,goods等等 */
  eventSource?: string;

  /** 事件订阅类型，客户端监听的名称 */
  eventSubscribeType?: string;

  /**
   * 发布时间
   * @format date-time
   */
  gmtCreated?: string;

  /**
   * id
   * @format int64
   */
  id?: number;

  /** 消息来源渠道，一般为应用方名称 */
  messageSource?: string;

  /** 外部系统编号标识 */
  outerId?: string;

  /** 发送渠道 ws,other */
  sendChannel?: string;

  /** 消息标题 */
  title?: string;
}

export interface JsonResultMapStringListString {
  /** @format int32 */
  code?: number;
  data?: Record<string, string[]>;
  msg?: string;
}

export interface PagedResultStationMessageOutputDto {
  list?: StationMessageOutputDto[];

  /** @format int64 */
  total?: number;
}

export interface SendRequestInputDto {
  content?: string;

  /** 消息事件类型 notice，message，todo */
  eventMessageType?: string;

  /** 消息事件源 如：order,refund,goods等等 */
  eventSource?: string;

  /** 事件订阅类型，客户端监听的名称 */
  eventSubscribeType?: string;

  /** 消息来源渠道 */
  messageSource?: string;

  /** 消息类型 ws,sms,app,other */
  messageType?: string;
  outerId?: string;
  title?: string;
}

export interface SendRequestOutputDto {
  content?: string;

  /** 消息事件类型 notice，message，todo */
  eventMessageType?: string;

  /** 消息事件源 如：order,refund,goods等等 */
  eventSource?: string;

  /** 事件订阅类型，客户端监听的名称 */
  eventSubscribeType?: string;

  /**
   * 发布时间
   * @format date-time
   */
  gmtCreated?: string;

  /**
   * id
   * @format int64
   */
  id?: number;

  /** 消息来源渠道 */
  messageSource?: string;

  /** 消息类型 ws,sms,app,other */
  messageType?: string;
  outerId?: string;
  title?: string;
}

export interface MessageBroadcastOutputDto {
  content?: string;

  /** 消息事件类型 notice，message，todo */
  eventMessageType?: string;

  /** 消息事件源 如：order,refund,goods等等 */
  eventSource?: string;

  /** 事件订阅类型，客户端监听的名称 */
  eventSubscribeType?: string;

  /** 消息来源渠道 */
  from?: string;

  /**
   * 发布时间
   * @format date-time
   */
  gmtCreated?: string;

  /** 消息类型 ws,sms,app,other */
  messageType?: string;
  outerId?: string;
  title?: string;
}

export interface JsonResultPagedResultMessageBroadcastOutputDto {
  /** @format int32 */
  code?: number;
  data?: PagedResultMessageBroadcastOutputDto;
  msg?: string;
}

export interface JsonResultInt {
  /** @format int32 */
  code?: number;

  /** @format int32 */
  data?: number;
  msg?: string;
}

export interface JsonResultPagedResultStationMessagePublishOutputDto {
  /** @format int32 */
  code?: number;
  data?: PagedResultStationMessagePublishOutputDto;
  msg?: string;
}

export interface StationMessageOutputDto {
  /** 消息内容 */
  content?: string;

  /** 消息事件类型 notice，message，todo */
  eventMessageType?: string;

  /** 消息事件源 如：order,refund,goods等等 */
  eventSource?: string;

  /** 事件订阅类型，客户端监听的名称 */
  eventSubscribeType?: string;

  /**
   * 发布时间
   * @format date-time
   */
  gmtCreated?: string;

  /**
   * id
   * @format int64
   */
  id?: number;

  /** 消息来源渠道，一般为应用方名称 */
  messageSource?: string;

  /** 外部系统编号标识 */
  outerId?: string;

  /** 是否已读 */
  read?: boolean;

  /** 发送渠道 ws,other */
  sendChannel?: string;

  /** 消息标题 */
  title?: string;
}

export interface JsonResultPagedResultSendRequestOutputDto {
  /** @format int32 */
  code?: number;
  data?: PagedResultSendRequestOutputDto;
  msg?: string;
}

export interface NotificationApiStationMessageQueryGetParams {
  /**
   * 开始时间
   * @example
   */
  beginTime?: string;

  /**
   * 查询条件
   * @example
   */
  condition?: string;

  /**
   * 结束时间
   * @example
   */
  endTime?: string;

  /**
   * 主键
   * @example
   */
  id?: number;

  /**
   * 当前页码
   * @example
   */
  pageNum?: number;

  /**
   * 每页数据量
   * @example
   */
  pageSize?: number;

  /**
   * 是否已读 0：未读 1：已读
   * @example
   */
  read?: string;
}

export interface NotificationApiStationMessageQueryUnReadGetParams {
  /**
   * 开始时间
   * @example
   */
  beginTime?: string;

  /**
   * 查询条件
   * @example
   */
  condition?: string;

  /**
   * 结束时间
   * @example
   */
  endTime?: string;

  /**
   * 主键
   * @example
   */
  id?: number;

  /**
   * 当前页码
   * @example
   */
  pageNum?: number;

  /**
   * 每页数据量
   * @example
   */
  pageSize?: number;

  /**
   * 是否已读 0：未读 1：已读
   * @example
   */
  read?: string;
}
