/**
 * 订单类型
 *
 * 这里的订单类型只是fork的后台系统的订单类型数据结构。
 * 并且没有实时同步的。后续有更新需要手动更新
 *
 * @export
 * @interface OrderVO
 */
export interface OrderVO {
  /**
   * 关闭时间
   * @format date-time
   */
  closedAt?: string

  /** 关闭原因 */
  closedReason?: string

  /** 关闭售后 0：否 1：是 */
  closedRefund?: boolean

  /** 是否评价 */
  comment?: boolean

  /**
   * 评论时间
   * @format date-time
   */
  commentAt?: string

  /** 优惠金额 */
  discountAmount?: number

  /**
   * 订单创建时间
   * @format date-time
   */
  gmtCreated?: string

  /**
   * 订单最后修改时间
   * @format date-time
   */
  gmtModified?: string

  /** 商品金额 */
  goodsAmount?: number

  /**
   * 主键
   * @format int64
   */
  id?: number

  /** 子订单信息 */
  items?: OrderItemsVO[]

  /**
   * 物流状态 0未发货 1已发货 2已收获
   * @format int32
   */
  logisticsStatus?: number

  /** 订单金额 */
  orderAmount?: number

  /**
   * 获得积分
   * @format int32
   */
  orderIntegral?: number

  /** 实际支付的积分数量（积分商品订单） */
  exchangeIntegral?: number

  /** 订单的优惠明细 */
  orderMasterMarketingList?: OrderMasterMarketingDto[]

  /** 订单编号 */
  orderNo?: string

  /**
   * 订单状态 0交易中 1交易成功-1 交易关闭
   * @format int32
   */
  orderStatus?: number

  /** 订单状态名称 */
  orderStatusName?: string

  /**
   * 订单类型
   * @format int32
   */
  orderType?: number

  /** 已支付金额 */
  paidAmount?: number

  /** 实际支付金额 */
  payAmount?: number

  /**
   * 支付时间
   * @format date-time
   */
  payAt?: string

  /**
   * 结束支付时间
   * @format date-time
   */
  payEndAt?: string

  /**
   * 0 未支付 1 支付成功 -1支付失败
   * @format int32
   */
  payStatus?: number

  /**
   * 支付类型: 1微信支付 2支付宝支付3线下支付
   * @format int32
   */
  payType?: number

  /**
   * 确认收货时间
   * @format date-time
   */
  receiptAt?: string

  /**
   * 售后状态 0无售后 1有售后
   * @format int32
   */
  refundStatus?: number

  /** 0快递，1自提 */
  selfPicked?: boolean

  /** 收件人详细地址 */
  shippingAddress?: string

  /**
   * 发货时间
   * @format date-time
   */
  shippingAt?: string

  /** 收件人市 */
  shippingCity?: string

  /** 收件人区 */
  shippingDistrict?: string

  /** 运费 */
  shippingFee?: number

  /** 订单发货信息 */
  // shippingList?: OrderShippingDto[];

  /** 收货人电话 */
  shippingMobile?: string

  /** 收货人 */
  shippingName?: string

  /** 收件人省份 */
  shippingProvince?: string

  /**
   * 统一状态
   * @format int32
   */
  status?: number

  /** 微信支付交易流水号 */
  transactionId?: string

  /** 买家留言 */
  userComments?: string

  /**
   * 会员ID
   * @format int64
   */
  userId?: number

  /** 会员手机号 */
  userMobile?: string

  /** 会员姓名 */
  userName?: string
}

export interface OrderItemsVO {
  /** 活动折扣 */
  activeDiscount?: number

  /** 优惠券折扣 */
  couponDiscount?: number

  /** 优惠金额，所有优惠合计 */
  discountAmount?: number

  /** 是否是赠品 0：否 1：是 */
  gift?: boolean

  /**
   * 商品ID
   * @format int64
   */
  goodsId?: number

  /** 商品图片 */
  goodsImg?: string

  /** 商品名称 */
  goodsName?: string

  /** 商品编号 */
  goodsNo?: string

  /**
   * 主键
   * @format int64
   */
  id?: number

  /**
   * 获得积分
   * @format int32
   */
  itemScore?: number

  /** 抵扣积分 */
  score?: number;

  /** 子订单编号 */
  itemNo?: string

  /** 活动抵扣金额 */
  itemsActiveDeduction?: number

  /** 销售价合计 */
  itemsAmount?: number

  /** 优惠券抵扣金额 */
  itemsCouponDeduction?: number

  /** 实收款 */
  itemsPayAmount?: number

  /** 积分抵扣 */
  itemsPointDeduction?: number

  /** 运费抵扣 */
  itemsShippingDeduction?: number

  /** 会员抵扣金额 */
  itemsUserDeduction?: number

  /** 商品市场价 */
  marketPrice?: number

  /**
   * 订单ID
   * @format int64
   */
  orderId?: number

  /** 订单明细营销活动 */
  orderItemMarketingList?: OrderItemMarketingDto[]

  /** 订单编号 */
  orderNo?: string

  /**
   * 售后状态0 未申请 1 申请中 2 售后完成 3售后拒绝
   * @format int32
   */
  refundStatus?: number

  /** 商品销售价 */
  salePrice?: number

  /**
   * 购买数量
   * @format int32
   */
  saleQuantity?: number

  /**
   * 已发货数量
   * @format int32
   */
  shipingQuantity?: number

  /**
   * 发货状态 0：未发货 1：部分发货 2:已发货
   * @format int32
   */
  shipingStatus?: number

  /** 该明细的运费 */
  shippingFee?: number

  /**
   * 商品SKU ID
   * @format int64
   */
  skuId?: number

  /** sku图片 */
  skuImg?: string

  /** 规格名称（组合） */
  skuName?: string

  /** 商品SKU编号 */
  skuNo?: string

  /** 会员折扣 */
  userDiscount?: number
}

export interface OrderItemMarketingDto {
  /** 优惠比例 */
  discount?: number

  /** 优惠金额 */
  discountAmount?: number

  /**
   * 优惠类型 0 抵扣 1 折扣 2 活动价
   * @format int32
   */
  discountType?: number

  /** 商品编号 */
  goodsNo?: string

  /** @format int64 */
  id?: number

  /**
   * 活动类型 0：拼团 1：预售 2：限时抢购 3:满减 4:满折 5:满赠 6 优惠券 7 会员折扣 8 积分
   * @format int32
   */
  marketingType?: number

  /** @format int64 */
  merchantId?: number

  /** 订单编号 */
  orderNo?: string

  /** 优惠金额(促销类型为积分时些值为使用的积分数量) */
  price?: number

  /** 优惠券或活动名称 */
  relName?: string

  /** 优惠券或活动编号 */
  relNo?: string

  /** SKU编号 */
  skuNo?: string
}

export interface OrderMasterMarketingDto {
  /** （下单时有值）优惠条件 N件/N元 */
  con?: number

  /** 优惠比例 */
  discount?: number

  /** 总优惠金额 */
  discountAmount?: number

  /**
   * 优惠类型 0 抵扣 1 折扣 2 活动价
   * @format int32
   */
  discountType?: number

  /**
   * 活动类型 0：拼团 1：预售 2：限时抢购 3:满减 4:满折 5:满赠 6 优惠券 7 会员折扣 8 积分
   * @format int32
   */
  marketingType?: number

  /** @format int64 */
  merchantId?: number

  /** 订单编号 */
  orderNo?: string

  /** 优惠金额(促销类型为积分时些值为使用的积分数量) */
  price?: number

  /** （下单时有值）优惠金额/折扣 (满减满折)/赠品数量(满赠) */
  promo?: number

  /**
   * （下单时有值）优惠条件类型 0：满N件 1：满N元
   * @format int32
   */
  promotionConditionType?: number

  /**
   * （下单时有值）优惠类型 0：阶梯优惠 1：循环优惠
   * @format int32
   */
  promotionType?: number

  /** 优惠券或活动名称 */
  relName?: string

  /** 优惠券或活动编号 */
  relNo?: string
}
