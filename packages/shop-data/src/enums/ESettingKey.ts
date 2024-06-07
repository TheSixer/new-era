/** 商城配置Key *
 * = ' @export
 * @enum {number}
 */
export enum ESettingKey {
  /** 未支付订单关闭时间  */
  order_payment_waiting_time_minutes = 'order_payment_waiting_time_minutes',

  /** 已发货订单自动收货时间 */
  order_receiving_waiting_time_day = 'order_receiving_waiting_time_day',

  /** 已收货订单关闭售后时间 */
  order_receiving_close = 'order_receiving_close',

  /**  是否开启自动评论 */
  auto_comment = 'auto_comment',

  /** 自动评论时间 */
  order_auto_comment_time_day = 'order_auto_comment_time_day',

  /** 自动评论星级 */
  auto_comment_star = 'auto_comment_star',

  /** 自动评论内容 */
  auto_comment_content = 'auto_comment_content',

  /** 客服电话 */
  service_phone_number = 'service_phone_number',

  /** 邮箱 */
  email = 'email',

  /** 详细地址 */
  address = 'address',

  /** 订单完成赠送优惠券 */
  present_coupon_when_order_finished = 'present_coupon_when_order_finished',

  /** 订单完成赠送优惠券适用订单类型  */
  present_coupon_when_order_finished_type = 'present_coupon_when_order_finished_type',

  /** 赠送优惠券满足的订单金额 */
  present_coupon_order_amount = 'present_coupon_order_amount',

  /** 订单评价完成赠送优惠券 */
  present_coupon_when_order_commented = 'present_coupon_when_order_commented',

  /** 订单评价完成赠送优惠券适用订单类型 */
  present_coupon_when_order_commented_type = 'present_coupon_when_order_commented_type',

  /** 是否开启积分抵扣 */
  // use_integral = 'use_integral',

  /**
   * 积分使用门槛
   * 订单满多少元可以使用积分抵扣现金
   */
  // use_integral_need = 'use_integral_need',

  /**
   * 积分使用上限
   * 积分可以抵扣订单金额的%多少
   * */
  use_integral_limit = 'use_integral_limit',

  /**
   * 积分现金换算比例
   * xx积分抵扣一元
   */
  use_integral_amount = 'use_integral_amount',

  /**
   *  消费一元可获积分
   */
  // use_integral_get = 'use_integral_get',

  /** 过期自动清零 0 不清零 1 每年清零 */
  score_auto_reset = 'score_auto_reset',

  /** 默认覆盖商品积分 0 关 1 开 */
  // goods_default_score = 'goods_default_score',

  /** 默认商品积分比例 (一百内整数) */
  // goods_default_score_proportion = 'goods_default_score_proportion'

  /** 新人赠送优惠券 */
  present_newcomer_coupon = 'present_newcomer_coupon',

  /** 外卖预计时间(分钟) number */
  takeout_scheduled_time = 'takeout_scheduled_time',
  /** 满额免配送费 number */
  takeout_over_amount_free_shipping = 'takeout_over_amount_free_shipping',
  /** 范围金额 [{"km":1,"shipping":5},{"km":3,"shipping":10}] */
  takeout_range_amount = 'takeout_range_amount',
  /** 门店定位 经度,纬度 string */
  takeout_shop_location = 'takeout_shop_location',
  /** 可配送范围(km) number */
  takeout_distributable_range = 'takeout_distributable_range',
  /** 自提点定位 string */
  takeout_self_picked_location = 'takeout_self_picked_location',
  /** 自提点地址 string */
  takeout_self_picked_address = 'takeout_self_picked_address',
  /** 自提点电话 string */
  takeout_self_picked_telephone = 'takeout_self_picked_telephone',
  /** 未核销过期自动取消(分钟) number */
  takeout_no_verification_cancel_time = 'takeout_no_verification_cancel_time',
  /** 自提点备餐时间(分钟) number */
  takeout_self_picked_meal_preparation_time = 'takeout_self_picked_meal_preparation_time',
  /** 配送时间范围 [{"start":10:00,"end":10:30},{"start":10:30,"end":11:00}] */
  takeout_distribution_time_range = 'takeout_distribution_time_range',
  /** 自提时间范围 [{"start":10:00,"end":10:30},{"start":10:30,"end":11:00}] */
  takeout_self_picked_time_range = 'takeout_self_picked_time_range',
  /** 充值金额配置项 */
  recharge_amount_list = 'recharge_amount_list',
  /** 充值说明 富文本 */
  recharge_description = 'recharge_description',

  /**
   * 用户协议
   * @description 具体文本存在云服务器
   */
  user_agreement = 'user_agreement',

  /**
   * 隐私政策
   * @description 具体文本存在云服务器
   */
  privacy_agreement = 'privacy_agreement',

  /**
   * 系统设置-是否开启订单评价
   * 'true' 开启 'false' 关闭
   * @default 'true'
   * @description 表示系统层面是否开启评价功能
   * 若设置为false
   *  订单确认收货后 订单状态变为交易完成。且无评价功能
   */
  sys_enable_order_comment = 'sys_enable_order_comment'
}
