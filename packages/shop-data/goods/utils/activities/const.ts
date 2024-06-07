/**
 *
 * 这里的订单类型只是fork的 MarketingActivityDto 数据结构。
 * 并且没有实时同步的。后续有更新需要手动更新
 */

export interface IActivity {
  /** 活动名称 */
  activityName?: string

  /** 活动编号 */
  activityNo?: string

  /**
   * 活动状态 0：未启用 1：启用 2：结束 3：待审核 4：审核失败
   * @format int32
   */
  activityStatus?: number

  /**
   * 活动类型 0:拼团 1:预售 2:限时抢购 3:满减 4:满折 5:满赠 6:包邮
   * @format int32
   */
  activityType?: number

  /**
   * 活动完成后操作 0：设为普通商品 1：下架
   * @format int32
   */
  completed?: number

  /** 活动规则 */
  content?: string

  /** 封面图 */
  coverImg?: string

  /** 活动描述 */
  description?: string

  /**
   * 活动结束时间
   * @format date-time
   */
  endTime?: string

  /**
   * 活动Id，activityId
   * @format int64
   */
  id?: number

  /** 商品信息 */
  marketingActivityGoodsParams?: IMarketingActivityGoodsParam[]

  /** @format int64 */
  merchantId?: number
  promotionParam?: IActivityPromotionParam

  /** 开始发货时间 */
  shippingTime?: string

  /**
   * 发货时间 0：固定时间 1：付款后X天
   * @format int32
   */
  shippingTimeType?: number

  /**
   * 活动开始时间
   * @format date-time
   */
  startTime?: string

  /** 是否可叠加优惠 0：否 1：是 */
  superposition?: boolean

  /** 叠加优惠活动类型 */
  superpositionActivityTypes?: string
}

export interface IActivityPromotionParam {
  /** @format int64 */
  id?: number

  /** 优惠条件 Json格式保存 */
  promotionConditionList?: IPromotionCondition[]

  /**
   * 优惠条件类型 0：满N件 1：满N元
   * @format int32
   */
  promotionConditionType?: number

  /**
   * 优惠类型 0：阶梯优惠 1：循环优惠
   * @format int32
   */
  promotionType?: number
}

export interface IPromotionCondition {
  /** 优惠条件 N件/N元 */
  con?: number

  /** 商品名称 */
  goodsName?: string

  /** 商品编号 (满赠必传) */
  goodsNo?: string

  /** 优惠金额/折扣 (满减满折必传)/赠品数量(满赠必传) */
  promo?: number

  /** sku名称 */
  skuName?: string

  /** sku编号(满赠必传) */
  skuNo?: string
}

export interface IMarketingActivityGoodsParam {
  /**
   * 活动数量 sku活动数量之和
   * @format int32
   */
  activityNum?: number;

  /** 商品分类名称，以“/”分割 */
  categoryNames?: string;

  /** 封面图片 */
  coverImg?: string;

  /** 商品名称 */
  goodsName?: string;

  /** 商品编号 */
  goodsNo?: string;

  /**
   * 团购人数
   * @format int32
   */
  groupBuyingNum?: number;

  /**
   * 记录ID 修改时传入
   * @format int64
   */
  id?: number;

  /** 市场价 */
  marketPrice?: number;

  /** 商品SKU */
  marketingActivitySkuParams?: IMarketingActivitySkuParam[];

  /** 商品价格（默认取sku最高价） */
  maxPrice?: number;

  /**
   * 下单购买限制
   * @format int32
   */
  orderBuyLimit?: number;

  /** 商品价格（默认取sku最低价） */
  price?: number;

  /**
   * 30天销量
   * @format int32
   */
  saleNum?: number;

  /**
   * 排序值，数值大的在前
   * @format int32
   */
  sortNum?: number;

  /**
   * 剩余数量 min(活动数量-已售数量,当前库存数量)
   * @format int32
   */
  stockNum?: number;

  /**
   * 单用户购买限制
   * @format int32
   */
  userBuyLimit?: number;
}

export interface IMarketingActivitySkuParam {
  /**
   * 活动数量
   * @format int32
   */
  activityNum?: number;

  /** 活动价格（预售订单时为尾款价格） */
  activityPrice?: number;

  /** 定金 */
  deposit?: number;

  /**
   * 记录ID 修改时传入
   * @format int64
   */
  id?: number;

  /**
   * 商品SKU库存 实时的
   * @format int32
   */
  inventory?: number;

  /** 市场价 */
  marketPrice?: number;

  /** 价格 */
  price?: number;

  /**
   * 销售数量合计
   * @format int32
   */
  quantity?: number;

  /** sku图片 */
  skuImg?: string;

  /** sku编号 */
  skuNo?: string;

  /**
   * 是否显示 0：不显示 1：显示
   * @format int32
   */
  skuShow?: number;

  /** 规格名称组合，冒号分割， 格式p1:v1  */
  specNames?: string;
}
