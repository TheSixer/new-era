/* eslint-disable object-shorthand */
/* eslint-disable max-lines */
/* eslint-disable id-length */
export interface TreeNodeConfig2 {
  childrenKey?: string;

  /** @format int32 */
  deep?: number;
  idKey?: string;
  nameKey?: string;
  parentIdKey?: string;
  weightKey?: string;
}

export interface TreeNodeConfig1 {
  childrenKey?: string;

  /** @format int32 */
  deep?: number;
  idKey?: string;
  nameKey?: string;
  parentIdKey?: string;
  weightKey?: string;
}

export interface SysApi1 {
  createUser?: string;
  description?: string;

  /** @format date-time */
  gmtCreated?: string;

  /** @format date-time */
  gmtModified?: string;

  /** @format int64 */
  id?: number;
  md5?: string;
  method?: string;
  modifyUser?: string;

  /** @format int32 */
  status?: number;
  uri?: string;
}

export interface SysApi {
  createUser?: string;
  description?: string;

  /** @format date-time */
  gmtCreated?: string;

  /** @format date-time */
  gmtModified?: string;

  /** @format int64 */
  id?: number;
  md5?: string;
  method?: string;
  modified?: boolean;
  modifyUser?: string;

  /** @format int32 */
  status?: number;
  transient?: boolean;
  uri?: string;
}

export interface KdniaoExpressCallbackResponseDto {
  ebusinessID?: string;
  reason?: string;
  success?: boolean;

  /** @format date-time */
  updateTime?: string;
}

export type CharSequence2 = object;

export type CharSequence1 = object;

export interface PublicKeyValueDto {
  /** key */
  key?: string;

  /** value */
  value?: string;
}

export interface MemberModifyInputDto {
  /** 用户头像 */
  avatarUrl?: string;

  /**
   * 出生年月
   * @format date-time
   */
  birthday?: string;

  /** 性别 1男 2女 0未知 */
  gender?: string;

  /** 用户昵称 */
  nickName?: string;
}

export interface AuthMobileOutputDto {
  /** countryCode */
  countryCode?: string;

  /** 手机号 */
  phoneNumber?: string;
}

export interface AuthMobileInputDto {
  /** code */
  code?: string;
}

export interface LiveStatisticsDto {
  /**
   * 销量数量
   * @format int32
   */
  actualSales?: number;

  /** 商品名称 */
  goodsName?: string;

  /** 商品编号 */
  goodsNo?: string;

  /** sku名称 */
  goodsSkuName?: string;

  /** sku编号 */
  goodsSkuNo?: string;

  /**
   * id
   * @format int64
   */
  id?: number;

  /** 直播间ID */
  liveId?: string;

  /** 直播名称 */
  liveName?: string;

  /** 直播类型 */
  liveTypeName?: string;

  /**
   * 浏览数量
   * @format int32
   */
  pageView?: number;

  /** 销售额 */
  salesVolume?: number;
}

export interface WithdrawalsOperatorDto {
  /** 提现编号 */
  relNo: string;

  /** 备注 */
  remark?: string;

  /** 状态 */
  status: boolean;
}

export interface WithdrawalsDto {
  /** 开户银行 */
  accountBankName?: string;

  /** 提现金额 */
  amount?: number;

  /**
   * 申请时间
   * @format date-time
   */
  applyTime?: string;

  /**
   * 审核状态 1：待审核 2：打款中 3：打款成功或提现成功 4：打款失败或提现失败 5：审核不通过或提现失败
   * @format int32
   */
  auditStatus?: number;

  /** 审核状态文本 */
  auditStatusText?: string;

  /**
   * 审核时间
   * @format date-time
   */
  auditTime?: string;

  /** 用户银行卡号 */
  bankCardNo?: string;

  /**
   * id
   * @format int64
   */
  id?: number;

  /** 用户身份证号 */
  idCard?: string;

  /** 手机号 */
  mobile?: string;

  /** 真实姓名 */
  realName?: string;

  /** 提现编号 */
  relNo?: string;

  /**
   * 用户id
   * @format int64
   */
  userId?: number;

  /** 用户昵称 */
  userName?: string;
}

export interface WithdrawalsDetailDto {
  /** 开户银行 */
  accountBankName?: string;

  /** 提现金额 */
  amount?: number;

  /**
   * 审核状态 1：待审核 2：打款中 3：打款成功或提现成功 4：打款失败或提现失败 5：审核不通过或提现失败
   * @format int32
   */
  auditStatus?: number;

  /** 审核状态文本 */
  auditStatusText?: string;

  /**
   * 审核时间
   * @format date-time
   */
  auditTime?: string;

  /** 银行卡号 */
  bankCardNo?: string;

  /** 身份证号 */
  idCard?: string;

  /** 打款状态 */
  payStatus?: boolean;

  /** 打款状态文本 */
  payStatusText?: string;

  /** 真实姓名 */
  realName?: string;

  /** 提现编号 */
  relNo?: string;

  /** 备注（用于审核，拒绝理由，上传支付凭证） */
  remark?: string;
}

export interface CommissionGoodsSkuDto {
  /** 分佣金额 */
  amount?: number;

  /** 是否启用 0 否 1是 */
  enabled?: boolean;

  /** 市场价 */
  marketPrice?: number;

  /** 售价 */
  salesPrice?: number;

  /** sku图片 */
  skuImg?: string;

  /** skuNo */
  skuNo?: string;

  /** sku组合名称（以逗号分隔） */
  specNames?: string;

  /**
   * 库存
   * @format int32
   */
  stock?: number;
}

export interface CommissionGoodsSkuCreateItemDto {
  /** 商品编号 */
  goodsNo?: string;

  /** 商品sku */
  skuItemList?: CommissionGoodsSkuCreateDto[];
}

export interface CommissionGoodsSkuCreateDto {
  /** 分佣金额 */
  amount?: number;

  /** skuNo */
  skuNo?: string;
}

export interface CommissionGoodsDto {
  /** 商品分类 */
  classifyName?: string;

  /** 商品名称 */
  goodsName?: string;

  /** 商品编号 */
  goodsNo?: string;

  /**
   * id
   * @format int64
   */
  id?: number;

  /** 价格 */
  salePrice?: number;
}

export interface CommissionGoodsCreateItemDto {
  /** 商品编号 */
  goodsNo?: string;
}

export interface CommissionGoodsCreateDto {
  /** 商品列表 */
  itemList?: CommissionGoodsCreateItemDto[];
}

export interface CommissionDto {
  /** 订单号 */
  consumeOrderNo?: string;

  /** sku编号 */
  consumeSkuNo?: string;

  /**
   * 下单用户id
   * @format int64
   */
  consumeUserId?: number;

  /** 下单用户手机号 */
  consumeUserMobile?: string;

  /** 下单用户昵称 */
  consumeUserName?: string;

  /** 友好输出分佣余额变化 */
  friendlyAmount?: string;

  /**
   * 变更时间、分佣时间
   * @format date-time
   */
  gmtModified?: string;

  /**
   * id
   * @format int64
   */
  id?: number;

  /** 用户手机号 */
  mobile?: string;

  /** 用户openid */
  openId?: string;

  /** 提现编号 */
  relNo?: string;

  /** 分佣余额总额 */
  totalAmount?: number;

  /** 类型 */
  typeText?: string;

  /**
   * 用户id
   * @format int64
   */
  userId?: number;

  /** 用户昵称 */
  userName?: string;
}

export interface MarketingActivityGroupRecordsWebListVo {
  /**
   * 活动Id
   * @format int64
   */
  activityId?: number;

  /** 活动编号 */
  activityNo?: string;

  /** 团长头像 */
  captainMemberHeadImg?: string;

  /**
   * 团长用户ID
   * @format int64
   */
  captainMemberId?: number;

  /** 团长名称 */
  captainMemberNickname?: string;

  /** 封面图片 */
  coverImg?: string;

  /**
   * 当前入团的真实人数
   * @format int32
   */
  currentUserNumber?: number;

  /** 商品名称 */
  goodsName?: string;

  /** 商品编号 */
  goodsNo?: string;

  /**
   * 本团结束时间
   * @format date-time
   */
  groupEndDate?: string;

  /**
   * 成团人数
   * @format int32
   */
  groupNumber?: number;

  /**
   * 拼团状态:  0: 队长开团中（待支付） 1: 拼团中 2: 拼团成功 3: 拼团失败
   * @format int32
   */
  groupStatus?: number;

  /**
   * 拼团记录ID
   * @format int64
   */
  id?: number;

  /**
   * 当前生成团的虚拟人数
   * @format int32
   */
  virtualUserNumber?: number;
}

export interface MarketingActivityGroupRecordsWebListAndNumVo {
  /**
   * 拼团人数
   * @format int32
   */
  joinNumber?: number;
  records?: PagedScrollResultMarketingActivityGroupRecordsWebListVo;
}

export interface MarketingActivityExtDto {
  /** 活动编号 */
  activityNo?: string;

  /**
   * 已拼份数（已购买商品数量）
   * @format int32
   */
  buyGoodsQuantity?: number;

  /** 团长奖励 0：不开启 1：开启 */
  groupBonusEnable?: boolean;

  /**
   * 团长奖励积分
   * @format int32
   */
  groupBonusIntegral?: number;

  /**
   * 成团人数
   * @format int32
   */
  groupBuyingNum?: number;

  /**
   * 1:普通团 2：一分团 3：阶梯团
   * @format int32
   */
  groupType?: number;

  /**
   * 活动Id，activityId
   * @format int64
   */
  id?: number;

  /** 拼团阶梯价列表 */
  skuTieredPriceList?: MarketingActivitySkuTieredPriceVo[];

  /**
   * 虚拟销量
   * @format int32
   */
  virtualSale?: number;
}

export interface MarketingActivityGroupRecordsMemberVo {
  /** 是否是队长 0 否 1 是 */
  captain?: boolean;

  /** 用户头像 */
  memberHeadImg?: string;

  /**
   * 用户ID
   * @format int64
   */
  memberId?: number;

  /** 用户名称 */
  memberNickname?: string;
}

export interface MarketingActivityGroupRecordsWebInfoVo {
  /**
   * 活动Id
   * @format int64
   */
  activityId?: number;

  /** 活动编号 */
  activityNo?: string;

  /** 团长头像 */
  captainMemberHeadImg?: string;

  /**
   * 团长用户ID
   * @format int64
   */
  captainMemberId?: number;

  /** 团长名称 */
  captainMemberNickname?: string;

  /** 封面图片 */
  coverImg?: string;

  /**
   * 当前入团的真实人数
   * @format int32
   */
  currentUserNumber?: number;

  /** 活动描述 */
  description?: string;

  /** 商品名称 */
  goodsName?: string;

  /** 商品编号 */
  goodsNo?: string;
  goodsVO?: GoodsVO;

  /**
   * 本团结束时间
   * @format date-time
   */
  groupEndDate?: string;

  /**
   * 成团人数
   * @format int32
   */
  groupNumber?: number;

  /**
   * 拼团状态:  0: 队长开团中（待支付） 1: 拼团中 2: 拼团成功 3: 拼团失败
   * @format int32
   */
  groupStatus?: number;

  /**
   * 拼团记录ID
   * @format int64
   */
  id?: number;

  /** 拼团成员 */
  memberList?: MarketingActivityGroupRecordsMemberVo[];

  /** 价格（拼团价） */
  price?: number;

  /**
   * 当前生成团的虚拟人数
   * @format int32
   */
  virtualUserNumber?: number;
}

export interface MarketingActivityGroupRecordsItemWebInfoVo {
  /**
   * 活动Id
   * @format int64
   */
  activityId?: number;

  /** 活动编号 */
  activityNo?: string;

  /** 团长头像 */
  captainMemberHeadImg?: string;

  /**
   * 团长用户ID
   * @format int64
   */
  captainMemberId?: number;

  /** 团长名称 */
  captainMemberNickname?: string;

  /** 封面图片 */
  coverImg?: string;

  /**
   * 当前入团的真实人数
   * @format int32
   */
  currentUserNumber?: number;

  /** 商品名称 */
  goodsName?: string;

  /** 商品编号 */
  goodsNo?: string;

  /**
   * 本团结束时间
   * @format date-time
   */
  groupEndDate?: string;

  /**
   * 成团人数
   * @format int32
   */
  groupNumber?: number;

  /**
   * 拼团状态:  0: 队长开团中（待支付） 1: 拼团中 2: 拼团成功 3: 拼团失败
   * @format int32
   */
  groupStatus?: number;

  /**
   * 拼团记录ID
   * @format int64
   */
  id?: number;

  /**
   * 个人参团状态 1 未加入(待支付) 2 已加入 3 取消
   * @format int32
   */
  joinStatus?: number;

  /** 订单编号 */
  orderNo?: string;

  /** 订单价格 */
  paymentAmount?: number;

  /** 价格 */
  price?: number;

  /**
   * 数量
   * @format int32
   */
  quantity?: number;

  /** sku图片 */
  skuImg?: string;

  /** sku名称 */
  skuName?: string;

  /** sku编号 */
  skuNo?: string;

  /**
   * 当前生成团的虚拟人数
   * @format int32
   */
  virtualUserNumber?: number;
}

export interface MarketingActivityGoodsVoOfGroup {
  /**
   * 已拼份数（已购买商品数量）
   * @format int32
   */
  buyGoodsQuantity?: number;

  /** 封面图片 */
  coverImg?: string;

  /** 商品名称 */
  goodsName?: string;

  /** 商品编号 */
  goodsNo?: string;

  /** 成团人数列表 */
  groupNumberList?: number[];

  /**
   * id
   * @format int64
   */
  id?: number;

  /** 市场价 */
  marketPrice?: number;

  /** 商品价格（默认取sku最低价） */
  price?: number;

  /**
   * 虚拟销量
   * @format int32
   */
  virtualSale?: number;
}

export interface MarketingActivityOfGroupWebListVo {
  /** 活动名称 */
  activityName?: string;

  /** 活动编号 */
  activityNo?: string;

  /** 活动规则 */
  content?: string;

  /** 活动描述 */
  description?: string;

  /**
   * 活动结束时间
   * @format date-time
   */
  endTime?: string;

  /** @format int64 */
  id?: number;

  /** 活动商品列表 */
  marketingActivityGoodsParams?: MarketingActivityGoodsVoOfGroup[];

  /**
   * 商户ID
   * @format int64
   */
  merchantId?: number;

  /**
   * 活动开始时间
   * @format date-time
   */
  startTime?: string;
}

export interface MarketingActivityGoodsStatParam {
  /** 活动编号 */
  activityNo?: string;

  /** 商品编号 */
  goodsNo?: string;

  /**
   * pv uv类型 0：分享 1：商品详情
   * @format int32
   */
  statPvAndUvType?: number;
}

export interface MarketingActivityGroupRecords {
  /**
   * 活动Id
   * @format int64
   */
  activityId?: number;
  activityNo?: string;

  /** 团长头像 */
  captainMemberHeadImg?: string;

  /**
   * 团长用户ID
   * @format int64
   */
  captainMemberId?: number;

  /** 团长名称 */
  captainMemberNickname?: string;
  coverImg?: string;
  createUser?: string;

  /**
   * 当前入团的真实人数
   * @format int32
   */
  currentUserNumber?: number;

  /** @format date-time */
  gmtCreated?: string;

  /** @format date-time */
  gmtModified?: string;
  goodsName?: string;

  /** 商品编号 */
  goodsNo?: string;

  /**
   * 本团结束时间
   * @format date-time
   */
  groupEndDate?: string;

  /**
   * 成团人数
   * @format int32
   */
  groupNumber?: number;

  /**
   * 本团开始时间
   * @format date-time
   */
  groupStartDate?: string;

  /**
   * 拼团状态:  0: 队长开团中（待支付） 1: 拼团中 2: 拼团成功 3: 拼团失败
   * @format int32
   */
  groupStatus?: number;

  /** @format int64 */
  id?: number;
  modified?: boolean;
  modifyUser?: string;

  /** @format int32 */
  status?: number;
  transient?: boolean;

  /** 是否为虚拟成团 1: 是   2：否 */
  virtualGroup?: boolean;

  /**
   * 当前生成团的虚拟人数
   * @format int32
   */
  virtualUserNumber?: number;
}

export interface MarketingActivityOfGroupVo {
  /** 活动名称 */
  activityName?: string;

  /** 活动编号 */
  activityNo?: string;

  /**
   * 活动状态 0：未启用 1：启用 2：结束 3：待审核 4：审核失败 状态为0和1时前端展示启用和未启用功能
   * @format int32
   */
  activityStatus?: number;

  /**
   * 活动类型 0：拼团 1：预售 2：限时抢购 3:满减 4:满折 5:满赠 6:包邮
   * @format int32
   */
  activityType?: number;

  /** 活动说明 */
  description?: string;

  /**
   * 活动结束时间
   * @format date-time
   */
  endTime?: string;

  /**
   * 创建时间
   * @format date-time
   */
  gmtCreated?: string;

  /**
   * 团购人数
   * @format int32
   */
  groupBuyingNum?: number;

  /**
   * 1:普通团 2：一分团 3：阶梯团
   * @format int32
   */
  groupType?: number;

  /** @format int64 */
  id?: number;

  /**
   * 商户ID
   * @format int64
   */
  merchantId?: number;

  /**
   * 活动开始时间
   * @format date-time
   */
  startTime?: string;
}

export interface MarketingActivityGroupExtDto {
  /** 团长奖励 0：不开启 1：开启 */
  groupBonusEnable?: boolean;

  /**
   * 团长奖励积分
   * @format int32
   */
  groupBonusIntegral?: number;

  /**
   * 参团次数限制 0:不限制
   * @format int64
   */
  groupJoinLimit?: number;

  /**
   * 开团次数限制 0:不限制
   * @format int64
   */
  groupOpenLimit?: number;

  /**
   * 等待成团时间(分钟)
   * @format int32
   */
  groupSuccessTime?: number;

  /**
   * 1:普通团 2：一分团 3：阶梯团
   * @format int32
   */
  groupType?: number;

  /** 是否为虚拟成团 0: 否   1：是 */
  groupVirtual?: boolean;

  /**
   * 虚拟成团人数条件，0代表不限制
   * @format int32
   */
  groupVirtualNum?: number;

  /**
   * 参团人限制 0：所有用户 1：新用户
   * @format int32
   */
  joinCondition?: number;

  /** 是否预留库存，如果预留在活动启用时扣减库存，活动停用和结束时返还库存 */
  reservedInventory?: boolean;
}

export interface TieredPriceVo {
  /** 活动价格 */
  price?: number;

  /**
   * 参团人数
   * @format int32
   */
  qty?: number;
}

export interface MarketingActivitySkuTieredPriceVo {
  /** sku编号 */
  skuNo?: string;

  /** 活动价格列表 */
  tieredPriceList?: TieredPriceVo[];
}

export interface MarketingActivityOfGroupDto {
  /** 活动名称 */
  activityName?: string;

  /** 活动编号 */
  activityNo?: string;

  /**
   * 活动状态 0：未启用 1：启用 2：结束 3：待审核 4：审核失败
   * @format int32
   */
  activityStatus?: number;

  /**
   * 活动类型 0:拼团 1:预售 2:限时抢购 3:满减 4:满折 5:满赠 6:包邮
   * @format int32
   */
  activityType?: number;

  /**
   * 活动完成后操作 0：设为普通商品 1：下架
   * @format int32
   */
  completed?: number;

  /** 活动规则 */
  content?: string;

  /** 活动描述 */
  description?: string;

  /**
   * 活动结束时间
   * @format date-time
   */
  endTime?: string;

  /**
   * 成团人数
   * @format int32
   */
  groupBuyingNum?: number;
  groupInfo?: MarketingActivityGroupExtDto;

  /**
   * id
   * @format int64
   */
  id?: number;

  /** 商品信息 */
  marketingActivityGoodsParams?: MarketingActivityGoodsParam[];

  /** 是否上架 */
  onShelf?: boolean;

  /** 拼团阶梯价列表 */
  skuTieredPriceList?: MarketingActivitySkuTieredPriceVo[];

  /**
   * 活动开始时间
   * @format date-time
   */
  startTime?: string;
}

export interface MarketingActivityOfGroupStatVo {
  /**
   * 开团数（个）
   * @format int32
   */
  activityJoinNum?: number;

  /** 活动名称 */
  activityName?: string;

  /** 活动编号 */
  activityNo?: string;

  /**
   * 下单量
   * @format int32
   */
  activityOrderNum?: number;

  /** 支付GMV */
  activityOrderPayAmount?: number;

  /**
   * 支付量
   * @format int32
   */
  activityOrderPayNum?: number;

  /**
   * 分享卡片PV
   * @format int32
   */
  activitySharePv?: number;

  /**
   * 分享卡片UV
   * @format int32
   */
  activityShareUv?: number;

  /**
   * 活动状态 0：未启用 1：启用 2：结束 3：待审核 4：审核失败 状态为0和1时前端展示启用和未启用功能
   * @format int32
   */
  activityStatus?: number;

  /**
   * 拼团成功数
   * @format int32
   */
  activitySuccessNum?: number;

  /**
   * 拼团成功率
   * @format int32
   */
  activitySuccessRate?: number;

  /**
   * 下单用户数
   * @format int32
   */
  activityUserNum?: number;

  /** 封面图片 */
  coverImg?: string;

  /**
   * 创建时间
   * @format date-time
   */
  gmtCreated?: string;

  /** 商品名称 */
  goodsName?: string;

  /**
   * 详情页PV
   * @format int32
   */
  goodsPv?: number;

  /**
   * 详情页UV
   * @format int32
   */
  goodsUv?: number;

  /**
   * 成团人数
   * @format int32
   */
  groupBuyingNum?: number;

  /**
   * 1:普通团 2：一分团 3：阶梯团
   * @format int32
   */
  groupType?: number;
}

export interface MarketingActivityOfGroupOrderVo {
  /** 活动名称 */
  activityName?: string;

  /** 活动编号 */
  activityNo?: string;

  /**
   * 活动状态 0：未启用 1：启用 2：结束 3：待审核 4：审核失败 状态为0和1时前端展示启用和未启用功能
   * @format int32
   */
  activityStatus?: number;

  /**
   * 活动类型 0：拼团 1：预售 2：限时抢购 3:满减 4:满折 5:满赠 6:包邮
   * @format int32
   */
  activityType?: number;

  /** 是否是队长 0 否 1 是 */
  captain?: boolean;

  /** 团长头像 */
  captainMemberHeadImg?: string;

  /**
   * 团长用户ID
   * @format int64
   */
  captainMemberId?: number;

  /** 团长名称 */
  captainMemberNickname?: string;

  /**
   * 当前入团的真实人数
   * @format int32
   */
  currentUserNumber?: number;

  /** 活动说明 */
  description?: string;

  /**
   * 活动结束时间
   * @format date-time
   */
  endTime?: string;

  /**
   * 创建时间
   * @format date-time
   */
  gmtCreated?: string;

  /**
   * 成团人数
   * @format int32
   */
  groupNumber?: number;

  /**
   * 拼团状态:  0: 队长开团中（待支付） 1: 拼团中 2: 拼团成功 3: 拼团失败
   * @format int32
   */
  groupStatus?: number;

  /** @format int64 */
  id?: number;

  /**
   * 参团时间
   * @format date-time
   */
  joinDate?: string;

  /**
   * 个人参团状态 1 未加入(待支付) 2 已加入 3 取消 4 已成团 5 拼团失败
   * @format int32
   */
  joinStatus?: number;

  /** 用户头像 */
  memberHeadImg?: string;

  /**
   * 用户ID
   * @format int64
   */
  memberId?: number;

  /** 用户名称 */
  memberNickname?: string;

  /**
   * 商户ID
   * @format int64
   */
  merchantId?: number;

  /**
   * 开团时间
   * @format date-time
   */
  openDate?: string;

  /** 订单编号 */
  orderNo?: string;

  /**
   * 活动开始时间
   * @format date-time
   */
  startTime?: string;

  /**
   * 当前生成团的虚拟人数
   * @format int32
   */
  virtualUserNumber?: number;
}

export interface UserWordVO {
  /** 禁言状态 0：正常 1：禁用 */
  disableWord?: boolean;

  /**
   * 注册时间
   * @format date-time
   */
  gmtCreated?: string;

  /**
   * 用户id
   * @format int64
   */
  id?: number;

  /**
   * 会员状态 1 普通用户 2 会员用户
   * @format int32
   */
  memberType?: number;

  /** 用户手机号 */
  mobile?: string;

  /** 昵称 */
  nickName?: string;

  /** 用户当前应用唯一标识 */
  openId?: string;
}

export interface UpdatePostsGroupDTO {
  /**
   * 圈子分类
   * @format int64
   */
  groupClassifyId?: number;

  /**
   * 圈子id
   * @format int64
   */
  groupId?: number;

  /**
   * 帖子id
   * @format int64
   */
  postsId?: number;
}

export interface TopicHotDTO {
  /** 热门话题 */
  hot: boolean;

  /**
   * 主键
   * @format int64
   */
  id: number;
}

export interface TopicDTO {
  /** 背景图 */
  backgroundImg?: string;

  /**
   * id
   * @format int64
   */
  id?: number;

  /** 话题名称 */
  name: string;

  /** slogan */
  slogan?: string;
}

export interface SiteMessageModifyDto {
  /** 消息内容 */
  content?: string;

  /** 消息简介 */
  description?: string;

  /**
   * 发送时间
   * @format date-time
   */
  sendTime?: string;
}

export interface SiteMessageDto {
  /** 消息内容 */
  content?: string;

  /** 消息简介 */
  description?: string;

  /** 消息编号 */
  messageNo?: string;

  /** 发送状态 已发送：true，未发送：false */
  sendStatus?: boolean;

  /**
   * 发送时间
   * @format date-time
   */
  sendTime?: string;
}

export interface SiteMessageCreateDto {
  /** 消息内容 */
  content?: string;

  /** 消息简介 */
  description?: string;

  /**
   * 发送时间
   * @format date-time
   */
  sendTime?: string;
}

export interface PostsSortDTO {
  /**
   * 帖子ID
   * @format int64
   */
  postsId?: number;

  /**
   * 排序值
   * @format int32
   */
  sortNum?: number;
}

export interface PostsRecommendDTO {
  /**
   * 帖子ID
   * @format int64
   */
  postsId?: number;

  /** 推荐/不推荐 */
  recommend?: boolean;
}

export interface PostsAdminSearchVO {
  /** 附件列表 */
  attachments?: PostsAttachmentVO[];

  /**
   * 审核状态0待审核1已审核
   * @format int32
   */
  auditStatus?: number;

  /** 圈子分类置顶 */
  classifyStatus?: boolean;

  /** 是否收藏 */
  collectStatus?: boolean;

  /**
   * 评论数
   * @format int32
   */
  commentCnt?: number;

  /**
   * 评论新用户数排名
   * @format int32
   */
  commentNewUserRank?: number;

  /**
   * 评论新用户总数
   * @format int32
   */
  commentNewUserTotalNum?: number;

  /**
   * 评论人数排名
   * @format int32
   */
  commentPopulationRank?: number;

  /**
   * 评论人数真实数
   * @format int32
   */
  commentPopulationRealNum?: number;

  /**
   * 评论人数总数
   * @format int32
   */
  commentPopulationTotalNum?: number;

  /**
   * 评论数排名
   * @format int32
   */
  commentRank?: number;

  /** 帖子内容 */
  content?: string;

  /** 是否精华 */
  digest?: boolean;

  /**
   * 圈子分类id
   * @format int64
   */
  groupClassifyId?: number;

  /** 圈子分类名称 */
  groupClassifyName?: string;

  /**
   * 圈子id
   * @format int64
   */
  groupId?: number;

  /** 圈子名称 */
  groupName?: string;

  /** 圈子置顶状态 */
  groupStatus?: boolean;

  /**
   * 热度值
   * @format int32
   */
  heat?: number;

  /**
   * 主键
   * @format int64
   */
  id: number;

  /** 首页置顶状态 */
  indexStatus?: boolean;

  /**
   * 发帖时等级
   * @format int32
   */
  level?: number;

  /**
   * 点赞数
   * @format int32
   */
  likeCnt?: number;

  /**
   * 发帖时间
   * @format date-time
   */
  publishTime?: string;

  /**
   * 发布者会员ID
   * @format int64
   */
  publisherId?: number;

  /**
   * 发布者会员等级
   * @format int32
   */
  publisherLevel?: number;

  /** 发布者手机号 */
  publisherMobile?: string;

  /** 发布者昵称 */
  publisherNickname?: string;

  /**
   * 真实评论数
   * @format int32
   */
  realCommentCnt?: number;

  /**
   * 真实点赞数
   * @format int32
   */
  realLikeCnt?: number;

  /** 是否首页显示 */
  recommend?: boolean;

  /** 是否悬赏贴 */
  reward?: boolean;

  /**
   * 分享数
   * @format int32
   */
  shareCnt?: number;

  /**
   * 排序值
   * @format int32
   */
  sortNum?: number;

  /** 广场置顶状态 */
  squareStatus?: boolean;

  /** 标签 */
  tagList?: PostsTagVO[];

  /** 是否置顶 */
  top?: boolean;

  /**
   * 置顶开始时间
   * @format date-time
   */
  topBeginTime?: string;

  /**
   * 置顶结束时间
   * @format date-time
   */
  topEndTime?: string;

  /**
   * 帖子类型1图文视频2投票
   * @format int32
   */
  type?: number;

  /**
   * 查看数
   * @format int32
   */
  viewCnt?: number;

  /** 是否可见 */
  visible?: boolean;

  /** 是否投票帖 */
  vote?: boolean;
}

export interface MuteWordVO {
  /** 词 */
  content: string;

  /** 替换词，若不设置，用星号代替 */
  contentReplace: string;

  /**
   * 主键
   * @format int64
   */
  id: number;
}

export interface MuteWordDeleteBatchDTO {
  /** 要删除的ID集合 */
  ids?: number[];
}

export interface MuteWordDTO {
  /** 词 */
  content: string;

  /** 替换词，若不设置，用星号代替 */
  contentReplace: string;
}

export interface MsgNoticeVO {
  /**
   * 评论ID
   * @format int64
   */
  commentId?: number;

  /**
   * 关联的顶层评论ID（楼层ID）
   * @format int64
   */
  floorId?: number;

  /**
   * 创建时间
   * @format date-time
   */
  gmtCreated?: string;

  /**
   * Id
   * @format int64
   */
  id?: number;

  /**
   * 关联的评论ID
   * @format int64
   */
  mentionCommentId?: number;

  /**
   * 帖子ID
   * @format int64
   */
  postsId?: number;

  /**
   * 马甲ID
   * @format int64
   */
  puppetId?: number;

  /** 马甲昵称 */
  puppetName?: string;

  /** 是否已读 */
  readStatus?: boolean;

  /**
   * 系统用户ID
   * @format int64
   */
  sysUserId?: number;

  /**
   * 用户id
   * @format int64
   */
  userId?: number;

  /** 用户昵称 */
  userName?: string;
}

export interface LotteryUpdateDto {
  /**
   * 开始时间
   * @format date-time
   */
  beginTime?: string;

  /** 抽奖背景图 */
  bgImg?: string;

  /** 抽奖中间按钮图 */
  buttonImg?: string;

  /**
   * 抽奖消耗积分 -1：不限，最大 999
   * @format int32
   */
  consumeScore?: number;

  /** 封面图 */
  coverImg?: string;

  /** 活动描述 */
  description?: string;

  /** 是否启用抽奖倒计时 */
  enableActivityCountdown?: boolean;

  /** 是否开启助力开关 true：开启 false：关闭 */
  enableHelpful?: boolean;

  /** 是否启用中奖走马灯 */
  enableInformationMarqueeTip?: boolean;

  /** 是否启用已参与抽奖人次 */
  enableJoinedPeopleNum?: boolean;

  /** 保底必中 true：选中 false：未选中 */
  enableMustHit?: boolean;

  /** 是否启用抽奖次数剩余 */
  enableRemainderLotteryTimes?: boolean;

  /** 是否启用积分剩余数量 */
  enableScoreRemainQuantity?: boolean;

  /**
   * 结束时间
   * @format date-time
   */
  endTime?: string;

  /**
   * 虚拟参与人次，最小：1
   * @format int32
   */
  fakeJoinedPeopleNum?: number;
  helpfulSetting?: LotteryHelpfulSetting;

  /**
   * 每人每日参与次数 -1：不限，最大 999
   * @format int32
   */
  joinTimes?: number;

  /**
   * 前 n 次抽奖后，在 n+1 次后必中奖品项，从0开始
   * @format int32
   */
  mustHitRewardItem?: number;

  /** 活动名称 */
  name?: string;

  /** 抽奖奖品 */
  rewardSettings?: LotteryRewardSetting[];

  /** 规则图文 */
  ruleContent?: string;

  /**
   * 活动状态 1：未开始 2：进行中 4：已结束
   * @format int32
   */
  status?: number;

  /**
   * 前 n 次抽奖，最小为1，最大为 999
   * @format int32
   */
  topTimes?: number;

  /**
   * 参与用户限制 -1：不限，0：非会员 1：会员
   * @format int32
   */
  userLimit?: number;
}

export interface LotteryRewardSetting {
  /** 上传抽奖按钮图 */
  buttonImg?: string;

  /** 奖品单号。优惠券：优惠券编号 积分：赠送的积分数值 实物商品：商品编号+sku编号+商品名称，用逗号连接 */
  code?: string;

  /** 奖品说明 */
  description?: string;

  /** 奖品名称 */
  name?: string;

  /** 中奖概率，两位小数 */
  odds?: number;

  /**
   * 奖品项索引，从0开始，最大为7
   * @format int32
   */
  rewardItem?: number;

  /**
   * 已抽中数量
   * @format int32
   */
  salesQuantity?: number;

  /**
   * 投放库存数 谢谢惠顾为空
   * @format int32
   */
  stock?: number;

  /**
   * 奖品类型 1：优惠券 2：积分 4：实物商品 8：谢谢惠顾
   * @format int32
   */
  type?: number;
}

export interface LotteryRecordListDto {
  /**
   * 用户消耗积分
   * @format int32
   */
  consumeScore?: number;

  /**
   * 抽奖时间
   * @format date-time
   */
  gmtCreated?: string;

  /**
   * 抽奖活动ID
   * @format int64
   */
  lotteryId?: number;

  /** 抽奖活动名称 */
  lotteryName?: string;

  /** 用户手机号 */
  mobile?: string;

  /**
   * 抽奖后用户积分账户余额（可用）
   * @format int32
   */
  remainderScore?: number;

  /** 抽中奖品名称 */
  rewardName?: string;

  /**
   * 用户ID
   * @format int64
   */
  userId?: number;

  /** 用户昵称 */
  userName?: string;
}

export interface LotteryOrderShippingDto {
  /** 快递公司名称 */
  expressCompany?: string;

  /** 快递公司编码 */
  expressCompanyCode?: string;

  /** 快递单号 */
  expressNo?: string;
}

export interface LotteryOrderListDto {
  /** 商品封面图 */
  coverImg?: string;

  /** 快递公司 */
  expressCompany?: string;

  /** 快递公司编码 */
  expressCompanyCode?: string;

  /** 快递编号 */
  expressNo?: string;

  /** 商品名称 */
  goodsName?: string;

  /** 商品编号 */
  goodsNo?: string;

  /** @format int64 */
  id?: number;

  /** 抽奖活动名称 */
  lotteryName?: string;

  /**
   * 发货状态 1：待确认 2：待发货 4：已发货 8：完成
   * @format int32
   */
  orderStatus?: number;

  /** 发货状态 1：待确认 2：待发货 4：已发货 8：完成 */
  orderStatusName?: string;

  /** 收货地址 */
  shippingAddress?: string;

  /** 收货人电话 */
  shippingMobile?: string;

  /** 收货人姓名 */
  shippingName?: string;

  /** 商品sku */
  skuName?: string;

  /** 抽奖活动状态 未开始 进行中 已结束 */
  statusName?: string;

  /**
   * 用户ID
   * @format int64
   */
  userId?: number;

  /** 用户昵称 */
  userName?: string;
}

export interface LotteryListDto {
  /**
   * 开始时间
   * @format date-time
   */
  beginTime?: string;

  /** 封面图 */
  coverImg?: string;

  /** 活动描述 */
  description?: string;

  /** 结束原因 */
  endReason?: string;

  /** 结束原因备注 */
  endRemark?: string;

  /**
   * 结束时间
   * @format date-time
   */
  endTime?: string;

  /**
   * 创建时间
   * @format date-time
   */
  gmtCreated?: string;

  /**
   * id
   * @format int64
   */
  id?: number;

  /** 活动名称 */
  name?: string;

  /**
   * 活动状态 1：未开始 2：进行中 4：已结束
   * @format int32
   */
  status?: number;

  /** 状态名称 未开始 进行中 已结束 */
  statusName?: string;
}

export interface LotteryHelpfulSetting {
  /**
   * 每人每日累计被助力次数 最小：1，最大 999
   * @format int32
   */
  accumulateHelpfulTimes?: number;

  /** 好友助力页按钮图片 */
  friendButtonImg?: string;

  /** 好友助力页图文 */
  friendContent?: string;

  /**
   * 每人每日可助力他人的次数 -1：不限，最大 999
   * @format int32
   */
  helpfulLimitTimes?: number;

  /**
   * 每人累计最多获取多少次奖励 -1：不限，最大 999
   * @format int32
   */
  helpfulRewardLimitTimes?: number;

  /**
   * 每人每日成功助力他人多少次可获得奖励 -1：无奖励，最大 999
   * @format int32
   */
  helpfulRewardTimes?: number;

  /**
   * 获得每日额外抽奖次数 最小：1，最大 999
   * @format int32
   */
  lotteryTimes?: number;
  reward?: LotteryHelpfulRewardSetting;

  /** 成功助力页按钮图片 */
  successButtonImg?: string;

  /** 成功助力页图文 */
  successContent?: string;

  /**
   * 助力参与用户限制 1：好友助力页被引导注册的用户 2：会员 3：两者都选中
   * @format int32
   */
  userLimit?: number;
}

export interface LotteryHelpfulRewardSetting {
  /** 助力奖品单号 */
  code?: string;

  /**
   * 每日额外抽奖次数 最小：1，最大 999
   * @format int32
   */
  lotteryTimes?: number;
}

export interface LotteryEndDto {
  /** 结束原因 */
  endRemark?: string;
}

export interface LotteryDetailDto {
  /**
   * 开始时间
   * @format date-time
   */
  beginTime?: string;

  /** 抽奖背景图 */
  bgImg?: string;

  /** 抽奖中间按钮图 */
  buttonImg?: string;

  /**
   * 抽奖消耗积分 -1：不限，最大 999
   * @format int32
   */
  consumeScore?: number;

  /** 封面图 */
  coverImg?: string;

  /** 活动描述 */
  description?: string;

  /** 是否启用抽奖倒计时 */
  enableActivityCountdown?: boolean;

  /** 是否开启助力开关 true：开启 false：关闭 */
  enableHelpful?: boolean;

  /** 是否启用中奖走马灯 */
  enableInformationMarqueeTip?: boolean;

  /** 是否启用已参与抽奖人次 */
  enableJoinedPeopleNum?: boolean;

  /** 保底必中 true：选中 false：未选中 */
  enableMustHit?: boolean;

  /** 是否启用抽奖次数剩余 */
  enableRemainderLotteryTimes?: boolean;

  /** 是否启用积分剩余数量 */
  enableScoreRemainQuantity?: boolean;

  /**
   * 结束时间
   * @format date-time
   */
  endTime?: string;

  /**
   * 虚拟参与人次，最小：1
   * @format int32
   */
  fakeJoinedPeopleNum?: number;
  helpfulSetting?: LotteryHelpfulSetting;

  /**
   * 每人每日参与次数 -1：不限，最大 999
   * @format int32
   */
  joinTimes?: number;

  /**
   * 前 n 次抽奖后，在 n+1 次后必中奖品项，从0开始
   * @format int32
   */
  mustHitRewardItem?: number;

  /** 活动名称 */
  name?: string;

  /** 抽奖奖品 */
  rewardSettings?: LotteryRewardSetting[];

  /** 规则图文 */
  ruleContent?: string;

  /**
   * 活动状态 1：未开始 2：进行中 4：已结束
   * @format int32
   */
  status?: number;

  /**
   * 前 n 次抽奖，最小为1，最大为 999
   * @format int32
   */
  topTimes?: number;

  /**
   * 参与用户限制 -1：不限，0：非会员 1：会员
   * @format int32
   */
  userLimit?: number;
}

export interface LotteryCreateDto {
  /**
   * 开始时间
   * @format date-time
   */
  beginTime?: string;

  /** 抽奖背景图 */
  bgImg?: string;

  /** 抽奖中间按钮图 */
  buttonImg?: string;

  /**
   * 抽奖消耗积分 -1：不限，最大 999
   * @format int32
   */
  consumeScore?: number;

  /** 封面图 */
  coverImg?: string;

  /** 活动描述 */
  description?: string;

  /** 是否启用抽奖倒计时 */
  enableActivityCountdown?: boolean;

  /** 是否开启助力开关 true：开启 false：关闭 */
  enableHelpful?: boolean;

  /** 是否启用中奖走马灯 */
  enableInformationMarqueeTip?: boolean;

  /** 是否启用已参与抽奖人次 */
  enableJoinedPeopleNum?: boolean;

  /** 保底必中 true：选中 false：未选中 */
  enableMustHit?: boolean;

  /** 是否启用抽奖次数剩余 */
  enableRemainderLotteryTimes?: boolean;

  /** 是否启用积分剩余数量 */
  enableScoreRemainQuantity?: boolean;

  /**
   * 结束时间
   * @format date-time
   */
  endTime?: string;

  /**
   * 虚拟参与人次，最小：1
   * @format int32
   */
  fakeJoinedPeopleNum?: number;
  helpfulSetting?: LotteryHelpfulSetting;

  /**
   * 每人每日参与次数 -1：不限，最大 999
   * @format int32
   */
  joinTimes?: number;

  /**
   * 前 n 次抽奖后，在 n+1 次后必中奖品项，从0开始
   * @format int32
   */
  mustHitRewardItem?: number;

  /** 活动名称 */
  name?: string;

  /** 抽奖奖品 */
  rewardSettings?: LotteryRewardSetting[];

  /** 规则图文 */
  ruleContent?: string;

  /**
   * 前 n 次抽奖，最小为1，最大为 999
   * @format int32
   */
  topTimes?: number;

  /**
   * 参与用户限制 -1：不限，0：非会员 1：会员
   * @format int32
   */
  userLimit?: number;
}

export interface LivePageUpdateDto {
  /** 直播ids */
  liveIds?: string[];

  /** 直播类型 */
  liveType?: "HUOSHAN" | "SHIPINHAO";

  /** 页面名称 */
  name?: string;

  /** 页面类型 */
  pageType?: "Details" | "List";
}

export interface LivePageCreateDto {
  /** 直播ids */
  liveIds?: string[];

  /** 直播类型 */
  liveType?: "HUOSHAN" | "SHIPINHAO";

  /** 页面名称 */
  name?: string;

  /** 页面类型 */
  pageType?: "Details" | "List";
}

export interface GroupSortDTO {
  /**
   * 分类排序
   * @format int32
   */
  classifySort?: number;

  /**
   * 圈子ID
   * @format int64
   */
  groupId?: number;

  /**
   * 广场排序
   * @format int32
   */
  recommendSort?: number;
}

export interface GroupSimpleSearchVO {
  /** 创建者昵称 */
  creatorNickname?: string;

  /**
   * id
   * @format int64
   */
  id?: number;

  /** 圈子名称 */
  name?: string;
}

export interface GroupListVO {
  /**
   * 圈子id
   * @format int64
   */
  id?: number;

  /** 圈子名称 */
  name?: string;
}

export interface GroupDataStatisticsVO {
  /**
   * 评论数
   * @format int32
   */
  commentNum?: number;

  /**
   * 评论人数
   * @format int32
   */
  commentUserNum?: number;

  /**
   * 圈子数
   * @format int32
   */
  groupNum?: number;

  /**
   * Id
   * @format int64
   */
  id?: number;

  /** 分类名称 */
  name?: string;

  /**
   * 新加入人数
   * @format int32
   */
  newJoinNum?: number;

  /**
   * 发帖数
   * @format int32
   */
  postsNum?: number;

  /**
   * 发帖人数
   * @format int32
   */
  postsUserNum?: number;

  /**
   * 排序值
   * @format int32
   */
  sort?: number;

  /**
   * 状态
   * @format int32
   */
  status?: number;

  /**
   * 圈子负责人
   * @format int64
   */
  sysUserId?: number;

  /** 圈子负责人名称 */
  sysUserName?: string;
}

export interface GroupClassifyDTO {
  /**
   * 创建时间
   * @format date-time
   */
  gmtCreated?: string;

  /**
   * 更新时间
   * @format date-time
   */
  gmtModified?: string;

  /**
   * Id
   * @format int32
   */
  id?: number;

  /** 分类名称 */
  name?: string;

  /**
   * 排序值
   * @format int32
   */
  sort?: number;

  /**
   * 状态
   * @format int32
   */
  status?: number;

  /**
   * 圈子负责人
   * @format int64
   */
  sysUserId?: number;

  /** 圈子负责人名称 */
  sysUserName?: string;
}

export interface GroupBoolDecisionDTO {
  /**
   * 分类id
   * @format int64
   */
  classifyId?: number;

  /** 操作决定 */
  decision?: boolean;

  /**
   * 圈子ID
   * @format int64
   */
  groupId?: number;
}

export interface GroupApproveVO {
  /**
   * 申请者ID
   * @format int64
   */
  applicantId: number;

  /**
   * 申请时间(创建时间)
   * @format date-time
   */
  applyTime: string;

  /**
   * 审核状态|1:待审核，2:已通过，3:已拒绝
   * @format int32
   */
  approveStatus?: number;

  /**
   * 审核时间
   * @format date-time
   */
  approveTime: string;

  /** 审核者姓名 */
  approverName?: string;

  /** 背景图 */
  backgroundImg?: string;

  /**
   * 分类ID
   * @format int64
   */
  classifyId?: number;

  /** 分类名称 */
  classifyName?: string;

  /**
   * 分类排序
   * @format int32
   */
  classifySort?: number;

  /**
   * 评论数
   * @format int32
   */
  commentCnt?: number;

  /**
   * 评论人数
   * @format int32
   */
  commentUserCnt?: number;

  /**
   * 创建时间
   * @format date-time
   */
  createdTime?: string;

  /**
   * 圈子创建者ID
   * @format int64
   */
  creatorId: number;

  /** 创建者手机 */
  creatorMobile: string;

  /** 创建者昵称 */
  creatorNickname: string;

  /**
   * 圈子状态|1:待审核，2:审核失败，3:正常，4:封禁
   * @format int32
   */
  enumStatus?: number;

  /** 是否加入圈子 */
  focusStatus?: boolean;

  /** 是否关注圈子 */
  followStatus?: boolean;

  /**
   * 圈子ID
   * @format int64
   */
  groupId: number;

  /**
   * 主键
   * @format int64
   */
  id: number;

  /** logo */
  imgLogo?: string;

  /**
   * 等级门槛
   * @format int32
   */
  leastLevel?: number;

  /**
   * 成员数
   * @format int32
   */
  memberCnt?: number;

  /** 拒绝理由 */
  memo?: string;

  /** 名称 */
  name: string;

  /**
   * 新成员数
   * @format int32
   */
  newMemberCnt?: number;

  /** 是否正常 */
  normal?: boolean;

  /**
   * 发帖数
   * @format int32
   */
  postsCnt?: number;

  /**
   * 发帖人数
   * @format int32
   */
  postsUserCnt?: number;

  /** 是否首页推荐 */
  recommend?: boolean;

  /**
   * 广场排序 大的排在前面
   * @format int32
   */
  recommendSort?: number;

  /** 副标题 */
  subTitle: string;

  /** 标签 */
  tags?: string;

  /** 是否圈子列表中置顶 */
  top?: boolean;
}

export interface ApproveDecisionDTO {
  /**
   * 审批ID
   * @format int64
   */
  approveId: number;

  /**
   * 圈子分类ID
   * @format int64
   */
  classifyId: number;

  /** 附加文本（补充说明或理由） */
  memo?: string;

  /** 审核决定 CREATED(1-待审核） APPROVED(2-已通过）  REJECTED(3-已拒绝); */
  status: "APPROVED" | "CREATED" | "REJECTED";
}

export interface UserStatisticsDTO {
  /** 头像 */
  headImg?: string;

  /**
   * 加入的圈子数
   * @format int32
   */
  joinGroupCount?: number;

  /** 用户手机号 */
  mobile?: string;

  /**
   * 我过审的圈子
   * @format int32
   */
  myGroupCount?: number;

  /** 昵称 */
  nickName?: string;

  /**
   * 收到的关注数
   * @format int32
   */
  receiveFollowCount?: number;

  /**
   * 收到的点赞数
   * @format int32
   */
  receiveLikeCount?: number;

  /**
   * 发出的关注数
   * @format int32
   */
  sendFollowCount?: number;

  /**
   * 发出的点赞数
   * @format int32
   */
  sendLikeCount?: number;

  /**
   * 用户ID
   * @format int64
   */
  userId?: number;
}

export interface UserFollowDTO {
  /** 关注/取关 */
  decision?: boolean;

  /**
   * 关注的ID
   * @format int64
   */
  followRelId?: number;
}

export interface TreeNodeConfig {
  childrenKey?: string;

  /** @format int32 */
  deep?: number;
  idKey?: string;
  nameKey?: string;
  parentIdKey?: string;
  weightKey?: string;
}

export interface TopicVO {
  /** 背景图 */
  backgroundImg?: string;

  /** 是否启用 */
  enabled: boolean;

  /** false：关注 true：未关注 */
  followStatus?: boolean;

  /** 是否热门 */
  hot: boolean;

  /**
   * 主键
   * @format int64
   */
  id: number;

  /**
   * 关联帖子数
   * @format int32
   */
  mentionCnt: number;

  /** 话题名称 */
  name: string;

  /** slogan */
  slogan?: string;

  /**
   * 排序号
   * @format int32
   */
  sortNum: number;
}

export interface TopicFollowVO {
  /** 是否关注 */
  followStatus?: boolean;

  /**
   * 主键
   * @format int64
   */
  id: number;

  /**
   * 关注者ID
   * @format int64
   */
  memberId: number;

  /**
   * 话题ID
   * @format int64
   */
  topicId: number;

  /** 话题名称（冗余） */
  topicName: string;
}

export interface TopicFollowDTO {
  /**
   * 话题ID
   * @format int64
   */
  topicId: number;

  /** 话题名称（冗余） */
  topicName: string;
}

export interface SiteMessageSimpleDto {
  /** 消息简介 */
  description?: string;

  /** 消息编号 */
  messageNo?: string;

  /** 页面跳转地址 */
  page?: string;

  /** 标题 */
  title?: string;

  /** 是否已读 */
  viewStatus?: boolean;
}

export interface SiteMessageDeleteDto {
  /** 消息编号数组 */
  messageNoList?: string[];
}

export interface PostsTopicVO {
  /**
   * 主键
   * @format int64
   */
  id: number;

  /**
   * 帖子ID
   * @format int64
   */
  postsId: number;

  /**
   * 话题ID
   * @format int64
   */
  topicId: number;

  /** 话题名称 */
  topicName: string;
}

export interface PostsTopVO {
  /** 圈子分类置顶 */
  classifyStatus?: boolean;

  /**
   * 置顶结束时间
   * @format date-time
   */
  endTime?: string;

  /** 圈子置顶 */
  groupStatus?: boolean;

  /**
   * Id
   * @format int64
   */
  id?: number;

  /** 首页置顶 */
  indexStatus?: boolean;

  /**
   * 帖子id
   * @format int64
   */
  postsId?: number;

  /** 广场置顶 */
  squareStatus?: boolean;
}

export interface PostsTagVO {
  /**
   * 创建时间
   * @format date-time
   */
  gmtCreated?: string;

  /**
   * Id
   * @format int64
   */
  id?: number;

  /**
   * 帖子id
   * @format int64
   */
  postsId?: number;

  /**
   * 标签id
   * @format int64
   */
  tagId?: number;

  /** 标签名称 */
  tagName?: string;
}

export interface PostsOperationDTO {
  /** 圈子分类置顶 */
  classifyStatus?: boolean;

  /** 设置值 */
  decision?: boolean;

  /** 圈子置顶 */
  groupStatus?: boolean;

  /**
   * 置顶小时
   * @format int32
   */
  hours?: number;

  /** 首页置顶 */
  indexStatus?: boolean;

  /** 帖子ID */
  postsIds?: number[];

  /** 广场置顶 */
  squareStatus?: boolean;
}

export interface PostsLikeDTO {
  /**
   * 点赞评论ID
   * @format int64
   */
  commentId: number;

  /** true点赞，false取消点赞 */
  decision?: boolean;

  /**
   * 贴子顶层Id
   * @format int64
   */
  floorId?: number;

  /**
   * 后台点赞数
   * @format int32
   */
  likeCnt?: number;

  /**
   * 帖子评论Id
   * @format int64
   */
  postsCommentId?: number;

  /**
   * 点赞帖子ID
   * @format int64
   */
  postsId: number;

  /** 贴子图片 */
  postsImg?: string;
}

export interface PostsDetailVO {
  /** 是否允许回复 */
  allowReply?: boolean;

  /** 附件列表 */
  attachments?: PostsAttachmentVO[];

  /** 帖子审核状态 */
  auditStatus?: boolean;

  /**
   * 审核时间
   * @format date-time
   */
  auditTime?: string;

  /** 审核人 */
  auditUser?: string;

  /** 圈子分类置顶 */
  classifyStatus?: boolean;

  /** 是否收藏 */
  collectStatus?: boolean;

  /**
   * 评论计数
   * @format int32
   */
  commentCnt?: number;

  /**
   * 评论计数排名
   * @format int32
   */
  commentCntRank?: number;

  /**
   * 评论新用户数排名
   * @format int32
   */
  commentNewUserRank?: number;

  /**
   * 评论新用户总数
   * @format int32
   */
  commentNewUserTotalNum?: number;

  /**
   * 评论人数排名
   * @format int32
   */
  commentPopulationRank?: number;

  /**
   * 评论人数真实数
   * @format int32
   */
  commentPopulationRealNum?: number;

  /**
   * 评论人数总数
   * @format int32
   */
  commentPopulationTotalNum?: number;

  /**
   * 评论数排名
   * @format int32
   */
  commentRank?: number;

  /**
   * 评论用户计数
   * @format int32
   */
  commentUserCnt?: number;

  /**
   * 评论用户计数排名
   * @format int32
   */
  commentUserCntRank?: number;

  /** 评论列表 */
  comments?: PostsCommentVO[];

  /** 帖子内容 */
  content?: string;

  /** 是否精华 */
  digest?: boolean;

  /**
   * 结束时间
   * @format date-time
   */
  endTime?: string;

  /** 是否已关注帖子作者 */
  followedPublisher?: boolean;

  /**
   * 圈子分类ID
   * @format int64
   */
  groupClassifyId: number;

  /** 圈子分类名称 */
  groupClassifyName?: string;

  /**
   * 圈子ID
   * @format int64
   */
  groupId: number;

  /** 圈子LOGO */
  groupLogo?: string;

  /** 圈子名称 */
  groupName?: string;

  /** 圈子置顶状态 */
  groupStatus?: boolean;

  /**
   * 主键
   * @format int64
   */
  id: number;

  /** 帖子封面 */
  imgUrl?: string;

  /** 首页置顶状态 */
  indexStatus?: boolean;

  /** 当前用户 是否投票 */
  isVote?: boolean;

  /**
   * 用户发帖时的等级
   * @format int32
   */
  level?: number;

  /**
   * 点赞数
   * @format int32
   */
  likeCnt?: number;

  /** 点赞状态数 */
  likeStatus?: boolean;

  /**
   * 发帖时间
   * @format date-time
   */
  publishTime?: string;

  /** 头像url */
  publisherAvatarUrl?: string;

  /** 发布者头像 */
  publisherHead?: string;

  /**
   * 发布者ID
   * @format int64
   */
  publisherId: number;

  /**
   * 会员等级
   * @format int32
   */
  publisherLevel?: number;

  /** 发布者手机号 */
  publisherMobile: string;

  /** 发布者昵称 */
  publisherNickname: string;

  /**
   * 真实评论数
   * @format int32
   */
  realCommentCnt?: number;

  /**
   * 真实点赞数
   * @format int32
   */
  realLikeCnt?: number;

  /** 是否悬赏贴 */
  reward?: boolean;

  /**
   * 分享数
   * @format int32
   */
  shareCnt?: number;

  /**
   * 排序号
   * @format int32
   */
  sortNum?: number;

  /** 广场置顶状态 */
  squareStatus?: boolean;

  /** 标签 */
  tagList?: PostsTagVO[];

  /** 是否置顶 */
  top?: boolean;
  topDetail?: PostsTopVO;

  /** 帖子关联的话题集合 */
  topics?: PostsTopicVO[];

  /**
   * 帖子类型:1图文/视频2投票3悬赏
   * @format int32
   */
  type?: number;

  /**
   * 查看数
   * @format int32
   */
  viewCnt?: number;

  /** 是否可见 */
  visible?: boolean;

  /** 是否投票帖 */
  vote?: boolean;

  /**
   * 投票类型：0无投票1单选2多选
   * @format int32
   */
  voteType?: number;
}

export interface PostsDTO {
  /** 附件列表 */
  attachments?: PostsAttachmentDTO[];

  /** 内容 */
  content?: string;

  /**
   * 圈子分类ID
   * @format int64
   */
  groupClassifyId: number;

  /**
   * 圈子ID
   * @format int64
   */
  groupId: number;
  operation?: PostsOperationDTO;

  /**
   * 排序号
   * @format int32
   */
  sortNum?: number;

  /** 话题名称集合 */
  topicNames?: string[];

  /**
   * 帖子类型:1图文/视频2投票
   * @format int32
   */
  type?: number;
}

export interface PostsCommentVO {
  /** 评论内容 */
  content: string;

  /** 评论自定义图片 */
  customizeImages?: string[];

  /**
   * 关联的顶层评论ID（楼层ID）
   * @format int64
   */
  floorId?: number;

  /**
   * 圈子ID
   * @format int64
   */
  groupId: number;

  /**
   * 主键
   * @format int64
   */
  id: number;

  /**
   * 点赞数
   * @format int32
   */
  likeCnt?: number;

  /** 点赞状态数 */
  likeStatus?: boolean;

  /**
   * 关联的评论ID
   * @format int64
   */
  mentionCommentId: number;

  /** 回复的评论者昵称 */
  mentionHeadImg?: string;

  /** 回复的评论者昵称 */
  mentionNickName?: string;

  /**
   * 关联的评论人ID
   * @format int64
   */
  mentionPublisherId: number;

  /**
   * 帖子ID
   * @format int64
   */
  postsId: number;

  /**
   * 发表时间
   * @format date-time
   */
  publishTime: string;

  /** 发布者头像 */
  publisherHeadImg?: string;

  /**
   * 评论人ID
   * @format int64
   */
  publisherId: number;

  /** 发布者昵称 */
  publisherNickName?: string;

  /**
   * 楼层回复数
   * @format int32
   */
  replyCnt?: number;

  /**
   * 马甲号ID
   * @format int64
   */
  sockPuppetId?: number;

  /** 子评论集合 */
  subComments: PostsCommentVO[];

  /**
   * 用户类型1普通2马甲
   * @format int32
   */
  type?: number;

  /** 是否可见 */
  visible: boolean;
}

export interface PostsCommentDTO {
  /** 评论内容 */
  content: string;

  /**
   * 关联的顶层评论ID（楼层ID）
   * @format int64
   */
  floorId?: number;

  /**
   * 关联的评论ID
   * @format int64
   */
  mentionCommentId?: number;

  /**
   * 帖子评论Id
   * @format int64
   */
  postsCommentId?: number;

  /**
   * 帖子ID
   * @format int64
   */
  postsId: number;

  /** 贴子图片 */
  postsImg?: string;

  /** 马甲号信息 */
  userIds?: number[];
}

export interface PostsCommentBoolDecisionDTO {
  /**
   * 评论ID
   * @format int64
   */
  commentId?: number;

  /** 设置值 */
  decision?: boolean;

  /**
   * 圈子ID
   * @format int64
   */
  groupId?: number;
}

export interface PostsCommentAnalysis {
  /**
   * 评论数量
   * @format int32
   */
  comment?: number;

  /**
   * 评论新用户数量
   * @format int32
   */
  commentNewUser?: number;

  /**
   * 评论新用户排行
   * @format int32
   */
  commentNewUserRank?: number;

  /**
   * 评论数量排行
   * @format int32
   */
  commentRank?: number;

  /**
   * 评论用户数量
   * @format int32
   */
  commentUser?: number;

  /**
   * 评论用户排行
   * @format int32
   */
  commentUserRank?: number;
}

export interface PostsBoolDecisionDTO {
  /** 设置值 */
  decision?: boolean;

  /**
   * 圈子ID
   * @format int64
   */
  groupId?: number;

  /**
   * 帖子ID
   * @format int64
   */
  postsId?: number;
}

export interface PostsAttachmentVO {
  /**
   * 附件类型|1:图片,2:视频
   * @format int32
   */
  enumType: number;

  /**
   * 主键
   * @format int64
   */
  id: number;

  /**
   * 帖子id
   * @format int64
   */
  postsId: number;

  /** 附件链接 */
  url?: string;
}

export interface PostsAttachmentDTO {
  /**
   * 附件类型|1:图片,2:视频,3:视频封面
   * @format int32
   */
  enumType: number;

  /** 附件链接 */
  url?: string;
}

export type MsgVO = object;

export interface MsgNumVO {
  /**
   * 活动消息
   * @format int32
   */
  activity?: number;

  /**
   * 互动消息
   * @format int32
   */
  interactive?: number;

  /**
   * 订单消息
   * @format int32
   */
  order?: number;

  /**
   * 系统消息
   * @format int32
   */
  system?: number;
}

export interface MiniPostsRecommendVO {
  /** 帖子和评论中涉及到的publisherId对应的用户信息 */
  memberInfoList?: MemberSimpleVO[];

  /** 帖子详情 */
  vos?: PostsDetailVO[];
}

export interface MiniPostsDetailVO {
  detail?: PostsDetailVO;

  /** 帖子和评论中涉及到的publisherID对应的用户信息 */
  memberInfoList?: MemberSimpleVO[];
}

export interface MiniGroupVO {
  /** 背景图 */
  backgroundImg?: string;

  /**
   * 分类ID
   * @format int64
   */
  classifyId?: number;

  /** 分类名称 */
  classifyName?: string;

  /**
   * 分类排序
   * @format int32
   */
  classifySort?: number;

  /**
   * 评论数
   * @format int32
   */
  commentCnt?: number;

  /**
   * 评论人数
   * @format int32
   */
  commentUserCnt?: number;

  /**
   * 创建时间
   * @format date-time
   */
  createdTime?: string;

  /**
   * 圈子创建者ID
   * @format int64
   */
  creatorId: number;

  /** 创建者手机 */
  creatorMobile: string;

  /** 创建者昵称 */
  creatorNickname: string;

  /**
   * 圈子状态|1:待审核，2:审核失败，3:正常，4:封禁
   * @format int32
   */
  enumStatus?: number;

  /** 是否加入圈子 */
  focusStatus?: boolean;

  /** 是否关注圈子 */
  followStatus?: boolean;

  /** 圈子活动列表 */
  groupActivityList?: GroupActivityVO[];
  groupMember?: GroupMemberVO;

  /**
   * 主键
   * @format int64
   */
  id: number;

  /** logo */
  imgLogo?: string;

  /**
   * 等级门槛
   * @format int32
   */
  leastLevel?: number;

  /**
   * 成员数
   * @format int32
   */
  memberCnt?: number;

  /** 名称 */
  name: string;

  /**
   * 新成员数
   * @format int32
   */
  newMemberCnt?: number;

  /** 是否正常 */
  normal?: boolean;

  /**
   * 发帖数
   * @format int32
   */
  postsCnt?: number;

  /**
   * 发帖人数
   * @format int32
   */
  postsUserCnt?: number;

  /** 是否首页推荐 */
  recommend?: boolean;

  /**
   * 广场排序 大的排在前面
   * @format int32
   */
  recommendSort?: number;

  /** 副标题 */
  subTitle: string;

  /** 标签 */
  tags?: string;

  /** 是否圈子列表中置顶 */
  top?: boolean;
}

export interface MiniGroupMuteWordDeleteDTO {
  /**
   * 圈子ID
   * @format int64
   */
  groupId: number;

  /**
   * 敏感词ID
   * @format int64
   */
  id: number;
}

export interface MiniGroupMineVO {
  /** 拒绝理由 */
  approveMemo?: string;

  /**
   * 评论数
   * @format int32
   */
  commentCnt?: number;

  /**
   * 创建时间
   * @format date-time
   */
  createdTime?: string;

  /**
   * 圈子创建者ID
   * @format int64
   */
  creatorId: number;

  /** 创建者昵称 */
  creatorNickname: string;

  /**
   * 状态|1:待审核，2:审核失败，3:正常，4:封禁
   * @format int32
   */
  enumStatus?: number;
  groupMember?: GroupMemberVO;

  /**
   * 主键
   * @format int64
   */
  id: number;

  /** logo */
  imgLogo?: string;

  /**
   * 等级门槛
   * @format int32
   */
  leastLevel?: number;

  /**
   * 成员数
   * @format int32
   */
  memberCnt?: number;

  /** 名称 */
  name: string;

  /**
   * 发帖数
   * @format int32
   */
  postsCnt?: number;

  /** 是否首页推荐 */
  recommend?: boolean;

  /** 副标题 */
  subTitle: string;

  /**
   * 今日发贴数
   * @format int32
   */
  todayCnt?: number;

  /** 是否圈子列表中置顶 */
  top?: boolean;
}

export interface MiniGroupMemberDTO {
  /**
   * 圈子ID
   * @format int64
   */
  groupId: number;

  /**
   * 要加入圈子的会员ID，不传入表示当前登录用户加入圈子
   * @format int64
   */
  memberId?: number;
}

export interface MiniGroupListDetailVO {
  /** 圈子成员列表 */
  groupMembers?: GroupMemberVO[];
  groupPage?: PageInfoGroupDetailVO;

  /** 数据中所涉及到的用户信息 */
  memberInfoList?: MemberSimpleVO[];
}

export interface MemberSimpleVO {
  /** 头像url */
  avatarUrl?: string;

  /**
   * id
   * @format int64
   */
  id?: number;

  /**
   * 会员等级
   * @format int32
   */
  level?: number;

  /** 昵称 */
  nickName?: string;
}

export interface LotterySimpleListDto {
  /**
   * 开始时间
   * @format date-time
   */
  beginTime?: string;

  /** 封面图 */
  coverImg?: string;

  /** 活动描述 */
  description?: string;

  /**
   * 结束时间
   * @format date-time
   */
  endTime?: string;

  /**
   * id
   * @format int64
   */
  id?: number;

  /** 活动名称 */
  name?: string;

  /**
   * 活动状态 1：未开始 2：进行中 4：已结束
   * @format int32
   */
  status?: number;
}

export interface LotteryRecordSimpleListDto {
  /**
   * 用户消耗积分
   * @format int32
   */
  consumeScore?: number;

  /**
   * 抽奖时间
   * @format date-time
   */
  gmtCreated?: string;

  /** 抽奖活动名称 */
  lotteryName?: string;

  /** 文案标题 */
  title?: string;
}

export interface LotteryOrderSimpleListDto {
  /** 快递单号 */
  expressNo?: string;

  /**
   * 中奖时间
   * @format date-time
   */
  gmtCreated?: string;

  /** 是否有设置过地址 true：有 false：否 */
  hasSetAddress?: boolean;

  /**
   * id
   * @format int64
   */
  id?: number;

  /** 抽奖活动名称 */
  lotteryName?: string;

  /** 订单号 */
  orderNo?: string;

  /**
   * 发货状态 1：待确认 2：待发货 4：已发货 8：完成
   * @format int32
   */
  orderStatus?: number;

  /** 发货状态：1：待确认 2：待发货 4：已发货 8：完成 */
  orderStatusName?: string;

  /** 抽奖的奖品名称 */
  rewardName?: string;

  /**
   * 奖品类型：优惠券：1 积分：2 实物：4 谢谢惠顾：8
   * @format int32
   */
  rewardType?: number;
}

export interface LotteryHelpfulShareDetailDto {
  /**
   * 当日助力次数
   * @format int32
   */
  currentHelpfulTimes?: number;

  /** 好友助力页按钮图片 */
  friendButtonImg?: string;

  /** 好友助力页图文 */
  friendContent?: string;

  /**
   * 每人每日成功助力他人多少次可获得奖励 -1：无奖励，最大 999
   * @format int32
   */
  helpfulRewardTimes?: number;

  /** 成功助力页按钮图片 */
  successButtonImg?: string;

  /** 成功助力页图文 */
  successContent?: string;
}

export interface LotteryHelpfulRewardDto {
  /** 是否有助力奖励 */
  hasReward?: boolean;
}

export interface LotteryHelpfulDto {
  /**
   * 每人每日累计被助力次数 最小：1，最大 999
   * @format int32
   */
  accumulateHelpfulTimes?: number;

  /**
   * 当日助力次数
   * @format int32
   */
  currentHelpfulTimes?: number;

  /**
   * 获得每日额外抽奖次数 最小：1，最大 999
   * @format int32
   */
  lotteryTimes?: number;

  /** 好友助力分享参数 */
  shareParams?: string;
}

export interface LotteryGridRewardPrizeDto {
  /** 奖品说明 */
  description?: string;

  /** 奖品名称 */
  name?: string;

  /**
   * 奖品项索引，从0开始，最大为7
   * @format int32
   */
  rewardItem?: number;

  /**
   * 奖品类型 1：优惠券 2：积分 4：实物商品 8：谢谢惠顾
   * @format int32
   */
  rewardType?: number;
}

export interface LotteryGridRewardItemDto {
  /** 上传抽奖按钮图 */
  buttonImg?: string;

  /** 奖品名称 */
  name?: string;

  /**
   * 奖品项索引，从0开始，最大为7
   * @format int32
   */
  rewardItem?: number;
}

export interface LotteryGridDto {
  /**
   * 开始时间
   * @format date-time
   */
  beginTime?: string;

  /** 抽奖背景图 */
  bgImg?: string;

  /** 抽奖中间按钮图 */
  buttonImg?: string;

  /**
   * 抽奖消耗积分 -1：不限，最大 999
   * @format int32
   */
  consumeScore?: number;

  /** 是否启用抽奖倒计时 */
  enableActivityCountdown?: boolean;

  /** 是否开启助力开关 true：开启 false：关闭 */
  enableHelpful?: boolean;

  /** 是否启用中奖走马灯 */
  enableInformationMarqueeTip?: boolean;

  /** 是否启用已参与抽奖人次 */
  enableJoinedPeopleNum?: boolean;

  /** 是否启用抽奖次数剩余 */
  enableRemainderLotteryTimes?: boolean;

  /** 是否启用积分剩余数量 */
  enableScoreRemainQuantity?: boolean;

  /**
   * 结束时间
   * @format date-time
   */
  endTime?: string;
  helpful?: LotteryHelpfulDto;

  /**
   * id
   * @format int64
   */
  id?: number;

  /**
   * 参与抽奖人数，参与抽奖人数开关开启有值，否则为空
   * @format int32
   */
  joinedPeopleNum?: number;

  /** no */
  lotteryNo?: string;

  /**
   * 抽奖次数剩余，开启抽奖次数剩余开关有值（当参与次数不限返回：-1，否则返回剩余次数数值），否则为空
   * @format int32
   */
  remainderLotteryTimes?: number;

  /** 中奖信息滚动列表 */
  rewardScrollList?: string[];

  /** 抽奖奖品 */
  rewards?: LotteryGridRewardItemDto[];

  /** 规则图文 */
  ruleContent?: string;

  /**
   * 积分剩余数量，积分剩余数量开关开启有值，否则为空
   * @format int32
   */
  scoreRemainQuantity?: number;
}

export interface LivePageDto {
  /**
   * id
   * @format int64
   */
  id?: number;

  /** 直播ids */
  liveIds?: string[];

  /** 直播类型 */
  liveType?: "HUOSHAN" | "SHIPINHAO";

  /** 页面名称 */
  name?: string;

  /** 页面类型 */
  pageType?: "Details" | "List";
}

export interface LiveDto {
  coverImage?: string;
  liveId?: string;
  liveStatus?: "Creating" | "LiveIng" | "Playback" | "Preview" | "Stop";

  /** @format date-time */
  liveTime?: string;
  name?: string;
  viewUrl?: string;
}

export interface GroupVO {
  /** 背景图 */
  backgroundImg?: string;

  /**
   * 分类ID
   * @format int64
   */
  classifyId?: number;

  /** 分类名称 */
  classifyName?: string;

  /**
   * 分类排序
   * @format int32
   */
  classifySort?: number;

  /**
   * 评论数
   * @format int32
   */
  commentCnt?: number;

  /**
   * 评论人数
   * @format int32
   */
  commentUserCnt?: number;

  /**
   * 创建时间
   * @format date-time
   */
  createdTime?: string;

  /**
   * 圈子创建者ID
   * @format int64
   */
  creatorId: number;

  /** 创建者手机 */
  creatorMobile: string;

  /** 创建者昵称 */
  creatorNickname: string;

  /**
   * 圈子状态|1:待审核，2:审核失败，3:正常，4:封禁
   * @format int32
   */
  enumStatus?: number;

  /** 是否加入圈子 */
  focusStatus?: boolean;

  /** 是否关注圈子 */
  followStatus?: boolean;

  /**
   * 主键
   * @format int64
   */
  id: number;

  /** logo */
  imgLogo?: string;

  /**
   * 等级门槛
   * @format int32
   */
  leastLevel?: number;

  /**
   * 成员数
   * @format int32
   */
  memberCnt?: number;

  /** 名称 */
  name: string;

  /**
   * 新成员数
   * @format int32
   */
  newMemberCnt?: number;

  /** 是否正常 */
  normal?: boolean;

  /**
   * 发帖数
   * @format int32
   */
  postsCnt?: number;

  /**
   * 发帖人数
   * @format int32
   */
  postsUserCnt?: number;

  /** 是否首页推荐 */
  recommend?: boolean;

  /**
   * 广场排序 大的排在前面
   * @format int32
   */
  recommendSort?: number;

  /** 副标题 */
  subTitle: string;

  /** 标签 */
  tags?: string;

  /** 是否圈子列表中置顶 */
  top?: boolean;
}

export interface GroupUpdateDTO {
  /** 背景图 */
  backgroundImg?: string;

  /**
   * 圈子id
   * @format int64
   */
  id?: number;

  /** logo */
  imgLogo?: string;

  /**
   * 入圈等级门槛
   * @format int32
   */
  leastLevel?: number;

  /** name */
  name?: string;

  /** 圈子描述 */
  subTitle: string;
}

export interface GroupSimpleVO {
  /** 是否加入成员状态 */
  focusStatus?: boolean;

  /** 是否关注圈子 */
  followStatus?: boolean;

  /**
   * id
   * @format int64
   */
  id?: number;

  /** logo */
  imgLogo?: string;

  /**
   * 成员数
   * @format int32
   */
  memberCnt: number;

  /** 名称 */
  name: string;

  /** 副标题 */
  subTitle?: string;
}

export interface GroupMuteWordVO {
  /** 词 */
  content: string;

  /** 替换词，若不设置，用星号代替 */
  contentReplace: string;

  /**
   * 主键
   * @format int64
   */
  id: number;
}

export interface GroupMuteWordDTO {
  /** 词 */
  content: string;

  /** 替换词，若不设置，用星号代替 */
  contentReplace: string;

  /**
   * 圈子ID
   * @format int64
   */
  groupId: number;
}

export interface GroupMineVO {
  /** 拒绝理由 */
  approveMemo?: string;

  /**
   * 评论数
   * @format int32
   */
  commentCnt?: number;

  /**
   * 创建时间
   * @format date-time
   */
  createdTime?: string;

  /**
   * 圈子创建者ID
   * @format int64
   */
  creatorId: number;

  /** 创建者昵称 */
  creatorNickname: string;

  /**
   * 状态|1:待审核，2:审核失败，3:正常，4:封禁
   * @format int32
   */
  enumStatus?: number;

  /**
   * 主键
   * @format int64
   */
  id: number;

  /** logo */
  imgLogo?: string;

  /**
   * 等级门槛
   * @format int32
   */
  leastLevel?: number;

  /**
   * 成员数
   * @format int32
   */
  memberCnt?: number;

  /** 名称 */
  name: string;

  /**
   * 发帖数
   * @format int32
   */
  postsCnt?: number;

  /** 是否首页推荐 */
  recommend?: boolean;

  /** 副标题 */
  subTitle: string;

  /** 是否圈子列表中置顶 */
  top?: boolean;
}

export interface GroupMemberVO {
  /** 是否管理员 */
  admin: boolean;

  /** 审核状态 false：未审核 true：已审核 */
  auditStatus?: boolean;

  /** 头像URL */
  avatarUrl: string;

  /**
   * 圈子ID
   * @format int64
   */
  groupId: number;

  /**
   * 成长值
   * @format int32
   */
  growth: number;

  /**
   * 主键
   * @format int64
   */
  id: number;

  /**
   * 加入时间
   * @format date-time
   */
  joinTime: string;

  /**
   * 等级
   * @format int32
   */
  level: number;

  /**
   * 圈子成员会员ID
   * @format int64
   */
  memberId: number;

  /** 是否禁言 */
  muted: boolean;

  /** 圈子成员昵称 */
  nickname: string;

  /** 是否所有者 */
  owner: boolean;

  /**
   * 发帖数
   * @format int32
   */
  postsCnt: number;

  /**
   * 禁言解除时间
   * @format date-time
   */
  unmuteTime: string;
}

export interface GroupMemberMuteDTO {
  /**
   * 圈子成员ID
   * @format int64
   */
  id?: number;

  /**
   * 禁言时间
   * @format int32
   */
  minute?: number;
}

export interface GroupMemberDetailVO {
  /** 是否管理员 */
  admin: boolean;

  /** 审核状态 */
  auditStatus?: boolean;

  /**
   * 圈子ID
   * @format int64
   */
  groupId: number;

  /** 头像 */
  headImg?: string;

  /**
   * 主键
   * @format int64
   */
  id: number;

  /**
   * 加入时间
   * @format date-time
   */
  joinTime: string;

  /**
   * 圈子成员会员ID
   * @format int64
   */
  memberId: number;

  /** 是否禁言 */
  muted: boolean;

  /** 昵称 */
  nickName?: string;

  /** 是否所有者 */
  owner: boolean;

  /**
   * 发帖数
   * @format int32
   */
  postsCnt: number;

  /**
   * 禁言解除时间
   * @format date-time
   */
  unmuteTime: string;
}

export interface GroupMemberAdminDTO {
  /** 是否管理员 */
  admin?: boolean;

  /**
   * 圈子成员ID
   * @format int64
   */
  id?: number;
}

export interface GroupDetailVO {
  /** 拒绝理由 */
  approveMemo?: string;

  /** 背景图 */
  backgroundImg?: string;

  /**
   * 分类ID
   * @format int64
   */
  classifyId?: number;

  /** 分类名称 */
  classifyName?: string;

  /**
   * 分类排序
   * @format int32
   */
  classifySort?: number;

  /**
   * 评论数
   * @format int32
   */
  commentCnt?: number;

  /**
   * 评论人数
   * @format int32
   */
  commentUserCnt?: number;

  /**
   * 创建时间
   * @format date-time
   */
  createdTime?: string;

  /**
   * 圈子创建者ID
   * @format int64
   */
  creatorId: number;

  /** 创建者手机 */
  creatorMobile: string;

  /** 创建者昵称 */
  creatorNickname: string;

  /**
   * 圈子状态|1:待审核，2:审核失败，3:正常，4:封禁
   * @format int32
   */
  enumStatus?: number;

  /** 是否加入圈子 */
  focusStatus?: boolean;

  /** 是否关注圈子 */
  followStatus?: boolean;

  /**
   * 主键
   * @format int64
   */
  id: number;

  /** logo */
  imgLogo?: string;

  /**
   * 等级门槛
   * @format int32
   */
  leastLevel?: number;

  /**
   * 成员数
   * @format int32
   */
  memberCnt?: number;

  /** 名称 */
  name: string;

  /**
   * 新成员数
   * @format int32
   */
  newMemberCnt?: number;

  /** 是否正常 */
  normal?: boolean;

  /**
   * 发帖数
   * @format int32
   */
  postsCnt?: number;

  /**
   * 发帖人数
   * @format int32
   */
  postsUserCnt?: number;

  /** 圈中最近帖子 */
  recentPostsList?: PostsDetailVO[];

  /** 是否首页推荐 */
  recommend?: boolean;

  /**
   * 广场排序 大的排在前面
   * @format int32
   */
  recommendSort?: number;

  /** 副标题 */
  subTitle: string;

  /** 标签 */
  tags?: string;

  /** 是否圈子列表中置顶 */
  top?: boolean;
}

export interface GroupDTO {
  /** logo */
  imgLogo?: string;

  /**
   * 入圈等级门槛
   * @format int32
   */
  leastLevel?: number;

  /** 留言对象 */
  leaveMsg?: string;

  /** 名称 */
  name: string;

  /** 圈子描述 */
  subTitle: string;
}

export interface GroupClassifyVO {
  /**
   * 创建时间
   * @format date-time
   */
  gmtCreated?: string;

  /**
   * 更新时间
   * @format date-time
   */
  gmtModified?: string;

  /**
   * Id
   * @format int32
   */
  id?: number;

  /** 分类名称 */
  name?: string;

  /**
   * 排序值
   * @format int32
   */
  sort?: number;

  /**
   * 状态
   * @format int32
   */
  status?: number;

  /**
   * 圈子负责人
   * @format int64
   */
  sysUserId?: number;

  /** 圈子负责人名称 */
  sysUserName?: string;
}

export interface GroupActivityVO {
  /**
   * 活动id
   * @format int64
   */
  activityId?: number;

  /** 活动名称 */
  activityName?: string;

  /** @format date-time */
  gmtCreated?: string;

  /** 圈子活动图片 */
  groupImg?: string;

  /**
   * 活动类型：1试用2任务3直播
   * @format int32
   */
  type?: number;
}

export interface FollowUserVO {
  /** 头像 */
  headImgUrl?: string;

  /**
   * 主键
   * @format int64
   */
  id?: number;

  /** 昵称 */
  nickname?: string;

  /** false：关注 true：未关注 */
  notFollow?: boolean;
}

export interface FollowGroupVO {
  /** 是否关注 */
  followStatus?: boolean;

  /**
   * 主键
   * @format int64
   */
  id?: number;

  /** logo */
  imgLogo?: string;

  /** 名称 */
  name?: string;
}

export type CharSequence = object;

export interface BindingMobileDto {
  /** 验证码 */
  code?: string;

  /** 手机号 */
  mobile?: string;
}

export interface LiveUpdateVolcengineVo {
  /** 直播id */
  ActivityID?: string;
  Announcement?: string;

  /** 直播封面 */
  CoverImage?: string;

  /** 回调类型 */
  EventType?: string;

  /** 开播时间 */
  LiveTime?: string;

  /** 直播名称 */
  Name?: string;
  Sign?: string;

  /** 直播状态 */
  Status?: string;
  Timestamp?: string;
  ViewUrl?: string;
}

export interface LiveUpdate {
  /** 封面图 */
  coverImage?: string;

  /** 直播状态 */
  liveStatus?: "Creating" | "LiveIng" | "Playback" | "Preview" | "Stop";
  liveTime?: Data;

  /** 直播名称 */
  name?: string;
}

export interface Live {
  coverImage?: string;
  createUser?: string;

  /** @format date-time */
  gmtCreated?: string;

  /** @format date-time */
  gmtModified?: string;

  /** @format int64 */
  id?: number;
  liveId?: string;
  liveStatus?: "Creating" | "LiveIng" | "Preview" | "Playback" | "Stop";

  /** @format date-time */
  liveTime?: string;
  md5?: string;
  modified?: boolean;
  modifyUser?: string;
  name?: string;

  /** @format int32 */
  status?: number;
  transient?: boolean;
  viewUrl?: string;
}

export type Data = object;

export interface LiveStatistics {
  /** @format int32 */
  actualSales?: number;
  createUser?: string;

  /** @format date-time */
  gmtCreated?: string;

  /** @format date-time */
  gmtModified?: string;
  goodsName?: string;
  goodsNo?: string;
  goodsSkuName?: string;
  goodsSkuNo?: string;

  /** @format int64 */
  id?: number;
  liveId?: string;
  liveName?: string;
  md5?: string;
  modified?: boolean;
  modifyUser?: string;

  /** @format int32 */
  pageView?: number;
  salesVolume?: number;

  /** @format int32 */
  status?: number;
  transient?: boolean;
}

export interface LivePageUpdate {
  /** 直播ids */
  liveIds?: string[];

  /** 页面名称 */
  name?: string;

  /** 页面类型 */
  type?: "List" | "Details";
}

export interface LivePageInsert {
  /** 直播ids */
  liveIds?: string[];

  /** 页面名称 */
  name?: string;

  /** 页面类型 */
  type?: "List" | "Details";
}

export interface LivePage {
  createUser?: string;

  /** @format date-time */
  gmtCreated?: string;

  /** @format date-time */
  gmtModified?: string;

  /** @format int64 */
  id?: number;
  liveIds?: string[];
  md5?: string;
  modified?: boolean;
  modifyUser?: string;
  name?: string;

  /** @format int32 */
  status?: number;
  transient?: boolean;
  type?: "List" | "Details";
}

export interface OrderCommentInputDto {
  /** 商品评价 */
  goodsCommentList?: GoodsCommentInputDto[];

  /**
   * 物流评分 1~5
   * @format int32
   */
  logisticsGrade?: number;

  /** 订单编号 */
  orderNo?: string;

  /**
   * 服务评分 1~5
   * @format int32
   */
  serviceGrade?: number;
}

export interface GoodsCommentInputDto {
  /** 是否匿名 0 否 1 是 */
  anonym?: boolean;

  /** 评价内容 */
  content?: string;

  /**
   * 商品评分 1~5
   * @format int32
   */
  goodsGrade?: number;

  /** 评价图片，逗号分隔 */
  imgs?: string;

  /**
   * 订单项id
   * @format int64
   */
  orderItemId?: number;
}

export interface SigninSimpleOutputDto {
  /**
   * 奖励数量
   * @format int32
   */
  num?: number;
}

export interface StatusDto {
  /**
   * id 不能为空
   * @format int64
   */
  id?: number;

  /** 开关状态 */
  status?: boolean;
}

export interface SkuStockAndPriceUpdateDto {
  /** 商品编号 */
  goodsNo?: string;

  /** 现价 */
  salesPrice?: number;

  /** sku编号 */
  skuNo?: string;

  /**
   * 库存数量
   * @format int32
   */
  stock?: number;
}

export interface ResetPwdDto {
  /** 新密码 */
  newPassword?: string;

  /** 原密码 */
  password?: string;
}

export interface MaterialGroupUpdateDto {
  /**
   * id
   * @format int64
   */
  id?: number;

  /** 分组名称 */
  name?: string;

  /**
   * 上级id
   * @format int64
   */
  pid?: number;

  /**
   * 分组类型 0图片 1视频
   * @format int32
   */
  type?: number;
}

export interface MaterialGroupSaveDto {
  /** 分组名称 */
  name?: string;

  /**
   * 上级id
   * @format int64
   */
  pid?: number;

  /**
   * 分组类型 0图片 1视频
   * @format int32
   */
  type?: number;
}

export interface GoodsClassifyUpdateDto {
  /** 前端是否展示 */
  frontShow?: boolean;

  /**
   * 商品类型 0 普通商品 1 积分商品
   * @format int32
   */
  goodsType?: number;

  /**
   * 分类id
   * @format int64
   */
  id?: number;

  /** 分类名称 */
  name?: string;

  /** 图片 */
  pic?: string;

  /**
   * 父级ID
   * @format int64
   */
  pid?: number;
}

export interface ExpressTemplateUpdateDto {
  /** 子区域信息 */
  expressTemplateAreas?: ExpressTemplateAreaModifyInputDto[];

  /**
   * id
   * @format int64
   */
  id?: number;

  /** 模板名称 */
  name?: string;

  /**
   * 模板类型 1买家承担 2卖家包邮
   * @format int32
   */
  shippingType?: number;

  /**
   * 运费计价方式 1总量 2 件数 3体积
   * @format int32
   */
  valuationType?: number;
}

export interface GoodsClassifySaveDto {
  /** 前端是否展示 */
  frontShow?: boolean;

  /**
   * 商品类型 0 普通商品 1 积分商品
   * @format int32
   */
  goodsType?: number;

  /** 分类名称 */
  name?: string;

  /** 图片 */
  pic?: string;

  /**
   * 父级ID
   * @format int64
   */
  pid?: number;
}

export interface ExpressTemplateSaveDto {
  /** 子区域信息 */
  expressTemplateAreas?: ExpressTemplateAreaCreateInputDto[];

  /** 模板名称 */
  name?: string;

  /**
   * 模板类型 1买家承担 2卖家包邮
   * @format int32
   */
  shippingType?: number;

  /**
   * 运费计价方式 1总量 2 件数 3体积
   * @format int32
   */
  valuationType?: number;
}

export interface OperateLogsDto {
  /** 业务id */
  bizNo?: string;

  /** 成功操作内容 */
  content?: string;

  /** 创建人 */
  createUser?: string;

  /** 详细描述 */
  details?: string;

  /** 错误消息 */
  errorMsg?: string;

  /**
   * 操作花费的时间 单位：ms
   * @format int64
   */
  executeTime?: number;

  /**
   * 创建时间
   * @format date-time
   */
  gmtCreated?: string;

  /**
   * 修改时间
   * @format date-time
   */
  gmtModified?: string;

  /**
   * 日志ID
   * @format int64
   */
  id?: number;

  /** 电话 */
  mobile?: string;

  /** 修改人 */
  modifyUser?: string;

  /** 模块 */
  module?: string;

  /** 操作描述 */
  operateDesc?: string;

  /**
   * 操作时间 时间戳单位：ms
   * @format int64
   */
  operateTime?: number;

  /** 操作类型 */
  operateType?: string;

  /** 操作者 */
  operator?: string;

  /** 操作者名称 */
  operatorName?: string;

  /** 平台 */
  platform?: string;

  /** 执行后返回的json字符串 */
  result?: string;

  /** 是否调用成功 */
  success?: boolean;

  /** 租户 */
  tenant?: string;
}

export interface PageInfo {
  list?: object[];

  /** @format int32 */
  pageNum?: number;

  /** @format int32 */
  pages?: number;

  /** @format int64 */
  total?: number;
}

export interface OrderCouponGoodsDto {
  /** 券编号 */
  couponNo?: string;

  /**
   * 优惠劵类型 0 抵扣 1 折扣 2 赠品 3 兑换 4 包邮
   * @format int32
   */
  couponType?: number;

  /** @format int64 */
  goodsId?: number;

  /** 商品图片 */
  goodsImg?: string;

  /** 商品名称 */
  goodsName?: string;
  goodsNo?: string;

  /** @format int32 */
  goodsType?: number;

  /** 商品市场价 */
  marketPrice?: number;
  salePrice?: number;

  /**
   * 购买数量为0表示已赠完
   * @format int32
   */
  saleQuantity?: number;

  /** @format int64 */
  skuId?: number;

  /** sku图片 */
  skuImg?: string;
  skuName?: string;
  skuNo?: string;
}

export interface UserAgreementAgreeDto {
  /** 用户协议类型 1：用户协议 2：会员协议 3:隐私协议 */
  agreementTypeList?: number[];
}

export interface MarketingActivityOfFreeShippingDto {
  /** 活动名称 */
  activityName?: string;

  /** 活动编号 */
  activityNo?: string;

  /**
   * 活动类型 1:预售 2:限时抢购 3:满减 4:满折 5:满赠 6:包邮
   * @format int32
   */
  activityType?: number;

  /**
   * 活动完成后操作 0：设为普通商品 1：下架
   * @format int32
   */
  completed?: number;

  /** 活动规则 */
  content?: string;

  /** 封面图 */
  coverImg?: string;

  /** 活动描述 */
  description?: string;

  /**
   * 活动结束时间
   * @format date-time
   */
  endTime?: string;

  /**
   * id
   * @format int64
   */
  id?: number;

  /** 商品信息 */
  marketingActivityGoodsParams?: MarketingActivityGoodsParam[];
  promotionParam?: MarketingActivityPromotionParam;

  /**
   * 活动开始时间
   * @format date-time
   */
  startTime?: string;
}

export interface UserAgreeRecordDto {
  /**
   * 同意时间
   * @format date-time
   */
  agreeTime?: string;

  /** 协议编号 */
  agreementNo?: string;

  /**
   * id
   * @format int64
   */
  id?: number;

  /**
   * 用户协议类型 1：用户协议 2：会员协议 3：隐私协议
   * @format int32
   */
  type?: number;

  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;

  /**
   * 用户id
   * @format int64
   */
  userId?: number;
}

export interface UserAgreementRecordDto {
  /** 协议编号 */
  agreementNo?: string;

  /** 创建人 */
  createUser?: string;

  /**
   * 创建时间
   * @format date-time
   */
  gmtCreated?: string;

  /**
   * 修改时间
   * @format date-time
   */
  gmtModified?: string;

  /**
   * id
   * @format int64
   */
  id?: number;

  /** 手机号 */
  mobile?: string;

  /** 修改人 */
  modifyUser?: string;

  /** 说明文本 */
  richTextContent?: string;

  /**
   * 用户协议类型 1：用户协议 2：会员协议
   * @format int32
   */
  type?: number;
}

export interface MarketingActivityOfPreSaleDto {
  /** 活动名称 */
  activityName?: string;

  /** 活动编号 */
  activityNo?: string;

  /**
   * 活动类型 1:预售 2:限时抢购 3:满减 4:满折 5:满赠 6:包邮
   * @format int32
   */
  activityType?: number;

  /**
   * 活动完成后操作 0：设为普通商品 1：下架
   * @format int32
   */
  completed?: number;

  /** 活动规则 */
  content?: string;

  /** 活动描述 */
  description?: string;

  /**
   * 活动结束时间
   * @format date-time
   */
  endTime?: string;

  /**
   * id
   * @format int64
   */
  id?: number;

  /** 商品信息 */
  marketingActivityGoodsParams?: MarketingActivityGoodsParam[];

  /** 开始发货时间 */
  shippingTime?: string;

  /**
   * 活动开始时间
   * @format date-time
   */
  startTime?: string;
}

export interface CouponCodeOutputDto {
  /**
   * 已绑定数量
   * @format int32
   */
  bindQuantity?: number;

  /** 构建失败信息 */
  buildMessage?: string;

  /**
   * 构建状态 1：构建中 2：成功 4：失败
   * @format int32
   */
  buildStatus?: number;

  /**
   * 优惠劵类型 0 抵扣 1 折扣
   * @format int32
   */
  couponType?: number;

  /** 使用条件需求价格 */
  demandPrice?: number;

  /** 折扣 */
  discount?: number;

  /**
   * 有效天数
   * @format int32
   */
  expDayCount?: number;

  /**
   * 生效时间条件 0 无限制 1 指定时间 2 动态时间
   * @format int32
   */
  expireDateType?: number;

  /**
   * id
   * @format int64
   */
  id?: number;

  /** 优惠劵名称 */
  name?: string;

  /** 价值金额 */
  price?: number;

  /**
   * 生成数量
   * @format int32
   */
  quantity?: number;

  /**
   * 领取后几天生效
   * @format int32
   */
  startDayCount?: number;

  /** 优惠券编号 */
  templateNo?: string;

  /**
   * 有效期结束
   * @format date-time
   */
  termEnd?: string;

  /**
   * 有效期开始
   * @format date-time
   */
  termStart?: string;
}

export interface CouponCodeDetailOutputDto {
  /** 绑定状态： 未兑换 已兑换 过期未兑换 */
  bindStatusName?: string;

  /** 优惠码 */
  code?: string;

  /**
   * 优惠劵类型 0 抵扣 1 折扣
   * @format int32
   */
  couponType?: number;

  /**
   * id
   * @format int64
   */
  id?: number;

  /** 优惠劵名称 */
  name?: string;

  /** 核销用户昵称 */
  nickName?: string;

  /** 优惠券编号 */
  templateNo?: string;

  /** 核销用户电话 */
  userMobile?: string;
}

export interface CouponCodeCreateInputDto {
  /**
   * 数量
   * @format int32
   */
  num?: number;

  /** 礼券号 */
  templateNo?: string;
}

export interface CouponCodeBindInputDto {
  /** 优惠码 */
  code?: string;
}

export interface MemCardPurchaseDto {
  /**
   * 会员卡ID
   * @format int64
   */
  id?: number;

  /**
   * 支付类型 1:微信支付; 2:支付宝支付; 3:线下支付; 4:余额支付
   * @format int32
   */
  payType?: number;

  /** 交易方式：app时为 APP，h5时为 MWEB */
  tradeType?: string;
}

export interface SigninDetailOutputDto {
  /**
   * 连续签到天数
   * @format int32
   */
  continuousDays?: number;

  /** 说明 */
  description?: string;

  /**
   * 奖励数量
   * @format int32
   */
  num?: number;

  /**
   * 奖励方式 1: 积分
   * @format int32
   */
  rewardType?: number;

  /** 签到状态，true：已签 */
  status?: boolean;

  /**
   * 累计签到天数
   * @format int64
   */
  totalDays?: number;

  /**
   * 累计签到积分
   * @format int64
   */
  totalScore?: number;
}

export interface SigninInfoOutputDto {
  /**
   * 签到周期
   * @format int32
   */
  cycle?: number;

  /** 是否启用 */
  enabled?: boolean;

  /** 图标 */
  iconUrl?: string;

  /**
   * 奖励数量
   * @format int32
   */
  num?: number;

  /**
   * 奖励方式 1: 积分
   * @format int32
   */
  rewardType?: number;

  /** 签到状态，true：已签 */
  status?: boolean;
}

export interface SigninTaskInputDto {
  /**
   * 签到周期
   * @format int32
   */
  cycle?: number;

  /** 说明 */
  description?: string;

  /** 是否启用 */
  enabled?: boolean;

  /** 图标 */
  iconUrl?: string;

  /**
   * 奖励数量
   * @format int32
   */
  num?: number;

  /**
   * 奖励方式 1: 积分
   * @format int32
   */
  rewardType?: number;

  /**
   * 签到方式 1:自动; 2:手动
   * @format int32
   */
  type?: number;
}

export interface SigninOutputDto {
  /**
   * 连续签到天数
   * @format int32
   */
  continuousDays?: number;

  /** 说明 */
  description?: string;

  /**
   * 奖励数量
   * @format int32
   */
  num?: number;

  /**
   * 奖励方式 1: 积分
   * @format int32
   */
  rewardType?: number;

  /** 签到状态，true：已签 */
  status?: boolean;

  /**
   * 累计签到天数
   * @format int64
   */
  totalDays?: number;

  /**
   * 累计签到积分
   * @format int64
   */
  totalScore?: number;
}

export interface SigninTaskOutputDto {
  /**
   * 签到周期
   * @format int32
   */
  cycle?: number;

  /** 说明 */
  description?: string;

  /** 是否启用 */
  enabled?: boolean;

  /** 图标 */
  iconUrl?: string;

  /**
   * 奖励数量
   * @format int32
   */
  num?: number;

  /**
   * 奖励方式 1: 积分
   * @format int32
   */
  rewardType?: number;

  /**
   * 签到方式 1:自动; 2:手动
   * @format int32
   */
  type?: number;
}

export interface SigninInputDto {
  /**
   * 签到周期
   * @format int32
   */
  cycle?: number;

  /** 说明 */
  description?: string;

  /** 是否启用 */
  enabled?: boolean;

  /** 图标 */
  iconUrl?: string;

  /**
   * 奖励数量
   * @format int32
   */
  num?: number;

  /**
   * 奖励方式 1: 积分
   * @format int32
   */
  rewardType?: number;

  /**
   * 签到方式 1：手动签到 2：自动签到
   * @format int32
   */
  type?: number;
}

export interface GoodsTagDto {
  /**
   * id
   * @format int64
   */
  id?: number;

  /** 名称 */
  name?: string;

  /** key 特殊标签用 */
  tagKey?: string;
}

export interface MemCardRelationDto {
  /** 消费金额 */
  amount?: number;

  /**
   * id
   * @format int64
   */
  id?: number;
  memCard?: MemCardDto;

  /**
   * 会员卡id
   * @format int64
   */
  memCardId?: number;

  /**
   * 会员卡等级id
   * @format int64
   */
  memCardLevelId?: number;

  /**
   * 用户id
   * @format int64
   */
  userId?: number;
}

export interface MemStatisticsDto {
  /** 消费金额 */
  amount?: number;

  /**
   * id
   * @format int64
   */
  id?: number;

  /**
   * 用户id
   * @format int64
   */
  userId?: number;
}

export interface MemCardUpdateDto {
  /**
   * 获得方式 1：自动发放 2：用户领取 3：后台发放 4：付费
   * @format int32
   */
  acquisitionType?: number;

  /** 背景图 */
  bgUrl?: string;

  /** 是否启用 0 否 1是 */
  enabled?: boolean;

  /** 图标 */
  icon?: string;

  /**
   * 会员卡ID
   * @format int64
   */
  id?: number;

  /** 等级列表 */
  levelList?: MemCardLevelDto[];

  /**
   * 等级类型 1消费金额 2积分总量
   * @format int32
   */
  levelType?: number;

  /** 会员卡名称 */
  name?: string;

  /** 购买价格 */
  price?: number;

  /** 说明文本 */
  richTextContent?: string;

  /**
   * 卡类型 1：付费卡 2：免费卡
   * @format int32
   */
  type?: number;

  /** 是否为可升级 0否 1是 */
  upgrade?: boolean;
}

export interface MemCardLevelUpdateDto {
  /** 背景图 */
  bgUrl?: string;

  /** 图标 */
  icon?: string;

  /**
   * id
   * @format int64
   */
  id?: number;

  /**
   * 等级
   * @format int32
   */
  level?: number;

  /** 等级名称 */
  levelName?: string;

  /**
   * 会员卡id
   * @format int64
   */
  memCardId?: number;

  /** 等级描述文本 */
  richTextContent?: string;

  /** 权益列表(json) */
  rights?: string;

  /** 权益列表 */
  rightsList?: MemCardRightsDto[];

  /** 结束值 */
  valueEnd?: number;

  /** 开始值 */
  valueStart?: number;
}

export interface MemCardDto {
  /**
   * 获得方式 1：自动发放 2：用户领取 3：后台发放 4：付费
   * @format int32
   */
  acquisitionType?: number;

  /** 背景图 */
  bgUrl?: string;

  /** 消费金额 */
  currentAmount?: number;

  /** 当前等级名称 */
  currentLevelName?: string;

  /** 是否启用 0 否 1是 */
  enabled?: boolean;

  /** 图标 */
  icon?: string;

  /**
   * 会员卡ID
   * @format int64
   */
  id?: number;

  /** 等级列表 */
  levelList?: MemCardLevelDto[];

  /**
   * 等级类型 1消费金额 2积分总量
   * @format int32
   */
  levelType?: number;

  /** 会员卡名称 */
  name?: string;

  /** 购买价格 */
  price?: number;

  /** 说明文本 */
  richTextContent?: string;

  /**
   * 卡类型 1：付费卡 2：免费卡
   * @format int32
   */
  type?: number;

  /** 是否为可升级 0否 1是 */
  upgrade?: boolean;
}

export interface MallConfUserTaskBatchPerformDTO {
  /** 任务key */
  taskKeyList?: ("nil" | "followMp" | "firstPurchase")[];
}

export interface MallConfUserTaskPerformDTO {
  /** 任务key */
  taskKey?: "nil" | "followMp" | "firstPurchase";
}

export interface MemCardRightsGoodsDto {
  /** 商品编号 */
  goodsNo?: string;
}

export interface MemCardSaveDto {
  /**
   * 获得方式 1：自动发放 2：用户领取 3：后台发放 4：付费
   * @format int32
   */
  acquisitionType?: number;

  /** 背景图 */
  bgUrl?: string;

  /** 是否启用 0 否 1是 */
  enabled?: boolean;

  /** 图标 */
  icon?: string;

  /** 等级列表 */
  levelList?: MemCardLevelDto[];

  /**
   * 等级类型 1消费金额 2积分总量
   * @format int32
   */
  levelType?: number;

  /** 会员卡名称 */
  name?: string;

  /** 购买价格 */
  price?: number;

  /** 说明文本 */
  richTextContent?: string;

  /**
   * 卡类型 1：付费卡 2：免费卡
   * @format int32
   */
  type?: number;

  /** 是否为可升级 0否 1是 */
  upgrade?: boolean;
}

export interface MemCardRightsSkuDto {
  /** 商品分类名称 */
  classifyName?: string;

  /** 商品编号 */
  goodsNo?: string;

  /** 市场价(划线价) */
  marketPrice?: number;

  /**
   * 会员卡id
   * @format int64
   */
  memCardId?: number;

  /**
   * 会员卡权益id
   * @format int64
   */
  memRightsId?: number;

  /** 会员价 */
  memberPrice?: number;

  /** 销售价 */
  salesPrice?: number;

  /** sku图片 */
  skuImg?: string;

  /** sku编号 */
  skuNo?: string;

  /** 规格名称组合，冒号分割， 格式p1:v1 */
  specNames?: string;
}

export interface MemCardRightsDto {
  /** 折扣 */
  discount?: number;

  /**
   * 适用范围 1全部商品 2部分商品
   * @format int32
   */
  rangeType?: number;

  /** 权益商品列表 */
  rightsGoodsList?: MemCardRightsGoodsDto[];

  /**
   * 权益类型 1商品折扣
   * @format int32
   */
  rightsType?: number;
}

export interface MemCardLevelDto {
  /** 背景图 */
  bgUrl?: string;

  /** 图标 */
  icon?: string;

  /**
   * id
   * @format int64
   */
  id?: number;

  /**
   * 等级
   * @format int32
   */
  level?: number;

  /** 等级名称 */
  levelName?: string;

  /**
   * 会员卡id
   * @format int64
   */
  memCardId?: number;

  /** 等级描述文本 */
  richTextContent?: string;

  /** 权益列表(json) */
  rights?: string;

  /** 权益列表 */
  rightsList?: MemCardRightsDto[];

  /** 结束值 */
  valueEnd?: number;

  /** 开始值 */
  valueStart?: number;
}

export interface MallConfUserTaskUpdateDTO {
  /** 是否启用 0 否 1是 */
  enabled?: boolean;

  /**
   * id
   * @format int64
   */
  id?: number;

  /** 图片链接 */
  imgUrl?: string;

  /**
   * 奖励数值
   * @format int32
   */
  rewardPoints?: number;
}

export interface MallConfUserTaskDTO {
  /** 是否启用 0否 1是 */
  enabled?: boolean;

  /** 是否完成 0否 1是 */
  finish?: boolean;

  /**
   * id
   * @format int64
   */
  id?: number;

  /** 图片链接 */
  imgUrl?: string;

  /** 任务名称 */
  name?: string;

  /**
   * 奖励数值
   * @format int32
   */
  rewardPoints?: number;

  /**
   * 奖励类型 1 积分
   * @format int32
   */
  rewardType?: number;

  /** 任务key */
  taskKey?: string;

  /**
   * 任务类型 1 固定任务
   * @format int32
   */
  type?: number;
}

export interface WxMpUser {
  /** @format int32 */
  groupId?: number;
  headImgUrl?: string;
  language?: string;
  nickname?: string;
  openId?: string;
  privileges?: string[];
  qrScene?: string;
  qrSceneStr?: string;
  remark?: string;
  subscribe?: boolean;
  subscribeScene?: string;

  /** @format int64 */
  subscribeTime?: number;
  tagIds?: number[];
  unionId?: string;
}

export interface RechargeAmount {
  present?: number;
  recharge?: number;
}

export interface BalanceRechargeInputDto {
  /**
   * 支付类型 1:微信支付; 2:支付宝支付; 3:线下支付; 4:余额支付
   * @format int32
   */
  payType?: number;

  /** 赠送金额 */
  presentBalance?: number;

  /** 充值金额 */
  rechargeBalance?: number;
}

export interface StatisticsGraphOutputDto {
  /** 总计 */
  count?: object;

  /** 数据 */
  series?: StatisticsGraphDataOutputDto[];
}

export interface StatisticsGraphDataOutputDto {
  label?: string;
  value?: object;
}

export interface StatisticsCountOutputDto {
  /**
   * 今日成交订单量
   * @format int64
   */
  orderCount?: number;

  /** 成交客单价 */
  perCustomerTransaction?: number;

  /**
   * 售后订单数
   * @format int64
   */
  refundOrderCount?: number;

  /** 今日营业额 */
  saleAmount?: number;

  /**
   * 新增用户数
   * @format int64
   */
  userCount?: number;
}

export interface ScoreChangeInputDto {
  /**
   * 用户id
   * @format int64
   */
  id?: number;

  /** 是否增加 */
  isPlus?: boolean;

  /**
   * 积分
   * @format int32
   */
  score?: number;
}

export interface MemberDetailOutputDto {
  /** 微信应用id */
  appId?: string;

  /**
   * 可用积分
   * @format int32
   */
  availableScore?: number;

  /** 账户余额 */
  balance?: number;

  /**
   * 出生年月
   * @format date-time
   */
  birthday?: string;

  /**
   * 禁用状态（0：否，1：是）
   * @format int32
   */
  disableStatus?: number;

  /** 性别 1男 2女 0未知 */
  gender?: string;

  /**
   * 注册时间
   * @format date-time
   */
  gmtCreated?: string;

  /** 头像 */
  headImg?: string;

  /**
   * 用户id
   * @format int64
   */
  id?: number;

  /** 用户全局唯一编号 */
  memberNo?: string;

  /**
   * 会员类型 1 普通用户 2 会员用户
   * @format int32
   */
  memberType?: number;

  /** 用户手机号 */
  mobile?: string;

  /** 昵称 */
  nickName?: string;

  /** 用户当前应用唯一标识 */
  openId?: string;

  /** 真实姓名 */
  realName?: string;

  /**
   * 状态 1：正常 0：禁用
   * @format int32
   */
  status?: number;

  /**
   * 累计积分
   * @format int32
   */
  totalScore?: number;

  /** 用户微信全局唯一编号 */
  unionId?: string;
}

export interface BalanceAdjustInputDto {
  /** 余额 */
  balance?: number;

  /** 是否增加 */
  isPlus?: boolean;
  remark?: string;

  /**
   * 用户id
   * @format int64
   */
  userId?: number;
}

export interface BalanceRefundCardInputDto {
  /**
   * 支付类型 1:微信支付; 2:支付宝支付; 3:线下支付; 4:余额支付
   * @format int32
   */
  payType?: number;
  remark?: string;

  /**
   * 用户id
   * @format int64
   */
  userId?: number;
}

export interface IntegralGoodsSkuStockAndPriceVo {
  /** 活动价 */
  activityPrice?: number;

  /**
   * 活动库存
   * @format int32
   */
  activityStock?: number;

  /** 兑换积分 */
  exchangeIntegral?: number;

  /** 市场价 */
  marketPrice?: number;

  /** 价格 */
  salesPrice?: number;

  /**
   * 积分
   * @format int32
   */
  score?: number;

  /** sku图片 */
  skuImg?: string;

  /** Sku编号 */
  skuNo?: string;

  /**
   * 库存
   * @format int32
   */
  stock?: number;
}

export interface IntegralGoodsQuery {
  /**
   * 开始时间
   * @format date-time
   */
  beginTime?: string;

  /** 末级分类id */
  classifyId?: string;

  /** 分类父id1（末级的上一级） */
  classifyPid1?: string;

  /** 分类父id2（分类父id1的上一级） */
  classifyPid2?: string;

  /** 查询条件 */
  condition?: string;

  /**
   * 结束时间
   * @format date-time
   */
  endTime?: string;

  /** 商品名称 */
  goodsName?: string;

  /** 商品编号 */
  goodsNo?: string;

  /** 商品编号列表 */
  goodsNoList?: string[];

  /**
   * 主键
   * @format int64
   */
  id?: number;

  /**
   * 当前页码
   * @format int32
   */
  pageNum?: number;

  /**
   * 每页数据量
   * @format int32
   */
  pageSize?: number;

  /** 是否推荐 0 否 1 是 */
  recommendStatus?: boolean;

  /**
   * 排序类型 1:sort 2:实际销量倒序 3:实际销量正序 4:价格倒序 5:价格正序 6：上架时间倒序 7：上架时间正序
   * @format int32
   */
  selectSortType?: number;

  /** 是否上架 0 否 1 是 */
  shelved?: boolean;
}

export interface IntegralGoodsVO {
  /**
   * 实际销量
   * @format int32
   */
  actualSales?: number;

  /** 商品详情页轮播图地址 */
  bannerImgPaths?: string;

  /**
   * 末级分类id
   * @format int32
   */
  classifyId?: number;

  /** 分类名称 */
  classifyName?: string;

  /** 商品分类名称1 */
  classifyName1?: string;

  /** 商品分类名称2 */
  classifyName2?: string;

  /** 商品分类名称3 */
  classifyName3?: string;

  /**
   * 分类父id1（末级的上一级）
   * @format int32
   */
  classifyPid1?: number;

  /**
   * 分类父id2（分类父id1的上一级）
   * @format int32
   */
  classifyPid2?: number;

  /** 封面图片 */
  coverImg?: string;

  /**
   * 自定义起止销量
   * @format int32
   */
  customStartSales?: number;

  /** 兑换积分 */
  exchangeIntegral?: number;

  /**
   * 运费模板ID
   * @format int64
   */
  expressTemplateId?: number;

  /** 商品名称 */
  goodsName?: string;

  /** 商品编号 */
  goodsNo?: string;

  /** SKU信息 */
  goodsSkuDetailList?: IntegralGoodsSkuVO[];

  /** 规格信息 */
  goodsSpecRelationList?: IntegralGoodsSpecRelationVO[];

  /**
   * 商品类型
   * @format int32
   */
  goodsType?: number;

  /**
   * 主键
   * @format int64
   */
  id?: number;

  /** 市场价 */
  marketPrice?: number;

  /** 营销活动 */
  marketingActivityList?: MarketingActivityDto[];

  /** 是否开启推荐 */
  recommendStatus?: boolean;

  /**
   * 富文本ID
   * @format int64
   */
  richId?: number;

  /** 销售价 */
  salePrice?: number;

  /** 是否上架 0 否 1 是 */
  shelved?: boolean;

  /**
   * 上下架时间
   * @format date-time
   */
  shelvesTime?: string;

  /**
   * 排序值
   * @format int32
   */
  sort?: number;

  /**
   * 库存
   * @format int32
   */
  stock?: number;

  /** 视频地址 */
  videoUrl?: string;
}

export interface IntegralGoodsStatusInputDto {
  /** 编号 */
  no: string;

  /** 开关状态 */
  status: boolean;
}

export interface IntegralGoodsSpecRelationVO {
  goodsNo?: string;

  /**
   * 规格ID
   * @format int32
   */
  specId?: number;

  /** 规格名称 */
  specName?: string;

  /**
   * 规格父ID
   * @format int32
   */
  specPid?: number;
}

export interface IntegralGoodsSpecModifyInputDto {
  /**
   * 规格编号
   * @format int64
   */
  id?: number;

  /**
   * 父级id
   * @format int64
   */
  pid?: number;

  /**
   * 排序值
   * @format int32
   */
  sort?: number;

  /** 规格名称 */
  specName?: string;
}

export interface IntegralGoodsSpecOutputDto {
  /** @format int64 */
  childrenNum?: number;

  /**
   * 规格编号
   * @format int64
   */
  id?: number;

  /**
   * 父级id
   * @format int64
   */
  pid?: number;

  /**
   * 排序值
   * @format int32
   */
  sort?: number;

  /** 规格名称 */
  specName?: string;
}

export interface IntegralGoodsSpecCrerateInputDto {
  /**
   * 父级id
   * @format int64
   */
  pid?: number;

  /**
   * 排序值
   * @format int32
   */
  sort?: number;

  /** 规格名称 */
  specName?: string;
}

export interface IntegralGoodsSaveDTO {
  /** 商品详情页轮播图地址 */
  bannerImgPaths?: string;

  /**
   * 末级分类id
   * @format int32
   */
  classifyId?: number;

  /**
   * 分类父id1（末级的上一级）
   * @format int32
   */
  classifyPid1?: number;

  /**
   * 分类父id2（分类父id1的上一级）
   * @format int32
   */
  classifyPid2?: number;

  /** 封面图片 */
  coverImg?: string;

  /**
   * 运费模板ID
   * @format int64
   */
  expressTemplateId?: number;

  /** 商品名称 */
  goodsName?: string;

  /** 商品编号 */
  goodsNo?: string;

  /** SKU信息 */
  goodsSkuList?: IntegralGoodsSkuDTO[];

  /**
   * 商品类型
   * @format int32
   */
  goodsType?: number;

  /**
   * 主键
   * @format int64
   */
  id?: number;

  /**
   * 富文本详情ID
   * @format int64
   */
  richId?: number;

  /** 上架状态 */
  shelved?: boolean;

  /**
   * 上下架时间
   * @format date-time
   */
  shelvesTime?: string;

  /**
   * 排序值
   * @format int32
   */
  sort?: number;

  /** 规格信息ID集合 */
  specList?: number[];

  /** 视频地址 */
  videoUrl?: string;
}

export interface IntegralGoodsClassifyCrateInputDto {
  /** 前端是否展示 */
  frontShow?: boolean;

  /** 分类名称 */
  name?: string;

  /** 图片 */
  pic?: string;

  /**
   * 父级ID
   * @format int64
   */
  pid?: number;
}

export interface IntegralGoodsQueryByNo {
  /**
   * 开始时间
   * @format date-time
   */
  beginTime?: string;

  /** 查询条件 */
  condition?: string;

  /**
   * 结束时间
   * @format date-time
   */
  endTime?: string;

  /** 商品编号列表 */
  goodNos?: string[];

  /**
   * 主键
   * @format int64
   */
  id?: number;

  /**
   * 当前页码
   * @format int32
   */
  pageNum?: number;

  /**
   * 每页数据量
   * @format int32
   */
  pageSize?: number;
}

export interface IntegralGoodsSkuStockAndPriceParam {
  /** 商品编号 */
  goodsNo?: string;

  /** 现价 */
  salesPrice?: number;

  /** sku编号 */
  skuNo?: string;

  /**
   * 库存数量
   * @format int32
   */
  stock?: number;
}

export interface IntegralGoodsSkuVO {
  /**
   * 实际销量
   * @format int32
   */
  actualSales?: number;

  /**
   * 自定义起止销量
   * @format int32
   */
  customStartSales?: number;

  /** 是否启用 0 否 1是 */
  enabled?: boolean;

  /** 兑换积分 */
  exchangeIntegral?: number;

  /**
   * 商品id
   * @format int64
   */
  goodsId?: number;

  /** 商品编号 */
  goodsNo?: string;

  /**
   * 主键
   * @format int64
   */
  id?: number;

  /** 市场价 */
  marketPrice?: number;

  /** 售价 */
  salesPrice?: number;

  /**
   * 积分
   * @format int32
   */
  score?: number;

  /** sku图片 */
  skuImg?: string;

  /** sku名称 */
  skuName?: string;

  /** sku编号 */
  skuNo?: string;

  /** 组合多规格子id，用逗号分割 */
  specIds?: string;

  /** sku组合名称（以逗号分隔） */
  specNames?: string;

  /** 组合多规格父id，用逗号分割 */
  specParentIds?: string;

  /**
   * 库存
   * @format int32
   */
  stock?: number;

  /** 是否是统一规格 0 否 1 是  */
  uniform?: boolean;

  /** 体积（cm³） */
  volume?: number;

  /** 重量（kg） */
  weight?: number;
}

export interface IntegralGoodsClassifyMoveInputDto {
  /**
   * 当前要移动的分类id
   * @format int64
   */
  id?: number;

  /**
   * 当前要移动的目标分类父id
   * @format int64
   */
  pid?: number;

  /**
   * 当前要移动的目标索引
   * @format int32
   */
  sort?: number;
}

export interface IntegralGoodsSkuDTO {
  /**
   * 自定义起止销量
   * @format int32
   */
  customStartSales?: number;

  /** 是否启用 0 否 1是 */
  enabled?: boolean;

  /** 兑换积分 */
  exchangeIntegral?: number;

  /**
   * 商品id
   * @format int64
   */
  goodsId?: number;

  /**
   * 主键
   * @format int64
   */
  id?: number;

  /** 市场价 */
  marketPrice?: number;

  /** 销售价 */
  salesPrice?: number;

  /**
   * 积分
   * @format int32
   */
  score?: number;

  /** sku图片 */
  skuImg?: string;

  /** sku名称 */
  skuName?: string;

  /** sku编号 */
  skuNo?: string;

  /** 组合多规格子id，用逗号分割 */
  specIds?: string;

  /** sku组合名称（以逗号分隔） */
  specNames?: string;

  /** 组合多规格父id，用逗号分割 */
  specParentIds?: string;

  /**
   * 库存
   * @format int32
   */
  stock?: number;

  /** 体积（cm³） */
  volume?: number;

  /** 重量（kg） */
  weight?: number;
}

export interface IntegralGoodsClassifyOutputDto {
  /** 前端是否展示 */
  frontShow?: boolean;

  /**
   * 分类id
   * @format int64
   */
  id?: number;

  /** 分类名称 */
  name?: string;

  /** 图片 */
  pic?: string;

  /**
   * 父级ID
   * @format int64
   */
  pid?: number;
}

export interface IntegralGoodsClassifyModifyInputDto {
  /** 前端是否展示 */
  frontShow?: boolean;

  /**
   * 分类id
   * @format int64
   */
  id?: number;

  /** 分类名称 */
  name?: string;

  /** 图片 */
  pic?: string;

  /**
   * 父级ID
   * @format int64
   */
  pid?: number;
}

export interface ScoreFlowOutputDto {
  /** 操作人 */
  createUser?: string;

  /** 说明 */
  description?: string;

  /**
   * 使用时间
   * @format date-time
   */
  gmtCreated?: string;

  /**
   * id
   * @format int64
   */
  id?: number;

  /**
   * 积分的增加方式 1：后台增加 2：购买商品 3：订单退回
   * @format int32
   */
  plusType?: number;

  /**
   * 使用积分
   * @format int32
   */
  score?: number;

  /** 来源 */
  sourceText?: string;

  /**
   * 积分的扣除方式 1：后台扣减 2：积分商品抵扣
   * @format int32
   */
  subtractType?: number;

  /**
   * 用户Id
   * @format int64
   */
  userId?: number;
}

export interface BalanceGetOutputDto {
  /** 余额 */
  balance?: number;

  /** 总赠送余额 */
  totalPresentBalance?: number;

  /** 总充值余额 */
  totalRechargeBalance?: number;

  /** 可退卡总金额 */
  totalRefundBalance?: number;
}

export interface BalanceFlowOutputDto {
  /** 使用余额 */
  balance?: number;

  /** 操作人 */
  createUser?: string;

  /**
   * 使用时间
   * @format date-time
   */
  gmtCreated?: string;

  /**
   * id
   * @format int64
   */
  id?: number;

  /**
   * 余额的增加方式 1：后台增加 2：用户充值 3：充值赠送 4：订单退回 5：售后退回
   * @format int32
   */
  plusType?: number;

  /** 单据编号 */
  relNo?: string;

  /** 备注 */
  remark?: string;

  /** 来源 */
  sourceText?: string;

  /**
   * 余额的扣除方式 1：后台扣减 2：下单抵扣
   * @format int32
   */
  subtractType?: number;
}

export interface ShowDto {
  /**
   * id
   * @format int64
   */
  id?: number;

  /** 是否显示 */
  show?: boolean;
}

export interface HotKeywordShowDto {
  /**
   * id
   * @format int64
   */
  id?: number;

  /** 是否显示 */
  show?: boolean;
}

export interface PromotionActivity {
  /** 活动名称 */
  activityName?: string;

  /** 活动编号 */
  activityNo?: string;

  /**
   * 活动类型 0：拼团 1：预售 2：限时抢购 3:满减 4:满折 5:满赠 6 优惠券 7 会员折扣
   * @format int32
   */
  activityType?: number;
  promotionParam?: MarketingActivityPromotionParam;
}

export interface JoinPromotionInputDto {
  goods?: JoinPromotionGoodsInputDto[];
}

export interface JoinPromotionOutputDto {
  /** 活动列表 */
  activities?: PromotionActivity[];

  /** 优惠后总金额 */
  totalActivityPrice?: number;
}

export interface JoinPromotionGoodsInputDto {
  /**
   * 变动数量
   * @format int32
   */
  buyCounts?: number;

  /** 商品编号 */
  goodsNo?: string;

  /** 商品sku价格 */
  price?: number;

  /** sku编号 */
  skuNo?: string;
}

export interface PopupAdsSaveDto {
  /**
   * 每日展示次数
   * @format int32
   */
  dailyShowNumber?: number;

  /** 是否删除 */
  deleted?: boolean;

  /**
   * 到期时间
   * @format date-time
   */
  expirationTime?: string;

  /** 图片链接 */
  imgUrl?: string;

  /** 是否显示 */
  show?: boolean;

  /**
   * 排序
   * @format int32
   */
  sort?: number;

  /** 标题 */
  title?: string;

  /** 外链地址 */
  url?: string;
}

export interface PopupAdsUpdateDto {
  /**
   * 每日展示次数
   * @format int32
   */
  dailyShowNumber?: number;

  /** 是否删除 */
  deleted?: boolean;

  /**
   * 到期时间
   * @format date-time
   */
  expirationTime?: string;

  /**
   * id
   * @format int64
   */
  id?: number;

  /** 图片链接 */
  imgUrl?: string;

  /** 是否显示 */
  show?: boolean;

  /**
   * 排序
   * @format int32
   */
  sort?: number;

  /** 标题 */
  title?: string;

  /** 外链地址 */
  url?: string;
}

export interface PopupAdsDto {
  /**
   * 每日展示次数
   * @format int32
   */
  dailyShowNumber?: number;

  /** 是否删除 */
  deleted?: boolean;

  /**
   * 到期时间
   * @format date-time
   */
  expirationTime?: string;

  /**
   * 更新时间
   * @format date-time
   */
  gmtModified?: string;

  /**
   * id
   * @format int64
   */
  id?: number;

  /** 图片链接 */
  imgUrl?: string;

  /** 是否显示 */
  show?: boolean;

  /**
   * 排序
   * @format int32
   */
  sort?: number;

  /** 标题 */
  title?: string;

  /** 外链地址 */
  url?: string;
}

export interface ShopCartDeleteInputDto {
  /** 需要删除的sku编号集合 */
  delSkuNos?: string[];
}

export interface ShopCartModifyInputDto {
  /**
   * 变动数量
   * @format int32
   */
  buyCounts?: number;

  /** 渠道id:直播id */
  channelId?: string;

  /** 商品编号 */
  goodsNo?: string;

  /** 旧sku编号，切换 sku 时有值 */
  oldSkuNo?: string;

  /** sku编号 */
  skuNo?: string;
}

export interface ShopCartCreateInputDto {
  /**
   * 变动数量
   * @format int32
   */
  buyCounts?: number;

  /** 渠道id:直播id */
  channelId?: string;

  /** 商品编号 */
  goodsNo?: string;

  /** sku编号 */
  skuNo?: string;
}

export interface MarketingActivityWebResultVo {
  /** 活动名称 */
  activityName?: string;

  /** 活动编号 */
  activityNo?: string;

  /**
   * 活动类型 0：拼团 1：预售 2：限时抢购 3:满减 4:满折 5:满赠
   * @format int32
   */
  activityType?: number;

  /** 封面图 */
  coverImg?: string;

  /** 活动说明 */
  description?: string;

  /**
   * 活动结束时间
   * @format date-time
   */
  endTime?: string;

  /** @format int64 */
  id?: number;

  /**
   * 商户ID
   * @format int64
   */
  merchantId?: number;

  /**
   * 活动开始时间
   * @format date-time
   */
  startTime?: string;
}

export interface HotKeywordSaveDto {
  /** 热词 */
  hotKeyword?: string;

  /** 热词说明 */
  hotKeywordDescription?: string;

  /** 图标 */
  icon?: string;

  /** 是否显示 */
  show?: boolean;

  /**
   * 排序
   * @format int32
   */
  sort?: number;

  /** 跳转链接 */
  url?: string;
}

export interface HotKeywordUpdateDto {
  /** 热词 */
  hotKeyword?: string;

  /** 热词说明 */
  hotKeywordDescription?: string;

  /** 图标 */
  icon?: string;

  /**
   * id
   * @format int64
   */
  id?: number;

  /** 是否显示 */
  show?: boolean;

  /**
   * 排序
   * @format int32
   */
  sort?: number;

  /** 跳转链接 */
  url?: string;
}

export interface EventTypeDto {
  /**
   * id
   * @format int64
   */
  id: number;

  /** 类型名 */
  name?: string;
}

export interface HotKeywordDto {
  /**
   * 更新时间
   * @format date-time
   */
  gmtModified?: string;

  /** 热词 */
  hotKeyword?: string;

  /** 热词说明 */
  hotKeywordDescription?: string;

  /** 图标 */
  icon?: string;

  /**
   * id
   * @format int64
   */
  id?: number;

  /** 是否显示 */
  show?: boolean;

  /**
   * 排序
   * @format int32
   */
  sort?: number;

  /** 跳转链接 */
  url?: string;
}

export interface NewcomerGiftOutputDto {
  /**
   * 赠送新人券结果 1成功 2未设置 3已领取 4部分领取失败 5全部领取失败
   * @format int32
   */
  newcomerCouponResult?: number;
}

export interface GoodsStatusInputDto {
  /** 编号 */
  no: string;

  /** 开关状态 */
  status: boolean;
}

export interface ScoreBO {
  /**
   * 用户可用积分
   * @format int32
   */
  availableScore?: number;

  /** 积分抵扣金额 */
  discountAmount?: number;

  /**
   * 可用上限
   * @format int32
   */
  upperlimitScore?: number;

  /** 1元抵扣多少积分 */
  useIntegralAmount?: number;

  /** 积分抵扣上限 百分比 */
  useIntegralLimit?: number;

  /**
   * 下单使用积分
   * @format int32
   */
  usedScore?: number;
}

export interface ScoreGetOutputDto {
  /**
   * 可用积分
   * @format int32
   */
  availableScore?: number;

  /**
   * 冻结积分
   * @format int32
   */
  frozenScore?: number;

  /**
   * 累计积分
   * @format int32
   */
  totalScore?: number;
}

export type PayNotifyUsingPOSTXmldata = string;

export interface ScoreFlowDto {
  /** 操作人 */
  createUser?: string;

  /** 说明 */
  description?: string;

  /**
   * 冻结积分
   * @format int32
   */
  frozenScore?: number;

  /**
   * 使用时间
   * @format date-time
   */
  gmtCreated?: string;

  /** 用户编号 */
  memberNo?: string;

  /** 用户昵称 */
  nickName?: string;

  /**
   * 积分的增加方式 1：后台增加 2：购买商品 3：订单退回
   * @format int32
   */
  plusType?: number;

  /** 关联单号 */
  relNo?: string;

  /**
   * 使用积分
   * @format int32
   */
  score?: number;

  /** 来源 */
  sourceText?: string;

  /**
   * 积分的扣除方式 1：后台扣减 2：积分商品抵扣
   * @format int32
   */
  subtractType?: number;

  /**
   * 用户Id
   * @format int64
   */
  userId?: number;
}

export type BatchDelUsingDELETEIdlist = number[];

export interface UserRolesDto {
  roleIds?: number[];

  /** @format int64 */
  userId?: number;
}

export interface UserChangeStatusInputDto {
  /**
   * 用户id
   * @format int64
   */
  id?: number;

  /**
   * 状态 1：正常 0：禁用
   * @format int32
   */
  status?: number;
}

export interface UserChangeScoreInputDto {
  /**
   * 用户id
   * @format int64
   */
  id?: number;

  /** 是否增加 */
  isPlus?: boolean;

  /**
   * 积分
   * @format int32
   */
  score?: number;
}

export interface TreeResourceVo {
  /** 子资源集合 */
  children?: TreeResourceVo[];

  /** 资源代码 */
  code?: string;

  /** 图标，为菜单时不空 */
  icon?: string;

  /**
   * id
   * @format int64
   */
  id?: number;

  /** key */
  key?: string;

  /** 备注 */
  memo?: string;

  /** 请求方式，为接口时不为空 */
  method?: string;

  /** 资源名称 */
  name?: string;

  /**
   * 上级ID
   * @format int64
   */
  parentId?: number;

  /** 访问地址，为按钮时可为空 */
  path?: string;

  /**
   * 优先级
   * @format int32
   */
  sortNum?: number;

  /** 标题 */
  title?: string;

  /**
   * 资源类型|0:菜单,1:按钮,2:接口
   * @format int32
   */
  type?: number;

  /** 是否可见 */
  visible?: boolean;
}

export interface SysUserVo {
  /** 绑定的部门ID["部门ID","部门ID"] 部门ID必须双引号包裹 */
  deptIds?: string;

  /** 所属部门 */
  deptNames?: string;

  /** 邮箱 */
  email?: string;

  /**
   * 创建时间
   * @format date-time
   */
  gmtCreated?: string;

  /**
   * id
   * @format int64
   */
  id?: number;

  /** 电话 */
  mobile?: string;

  /** 绑定的角色ID["角色id","角色id"] 角色id必须双引号包裹  */
  roleIds?: string;

  /** 所属角色 */
  roleNames?: string;

  /**
   * 状态 1：正常 0：禁用
   * @format int32
   */
  status?: number;

  /** 用户名 */
  username?: string;
}

export interface SysUserModifyInputDto {
  /** 部门ID集合 */
  deptIds?: number[];

  /** 邮箱 */
  email?: string;

  /**
   * 员工id
   * @format int64
   */
  id?: number;

  /** 电话 */
  mobile?: string;

  /** 角色id集合 */
  roleIds?: number[];

  /** 用户名 */
  username?: string;
}

export interface SysRoleOutputDto {
  /** 角色权限标识 */
  authority?: string;

  /** 描述 */
  description?: string;

  /**
   * 创建时间
   * @format date-time
   */
  gmtCreated?: string;

  /**
   * id
   * @format int64
   */
  id?: number;

  /** 角色名称 */
  name?: string;

  /**
   * 员工数量
   * @format int64
   */
  userNum?: number;
}

export interface SysRoleSelectOutputDto {
  /**
   * id
   * @format int64
   */
  id?: number;

  /** 角色名称 */
  name?: string;
}

export interface SysUserCreateInputDto {
  /** 部门ID集合 */
  deptIds?: number[];

  /** 邮箱 */
  email?: string;

  /** 电话 */
  mobile?: string;

  /** 角色id集合 */
  roleIds?: number[];

  /** 用户名 */
  username?: string;
}

export interface SysRoleModifyInputDto {
  /** 描述 */
  description?: string;

  /**
   * id
   * @format int64
   */
  id?: number;

  /** 角色名 */
  name?: string;

  /** 资源 id 集合 */
  resourceIds?: number[];
}

export interface SysRoleDetailOutputDto {
  /** 接口集合 */
  apiIds?: number[];

  /** 角色权限标识 */
  authority?: string;

  /** 按钮集合 */
  buttonIds?: number[];

  /** 描述 */
  description?: string;

  /**
   * 创建时间
   * @format date-time
   */
  gmtCreated?: string;

  /**
   * id
   * @format int64
   */
  id?: number;

  /** 菜单集合 */
  menuIds?: number[];

  /** 角色名称 */
  name?: string;

  /**
   * 员工数量
   * @format int64
   */
  userNum?: number;
}

export interface SysResourceRes {
  /** 资源代码 */
  code?: string;
  createUser?: string;

  /** @format date-time */
  gmtCreated?: string;

  /** @format date-time */
  gmtModified?: string;

  /** 图标，为菜单时不空 */
  icon?: string;

  /** @format int64 */
  id?: number;

  /** 备注 */
  memo?: string;

  /** 请求方式，为接口时不为空 */
  method?: string;
  modified?: boolean;
  modifyUser?: string;

  /**
   * 父级资源ID，资源类型只能为菜单
   * @format int64
   */
  parentId?: number;

  /** 访问地址，为按钮时可为空 */
  path?: string;

  /**
   * 排序号
   * @format int32
   */
  sortNum?: number;

  /** @format int32 */
  status?: number;

  /** 资源名称 */
  title?: string;
  transient?: boolean;

  /**
   * 资源类型|0:菜单,1:按钮,2:接口
   * @format int32
   */
  type?: number;

  /** 是否可见 */
  visible?: boolean;
}

export interface SysRoleCreateInputDto {
  /** 描述 */
  description?: string;

  /** 角色名 */
  name?: string;

  /** 资源 id 集合 */
  resourceIds?: number[];
}

export interface SysRole {
  authority?: string;
  createUser?: string;
  deleted?: boolean;
  description?: string;

  /** @format date-time */
  gmtCreated?: string;

  /** @format date-time */
  gmtModified?: string;

  /** @format int64 */
  id?: number;
  md5?: string;
  modified?: boolean;
  modifyUser?: string;
  name?: string;

  /** @format int32 */
  status?: number;
  transient?: boolean;
}

export interface SysResourceReq {
  /** 资源代码 */
  code?: string;
  createUser?: string;

  /** @format date-time */
  gmtCreated?: string;

  /** @format date-time */
  gmtModified?: string;

  /** 图标，为菜单时不空 */
  icon?: string;

  /** @format int64 */
  id?: number;

  /** 备注 */
  memo?: string;

  /** 请求方式，为接口时不为空 */
  method?: string;
  modifyUser?: string;

  /**
   * 父级资源ID，资源类型只能为菜单
   * @format int64
   */
  parentId?: number;

  /** 访问地址，为按钮时可为空 */
  path?: string;

  /**
   * 排序号
   * @format int32
   */
  sortNum?: number;

  /** @format int32 */
  status?: number;

  /** 资源名称 */
  title?: string;

  /**
   * 资源类型|0:菜单,1:按钮,2:接口
   * @format int32
   */
  type?: number;

  /** 是否可见 */
  visible?: boolean;
}

export interface SysDeptVo {
  /** 子部门 */
  children?: SysDeptVo[];

  /**
   * 创建时间
   * @format date-time
   */
  gmtCreated?: string;

  /**
   * id
   * @format int64
   */
  id?: number;

  /** 部门名称 */
  name?: string;

  /**
   * pid
   * @format int64
   */
  pid?: number;

  /**
   * 员工数量
   * @format int32
   */
  userNum?: number;
}

export interface SysResource {
  code?: string;
  createUser?: string;

  /** @format date-time */
  gmtCreated?: string;

  /** @format date-time */
  gmtModified?: string;
  icon?: string;

  /** @format int64 */
  id?: number;
  md5?: string;
  memo?: string;
  method?: string;
  modified?: boolean;
  modifyUser?: string;

  /** @format int64 */
  parentId?: number;
  path?: string;

  /** @format int32 */
  sortNum?: number;

  /** @format int32 */
  status?: number;
  title?: string;
  transient?: boolean;

  /** @format int32 */
  type?: number;
  visible?: boolean;
}

export interface SysAuthVo {
  /** 登录人有权限的接口 */
  apis?: SysResource[];

  /** 登录人有权限的按钮 */
  buttons?: string[];

  /** 登录人邮箱 */
  email?: string;

  /** 登录人有权限的菜单（树状） */
  menusTree?: TreeLong[];

  /** 手机号 */
  mobile?: string;

  /**
   * id
   * @format int64
   */
  userId?: number;

  /** 登录人名称 */
  username?: string;
}

export interface SysDeptModifyInputDto {
  /**
   * 部门id
   * @format int64
   */
  id?: number;

  /** 部门名称 */
  name?: string;

  /**
   * 上级ID，不传默认0
   * @format int64
   */
  pid?: number;
}

export interface SysDeptCreateInputDto {
  /** 部门名称 */
  name?: string;

  /**
   * 上级ID，不传默认0
   * @format int64
   */
  pid?: number;
}

export interface SysApiRes {
  createUser?: string;

  /** 描述 */
  description?: string;

  /** @format date-time */
  gmtCreated?: string;

  /** @format date-time */
  gmtModified?: string;

  /** @format int64 */
  id?: number;

  /** 请求方式 */
  method?: string;
  modified?: boolean;
  modifyUser?: string;

  /** @format int32 */
  status?: number;
  transient?: boolean;

  /** 请求uri */
  uri?: string;
}

export interface SysApiReq {
  createUser?: string;

  /** 描述 */
  description?: string;

  /** @format date-time */
  gmtCreated?: string;

  /** @format date-time */
  gmtModified?: string;

  /** @format int64 */
  id?: number;

  /** 请求方式 */
  method?: string;
  modifyUser?: string;

  /** @format int32 */
  status?: number;

  /** 请求uri */
  uri?: string;
}

export interface SkuStockAndPriceParam {
  /** 商品编号 */
  goodsNo?: string;

  /** 现价 */
  salesPrice?: number;

  /** sku编号 */
  skuNo?: string;

  /**
   * 库存数量
   * @format int32
   */
  stock?: number;
}

export interface ShipInfoParam {
  /** 快递公司名称 */
  expressCompany?: string;

  /** 快递公司编码 */
  expressCompanyCode?: string;

  /** 快递单号 */
  expressNo?: string;

  /** 是否拆单 修改物流时不需要传 */
  isSplit?: boolean;

  /** 原快递单号 修改物流时必须传入 */
  oldExpressNo?: string;

  /** 订单号 */
  orderNo?: string;

  /** 发货明细 修改物流时不需要传 */
  shippingItemList?: OrderShippingItemDto[];

  /**
   * 配送方式 0：商家配送 1：无需物流
   * @format int32
   */
  shippingMethod?: number;
}

export interface RichText {
  content?: string;
  createUser?: string;

  /** @format int32 */
  dataId?: number;

  /** @format date-time */
  gmtCreated?: string;

  /** @format date-time */
  gmtModified?: string;

  /** @format int64 */
  id?: number;
  md5?: string;
  modifyUser?: string;

  /** @format int32 */
  status?: number;
}

export interface RoleResourceSaveDto {
  resourceIds?: number[];

  /** @format int64 */
  roleId?: number;
}

export interface ResourceCreateDto {
  /** 关联的API列表 */
  apis?: SysApi1[];

  /** 代码 */
  code?: string;

  /** 图标 */
  icon?: string;

  /** 备注 */
  memo?: string;

  /**
   * 父菜单ID
   * @format int64
   */
  parentId?: number;

  /** 路由地址 */
  path?: string;

  /**
   * 排序号
   * @format int32
   */
  sortNum?: number;

  /** 描述 */
  title?: string;

  /**
   * 资源类型
   * @format int32
   */
  type?: number;

  /** 是否显示 */
  visible?: boolean;
}

export interface ResourceDetailVo {
  /** 关联的API列表 */
  apis?: SysApi[];

  /**
   * 子菜单数量
   * @format int32
   */
  childrenMenuCnt?: number;

  /** 代码 */
  code?: string;

  /** 图标 */
  icon?: string;

  /**
   * ID
   * @format int64
   */
  id?: number;

  /**
   * 父菜单ID
   * @format int64
   */
  parentId?: number;

  /** 路由 */
  path?: string;

  /**
   * 排序号
   * @format int32
   */
  sortNum?: number;

  /** 描述 */
  title?: string;

  /**
   * 类型
   * @format int32
   */
  type?: number;

  /** 是否显示 */
  visible?: boolean;
}

export interface ResourceUpdateDto {
  /** 关联的API列表 */
  apis?: SysApi1[];

  /** 图标 */
  icon?: string;

  /**
   * 父菜单ID
   * @format int64
   */
  parentId?: number;

  /** 路由路径 */
  path?: string;

  /**
   * 排序号
   * @format int32
   */
  sortNum?: number;

  /** 描述 */
  title?: string;

  /** 是否显示 */
  visible?: boolean;
}

export interface ResetPwdParam {
  /** 新密码 */
  newPassword?: string;

  /** 原密码 */
  password?: string;
}

export interface RefundRefuseParam {
  /** 售后单编号 */
  refundNo?: string;

  /** 处理备注 */
  storeNote?: string;
}

export interface ReplyCommentsDto {
  /**
   * 评价id
   * @format int64
   */
  commentsId?: number;

  /** 回复内容 */
  replyContent?: string;
}

export interface RefundReasonModifyInputDto {
  /**
   * id
   * @format int64
   */
  id?: number;

  /** 售后原因 */
  name?: string;

  /**
   * 排序、降序
   * @format int32
   */
  sort?: number;

  /** 适用场景 0 仅退款 未收到货 1 仅退款 已收到货 2 退货退款,多个逗号分隔 */
  type?: string;
}

export interface RefundReasonCreateInputDto {
  /** 售后原因 */
  name?: string;

  /**
   * 排序、降序
   * @format int32
   */
  sort?: number;

  /** 适用场景 0 仅退款 未收到货 1 仅退款 已收到货 2 退货退款,多个逗号分隔 */
  type?: string;
}

export interface RefundCheckParam {
  /** 运费金额 */
  freightAmount?: number;

  /** 退款金额 */
  refundAmount?: number;

  /** 退货明细 整单退货不需要传入 */
  refundItemList?: RefundAgreeItemDto[];

  /** 售后单编号 */
  refundNo?: string;

  /** 处理备注 */
  storeNote?: string;
}

export interface RefundAgreeParam {
  /** 区域名 */
  areaName?: string;

  /** 城市名 */
  cityName?: string;

  /** 运费金额 */
  freightAmount?: number;

  /** 手机号 */
  mobile?: string;

  /** 联系人姓名 */
  name?: string;

  /** 省份名 */
  provinceName?: string;

  /** 退款金额 */
  refundAmount?: number;

  /** 退货明细 整单退货不需要传入 */
  refundItemList?: RefundAgreeItemDto[];

  /** 售后单编号 */
  refundNo?: string;

  /** 详细地址 */
  singleAddress?: string;

  /** 处理备注 */
  storeNote?: string;
}

export interface RefundAgreeItemDto {
  /** 商品编码 */
  goodsNo?: string;

  /** 退款金额 */
  refundAmount?: number;

  /**
   * 积分
   * @format int32
   */
  refundScore?: number;

  /** SKU编码 */
  skuNo?: string;
}

export interface OrderShipping {
  /** 快递单号 */
  expressNo?: string;

  /** 订单号 */
  orderNo?: string;
}

export interface MemberInfoPageVo {
  /** 微信应用id */
  appId?: string;

  /**
   * 可用积分
   * @format int32
   */
  availableScore?: number;

  /**
   * 生日
   * @format date-time
   */
  birthday?: string;

  /** 性别 1男 2女 0未知 */
  gender?: string;

  /**
   * 注册时间
   * @format date-time
   */
  gmtCreated?: string;

  /** 头像 */
  headImg?: string;

  /**
   * 用户id
   * @format int64
   */
  id?: number;

  /** 用户全局唯一编号 */
  memberNo?: string;

  /** 用户手机号 */
  mobile?: string;

  /** 昵称 */
  nickName?: string;

  /** 用户当前应用唯一标识 */
  openId?: string;

  /** 真实姓名 */
  realName?: string;

  /**
   * 状态 1：正常 0：禁用
   * @format int32
   */
  status?: number;

  /**
   * 累计积分
   * @format int32
   */
  totalScore?: number;

  /** 用户微信全局唯一编号 */
  unionId?: string;
}

export interface MemCouponRecordVo {
  /**
   * 领取类型 0 直接领取 1 后台发放 2 优惠券兑换 3 新人券
   * @format int32
   */
  acceptType?: number;

  /** 优惠劵名称 */
  couponName?: string;

  /** 优惠劵编号 */
  couponNo?: string;

  /** 优惠劵模板编号 */
  couponTemplateNo?: string;

  /**
   * 优惠劵类型 0 抵扣 1 折扣
   * @format int32
   */
  couponType?: number;

  /** 使用条件需求价格 */
  demandPrice?: number;

  /** 折扣率,% */
  discount?: number;

  /**
   * id
   * @format int64
   */
  id?: number;

  /** 领取人手机号 */
  mobile?: string;

  /** 领取人昵称 */
  nickName?: string;

  /** 价值金额 */
  price?: number;

  /**
   * 获取时间
   * @format date-time
   */
  receive?: string;

  /**
   * 有效期结束
   * @format date-time
   */
  termEnd?: string;

  /**
   * 有效期开始
   * @format date-time
   */
  termStart?: string;

  /**
   * 使用时间
   * @format date-time
   */
  useDate?: string;

  /**
   * 状态 0 未使用 1 已使用 2 已过期 3 已作废
   * @format int32
   */
  useStatus?: number;
}

export interface MaterialVo {
  /** 扩展参数 */
  extendParams?: object;

  /**
   * 创建时间
   * @format date-time
   */
  gmtCreated?: string;

  /**
   * 修改时间
   * @format date-time
   */
  gmtModified?: string;

  /**
   * 分组id
   * @format int64
   */
  groupId?: number;

  /**
   * id
   * @format int64
   */
  id?: number;

  /** 路径 */
  imgUrl?: string;

  /** 名称 */
  name?: string;

  /**
   * 类型 0 图片 1 视频
   * @format int32
   */
  type?: number;
}

export interface MaterialMoveParam {
  /**
   * 移动到的分组id
   * @format int64
   */
  groupId?: number;

  /** 移动的素材id数组 */
  ids?: number[];
}

export interface MaterialGroupVo {
  /** 下级分组 */
  children?: MaterialGroupVo[];

  /**
   * id
   * @format int64
   */
  id?: number;

  /**
   * 素材数量
   * @format int32
   */
  mateNum?: number;

  /** 分组名称 */
  name?: string;

  /**
   * 上级id
   * @format int64
   */
  pid?: number;

  /**
   * 类型 0图片 1分组
   * @format int32
   */
  type?: number;
}

export interface MaterialModifyParam {
  /** 扩展参数 */
  extendParams?: object;

  /**
   * 分组id
   * @format int64
   */
  groupId?: number;

  /**
   * id
   * @format int64
   */
  id?: number;

  /** 路径 */
  imgUrl?: string;

  /** 名称 */
  name?: string;

  /**
   * 类型 0 图片 1 视频
   * @format int32
   */
  type?: number;
}

export interface MaterialGroupModifyParam {
  /**
   * id
   * @format int64
   */
  id?: number;

  /** 分组名称 */
  name?: string;

  /**
   * 上级id
   * @format int64
   */
  pid?: number;

  /**
   * 分组类型 0图片 1视频
   * @format int32
   */
  type?: number;
}

export interface MaterialGroupAddParam {
  /** 分组名称 */
  name?: string;

  /**
   * 上级id
   * @format int64
   */
  pid?: number;

  /**
   * 分组类型 0图片 1视频
   * @format int32
   */
  type?: number;
}

export interface MaterialAddParam {
  /** 扩展参数 */
  extendParams?: object;

  /**
   * 分组id
   * @format int64
   */
  groupId?: number;

  /** 路径 */
  imgUrl?: string;

  /** 名称 */
  name?: string;

  /**
   * 类型 0 图片 1 视频
   * @format int32
   */
  type?: number;
}

export interface MarketingActivityVo {
  /** 活动名称 */
  activityName?: string;

  /** 活动编号 */
  activityNo?: string;

  /**
   * 活动状态 0：未启用 1：启用 2：结束 3：待审核 4：审核失败 状态为0和1时前端展示启用和未启用功能
   * @format int32
   */
  activityStatus?: number;

  /**
   * 活动类型 0：拼团 1：预售 2：限时抢购 3:满减 4:满折 5:满赠 6:包邮
   * @format int32
   */
  activityType?: number;

  /** 封面图 */
  coverImg?: string;

  /** 活动说明 */
  description?: string;

  /**
   * 活动结束时间
   * @format date-time
   */
  endTime?: string;

  /** @format int64 */
  id?: number;

  /**
   * 商户ID
   * @format int64
   */
  merchantId?: number;

  /**
   * 活动开始时间
   * @format date-time
   */
  startTime?: string;
}

export interface MarketingActivityOfFullDto {
  /** 活动名称 */
  activityName?: string;

  /** 活动编号 */
  activityNo?: string;

  /**
   * 活动类型 1:预售 2:限时抢购 3:满减 4:满折 5:满赠 6:包邮
   * @format int32
   */
  activityType?: number;

  /**
   * 活动完成后操作 0：设为普通商品 1：下架
   * @format int32
   */
  completed?: number;

  /** 活动规则 */
  content?: string;
  coverImg?: string;

  /** 活动描述 */
  description?: string;

  /**
   * 活动结束时间
   * @format date-time
   */
  endTime?: string;

  /**
   * id
   * @format int64
   */
  id?: number;

  /** 商品信息 */
  marketingActivityGoodsParams?: MarketingActivityGoodsParam[];
  promotionParam?: MarketingActivityPromotionParam;

  /**
   * 活动开始时间
   * @format date-time
   */
  startTime?: string;
}

export interface MarketingActivityClassifyDto {
  /** 活动类型名称 */
  name?: string;

  /**
   * id
   * @format int64
   */
  id?: number;
}

export interface MarketingActivityOfFlashSaleDto {
  /** 活动名称 */
  activityName?: string;

  /** 活动编号 */
  activityNo?: string;

  /**
   * 活动类型 1:预售 2:限时抢购 3:满减 4:满折 5:满赠 6:包邮
   * @format int32
   */
  activityType?: number;

  /**
   * 活动完成后操作 0：设为普通商品 1：下架
   * @format int32
   */
  completed?: number;

  /** 活动规则 */
  content?: string;

  /** 活动描述 */
  description?: string;

  /**
   * 活动结束时间
   * @format date-time
   */
  endTime?: string;

  /**
   * id
   * @format int64
   */
  id?: number;

  /** 商品信息 */
  marketingActivityGoodsParams?: MarketingActivityGoodsParam[];

  /**
   * 活动开始时间
   * @format date-time
   */
  startTime?: string;
}

export interface MallConfPageModifyInputDto {
  /** 页面内容 */
  content?: string;

  /**
   * 设为首页 0 否 1 是
   * @format int32
   */
  homePage?: number;

  /**
   * id
   * @format int64
   */
  id?: number;

  /** 页面名称 */
  name?: string;

  /** 页面底色 */
  pageBgColor?: string;

  /** 页面标题 */
  title?: string;
}

export interface MallConfPageCreateInputDto {
  /** 页面内容 */
  content?: string;

  /**
   * 设为首页 0 否 1 是
   * @format int32
   */
  homePage?: number;

  /** 页面名称 */
  name?: string;

  /** 页面底色 */
  pageBgColor?: string;

  /** 页面标题 */
  title?: string;
}

export interface MallConfPageOutputDto {
  /** 页面内容 */
  content?: string;

  /**
   * 最后修改时间
   * @format date-time
   */
  gmtModified?: string;

  /**
   * 设为首页 0 否 1 是
   * @format int32
   */
  homePage?: number;

  /**
   * id
   * @format int64
   */
  id?: number;

  /** 页面名称 */
  name?: string;

  /** 页面底色 */
  pageBgColor?: string;

  /** 页面标题 */
  title?: string;
}

export interface LoginDto {
  /** 密码 */
  password?: string;

  /** 用户名 */
  username?: string;
}

export interface LoginOutputDto {
  /**
   * id
   * @format int64
   */
  id?: number;

  /** 密码 */
  password?: string;

  /** 用户名 */
  username?: string;
}

export interface JsonResult {
  /** @format int32 */
  code?: number;
  data?: object;
  msg?: string;
}

export interface GoodsSpecModifyInputDto {
  /**
   * 规格编号
   * @format int64
   */
  id?: number;

  /**
   * 父级id
   * @format int64
   */
  pid?: number;

  /**
   * 排序值
   * @format int32
   */
  sort?: number;

  /** 规格名称 */
  specName?: string;
}

export interface GoodsSpecCrerateInputDto {
  /**
   * 父级id
   * @format int64
   */
  pid?: number;

  /**
   * 排序值
   * @format int32
   */
  sort?: number;

  /** 规格名称 */
  specName?: string;
}

export interface GoodsSpecOutputDto {
  /** @format int64 */
  childrenNum?: number;

  /**
   * 规格编号
   * @format int64
   */
  id?: number;

  /**
   * 父级id
   * @format int64
   */
  pid?: number;

  /**
   * 排序值
   * @format int32
   */
  sort?: number;

  /** 规格名称 */
  specName?: string;
}

export interface GoodsSkuDTO {
  /**
   * 自定义起止销量
   * @format int32
   */
  customStartSales?: number;

  /** 是否启用 0 否 1是 */
  enabled?: boolean;

  /** 兑换积分 */
  exchangeIntegral?: number;

  /**
   * 商品id
   * @format int64
   */
  goodsId?: number;

  /**
   * 主键
   * @format int64
   */
  id?: number;

  /** 市场价 */
  marketPrice?: number;

  /** 销售价 */
  salesPrice?: number;

  /**
   * 积分
   * @format int32
   */
  score?: number;

  /** sku图片 */
  skuImg?: string;

  /** sku名称 */
  skuName?: string;

  /** sku编号 */
  skuNo?: string;

  /** 组合多规格子id，用逗号分割 */
  specIds?: string;

  /** sku组合名称（以逗号分隔） */
  specNames?: string;

  /** 组合多规格父id，用逗号分割 */
  specParentIds?: string;

  /**
   * 库存
   * @format int32
   */
  stock?: number;

  /** 体积（cm³） */
  volume?: number;

  /** 重量（kg） */
  weight?: number;
}

export interface GoodsSaveDTO {
  /** 商品详情页轮播图地址 */
  bannerImgPaths?: string;

  /**
   * 末级分类id
   * @format int32
   */
  classifyId?: number;

  /**
   * 分类父id1（末级的上一级）
   * @format int32
   */
  classifyPid1?: number;

  /**
   * 分类父id2（分类父id1的上一级）
   * @format int32
   */
  classifyPid2?: number;

  /** 封面图片 */
  coverImg?: string;

  /**
   * 运费模板ID
   * @format int64
   */
  expressTemplateId?: number;

  /** 是否前台展示 */
  frontShow?: boolean;

  /** 商品名称 */
  goodsName?: string;

  /** 商品编号 */
  goodsNo?: string;

  /** SKU信息 */
  goodsSkuList?: GoodsSkuDTO[];

  /**
   * 商品类型 0 普通商品 1 积分商品
   * @format int32
   */
  goodsType?: number;

  /**
   * 主键
   * @format int64
   */
  id?: number;

  /**
   * 富文本详情ID
   * @format int64
   */
  richId?: number;

  /** 上架状态 */
  shelved?: boolean;

  /**
   * 上下架时间
   * @format date-time
   */
  shelvesTime?: string;

  /**
   * 排序值
   * @format int32
   */
  sort?: number;

  /** 规格信息ID集合 */
  specList?: number[];

  /** 是否使用积分 */
  useScore?: boolean;

  /** 视频地址 */
  videoUrl?: string;
}

export interface GoodsClassifyOutputDto {
  /** 前端是否展示 */
  frontShow?: boolean;

  /**
   * 商品类型 0 普通商品 1 积分商品
   * @format int32
   */
  goodsType?: number;

  /**
   * 分类id
   * @format int64
   */
  id?: number;

  /** 分类名称 */
  name?: string;

  /** 图片 */
  pic?: string;

  /**
   * 父级ID
   * @format int64
   */
  pid?: number;
}

export interface GoodsClassifyMoveInputDto {
  /**
   * 当前要移动的分类id
   * @format int64
   */
  id?: number;

  /**
   * 当前要移动的目标分类父id
   * @format int64
   */
  pid?: number;

  /**
   * 当前要移动的目标索引
   * @format int32
   */
  sort?: number;
}

export interface GoodsClassifyModifyInputDto {
  /** 前端是否展示 */
  frontShow?: boolean;

  /**
   * 商品类型 0 普通商品 1 积分商品
   * @format int32
   */
  goodsType?: number;

  /**
   * 分类id
   * @format int64
   */
  id?: number;

  /** 分类名称 */
  name?: string;

  /** 图片 */
  pic?: string;

  /**
   * 父级ID
   * @format int64
   */
  pid?: number;
}

export interface ExpressTemplateModifyInputDto {
  /** 子区域信息 */
  expressTemplateAreas?: ExpressTemplateAreaModifyInputDto[];

  /**
   * id
   * @format int64
   */
  id?: number;

  /** 模板名称 */
  name?: string;

  /**
   * 模板类型 1买家承担 2卖家包邮
   * @format int32
   */
  shippingType?: number;

  /**
   * 运费计价方式 1总量 2 件数 3体积
   * @format int32
   */
  valuationType?: number;
}

export interface ForgotPasswordDto {
  /** 验证码 */
  code?: string;

  /** 手机号 */
  mobile?: string;

  /** 密码 */
  password?: string;
}

export interface GoodsClassifyCrateInputDto {
  /** 前端是否展示 */
  frontShow?: boolean;

  /**
   * 商品类型 0 普通商品 1 积分商品
   * @format int32
   */
  goodsType?: number;

  /** 分类名称 */
  name?: string;

  /** 图片 */
  pic?: string;

  /**
   * 父级ID
   * @format int64
   */
  pid?: number;
}

export interface ExpressTemplateListOutputDto {
  /**
   * 创建时间
   * @format date-time
   */
  gmtCreated?: string;

  /**
   * 主键
   * @format int64
   */
  id?: number;

  /** 模板名称 */
  name?: string;

  /**
   * 模板类型 1 卖家承担 2 卖家包邮
   * @format int32
   */
  shippingType?: number;

  /**
   * 运费计价方式 1 重量 2 件数 3 体积
   * @format int32
   */
  valuationType?: number;
}

export interface ExpressTemplateDetailOutputDto {
  /** 子区域信息 */
  expressTemplateAreas?: ExpressTemplateAreaModifyInputDto[];

  /**
   * id
   * @format int64
   */
  id?: number;

  /** 模板名称 */
  name?: string;

  /**
   * 模板类型 1买家承担 2卖家包邮
   * @format int32
   */
  shippingType?: number;

  /**
   * 运费计价方式 1总量 2 件数 3体积
   * @format int32
   */
  valuationType?: number;
}

export interface ExpressTemplateAreaModifyInputDto {
  /** 包含区域,ID逗号分隔。0代表全国 */
  area?: string;

  /** 首重/首件/首体积 */
  first?: number;

  /** 运费-首 */
  firstPrice?: number;

  /**
   * 子区域id，编辑时需要给
   * @format int64
   */
  id?: number;

  /** 续重/续件/续体积 */
  plus?: number;

  /** 运费-续 */
  plusPrice?: number;

  /** 区域文本 */
  text?: string;
}

export interface ExpressTemplateCreateInputDto {
  /** 子区域信息 */
  expressTemplateAreas?: ExpressTemplateAreaCreateInputDto[];

  /** 模板名称 */
  name?: string;

  /**
   * 模板类型 1买家承担 2卖家包邮
   * @format int32
   */
  shippingType?: number;

  /**
   * 运费计价方式 1总量 2 件数 3体积
   * @format int32
   */
  valuationType?: number;
}

export interface ExpressTemplateAreaCreateInputDto {
  /** 包含区域,ID逗号分隔。0代表全国 */
  area?: string;

  /** 首重/首件/首体积 */
  first?: number;

  /** 运费-首 */
  firstPrice?: number;

  /** 续重/续件/续体积 */
  plus?: number;

  /** 运费-续 */
  plusPrice?: number;

  /** 区域文本 */
  text?: string;
}

export interface CouponTemplateStatusInputDto {
  /**
   * 编号
   * @format int64
   */
  id?: number;

  /**
   * 显示状态，1：显示，0：不显示
   * @format int32
   */
  isPublic?: number;
}

export interface CouponTemplateModifyInputDto {
  /** （可修改）适用商品、品牌、类目集合,逗号分隔 */
  acceptGoodsSet?: string;

  /** 适用商品集合扩展字段,逗号分隔 */
  acceptGoodsSetExtend?: string;

  /**
   * （可修改）商品适用范围  0 全商品(店铺) 1 指定商品(店铺) 2 全场(平台) 3 指定品牌(平台) 4 指定类目(平台) 5指定店铺(平台)
   * @format int32
   */
  acceptGoodsType?: number;

  /**
   * 优惠劵类型 0 抵扣 1 折扣 2 赠品 3 兑换 4 包邮
   * @format int32
   */
  couponType?: number;

  /** 使用条件需求价格 */
  demandPrice?: number;

  /** （可修改）使用说明 */
  detail?: string;

  /** 折扣率,% */
  discount?: number;

  /**
   * 有效天数(生效时间条件为2必填)
   * @format int32
   */
  expDayCount?: number;

  /**
   * 生效时间条件 1 指定时间 2 动态时间
   * @format int32
   */
  expireDateType?: number;

  /**
   * id
   * @format int64
   */
  id?: number;

  /**
   * 是否公开 1：公开 0：不公开
   * @format int32
   */
  isPublic?: number;

  /**
   * 每人限领张数
   * @format int32
   */
  memberLimit?: number;

  /** 优惠劵名称 */
  name?: string;

  /** 价值金额 */
  price?: number;

  /**
   * 领取时间结束（领取时间不能晚于有效期结束时间）
   * @format date-time
   */
  receiveEnd?: string;

  /**
   * 领取时间开始（领取时间不能晚于有效期结束时间）
   * @format date-time
   */
  receiveStart?: string;

  /**
   * 领取后几天生效(生效时间条件为2必填)
   * @format int32
   */
  startDayCount?: number;

  /**
   * 库存
   * @format int32
   */
  stock?: number;

  /**
   * 有效期结束(生效时间条件为1必填)
   * @format date-time
   */
  termEnd?: string;

  /**
   * 有效期开始(生效时间条件为1必填)
   * @format date-time
   */
  termStart?: string;
}

export interface CouponSendInputDto {
  mobiles?: string[];

  /** @format int32 */
  num?: number;
  templateNo?: string;
}

export interface CouponTemplateCreateInputDto {
  /** （可修改）适用商品、品牌、类目集合,逗号分隔 */
  acceptGoodsSet?: string;

  /** 适用商品集合扩展字段,逗号分隔 */
  acceptGoodsSetExtend?: string;

  /**
   * （可修改）商品适用范围  0 全商品(店铺) 1 指定商品(店铺) 2 全场(平台) 3 指定品牌(平台) 4 指定类目(平台) 5指定店铺(平台)
   * @format int32
   */
  acceptGoodsType?: number;

  /**
   * 优惠劵类型 0 抵扣 1 折扣 2 赠品 3 兑换 4 包邮
   * @format int32
   */
  couponType?: number;

  /** 使用条件需求价格 */
  demandPrice?: number;

  /** （可修改）使用说明 */
  detail?: string;

  /** 折扣率,% */
  discount?: number;

  /**
   * 有效天数(生效时间条件为2必填)
   * @format int32
   */
  expDayCount?: number;

  /**
   * 生效时间条件 1 指定时间 2 动态时间
   * @format int32
   */
  expireDateType?: number;

  /**
   * 是否公开 1：公开 0：不公开
   * @format int32
   */
  isPublic?: number;

  /**
   * 每人限领张数
   * @format int32
   */
  memberLimit?: number;

  /** 优惠劵名称 */
  name?: string;

  /** 价值金额 */
  price?: number;

  /**
   * 领取时间结束（领取时间不能晚于有效期结束时间）
   * @format date-time
   */
  receiveEnd?: string;

  /**
   * 领取时间开始（领取时间不能晚于有效期结束时间）
   * @format date-time
   */
  receiveStart?: string;

  /**
   * 领取后几天生效(生效时间条件为2必填)
   * @format int32
   */
  startDayCount?: number;

  /**
   * 库存
   * @format int32
   */
  stock?: number;

  /**
   * 有效期结束(生效时间条件为1必填)
   * @format date-time
   */
  termEnd?: string;

  /**
   * 有效期开始(生效时间条件为1必填)
   * @format date-time
   */
  termStart?: string;
}

export interface CouponRecordQuery {
  /**
   * 开始时间
   * @format date-time
   */
  beginTime?: string;

  /**
   * 结束时间
   * @format date-time
   */
  endTime?: string;

  /**
   * 主键
   * @format int64
   */
  id?: number;

  /** 优惠劵名称 */
  name?: string;

  /**
   * 当前页码
   * @format int32
   */
  pageNum?: number;

  /**
   * 每页数据量
   * @format int32
   */
  pageSize?: number;
}

export interface CouponRecordOutputDto {
  /**
   * 发放时间
   * @format date-time
   */
  gmtCreated?: string;

  /** 手机号 */
  mobile?: string;

  /** 用户昵称 */
  nickName?: string;

  /** 失败原因 */
  remark?: string;

  /** 结果 */
  result?: string;
}

export interface CouponRecordDetailOutputDto {
  /**
   * 领取类型 0 直接领取 1 后台发放
   * @format int32
   */
  acceptType?: number;

  /**
   * 优惠劵类型 0 抵扣 1 折扣
   * @format int32
   */
  couponType?: number;

  /** 使用条件需求价格 */
  demandPrice?: number;

  /** 折扣 */
  discount?: number;

  /**
   * 有效天数(生效时间条件为2必填)
   * @format int32
   */
  expDayCount?: number;

  /**
   * 生效时间条件 0 无限制 1 指定时间 2 动态时间
   * @format int32
   */
  expireDateType?: number;

  /**
   * 发放时间
   * @format date-time
   */
  gmtCreated?: string;

  /**
   * id
   * @format int64
   */
  id?: number;

  /** 优惠劵名称 */
  name?: string;

  /**
   * 领取数量
   * @format int32
   */
  num?: number;

  /** 价值金额 */
  price?: number;

  /**
   * 领取后几天生效(生效时间条件为2必填)
   * @format int32
   */
  startDayCount?: number;

  /** 优惠劵模板编号 */
  templateNo?: string;

  /**
   * 有效期结束(生效时间条件为1必填)
   * @format date-time
   */
  termEnd?: string;

  /**
   * 有效期开始(生效时间条件为1必填)
   * @format date-time
   */
  termStart?: string;
}

export interface ConfConfigOutputDto {
  /** 字段key */
  fieldKey?: string;

  /** 字段值 */
  fieldValue?: string;

  /**
   * id
   * @format int64
   */
  id?: number;
}

export interface CouponRecordDetailQuery {
  /**
   * 开始时间
   * @format date-time
   */
  beginTime?: string;

  /**
   * 礼券记录id
   * @format int64
   */
  couponId?: number;

  /**
   * 结束时间
   * @format date-time
   */
  endTime?: string;

  /**
   * 主键
   * @format int64
   */
  id?: number;

  /** 手机号 */
  mobile?: string;

  /**
   * 当前页码
   * @format int32
   */
  pageNum?: number;

  /**
   * 每页数据量
   * @format int32
   */
  pageSize?: number;

  /**
   * 状态 0 失败 1 成功
   * @format int32
   */
  status?: number;
}

export interface CommentsImportItem {
  /** 评价内容 */
  content?: string;

  /**
   * 商品评分 1~5
   * @format int32
   */
  goodsGrade?: number;

  /** 商品编号 */
  goodsNo?: string;

  /** 昵称 */
  nickName?: string;
}

export interface CommentsParam {
  /**
   * id 不能为空
   * @format int64
   */
  id?: number;

  /** 开关状态 */
  status?: boolean;
}

export interface CommentsHeadImgOutputDto {
  /** 头像 */
  headImg?: string;

  /**
   * id
   * @format int64
   */
  id?: number;
}

export interface CommentsImportInputDto {
  items?: CommentsImportItem[];
}

export interface BatchShipInfoParam {
  /** 快递公司名称 */
  expressCompany?: string;

  /** 快递公司编码 */
  expressCompanyCode?: string;

  /**
   * 配送方式 0：商家配送 1：无需物流
   * @format int32
   */
  shippingMethod?: number;

  /** 发货订单 */
  shippingOrderList?: OrderShipping[];
}

export interface BaseStatus {
  /** 编号 */
  no: string;

  /** 开关状态 */
  status: boolean;
}

export interface BannerOutputDto {
  /**
   * 编号
   * @format int64
   */
  id?: number;

  /** 图片链接 */
  imgUrl: string;

  /** 名称 */
  name?: string;

  /** 显示位置 */
  position?: string;

  /**
   * 显示状态 1显示0不显示
   * @format int32
   */
  showStatus: number;

  /**
   * 排序值
   * @format int32
   */
  sort: number;

  /** 外链地址 */
  url?: string;

  /**
   * 外链类型
   * @format int32
   */
  urlType?: number;
}

export interface BannerModifyStatusInputDto {
  /**
   * 编号
   * @format int64
   */
  id?: number;

  /**
   * 显示状态 1显示0不显示
   * @format int32
   */
  showStatus: number;
}

export interface AddressOutputDto {
  /**
   * 区域id
   * @format int64
   */
  areaId?: number;

  /** 区域名 */
  areaName?: string;

  /**
   * 市id
   * @format int64
   */
  cityId?: number;

  /** 城市名 */
  cityName?: string;

  /** 国家名 */
  countryName?: string;

  /**
   * id
   * @format int64
   */
  id?: number;

  /**
   * 是否默认 0 无 1 发货地址 2 退货地址 3 全部
   * @format int32
   */
  isDefault?: number;

  /** 手机号 */
  mobile?: string;

  /** 联系人姓名 */
  name?: string;

  /**
   * 省id
   * @format int64
   */
  provinceId?: number;

  /** 省份名 */
  provinceName?: string;

  /** 详细地址 */
  singleAddress?: string;
}

export interface BannerCreateInputDto {
  /** 图片链接 */
  imgUrl: string;

  /** 名称 */
  name?: string;

  /** 显示位置 */
  position?: string;

  /**
   * 显示状态 1显示0不显示
   * @format int32
   */
  showStatus: number;

  /**
   * 排序值
   * @format int32
   */
  sort: number;

  /** 外链地址 */
  url?: string;

  /**
   * 外链类型
   * @format int32
   */
  urlType?: number;
}

export interface BannerModifyInputDto {
  /**
   * 编号
   * @format int64
   */
  id?: number;

  /** 图片链接 */
  imgUrl: string;

  /** 名称 */
  name?: string;

  /** 显示位置 */
  position?: string;

  /**
   * 显示状态 1显示0不显示
   * @format int32
   */
  showStatus: number;

  /**
   * 排序值
   * @format int32
   */
  sort: number;

  /** 外链地址 */
  url?: string;

  /**
   * 外链类型
   * @format int32
   */
  urlType?: number;
}

export interface AddressModifyInputDto {
  /**
   * 区域id
   * @format int64
   */
  areaId?: number;

  /** 区域名 */
  areaName?: string;

  /**
   * 市id
   * @format int64
   */
  cityId?: number;

  /** 城市名 */
  cityName?: string;

  /** 国家名 */
  countryName?: string;

  /**
   * id
   * @format int64
   */
  id?: number;

  /**
   * 是否默认 0 无 1 发货地址 2 退货地址 3 全部
   * @format int32
   */
  isDefault?: number;

  /** 手机号 */
  mobile?: string;

  /** 联系人姓名 */
  name?: string;

  /**
   * 省id
   * @format int64
   */
  provinceId?: number;

  /** 省份名 */
  provinceName?: string;

  /** 详细地址 */
  singleAddress?: string;
}

export interface AddressCreateInputDto {
  /**
   * 区域id
   * @format int64
   */
  areaId?: number;

  /** 区域名 */
  areaName?: string;

  /**
   * 市id
   * @format int64
   */
  cityId?: number;

  /** 城市名 */
  cityName?: string;

  /** 国家名 */
  countryName?: string;

  /**
   * 是否默认 0 无 1 发货地址 2 退货地址 3 全部
   * @format int32
   */
  isDefault?: number;

  /** 手机号 */
  mobile?: string;

  /** 联系人姓名 */
  name?: string;

  /**
   * 省id
   * @format int64
   */
  provinceId?: number;

  /** 省份名 */
  provinceName?: string;

  /** 详细地址 */
  singleAddress?: string;
}

export interface ActivityOpenDto {
  /** 活动编号 */
  activityNo?: string;

  /**
   * 开启关闭 0 关闭 1 开启
   * @format int32
   */
  open?: number;
}

export type WepayNotifyUsingPOSTXmldata = string;

export interface UserAddressOutPutDto {
  /** 街道地址 */
  address?: string;

  /** 市 */
  city?: string;

  /**
   * 市id
   * @format int32
   */
  cityId?: number;

  /** 坐标 */
  coords?: string;

  /** 是否默认 */
  defaulted?: boolean;

  /** 区 */
  district?: string;

  /**
   * 区id
   * @format int32
   */
  districtId?: number;

  /**
   * 地址编号
   * @format int64
   */
  id?: number;

  /** 电话 */
  mobile?: string;

  /** 联系人姓名 */
  name?: string;

  /** 省 */
  province?: string;

  /**
   * 省份id
   * @format int32
   */
  provinceId?: number;

  /**
   * 标签 1家 2公司 3学校
   * @format int32
   */
  tag?: number;
}

export interface UserAddressModifyInputDto {
  /** 街道地址 */
  address?: string;

  /** 市 */
  city?: string;

  /**
   * 市id
   * @format int32
   */
  cityId?: number;

  /** 坐标 */
  coords?: string;

  /** 是否默认 */
  defaulted?: boolean;

  /** 区 */
  district?: string;

  /**
   * 区id
   * @format int32
   */
  districtId?: number;

  /**
   * 地址编号
   * @format int64
   */
  id?: number;

  /** 电话 */
  mobile?: string;

  /** 联系人姓名 */
  name?: string;

  /** 省 */
  province?: string;

  /**
   * 省份id
   * @format int32
   */
  provinceId?: number;

  /**
   * 标签 1家 2公司 3学校
   * @format int32
   */
  tag?: number;
}

export interface UserAddressCreateInputDto {
  /** 街道地址 */
  address?: string;

  /** 市 */
  city?: string;

  /**
   * 市id
   * @format int32
   */
  cityId?: number;

  /** 坐标 */
  coords?: string;

  /** 是否默认 */
  defaulted?: boolean;

  /** 区 */
  district?: string;

  /**
   * 区id
   * @format int32
   */
  districtId?: number;

  /** 电话 */
  mobile?: string;

  /** 联系人姓名 */
  name?: string;

  /** 省 */
  province?: string;

  /**
   * 省份id
   * @format int32
   */
  provinceId?: number;

  /**
   * 标签 1家 2公司 3学校
   * @format int32
   */
  tag?: number;
}

export interface UnlimitedInputDto {
  /** 是否透明底色 */
  hyaline?: boolean;

  /** 页面 */
  page?: string;
  scene?: string;

  /** 版本 */
  version?: string;
}

export interface ShopCartVO {
  /**
   * 数量
   * @format int32
   */
  buyCounts?: number;

  /** 渠道id:直播id */
  channelId?: string;

  /** 封面图片 */
  coverImg?: string;

  /** 商品名称 */
  goodsName?: string;

  /** 商品编号 */
  goodsNo?: string;
  goodsPrice?: number;

  /** @format int32 */
  goodsStock?: number;

  /** @format int32 */
  goodsType?: number;

  /** 营销活动 */
  marketingActivityList?: MarketingActivityDto[];

  /** sku图片 */
  skuImg?: string;

  /** 市场价 */
  skuMarketPrice?: number;

  /** sku编号 */
  skuNo?: string;

  /** sku价格 */
  skuPrice?: number;

  /**
   * sku库存
   * @format int32
   */
  skuStock?: number;

  /** sku组合名称（以逗号分隔） */
  specNames?: string;

  /** 是否有效 true:有效 false:失效 */
  validity?: boolean;
}

export interface ShopCartDto {
  /**
   * 变动数量
   * @format int32
   */
  buyCounts?: number;

  /** 需要删除的sku编号集合 */
  delSkuNos?: string[];

  /** 商品编号 */
  goodsNo?: string;

  /** 旧sku编号 */
  oldSkuNo?: string;

  /** sku编号 */
  skuNo?: string;
}

export interface RefundShippingParam {
  /** 快递公司名称 */
  expressCompany?: string;

  /** 快递公司编码 */
  expressCompanyCode?: string;

  /** 快递单号 */
  expressNo?: string;

  /** 售后单编号 */
  refundNo?: string;
}

export interface RefundReasonOutputDto {
  /** 创建人(后台管理员ID) */
  createUser?: string;

  /**
   * 创建时间
   * @format date-time
   */
  gmtCreated?: string;

  /**
   * 修改时间
   * @format date-time
   */
  gmtModified?: string;

  /**
   * id
   * @format int64
   */
  id?: number;

  /** 修改人(后台管理员ID) */
  modifyUser?: string;

  /** 售后原因 */
  name?: string;

  /**
   * 排序、降序
   * @format int32
   */
  sort?: number;

  /**
   * 数据状态 0 无效 1 有效
   * @format int32
   */
  status?: number;

  /** 适用场景 0 仅退款 未收到货 1 仅退款 已收到货 2 退货退款,多个逗号分隔 */
  type?: string;
}

export interface RefundOrderParam {
  /** 申请退款金额 */
  applyRefundAmount?: number;

  /** 运费金额 整单退货不需要传入 */
  freightAmount?: number;

  /** 售后图片 */
  images?: string;

  /** 订单编号 */
  orderNo?: string;

  /**
   * 退货原因
   * @format int32
   */
  reason?: number;

  /** 退货原因说明 */
  reasonTxt?: string;

  /** 退款金额 */
  refundAmount?: number;

  /** 退货明细 整单退货不需要传入 */
  refundItemList?: RefundItemDto[];

  /** 售后描述 */
  refundNote?: string;

  /**
   * 售后类型 0：退款 1：退货退款
   * @format int32
   */
  refundType?: number;
}

export interface RefundMasterDto {
  /** 是否整单售后 */
  allSave?: boolean;

  /** 申请退运费金额 */
  applyFreightAmount?: number;

  /** 申请退款金额 */
  applyRefundAmount?: number;

  /**
   * 退款申请时间
   * @format date-time
   */
  applyTime?: string;

  /** 区域名 */
  areaName?: string;

  /** 城市名 */
  cityName?: string;

  /** 验货处理人 */
  completePerson?: string;

  /**
   * 处理结果 0：未处理 1：已退款 2：拒绝退款
   * @format int32
   */
  completeResult?: number;

  /**
   * 退款完成时间
   * @format date-time
   */
  completeTime?: string;

  /** 退货物流公司 */
  expressCompany?: string;

  /** 退货物流公司编码 */
  expressCompanyCode?: string;

  /** 退货快递单号 */
  expressNo?: string;

  /** 退款运费金额 */
  freightAmount?: number;

  /**
   * 运费状态 1:不可退运费 0:可退运费
   * @format int32
   */
  freightState?: number;

  /**
   * 创建时间
   * @format date-time
   */
  gmtCreated?: string;

  /**
   * id
   * @format int64
   */
  id?: number;

  /** 售后图片 */
  images?: string;

  /**
   * 商户ID
   * @format int64
   */
  merchantId?: number;

  /** 手机号 */
  mobile?: string;

  /** 联系人姓名 */
  name?: string;

  /** 订单运费金额 */
  orderFreightAmount?: number;

  /** 订单编号 */
  orderNo?: string;

  /** 订单支付金额 */
  orderPaymentAmount?: number;

  /**
   * 订单状态
   * @format int32
   */
  orderStatus?: number;

  /**
   * 支付类型
   * @format int32
   */
  payType?: number;

  /** 验货处理说明 */
  processCheckNote?: string;

  /**
   * 处理验货时间
   * @format date-time
   */
  processCheckTime?: string;

  /** 退款处理人 */
  processPerson?: string;

  /**
   * 处理结果 0：未处理 1：已退款 2：拒绝退款
   * @format int32
   */
  processResult?: number;

  /**
   * 商家处理时间
   * @format date-time
   */
  processTime?: string;

  /** 省份名 */
  provinceName?: string;

  /** 实际支付金额 */
  realAmount?: number;

  /**
   * 退货原因
   * @format int32
   */
  reason?: number;

  /** 退货原因说明 */
  reasonTxt?: string;

  /** 退款金额 */
  refundAmount?: number;

  /** 微信退款单号 */
  refundId?: string;

  /** 售后明细 */
  refundItemList?: RefundItemDto[];

  /** 售后单编号 */
  refundNo?: string;

  /** 售后描述 */
  refundNote?: string;

  /**
   * 售后状态
   * @format int32
   */
  refundStatus?: number;

  /**
   * 售后类型 0：退款 1：退货退款
   * @format int32
   */
  refundType?: number;

  /**
   * 买家退货时间
   * @format date-time
   */
  returnTime?: string;

  /** 详细地址 */
  singleAddress?: string;

  /** 处理备注 */
  storeNote?: string;

  /** 微信支付交易流水号 */
  transactionId?: string;

  /**
   * 会员ID
   * @format int64
   */
  userId?: number;

  /** 会员手机号 */
  userMobile?: string;

  /** 会员姓名 */
  userName?: string;
}

export interface RefundItemDto {
  /** 申请退款金额 */
  applyRefundAmount?: number;

  /**
   * 申请退回积分
   * @format int32
   */
  applyRefundScore?: number;

  /** 商品图片 */
  goodsImg?: string;

  /** 商品名称 */
  goodsName?: string;

  /** 商品编码 */
  goodsNo?: string;

  /** 商品价格 */
  goodsPrice?: number;

  /**
   * 货物状态 0：未收到货 1：部分收货 2:已收到货
   * @format int32
   */
  goodsStatus?: number;

  /** 售后图片 */
  images?: string;

  /**
   * 商户ID
   * @format int32
   */
  merchantId?: number;

  /** 规格 */
  model?: string;

  /**
   * 订单项 商品类型 0：普通商品 1：赠品 2：兑换商品 3：赠品券
   * @format int32
   */
  orderItemType?: number;

  /** 订单编号 */
  orderNo?: string;

  /** 实际支付金额 */
  realAmount?: number;

  /** 退款金额 */
  refundAmount?: number;

  /** 售后单编号 */
  refundNo?: string;

  /** 售后描述 */
  refundNote?: string;

  /**
   * 退货数量
   * @format int32
   */
  refundQuantity?: number;

  /**
   * 退回积分
   * @format int32
   */
  refundScore?: number;

  /** sku图片 */
  skuImg?: string;

  /** SKU编码 */
  skuNo?: string;
}

export interface PromotionCondition {
  /** 优惠条件 N件/N元 */
  con?: number;

  /** 商品名称 */
  goodsName?: string;

  /** 商品编号 (满赠必传) */
  goodsNo?: string;

  /** 优惠金额/折扣 (满减满折必传)/赠品数量(满赠必传) */
  promo?: number;

  /** sku名称 */
  skuName?: string;

  /** sku编号(满赠必传) */
  skuNo?: string;
}

export interface OrderVO {
  allDiscountAmount?: number;

  /** 关闭售后 0：否 1：是 */
  closeRefund?: boolean;

  /**
   * 关闭时间
   * @format date-time
   */
  closedAt?: string;

  /** 关闭原因 */
  closedReason?: string;

  /** 是否评价 */
  comment?: boolean;

  /**
   * 评论时间
   * @format date-time
   */
  commentAt?: string;

  /** 优惠金额 */
  discountAmount?: number;

  /** 兑换积分 */
  exchangeIntegral?: number;

  /** 是否完成 0否 1是 */
  finish?: boolean;

  /** 抵扣后运费 */
  freightAmount?: number;

  /**
   * 订单创建时间
   * @format date-time
   */
  gmtCreated?: string;

  /** 商品金额 */
  goodsAmount?: number;

  /**
   * 主键
   * @format int64
   */
  id?: number;

  /** 子订单信息 */
  items?: OrderItemsVO[];

  /**
   * 物流状态 0未发货 1已发货 2已收获
   * @format int32
   */
  logisticsStatus?: number;

  /** 订单金额/应付金额 */
  orderAmount?: number;

  /** 订单渠道 */
  orderChannelType?: "WeiXin" | "WebApp" | "Android" | "IOS";

  /**
   * 获得积分
   * @format int32
   */
  orderIntegral?: number;

  /** 订单的优惠明细 */
  orderMasterMarketingList?: OrderMasterMarketingDto[];

  /** 订单编号 */
  orderNo?: string;

  /**
   * 订单状态 0交易中 1交易成功-1 交易关闭
   * @format int32
   */
  orderStatus?: number;

  /** 订单状态名称 */
  orderStatusName?: string;

  /**
   * 订单类型
   * @format int32
   */
  orderType?: number;

  /** 已支付金额，第三方支付工具回调 */
  paidAmount?: number;

  /** 实际支付金额 */
  payAmount?: number;

  /**
   * 支付时间
   * @format date-time
   */
  payAt?: string;

  /**
   * 结束支付时间
   * @format date-time
   */
  payEndAt?: string;

  /**
   * 0 未支付 1 支付成功 -1支付失败
   * @format int32
   */
  payStatus?: number;

  /**
   * 支付类型: 1微信支付 2支付宝支付3线下支付
   * @format int32
   */
  payType?: number;

  /** 抵扣前运费 */
  realFreightAmount?: number;

  /**
   * 确认收货时间
   * @format date-time
   */
  receiptAt?: string;

  /**
   * 售后状态 0无售后 1有售后
   * @format int32
   */
  refundStatus?: number;

  /** 0快递，1自提 */
  selfPicked?: boolean;

  /** 收件人详细地址 */
  shippingAddress?: string;

  /**
   * 发货时间
   * @format date-time
   */
  shippingAt?: string;

  /** 收件人市 */
  shippingCity?: string;

  /** 收件人区 */
  shippingDistrict?: string;

  /** 订单发货信息 */
  shippingList?: OrderShippingDto[];

  /** 收货人电话 */
  shippingMobile?: string;

  /** 收货人 */
  shippingName?: string;

  /** 收件人省份 */
  shippingProvince?: string;

  /**
   * 统一状态
   * @format int32
   */
  status?: number;

  /**
   * 下单使用的总积分
   * @format int32
   */
  totalScore?: number;

  /** 微信支付交易流水号 */
  transactionId?: string;

  /** 买家留言 */
  userComments?: string;

  /**
   * 会员ID
   * @format int64
   */
  userId?: number;

  /** 会员手机号 */
  userMobile?: string;

  /** 会员姓名 */
  userName?: string;
}

export interface OrderShippingItemDto {
  /** 商品图片 */
  goodsImg?: string;

  /** 商品名称 */
  goodsName?: string;

  /** 商品编码 */
  goodsNo?: string;

  /** 规格 */
  model?: string;

  /**
   * 订单明细ID
   * @format int64
   */
  orderItemId?: number;

  /**
   * 数量
   * @format int32
   */
  quantity?: number;

  /** sku图片 */
  skuImg?: string;

  /** SKU编码 */
  skuNo?: string;
}

export interface OrderShippingDto {
  /** 收货人手机 */
  consigneeMobile?: string;

  /** 快递公司名称 */
  expressCompany?: string;

  /** 快递公司编码 */
  expressCompanyCode?: string;

  /** 快递单号 */
  expressNo?: string;

  /** 会员编号 */
  memberNo?: string;

  /** 订单编号 */
  orderNo?: string;

  /** 发货明细 */
  orderShippingItemDtoList?: OrderShippingItemDto[];

  /**
   * 收货时间
   * @format date-time
   */
  receivingTime?: string;

  /**
   * 发货时间
   * @format date-time
   */
  shippingTime?: string;

  /**
   * 发货类型 0：订单 1：售后
   * @format int32
   */
  shippingType?: number;

  /** 店铺编号 */
  storeNo?: string;
}

export interface OrderPayDTO {
  orderAmount?: number;

  /** @format int64 */
  orderId?: number;
  orderNo?: string;
  payAmount?: number;

  /** nonceStr, packageValue, paySign, timeStamp, signType 微信支付参数 */
  payParam?: object;
}

export interface OrderItemsDTO {
  /** 活动折扣 */
  activeDiscount?: number;

  /** 渠道id:直播id */
  channelId?: string;

  /** 优惠券折扣 */
  couponDiscount?: number;

  /** 优惠券ID */
  couponNo?: string;

  /** 优惠金额，所有优惠合计 */
  discountAmount?: number;

  /** 兑换积分 */
  exchangeIntegral?: number;

  /**
   * 运费模板ID
   * @format int64
   */
  expressTemplateId?: number;

  /** 该明细的运费 */
  freightAmount?: number;

  /** 是否是赠品 0：否 1：是 */
  gift?: boolean;

  /**
   * 商品ID
   * @format int64
   */
  goodsId?: number;

  /** 商品图片 */
  goodsImg?: string;

  /** 商品名称 */
  goodsName?: string;

  /** 商品编号 */
  goodsNo?: string;

  /**
   * 商品类型 0 普通商品 1 积分商品
   * @format int32
   */
  goodsType?: number;

  /**
   * 主键
   * @format int32
   */
  id?: number;

  /** 子订单编号 */
  itemNo?: string;

  /**
   * 获得积分
   * @format int32
   */
  itemScore?: number;

  /** 活动抵扣金额 */
  itemsActiveDeduction?: number;

  /** 销售价合计 */
  itemsAmount?: number;

  /** 优惠券抵扣金额 */
  itemsCouponDeduction?: number;

  /** 总兑换积分 */
  itemsExchangeIntegral?: number;

  /** 实收款 */
  itemsPayAmount?: number;

  /** 积分抵扣金额 */
  itemsPointDeduction?: number;

  /** 运费抵扣 */
  itemsShippingDeduction?: number;

  /** 会员抵扣金额 */
  itemsUserDeduction?: number;

  /** 商品市场价 */
  marketPrice?: number;

  /**
   * 订单ID
   * @format int32
   */
  orderId?: number;

  /** 订单明细的优惠明细 */
  orderItemMarketingList?: OrderItemMarketingDto[];

  /**
   * 订单项 商品类型 0：普通商品 1：赠品 2：兑换商品
   * @format int32
   */
  orderItemType?: number;

  /** 订单编号 */
  orderNo?: string;

  /**
   * 售后状态0 未申请 1 申请中 2 售后完成 3售后拒绝
   * @format int32
   */
  refundStatus?: number;

  /** 商品销售价 */
  salePrice?: number;

  /**
   * 购买数量
   * @format int32
   */
  saleQuantity?: number;

  /**
   * 使用积分
   * @format int32
   */
  score?: number;

  /**
   * 已发货数量
   * @format int32
   */
  shipingQuantity?: number;

  /**
   * 发货状态 0：未发货 1：部分发货 2:已发货
   * @format int32
   */
  shipingStatus?: number;

  /**
   * 商品SKU ID
   * @format int64
   */
  skuId?: number;

  /** sku图片 */
  skuImg?: string;

  /** 规格名称（组合） */
  skuName?: string;

  /** 商品SKU编号 */
  skuNo?: string;

  /** 是否使用积分 */
  useScore?: boolean;

  /** 会员折扣 */
  userDiscount?: number;

  /** 体积 */
  volumn?: number;

  /** 重量 */
  weight?: number;
}

export interface OrderMasterMarketingDto {
  /** （下单时有值）优惠条件 N件/N元 */
  con?: number;

  /** 优惠比例 */
  discount?: number;

  /** 总优惠金额 */
  discountAmount?: number;

  /**
   * 优惠类型 0 抵扣 1 折扣 2 活动价 3 抵扣运费
   * @format int32
   */
  discountType?: number;

  /**
   * 活动类型 0：拼团 1：预售 2：限时抢购 3:满减 4:满折 5:满赠 6 优惠券 7 会员折扣 8 积分
   * @format int32
   */
  marketingType?: number;

  /** @format int64 */
  merchantId?: number;

  /** 订单编号 */
  orderNo?: string;

  /** 优惠金额(促销类型为积分时些值为使用的积分数量) */
  price?: number;

  /** （下单时有值）优惠金额/折扣 (满减满折)/赠品数量(满赠) */
  promo?: number;

  /**
   * （下单时有值）优惠条件类型 0：满N件 1：满N元
   * @format int32
   */
  promotionConditionType?: number;

  /**
   * （下单时有值）优惠类型 0：阶梯优惠 1：循环优惠
   * @format int32
   */
  promotionType?: number;

  /** 优惠券或活动名称 */
  relName?: string;

  /** 优惠券或活动编号 */
  relNo?: string;

  /** 发货时间 */
  shippingTime?: string;

  /**
   * 发货时间 0：固定时间 1：付款后X天
   * @format int32
   */
  shippingTimeType?: number;
}

export interface OrderItemsVO {
  /** 活动折扣 */
  activeDiscount?: number;

  /** 渠道id:直播id */
  channelId?: string;

  /** 优惠券折扣 */
  couponDiscount?: number;

  /** 礼券编号 */
  couponNo?: string;

  /** 优惠金额，所有优惠合计 */
  discountAmount?: number;

  /** 优惠文本 */
  discountAmountStr?: string;

  /** 兑换积分 */
  exchangeIntegral?: number;

  /** 该明细的运费 */
  freightAmount?: number;

  /** 是否是赠品 0：否 1：是 */
  gift?: boolean;

  /**
   * 商品ID
   * @format int64
   */
  goodsId?: number;

  /** 商品图片 */
  goodsImg?: string;

  /** 商品名称 */
  goodsName?: string;

  /** 商品编号 */
  goodsNo?: string;

  /**
   * 商品类型 0 普通商品 1 积分商品
   * @format int32
   */
  goodsType?: number;

  /**
   * 主键
   * @format int64
   */
  id?: number;

  /** 子订单编号 */
  itemNo?: string;

  /**
   * 获得积分
   * @format int32
   */
  itemScore?: number;

  /** 活动抵扣金额 */
  itemsActiveDeduction?: number;

  /** 销售价合计 */
  itemsAmount?: number;

  /** 优惠券抵扣金额 */
  itemsCouponDeduction?: number;

  /** 总兑换积分 */
  itemsExchangeIntegral?: number;

  /** 实收款 */
  itemsPayAmount?: number;

  /** 实收款文本 */
  itemsPayAmountStr?: string;

  /** 积分抵扣金额 */
  itemsPointDeduction?: number;

  /** 运费抵扣 */
  itemsShippingDeduction?: number;

  /** 会员抵扣金额 */
  itemsUserDeduction?: number;

  /** 商品市场价 */
  marketPrice?: number;

  /**
   * 订单ID
   * @format int64
   */
  orderId?: number;

  /** 订单明细营销活动 */
  orderItemMarketingList?: OrderItemMarketingDto[];

  /**
   * 订单项 商品类型 0：普通商品 1：赠品 2：兑换商品 3：赠品券
   * @format int32
   */
  orderItemType?: number;

  /** 订单编号 */
  orderNo?: string;

  /**
   * 售后状态0 未申请 1 申请中 2 售后完成 3售后拒绝
   * @format int32
   */
  refundStatus?: number;

  /** 商品销售价 */
  salePrice?: number;

  /** 商品销售价文本 */
  salePriceStr?: string;

  /**
   * 购买数量
   * @format int32
   */
  saleQuantity?: number;

  /**
   * 下单使用的积分
   * @format int32
   */
  score?: number;

  /**
   * 已发货数量
   * @format int32
   */
  shipingQuantity?: number;

  /**
   * 发货状态 0：未发货 1：部分发货 2:已发货
   * @format int32
   */
  shipingStatus?: number;

  /**
   * 商品SKU ID
   * @format int64
   */
  skuId?: number;

  /** sku图片 */
  skuImg?: string;

  /** 规格名称（组合） */
  skuName?: string;

  /** 商品SKU编号 */
  skuNo?: string;

  /** 会员折扣 */
  userDiscount?: number;
}

export interface OrderDTO {
  /**
   * 关闭时间
   * @format date-time
   */
  closedAt?: string;

  /** 关闭原因 */
  closedReason?: string;

  /** 是否评价 */
  comment?: boolean;

  /**
   * 评论时间
   * @format date-time
   */
  commentAt?: string;

  /** 优惠金额，所有优惠合计 */
  discountAmount?: number;

  /** 兑换积分 */
  exchangeIntegral?: number;

  /** 是否完成 0否 1是 */
  finish?: boolean;

  /** 运费 */
  freightAmount?: number;

  /** 赠品 购买数量为0表示已赠完 */
  giftItemList?: OrderItemsDTO[];

  /**
   * 下单时间
   * @format date-time
   */
  gmtCreated?: string;

  /** 商品金额 */
  goodsAmount?: number;

  /**
   * 主键
   * @format int64
   */
  id?: number;

  /** 子订单信息 */
  items?: OrderItemsDTO[];

  /**
   * 物流状态 0未发货 1已发货 2已收获
   * @format int32
   */
  logisticsStatus?: number;

  /** @format int64 */
  merchantId?: number;

  /** 订单金额 */
  orderAmount?: number;

  /**
   * 获得积分
   * @format int32
   */
  orderIntegral?: number;

  /** 订单的优惠明细 */
  orderMasterMarketingList?: OrderMasterMarketingDto[];

  /** 订单编号 */
  orderNo?: string;

  /**
   * 订单状态 0交易中 1交易成功-1 交易关闭
   * @format int32
   */
  orderStatus?: number;

  /**
   * 订单类型
   * @format int32
   */
  orderType?: number;

  /** 实际支付金额 */
  payAmount?: number;

  /**
   * 支付时间
   * @format date-time
   */
  payAt?: string;

  /**
   * 0 未支付 1 支付成功 -1支付失败
   * @format int32
   */
  payStatus?: number;

  /**
   * 1：微信支付 2：支付宝支付 3：线下支付 4：余额
   * @format int32
   */
  payType?: number;

  /**
   * 确认收货时间
   * @format date-time
   */
  receiptAt?: string;

  /**
   * 售后状态 0无售后 1有售后
   * @format int32
   */
  refundStatus?: number;

  /** 0快递，1自提 */
  selfPicked?: boolean;

  /** 收件人详细地址 */
  shippingAddress?: string;

  /**
   * 发货时间
   * @format date-time
   */
  shippingAt?: string;

  /** 收件人市 */
  shippingCity?: string;

  /** 收件人区 */
  shippingDistrict?: string;

  /** 收货人电话 */
  shippingMobile?: string;

  /** 收货人 */
  shippingName?: string;

  /** 收件人省份 */
  shippingProvince?: string;

  /** 微信支付交易流水号 */
  transactionId?: string;

  /** 买家留言 */
  userComments?: string;

  /**
   * 会员ID
   * @format int64
   */
  userId?: number;

  /** 会员手机号 */
  userMobile?: string;

  /** 会员姓名 */
  userName?: string;
}

export interface OrderItemMarketingDto {
  /** 优惠比例 */
  discount?: number;

  /** 优惠金额 */
  discountAmount?: number;

  /**
   * 优惠类型 0 抵扣 1 折扣 2 活动价 3 抵扣运费
   * @format int32
   */
  discountType?: number;

  /** 商品编号 */
  goodsNo?: string;

  /** @format int64 */
  id?: number;

  /**
   * 活动类型 0：拼团 1：预售 2：限时抢购 3:满减 4:满折 5:满赠 6 优惠券 7 会员折扣 8 积分
   * @format int32
   */
  marketingType?: number;

  /** @format int64 */
  merchantId?: number;

  /** 订单编号 */
  orderNo?: string;

  /** 优惠金额(促销类型为积分时些值为使用的积分数量) */
  price?: number;

  /** 优惠券或活动名称 */
  relName?: string;

  /** 优惠券或活动编号 */
  relNo?: string;

  /** 发货时间 */
  shippingTime?: string;

  /**
   * 发货时间 0：固定时间 1：付款后X天
   * @format int32
   */
  shippingTimeType?: number;

  /** SKU编号 */
  skuNo?: string;
}

export interface OrderCountVO {
  /**
   * 待评价
   * @format int32
   */
  commentOrders?: number;

  /**
   * 待支付
   * @format int32
   */
  payOrders?: number;

  /**
   * 待收货
   * @format int32
   */
  receiptOrders?: number;

  /**
   * 售后
   * @format int32
   */
  refundOrders?: number;

  /**
   * 待发货
   * @format int32
   */
  shippingOrders?: number;
}

export interface OrderCommentParam {
  /** 商品评价 */
  goodsCommentList?: CommentsDTO[];

  /**
   * 物流评分 1~5
   * @format int32
   */
  logisticsGrade?: number;

  /** 订单编号 */
  orderNo?: string;

  /**
   * 服务评分 1~5
   * @format int32
   */
  serviceGrade?: number;
}

export interface OrderCalculateResponse {
  /** 优惠券抵扣 */
  couponDeduction?: number;

  /** 礼券兑换、赠品商品列表 */
  couponGoodsItems?: OrderCouponGoodsDto[];

  /** 总优惠金额（不含运费） */
  discountAmount?: number;

  /** 抵扣后运费 */
  freightAmount?: number;

  /** 赠品 购买数量为0表示已赠完 */
  giftItemList?: OrderItemsDTO[];

  /**
   * 总件数
   * @format int32
   */
  goodNum?: number;

  /** 商品金额 */
  goodsAmount?: number;

  /** 子订单信息 */
  items?: OrderItemsDTO[];

  /** 活动列表 */
  marketingActivityList?: OrderMasterMarketingDto[];

  /** 优惠券列表 */
  memCouponVoList?: MemCouponVo[];

  /** 订单金额 */
  orderAmount?: number;

  /** 订单编号 */
  orderNo?: string;

  /** 实际支付金额 */
  payAmount?: number;

  /** 抵扣前运费 */
  realFreightAmount?: number;
  scoreBO?: ScoreBO;

  /** 总优惠金额=总优惠金额（不含运费）+抵扣运费 */
  totalDiscountAmount?: number;
}

export interface MenuTreeOutputDto {
  children?: MenuTreeOutputDto[];

  /** 是否前端展示 */
  frontShow?: boolean;

  /**
   * id
   * @format int64
   */
  id?: number;

  /** 名称 */
  name?: string;
  pic?: string;

  /**
   * pid
   * @format int64
   */
  pid?: number;

  /**
   * 排序
   * @format int32
   */
  sort?: number;
}

export interface MemberOutputDto {
  /**
   * 出生年月
   * @format date-time
   */
  birthday?: string;

  /**
   * 禁用状态（0：否，1：是）
   * @format int32
   */
  disableStatus?: number;

  /** 性别 1男 2女 0未知 */
  gender?: string;

  /**
   * 注册时间
   * @format date-time
   */
  gmtCreated?: string;

  /** 头像 */
  headImg?: string;

  /**
   * 用户id
   * @format int64
   */
  id?: number;

  /** 用户全局唯一编号 */
  memberNo?: string;

  /**
   * 会员类型 1 普通用户 2 会员用户
   * @format int32
   */
  memberType?: number;

  /** 用户手机号 */
  mobile?: string;

  /** 昵称 */
  nickName?: string;

  /** 用户当前应用唯一标识 */
  openId?: string;

  /** 真实姓名 */
  realName?: string;

  /**
   * 状态 1：正常 0：禁用
   * @format int32
   */
  status?: number;
}

export interface MarketingActivitySkuParam {
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

export interface MemCouponVo {
  /** 适用商品、品牌、类目集合,逗号分隔 */
  acceptGoodsSet?: string;

  /** 适用商品集合扩展,逗号分隔 */
  acceptGoodsSetExtend?: string;

  /**
   * 商品适用范围 0 全商品(店铺) 1 指定商品(店铺) 2 全场(平台) 3 指定品牌(平台) 4 指定类目(平台) 5指定店铺(平台)
   * @format int32
   */
  acceptGoodsType?: number;

  /**
   * 领取类型 0 直接领取 1 后台发放 2 优惠券兑换
   * @format int32
   */
  acceptType?: number;

  /** 优惠劵名称 */
  couponName?: string;

  /** 优惠劵编号 */
  couponNo?: string;

  /**
   * 优惠劵发放id(领取类型为1必填)
   * @format int32
   */
  couponSendId?: number;

  /** 优惠劵模板编号 */
  couponTemplateNo?: string;

  /**
   * 优惠劵类型 0 抵扣 1 折扣 2 赠品 3 兑换 4 包邮
   * @format int32
   */
  couponType?: number;

  /**
   * 使用条件 0 无限制 1 满减
   * @format int32
   */
  demand?: number;

  /** 使用条件需求价格 */
  demandPrice?: number;

  /** 使用说明 */
  detail?: string;

  /** 折扣率,% */
  discount?: number;

  /**
   * 生效时间条件 0 无限制 1 指定时间 2 动态时间
   * @format int32
   */
  expireDateType?: number;

  /**
   * 创建时间
   * @format date-time
   */
  gmtCreated?: string;

  /** 适用商品集合列表 */
  goodsNoList?: string[];

  /**
   * id
   * @format int64
   */
  id?: number;

  /** 是否是店铺优惠劵，true是，false否 */
  isStore?: boolean;

  /**
   * 领取人用户编号
   * @format int64
   */
  memberNo?: number;

  /** 价值金额 */
  price?: number;

  /** 优惠劵编号二维码 */
  qrCode?: string;

  /** 当前优惠券是否选中 */
  selected?: boolean;

  /** 店铺名称 */
  storeName?: string;

  /** 店铺编号 订单使用 */
  storeNo?: string;

  /**
   * 有效期结束
   * @format date-time
   */
  termEnd?: string;

  /**
   * 有效期开始
   * @format date-time
   */
  termStart?: string;

  /**
   * 使用时间
   * @format date-time
   */
  useDate?: string;

  /**
   * 状态 0 未使用(已过期) 1 已使用 3已作废
   * @format int32
   */
  useStatus?: number;
}

export interface MemCouponReceiveInputDto {
  /** 商品编号 */
  goodsNoList?: string[];
}

export interface MarketingActivityPromotionParam {
  /** 包含区域,ID逗号分隔。0代表全国 */
  area?: string;

  /** @format int64 */
  id?: number;

  /** 优惠条件 Json格式保存 */
  promotionConditionList?: PromotionCondition[];

  /**
   * 优惠条件类型 0：满N件 1：满N元
   * @format int32
   */
  promotionConditionType?: number;

  /**
   * 优惠类型 0：阶梯优惠 1：循环优惠
   * @format int32
   */
  promotionType?: number;

  /** 区域文本，方便展示。多个城市逗号分隔。 */
  text?: string;
}

export interface MarketingActivityGoodsVo {
  /** 封面图片 */
  coverImg?: string;

  /** 商品名称 */
  goodsName?: string;

  /** 商品编号 */
  goodsNo?: string;

  /**
   * id
   * @format int64
   */
  id?: number;

  /** 市场价 */
  marketPrice?: number;

  /** 商品价格（默认取sku最低价） */
  price?: number;
}

export interface MarketingActivityGoodsParam {
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
  marketingActivitySkuParams?: MarketingActivitySkuParam[];

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

export interface MallExpressCompanyVo {
  /** 快递公司名称 */
  expressCompany?: string;

  /** 快递公司编码 */
  expressCompanyCode?: string;

  /**
   * id
   * @format int64
   */
  id?: number;
}

export interface MarketingActivityDto {
  /** 活动名称 */
  activityName?: string;

  /** 活动编号 */
  activityNo?: string;

  /**
   * 活动状态 0：未启用 1：启用 2：结束 3：待审核 4：审核失败
   * @format int32
   */
  activityStatus?: number;

  /**
   * 活动类型 0:拼团 1:预售 2:限时抢购 3:满减 4:满折 5:满赠 6:包邮
   * @format int32
   */
  activityType?: number;

  /**
   * 活动完成后操作 0：设为普通商品 1：下架
   * @format int32
   */
  completed?: number;

  /** 活动规则 */
  content?: string;

  /** 封面图 */
  coverImg?: string;

  /** 活动描述 */
  description?: string;

  /**
   * 活动结束时间
   * @format date-time
   */
  endTime?: string;

  /**
   * 活动Id
   * @format int64
   */
  id?: number;

  /** 商品信息 */
  marketingActivityGoodsParams?: MarketingActivityGoodsParam[];

  /** @format int64 */
  merchantId?: number;
  promotionParam?: MarketingActivityPromotionParam;

  /** 开始发货时间 */
  shippingTime?: string;

  /**
   * 发货时间 0：固定时间 1：付款后X天
   * @format int32
   */
  shippingTimeType?: number;

  /**
   * 活动开始时间
   * @format date-time
   */
  startTime?: string;

  /** 是否可叠加优惠 0：否 1：是 */
  superposition?: boolean;

  /** 叠加优惠活动类型 */
  superpositionActivityTypes?: string;
}

export interface MallConfPageSimpleOutputDto {
  /** 页面内容 */
  content?: string;

  /** 页面标题 */
  title?: string;
}

export interface GoodsVO {
  /**
   * 实际销量
   * @format int32
   */
  actualSales?: number;

  /** 商品详情页轮播图地址 */
  bannerImgPaths?: string;

  /**
   * 末级分类id
   * @format int32
   */
  classifyId?: number;

  /** 分类名称 */
  classifyName?: string;

  /** 商品分类名称1 */
  classifyName1?: string;

  /** 商品分类名称2 */
  classifyName2?: string;

  /** 商品分类名称3 */
  classifyName3?: string;

  /**
   * 分类父id1（末级的上一级）
   * @format int32
   */
  classifyPid1?: number;

  /**
   * 分类父id2（分类父id1的上一级）
   * @format int32
   */
  classifyPid2?: number;

  /** 封面图片 */
  coverImg?: string;

  /**
   * 自定义起止销量
   * @format int32
   */
  customStartSales?: number;

  /** 兑换积分 */
  exchangeIntegral?: number;

  /**
   * 运费模板ID
   * @format int64
   */
  expressTemplateId?: number;

  /** 前台是否可见 */
  frontShow?: boolean;

  /** 商品名称 */
  goodsName?: string;

  /** 商品编号 */
  goodsNo?: string;

  /** SKU信息 */
  goodsSkuDetailList?: GoodsSkuVO[];

  /** 规格信息 */
  goodsSpecRelationList?: GoodsSpecRelationVO[];

  /** 标签列表 */
  goodsTagList?: GoodsTagDto[];

  /**
   * 商品类型
   * @format int32
   */
  goodsType?: number;

  /**
   * 主键
   * @format int64
   */
  id?: number;

  /** 市场价 */
  marketPrice?: number;

  /** 营销活动 */
  marketingActivityList?: MarketingActivityDto[];

  /** 是否开启推荐 */
  recommendStatus?: boolean;

  /**
   * 富文本ID
   * @format int64
   */
  richId?: number;

  /** 销售价 */
  salePrice?: number;

  /** 是否上架 0 否 1 是 */
  shelved?: boolean;

  /**
   * 上下架时间
   * @format date-time
   */
  shelvesTime?: string;

  /**
   * 排序值
   * @format int32
   */
  sort?: number;

  /**
   * 库存
   * @format int32
   */
  stock?: number;

  /** 是否使用积分 */
  useScore?: boolean;

  /** 视频地址 */
  videoUrl?: string;
}

export interface GoodsSpecRelationVO {
  goodsNo?: string;

  /**
   * 规格ID
   * @format int32
   */
  specId?: number;

  /** 规格名称 */
  specName?: string;

  /**
   * 规格父ID
   * @format int32
   */
  specPid?: number;
}

export interface ItemGoodsInfo {
  /**
   * 数量
   * @format int32
   */
  buyCounts?: number;

  /** 渠道id:直播id */
  channelId?: string;

  /** 商品编号 */
  goodsNo?: string;

  /** 规格编号 */
  skuNo?: string;
}

export interface KeywordDto {
  /**
   * 更新时间
   * @format date-time
   */
  gmtModified?: string;

  /**
   * id
   * @format int64
   */
  id?: number;

  /** 关键词 */
  keyword?: string;

  /** 说明 */
  note?: string;

  /** 是否显示 */
  show?: boolean;

  /**
   * 排序值
   * @format int32
   */
  sort?: number;
}

export interface GoodsQueryByNo {
  /**
   * 开始时间
   * @format date-time
   */
  beginTime?: string;

  /**
   * 结束时间
   * @format date-time
   */
  endTime?: string;

  /** 商品编号列表 */
  goodNos?: string[];

  /**
   * 主键
   * @format int64
   */
  id?: number;

  /**
   * 当前页码
   * @format int32
   */
  pageNum?: number;

  /**
   * 每页数据量
   * @format int32
   */
  pageSize?: number;
}

export interface ExpressTrack {
  context?: string;
  ftime?: string;
}

export interface GoodsSkuVO {
  /**
   * 实际销量
   * @format int32
   */
  actualSales?: number;

  /**
   * 自定义起止销量
   * @format int32
   */
  customStartSales?: number;

  /** 是否启用 0 否 1是 */
  enabled?: boolean;

  /** 兑换积分 */
  exchangeIntegral?: number;

  /**
   * 商品id
   * @format int64
   */
  goodsId?: number;

  /** 商品编号 */
  goodsNo?: string;

  /**
   * 主键
   * @format int64
   */
  id?: number;

  /** 市场价 */
  marketPrice?: number;

  /** 售价 */
  salesPrice?: number;

  /**
   * 积分
   * @format int32
   */
  score?: number;

  /** sku图片 */
  skuImg?: string;

  /** sku名称 */
  skuName?: string;

  /** sku编号 */
  skuNo?: string;

  /** 组合多规格子id，用逗号分割 */
  specIds?: string;

  /** sku组合名称（以逗号分隔） */
  specNames?: string;

  /** 组合多规格父id，用逗号分割 */
  specParentIds?: string;

  /**
   * 库存
   * @format int32
   */
  stock?: number;

  /** 是否是统一规格 0 否 1 是  */
  uniform?: boolean;

  /** 体积（cm³） */
  volume?: number;

  /** 重量（kg） */
  weight?: number;
}

export interface GoodsQuery {
  /**
   * 开始时间
   * @format date-time
   */
  beginTime?: string;

  /** 末级分类id */
  classifyId?: string;

  /** 分类父id1（末级的上一级） */
  classifyPid1?: string;

  /** 分类父id2（分类父id1的上一级） */
  classifyPid2?: string;

  /**
   * 结束时间
   * @format date-time
   */
  endTime?: string;

  /** 前台是否可见 */
  frontShow?: boolean;

  /** 商品名称 */
  goodsName?: string;

  /** 商品编号 */
  goodsNo?: string;

  /** 商品编号列表 */
  goodsNoList?: string[];

  /**
   * 商品类型 0 普通商品 1 积分商品
   * @format int32
   */
  goodsType?: number;

  /**
   * 主键
   * @format int64
   */
  id?: number;

  /**
   * 当前页码
   * @format int32
   */
  pageNum?: number;

  /**
   * 每页数据量
   * @format int32
   */
  pageSize?: number;

  /** 是否推荐 0 否 1 是 */
  recommendStatus?: boolean;

  /**
   * 排序类型 1:sort 2:实际销量倒序 3:实际销量正序 4:价格倒序 5:价格正序 6：上架时间倒序 7：上架时间正序 8：兑换积分倒序 9：兑换积分正序,10:创建时间倒序
   * @format int32
   */
  selectSortType?: number;

  /** 是否上架 0 否 1 是 */
  shelved?: boolean;
}

export interface CommentsVO {
  /**
   * 追评时间
   * @format date-time
   */
  addAt?: string;

  /** 追评内容 */
  addContent?: string;

  /** 追评图片，逗号分隔 */
  addImgs?: string;

  /** 追评是否回复 0 否 1 是 */
  addIsReply?: boolean;

  /**
   * 追评回复时间
   * @format date-time
   */
  addReplyAt?: string;

  /** 追评回复内容 */
  addReplyContent?: string;

  /** 评价内容 */
  content?: string;

  /** @format int32 */
  fromType?: number;

  /**
   * 创建时间
   * @format date-time
   */
  gmtCreated?: string;

  /**
   * 商品数量
   * @format int32
   */
  goodsCount?: number;

  /**
   * 商品评分 1~5
   * @format int32
   */
  goodsGrade?: number;

  /**
   * 商品id
   * @format int64
   */
  goodsId?: number;

  /** 商品图 */
  goodsImg?: string;

  /** 商品名称 */
  goodsName?: string;

  /** 商品编号 */
  goodsNo?: string;

  /** 商品规格 */
  goodsSpec?: string;

  /** 头像 */
  headImg?: string;

  /**
   * 评价id
   * @format int64
   */
  id?: number;

  /** 评价图片，逗号分隔 */
  imgs?: string;

  /** 是否追评 0 否 1 是 */
  isAdd?: boolean;

  /** 是否匿名 0 否 1 是 */
  isAnonym?: boolean;

  /** 是否回复 */
  isReply?: boolean;

  /**
   * 物流评分 1~5
   * @format int32
   */
  logisticsGrade?: number;

  /** 用户手机号 */
  mobile?: string;

  /** 用户昵称 */
  nickName?: string;

  /** 关联订单编号 */
  orderNo?: string;

  /**
   * 回复时间
   * @format date-time
   */
  replyAt?: string;

  /** 回复内容 */
  replyContent?: string;

  /**
   * 服务评分 1~5
   * @format int32
   */
  serviceGrade?: number;

  /** 是否显示 */
  show?: boolean;

  /** sku图 */
  skuImg?: string;

  /** 商品SKU编号 */
  skuNo?: string;

  /**
   * 用户ID
   * @format int64
   */
  userId?: number;
}

export interface GoodsSkuStockAndPriceVo {
  /** 活动价 */
  activityPrice?: number;

  /**
   * 活动库存
   * @format int32
   */
  activityStock?: number;

  /** 兑换积分 */
  exchangeIntegral?: number;

  /** 市场价 */
  marketPrice?: number;

  /** 价格 */
  salesPrice?: number;

  /**
   * 积分
   * @format int32
   */
  score?: number;

  /** sku图片 */
  skuImg?: string;

  /** Sku编号 */
  skuNo?: string;

  /**
   * 库存
   * @format int32
   */
  stock?: number;
}

export interface ExpressTrackRespDto {
  /** 快递公司 */
  expressCompany?: string;

  /** 快递公司编码 */
  expressCompanyCode?: string;

  /** 快递单号 */
  expressNo?: string;

  /**
   * 快递单当前状态，-1失败,0在途，1揽收，2疑难，3签收，4退签，5派件，6退回，7转投，10待清关，11清关中，12已清关，13清关异常，14拒签
   * @format int32
   */
  expressState?: number;

  /** 快递轨迹 */
  trackData?: string;

  /** 快递轨迹 */
  trackList?: ExpressTrack[];
}

export interface CommentsDTO {
  /** 是否匿名 0 否 1 是 */
  anonym?: boolean;

  /** 评价内容 */
  content?: string;

  /** 是否赠品 */
  gift?: boolean;

  /**
   * 商品评分 1~5
   * @format int32
   */
  goodsGrade?: number;

  /** 商品编号 */
  goodsNo?: string;

  /** 评价图片，逗号分隔 */
  imgs?: string;

  /** 订单编号 */
  orderNo?: string;

  /** sku编号 */
  skuNo?: string;
}

export interface CouponTemplateVo {
  /** 适用商品、品牌、类目集合,逗号分隔  */
  acceptGoodsSet?: string;

  /** 适用商品集合扩展,逗号分隔  */
  acceptGoodsSetExtend?: string;

  /**
   * 商品适用范围 0 全商品(店铺) 1 指定商品(店铺) 2 全场(平台) 3 指定品牌(平台) 4 指定类目(平台)
   * @format int32
   */
  acceptGoodsType?: number;

  /**
   * 优惠劵类型 0 抵扣 1 折扣 2 赠品 3 兑换 4 包邮
   * @format int32
   */
  couponType?: number;

  /** 使用条件需求价格 */
  demandPrice?: number;

  /** 使用说明 */
  detail?: string;

  /** 折扣率,% */
  discount?: number;

  /**
   * 有效天数(生效时间条件为2必填)
   * @format int32
   */
  expDayCount?: number;

  /**
   * 生效时间条件 1 指定时间 2 动态时间
   * @format int32
   */
  expireDateType?: number;

  /**
   * 创建时间
   * @format date-time
   */
  gmtCreated?: string;

  /**
   * 修改时间
   * @format date-time
   */
  gmtModified?: string;

  /**
   * id
   * @format int64
   */
  id?: number;

  /**
   * 当前用户是否已领取 0：否 1：是
   * @format int32
   */
  isHave?: number;

  /**
   * 是否公开 1：公开 0：否
   * @format int32
   */
  isPublic?: number;

  /**
   * 每人限领张数
   * @format int32
   */
  memberLimit?: number;

  /** 优惠劵名称 */
  name?: string;

  /** 价值金额 */
  price?: number;

  /**
   * 领取时间结束(领取时间不能晚于有效期结束时间)
   * @format date-time
   */
  receiveEnd?: string;

  /**
   * 已领取数量
   * @format int32
   */
  receiveNum?: number;

  /**
   * 领取时间开始(领取时间不能晚于有效期结束时间)
   * @format date-time
   */
  receiveStart?: string;

  /**
   * 已发放数量
   * @format int32
   */
  sendNum?: number;

  /**
   * 领取后几天生效(生效时间条件为2必填)
   * @format int32
   */
  startDayCount?: number;

  /**
   * 数据状态 0 无效 1 有效
   * @format int32
   */
  status?: number;

  /**
   * 库存
   * @format int32
   */
  stock?: number;

  /** 店铺编码 */
  storeNo?: string;

  /** 优惠劵模板编号 */
  templateNo?: string;

  /**
   * 有效期结束(生效时间条件为1必填)
   * @format date-time
   */
  termEnd?: string;

  /**
   * 有效期开始(生效时间条件为1必填)
   * @format date-time
   */
  termStart?: string;
}

export interface CouponAvailableGoodsOutputDto {
  /** 商品编号列表 */
  goods?: string[];

  /**
   * 类型 0：全商品 1：指定商品
   * @format int32
   */
  type?: number;
}

export interface CollectionCreateInputDto {
  /** 收藏编号 */
  relationalNo?: string;
}

export interface CollectionVo {
  /** 封面图 */
  coverImg?: string;

  /** 商品名称 */
  goodsName?: string;

  /**
   * id
   * @format int64
   */
  id?: number;

  /** 市场价 */
  marketPrice?: number;

  /** 收藏编号 */
  relationalNo?: string;

  /** 销售价 */
  salePrice?: number;

  /**
   * 状态 1：正常 0：删除、下架
   * @format int32
   */
  status?: number;
}

export interface AddCommentsDTO {
  /**
   * 评价ID
   * @format int64
   */
  commentsId?: number;

  /** 评价内容 */
  content?: string;

  /** 评价图片，逗号分隔 */
  imgs?: string;
}

export interface BannerPositionOutputDto {
  /**
   * id
   * @format int64
   */
  id?: number;

  /** 图片地址 */
  imgUrl?: string;

  /** 名称 */
  name?: string;

  /** 跳转地址 */
  url?: string;

  /**
   * 跳转类型
   * @format int32
   */
  urlType?: number;
}

export interface CalculateOrderContext {
  /**
   * 收货地址id
   * @format int64
   */
  addressId?: number;

  /** 优惠劵编号 不使用优惠券可传[NOSELECT] */
  couponNo?: string;

  /** 兑换礼券号 */
  exchangeCouponNo?: string;

  /** 包邮礼券号 */
  freeShippingCouponNo?: string;

  /** 赠品礼券号 */
  giftCouponNo?: string;

  /**
   * 商品类型 0:普通商品; 1:积分商品
   * @format int32
   */
  goodsType?: number;

  /** 商品信息 */
  itemGoodsInfoList?: ItemGoodsInfo[];

  /**
   * 会员卡ID -1：不使用会员卡 0或null：以最优价格使用会员卡 大于0：会员卡ID
   * @format int64
   */
  memCardId?: number;

  /** 订单渠道 WeiXin; WebApp; Android; IOS */
  orderChannelType?: "WeiXin" | "WebApp" | "Android" | "IOS";

  /**
   * 支付类型 1:微信支付; 2:支付宝支付; 3:线下支付; 4:余额支付
   * @format int32
   */
  payType?: number;
  scoreBO?: ScoreBO;

  /** 是否自提 0快递，1自提 */
  selfPicked?: boolean;

  /**
   * 下单类型 0直接下单 1购物车下单
   * @format int32
   */
  type?: number;

  /** 买家留言 */
  userComments?: string;
}

export type TreeLong2 = Record<string, object>;

export type TreeLong1 = Record<string, object>;

export type ComparableObject2 = object;

export type ComparableObject1 = object;

export type TreeLong = Record<string, object>;

export type MapStringString = Record<string, string>;

export type MapStringListPublicKeyValueDto = Record<string, object>;

export interface JsonResultMapStringListPublicKeyValueDto {
  /** @format int32 */
  code?: number;
  data?: Record<string, PublicKeyValueDto[]>;
  msg?: string;
}

export interface JsonResultListPublicKeyValueDto {
  /** @format int32 */
  code?: number;
  data?: PublicKeyValueDto[];
  msg?: string;
}

export interface JsonResultAuthMobileOutputDto {
  /** @format int32 */
  code?: number;
  data?: AuthMobileOutputDto;
  msg?: string;
}

export interface PagedResultLiveStatisticsDto {
  list?: LiveStatisticsDto[];

  /** @format int64 */
  total?: number;
}

export interface JsonResultPagedResultLiveStatisticsDto {
  /** @format int32 */
  code?: number;
  data?: PagedResultLiveStatisticsDto;
  msg?: string;
}

export interface PagedResultWithdrawalsDto {
  list?: WithdrawalsDto[];

  /** @format int64 */
  total?: number;
}

export interface PagedResultCommissionGoodsDto {
  list?: CommissionGoodsDto[];

  /** @format int64 */
  total?: number;
}

export interface PagedResultCommissionDto {
  list?: CommissionDto[];

  /** @format int64 */
  total?: number;
}

export interface JsonResultWithdrawalsDetailDto {
  /** @format int32 */
  code?: number;
  data?: WithdrawalsDetailDto;
  msg?: string;
}

export interface JsonResultPagedResultWithdrawalsDto {
  /** @format int32 */
  code?: number;
  data?: PagedResultWithdrawalsDto;
  msg?: string;
}

export interface JsonResultPagedResultCommissionGoodsDto {
  /** @format int32 */
  code?: number;
  data?: PagedResultCommissionGoodsDto;
  msg?: string;
}

export interface JsonResultPagedResultCommissionDto {
  /** @format int32 */
  code?: number;
  data?: PagedResultCommissionDto;
  msg?: string;
}

export interface JsonResultListCommissionGoodsSkuDto {
  /** @format int32 */
  code?: number;
  data?: CommissionGoodsSkuDto[];
  msg?: string;
}

export interface PagedScrollResultMarketingActivityOfGroupWebListVo {
  isLastPage?: boolean;
  list?: MarketingActivityOfGroupWebListVo[];
}

export interface JsonResultPagedScrollResultMarketingActivityOfGroupWebListVo {
  /** @format int32 */
  code?: number;
  data?: PagedScrollResultMarketingActivityOfGroupWebListVo;
  msg?: string;
}

export interface PagedScrollResultMarketingActivityGroupRecordsWebListVo {
  isLastPage?: boolean;
  list?: MarketingActivityGroupRecordsWebListVo[];
}

export interface JsonResultMarketingActivityGroupRecordsWebListAndNumVo {
  /** @format int32 */
  code?: number;
  data?: MarketingActivityGroupRecordsWebListAndNumVo;
  msg?: string;
}

export interface JsonResultMarketingActivityGroupRecordsWebInfoVo {
  /** @format int32 */
  code?: number;
  data?: MarketingActivityGroupRecordsWebInfoVo;
  msg?: string;
}

export interface PagedScrollResultMarketingActivityGroupRecordsItemWebInfoVo {
  isLastPage?: boolean;
  list?: MarketingActivityGroupRecordsItemWebInfoVo[];
}

export interface JsonResultPagedScrollResultMarketingActivityGroupRecordsItemWebInfoVo {
  /** @format int32 */
  code?: number;
  data?: PagedScrollResultMarketingActivityGroupRecordsItemWebInfoVo;
  msg?: string;
}

export interface JsonResultMarketingActivityOfGroupWebListVo {
  /** @format int32 */
  code?: number;
  data?: MarketingActivityOfGroupWebListVo;
  msg?: string;
}

export interface PagedScrollResultMarketingActivityGroupRecords {
  isLastPage?: boolean;
  list?: MarketingActivityGroupRecords[];
}

export interface JsonResultPagedScrollResultMarketingActivityGroupRecords {
  /** @format int32 */
  code?: number;
  data?: PagedScrollResultMarketingActivityGroupRecords;
  msg?: string;
}

export interface PagedResultMarketingActivityOfGroupVo {
  list?: MarketingActivityOfGroupVo[];

  /** @format int64 */
  total?: number;
}

export interface JsonResultPagedResultMarketingActivityOfGroupVo {
  /** @format int32 */
  code?: number;
  data?: PagedResultMarketingActivityOfGroupVo;
  msg?: string;
}

export interface JsonResultMarketingActivityOfGroupDto {
  /** @format int32 */
  code?: number;
  data?: MarketingActivityOfGroupDto;
  msg?: string;
}

export interface PagedResultMarketingActivityOfGroupStatVo {
  list?: MarketingActivityOfGroupStatVo[];

  /** @format int64 */
  total?: number;
}

export interface JsonResultPagedResultMarketingActivityOfGroupStatVo {
  /** @format int32 */
  code?: number;
  data?: PagedResultMarketingActivityOfGroupStatVo;
  msg?: string;
}

export interface PagedResultMarketingActivityOfGroupOrderVo {
  list?: MarketingActivityOfGroupOrderVo[];

  /** @format int64 */
  total?: number;
}

export interface JsonResultPagedResultMarketingActivityOfGroupOrderVo {
  /** @format int32 */
  code?: number;
  data?: PagedResultMarketingActivityOfGroupOrderVo;
  msg?: string;
}

export interface JsonResultLiveDto {
  /** @format int32 */
  code?: number;
  data?: LiveDto;
  msg?: string;
}

export interface PagedResultSiteMessageDto {
  list?: SiteMessageDto[];

  /** @format int64 */
  total?: number;
}

export interface PagedResultLotteryRecordListDto {
  list?: LotteryRecordListDto[];

  /** @format int64 */
  total?: number;
}

export interface PagedResultLotteryOrderListDto {
  list?: LotteryOrderListDto[];

  /** @format int64 */
  total?: number;
}

export interface PagedResultLotteryListDto {
  list?: LotteryListDto[];

  /** @format int64 */
  total?: number;
}

export interface PagedResultLivePageDto {
  list?: LivePageDto[];

  /** @format int64 */
  total?: number;
}

export interface PageInfoUserWordVO {
  /** @format int64 */
  endRow?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  list?: UserWordVO[];

  /** @format int32 */
  navigateFirstPage?: number;

  /** @format int32 */
  navigateLastPage?: number;

  /** @format int32 */
  navigatePages?: number;
  navigatepageNums?: number[];

  /** @format int32 */
  nextPage?: number;

  /** @format int32 */
  pageNum?: number;

  /** @format int32 */
  pageSize?: number;

  /** @format int32 */
  pages?: number;

  /** @format int32 */
  prePage?: number;

  /** @format int32 */
  size?: number;

  /** @format int64 */
  startRow?: number;

  /** @format int64 */
  total?: number;
}

export interface PageInfoPostsAdminSearchVO {
  /** @format int64 */
  endRow?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  list?: PostsAdminSearchVO[];

  /** @format int32 */
  navigateFirstPage?: number;

  /** @format int32 */
  navigateLastPage?: number;

  /** @format int32 */
  navigatePages?: number;
  navigatepageNums?: number[];

  /** @format int32 */
  nextPage?: number;

  /** @format int32 */
  pageNum?: number;

  /** @format int32 */
  pageSize?: number;

  /** @format int32 */
  pages?: number;

  /** @format int32 */
  prePage?: number;

  /** @format int32 */
  size?: number;

  /** @format int64 */
  startRow?: number;

  /** @format int64 */
  total?: number;
}

export interface PageInfoMuteWordVO {
  /** @format int64 */
  endRow?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  list?: MuteWordVO[];

  /** @format int32 */
  navigateFirstPage?: number;

  /** @format int32 */
  navigateLastPage?: number;

  /** @format int32 */
  navigatePages?: number;
  navigatepageNums?: number[];

  /** @format int32 */
  nextPage?: number;

  /** @format int32 */
  pageNum?: number;

  /** @format int32 */
  pageSize?: number;

  /** @format int32 */
  pages?: number;

  /** @format int32 */
  prePage?: number;

  /** @format int32 */
  size?: number;

  /** @format int64 */
  startRow?: number;

  /** @format int64 */
  total?: number;
}

export interface PageInfoMsgNoticeVO {
  /** @format int64 */
  endRow?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  list?: MsgNoticeVO[];

  /** @format int32 */
  navigateFirstPage?: number;

  /** @format int32 */
  navigateLastPage?: number;

  /** @format int32 */
  navigatePages?: number;
  navigatepageNums?: number[];

  /** @format int32 */
  nextPage?: number;

  /** @format int32 */
  pageNum?: number;

  /** @format int32 */
  pageSize?: number;

  /** @format int32 */
  pages?: number;

  /** @format int32 */
  prePage?: number;

  /** @format int32 */
  size?: number;

  /** @format int64 */
  startRow?: number;

  /** @format int64 */
  total?: number;
}

export interface PageInfoGroupVO {
  /** @format int64 */
  endRow?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  list?: GroupVO[];

  /** @format int32 */
  navigateFirstPage?: number;

  /** @format int32 */
  navigateLastPage?: number;

  /** @format int32 */
  navigatePages?: number;
  navigatepageNums?: number[];

  /** @format int32 */
  nextPage?: number;

  /** @format int32 */
  pageNum?: number;

  /** @format int32 */
  pageSize?: number;

  /** @format int32 */
  pages?: number;

  /** @format int32 */
  prePage?: number;

  /** @format int32 */
  size?: number;

  /** @format int64 */
  startRow?: number;

  /** @format int64 */
  total?: number;
}

export interface PageInfoGroupSimpleSearchVO {
  /** @format int64 */
  endRow?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  list?: GroupSimpleSearchVO[];

  /** @format int32 */
  navigateFirstPage?: number;

  /** @format int32 */
  navigateLastPage?: number;

  /** @format int32 */
  navigatePages?: number;
  navigatepageNums?: number[];

  /** @format int32 */
  nextPage?: number;

  /** @format int32 */
  pageNum?: number;

  /** @format int32 */
  pageSize?: number;

  /** @format int32 */
  pages?: number;

  /** @format int32 */
  prePage?: number;

  /** @format int32 */
  size?: number;

  /** @format int64 */
  startRow?: number;

  /** @format int64 */
  total?: number;
}

export interface PageInfoGroupDataStatisticsVO {
  /** @format int64 */
  endRow?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  list?: GroupDataStatisticsVO[];

  /** @format int32 */
  navigateFirstPage?: number;

  /** @format int32 */
  navigateLastPage?: number;

  /** @format int32 */
  navigatePages?: number;
  navigatepageNums?: number[];

  /** @format int32 */
  nextPage?: number;

  /** @format int32 */
  pageNum?: number;

  /** @format int32 */
  pageSize?: number;

  /** @format int32 */
  pages?: number;

  /** @format int32 */
  prePage?: number;

  /** @format int32 */
  size?: number;

  /** @format int64 */
  startRow?: number;

  /** @format int64 */
  total?: number;
}

export interface PageInfoGroupApproveVO {
  /** @format int64 */
  endRow?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  list?: GroupApproveVO[];

  /** @format int32 */
  navigateFirstPage?: number;

  /** @format int32 */
  navigateLastPage?: number;

  /** @format int32 */
  navigatePages?: number;
  navigatepageNums?: number[];

  /** @format int32 */
  nextPage?: number;

  /** @format int32 */
  pageNum?: number;

  /** @format int32 */
  pageSize?: number;

  /** @format int32 */
  pages?: number;

  /** @format int32 */
  prePage?: number;

  /** @format int32 */
  size?: number;

  /** @format int64 */
  startRow?: number;

  /** @format int64 */
  total?: number;
}

export interface JsonResultSiteMessageDto {
  /** @format int32 */
  code?: number;
  data?: SiteMessageDto;
  msg?: string;
}

export interface JsonResultPostsDetailVO {
  /** @format int32 */
  code?: number;
  data?: PostsDetailVO;
  msg?: string;
}

export interface JsonResultPagedResultSiteMessageDto {
  /** @format int32 */
  code?: number;
  data?: PagedResultSiteMessageDto;
  msg?: string;
}

export interface JsonResultPagedResultLotteryRecordListDto {
  /** @format int32 */
  code?: number;
  data?: PagedResultLotteryRecordListDto;
  msg?: string;
}

export interface JsonResultPagedResultLotteryOrderListDto {
  /** @format int32 */
  code?: number;
  data?: PagedResultLotteryOrderListDto;
  msg?: string;
}

export interface JsonResultPagedResultLotteryListDto {
  /** @format int32 */
  code?: number;
  data?: PagedResultLotteryListDto;
  msg?: string;
}

export interface JsonResultPagedResultLivePageDto {
  /** @format int32 */
  code?: number;
  data?: PagedResultLivePageDto;
  msg?: string;
}

export interface JsonResultPageInfoUserWordVO {
  /** @format int32 */
  code?: number;
  data?: PageInfoUserWordVO;
  msg?: string;
}

export interface JsonResultPageInfoPostsAdminSearchVO {
  /** @format int32 */
  code?: number;
  data?: PageInfoPostsAdminSearchVO;
  msg?: string;
}

export interface JsonResultPageInfoMuteWordVO {
  /** @format int32 */
  code?: number;
  data?: PageInfoMuteWordVO;
  msg?: string;
}

export interface JsonResultPageInfoMsgNoticeVO {
  /** @format int32 */
  code?: number;
  data?: PageInfoMsgNoticeVO;
  msg?: string;
}

export interface JsonResultPageInfoGroupVO {
  /** @format int32 */
  code?: number;
  data?: PageInfoGroupVO;
  msg?: string;
}

export interface JsonResultPageInfoGroupSimpleSearchVO {
  /** @format int32 */
  code?: number;
  data?: PageInfoGroupSimpleSearchVO;
  msg?: string;
}

export interface JsonResultPageInfoGroupDataStatisticsVO {
  /** @format int32 */
  code?: number;
  data?: PageInfoGroupDataStatisticsVO;
  msg?: string;
}

export interface JsonResultPageInfoGroupApproveVO {
  /** @format int32 */
  code?: number;
  data?: PageInfoGroupApproveVO;
  msg?: string;
}

export interface JsonResultMuteWordVO {
  /** @format int32 */
  code?: number;
  data?: MuteWordVO;
  msg?: string;
}

export interface JsonResultLotteryDetailDto {
  /** @format int32 */
  code?: number;
  data?: LotteryDetailDto;
  msg?: string;
}

export interface JsonResultListGroupListVO {
  /** @format int32 */
  code?: number;
  data?: GroupListVO[];
  msg?: string;
}

export interface JsonResultGroupVO {
  /** @format int32 */
  code?: number;
  data?: GroupVO;
  msg?: string;
}

export interface JsonResultGroupDataStatisticsVO {
  /** @format int32 */
  code?: number;
  data?: GroupDataStatisticsVO;
  msg?: string;
}

export interface PagedScrollResultSiteMessageSimpleDto {
  isLastPage?: boolean;
  list?: SiteMessageSimpleDto[];
}

export interface PagedScrollResultLotterySimpleListDto {
  isLastPage?: boolean;
  list?: LotterySimpleListDto[];
}

export interface PagedScrollResultLotteryRecordSimpleListDto {
  isLastPage?: boolean;
  list?: LotteryRecordSimpleListDto[];
}

export interface PagedScrollResultLotteryOrderSimpleListDto {
  isLastPage?: boolean;
  list?: LotteryOrderSimpleListDto[];
}

export interface PageInfoTopicVO {
  /** @format int64 */
  endRow?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  list?: TopicVO[];

  /** @format int32 */
  navigateFirstPage?: number;

  /** @format int32 */
  navigateLastPage?: number;

  /** @format int32 */
  navigatePages?: number;
  navigatepageNums?: number[];

  /** @format int32 */
  nextPage?: number;

  /** @format int32 */
  pageNum?: number;

  /** @format int32 */
  pageSize?: number;

  /** @format int32 */
  pages?: number;

  /** @format int32 */
  prePage?: number;

  /** @format int32 */
  size?: number;

  /** @format int64 */
  startRow?: number;

  /** @format int64 */
  total?: number;
}

export interface PageInfoTopicFollowVO {
  /** @format int64 */
  endRow?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  list?: TopicFollowVO[];

  /** @format int32 */
  navigateFirstPage?: number;

  /** @format int32 */
  navigateLastPage?: number;

  /** @format int32 */
  navigatePages?: number;
  navigatepageNums?: number[];

  /** @format int32 */
  nextPage?: number;

  /** @format int32 */
  pageNum?: number;

  /** @format int32 */
  pageSize?: number;

  /** @format int32 */
  pages?: number;

  /** @format int32 */
  prePage?: number;

  /** @format int32 */
  size?: number;

  /** @format int64 */
  startRow?: number;

  /** @format int64 */
  total?: number;
}

export interface PageInfoPostsDetailVO {
  /** @format int64 */
  endRow?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  list?: PostsDetailVO[];

  /** @format int32 */
  navigateFirstPage?: number;

  /** @format int32 */
  navigateLastPage?: number;

  /** @format int32 */
  navigatePages?: number;
  navigatepageNums?: number[];

  /** @format int32 */
  nextPage?: number;

  /** @format int32 */
  pageNum?: number;

  /** @format int32 */
  pageSize?: number;

  /** @format int32 */
  pages?: number;

  /** @format int32 */
  prePage?: number;

  /** @format int32 */
  size?: number;

  /** @format int64 */
  startRow?: number;

  /** @format int64 */
  total?: number;
}

export interface PageInfoPostsCommentVO {
  /** @format int64 */
  endRow?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  list?: PostsCommentVO[];

  /** @format int32 */
  navigateFirstPage?: number;

  /** @format int32 */
  navigateLastPage?: number;

  /** @format int32 */
  navigatePages?: number;
  navigatepageNums?: number[];

  /** @format int32 */
  nextPage?: number;

  /** @format int32 */
  pageNum?: number;

  /** @format int32 */
  pageSize?: number;

  /** @format int32 */
  pages?: number;

  /** @format int32 */
  prePage?: number;

  /** @format int32 */
  size?: number;

  /** @format int64 */
  startRow?: number;

  /** @format int64 */
  total?: number;
}

export interface PageInfoMsgVO {
  /** @format int64 */
  endRow?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  list?: MsgVO[];

  /** @format int32 */
  navigateFirstPage?: number;

  /** @format int32 */
  navigateLastPage?: number;

  /** @format int32 */
  navigatePages?: number;
  navigatepageNums?: number[];

  /** @format int32 */
  nextPage?: number;

  /** @format int32 */
  pageNum?: number;

  /** @format int32 */
  pageSize?: number;

  /** @format int32 */
  pages?: number;

  /** @format int32 */
  prePage?: number;

  /** @format int32 */
  size?: number;

  /** @format int64 */
  startRow?: number;

  /** @format int64 */
  total?: number;
}

export interface PageInfoMiniGroupMineVO {
  /** @format int64 */
  endRow?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  list?: MiniGroupMineVO[];

  /** @format int32 */
  navigateFirstPage?: number;

  /** @format int32 */
  navigateLastPage?: number;

  /** @format int32 */
  navigatePages?: number;
  navigatepageNums?: number[];

  /** @format int32 */
  nextPage?: number;

  /** @format int32 */
  pageNum?: number;

  /** @format int32 */
  pageSize?: number;

  /** @format int32 */
  pages?: number;

  /** @format int32 */
  prePage?: number;

  /** @format int32 */
  size?: number;

  /** @format int64 */
  startRow?: number;

  /** @format int64 */
  total?: number;
}

export interface PageInfoGroupSimpleVO {
  /** @format int64 */
  endRow?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  list?: GroupSimpleVO[];

  /** @format int32 */
  navigateFirstPage?: number;

  /** @format int32 */
  navigateLastPage?: number;

  /** @format int32 */
  navigatePages?: number;
  navigatepageNums?: number[];

  /** @format int32 */
  nextPage?: number;

  /** @format int32 */
  pageNum?: number;

  /** @format int32 */
  pageSize?: number;

  /** @format int32 */
  pages?: number;

  /** @format int32 */
  prePage?: number;

  /** @format int32 */
  size?: number;

  /** @format int64 */
  startRow?: number;

  /** @format int64 */
  total?: number;
}

export interface PageInfoGroupMemberDetailVO {
  /** @format int64 */
  endRow?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  list?: GroupMemberDetailVO[];

  /** @format int32 */
  navigateFirstPage?: number;

  /** @format int32 */
  navigateLastPage?: number;

  /** @format int32 */
  navigatePages?: number;
  navigatepageNums?: number[];

  /** @format int32 */
  nextPage?: number;

  /** @format int32 */
  pageNum?: number;

  /** @format int32 */
  pageSize?: number;

  /** @format int32 */
  pages?: number;

  /** @format int32 */
  prePage?: number;

  /** @format int32 */
  size?: number;

  /** @format int64 */
  startRow?: number;

  /** @format int64 */
  total?: number;
}

export interface PageInfoGroupDetailVO {
  /** @format int64 */
  endRow?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  list?: GroupDetailVO[];

  /** @format int32 */
  navigateFirstPage?: number;

  /** @format int32 */
  navigateLastPage?: number;

  /** @format int32 */
  navigatePages?: number;
  navigatepageNums?: number[];

  /** @format int32 */
  nextPage?: number;

  /** @format int32 */
  pageNum?: number;

  /** @format int32 */
  pageSize?: number;

  /** @format int32 */
  pages?: number;

  /** @format int32 */
  prePage?: number;

  /** @format int32 */
  size?: number;

  /** @format int64 */
  startRow?: number;

  /** @format int64 */
  total?: number;
}

export interface PageInfoFollowUserVO {
  /** @format int64 */
  endRow?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  list?: FollowUserVO[];

  /** @format int32 */
  navigateFirstPage?: number;

  /** @format int32 */
  navigateLastPage?: number;

  /** @format int32 */
  navigatePages?: number;
  navigatepageNums?: number[];

  /** @format int32 */
  nextPage?: number;

  /** @format int32 */
  pageNum?: number;

  /** @format int32 */
  pageSize?: number;

  /** @format int32 */
  pages?: number;

  /** @format int32 */
  prePage?: number;

  /** @format int32 */
  size?: number;

  /** @format int64 */
  startRow?: number;

  /** @format int64 */
  total?: number;
}

export interface PageInfoFollowGroupVO {
  /** @format int64 */
  endRow?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  list?: FollowGroupVO[];

  /** @format int32 */
  navigateFirstPage?: number;

  /** @format int32 */
  navigateLastPage?: number;

  /** @format int32 */
  navigatePages?: number;
  navigatepageNums?: number[];

  /** @format int32 */
  nextPage?: number;

  /** @format int32 */
  pageNum?: number;

  /** @format int32 */
  pageSize?: number;

  /** @format int32 */
  pages?: number;

  /** @format int32 */
  prePage?: number;

  /** @format int32 */
  size?: number;

  /** @format int64 */
  startRow?: number;

  /** @format int64 */
  total?: number;
}

export interface JsonResultUserStatisticsDTO {
  /** @format int32 */
  code?: number;
  data?: UserStatisticsDTO;
  msg?: string;
}

export interface JsonResultTopicVO {
  /** @format int32 */
  code?: number;
  data?: TopicVO;
  msg?: string;
}

export interface JsonResultPostsCommentVO {
  /** @format int32 */
  code?: number;
  data?: PostsCommentVO;
  msg?: string;
}

export interface JsonResultPostsCommentAnalysis {
  /** @format int32 */
  code?: number;
  data?: PostsCommentAnalysis;
  msg?: string;
}

export interface JsonResultPagedScrollResultSiteMessageSimpleDto {
  /** @format int32 */
  code?: number;
  data?: PagedScrollResultSiteMessageSimpleDto;
  msg?: string;
}

export interface JsonResultPagedScrollResultLotterySimpleListDto {
  /** @format int32 */
  code?: number;
  data?: PagedScrollResultLotterySimpleListDto;
  msg?: string;
}

export interface JsonResultPagedScrollResultLotteryRecordSimpleListDto {
  /** @format int32 */
  code?: number;
  data?: PagedScrollResultLotteryRecordSimpleListDto;
  msg?: string;
}

export interface JsonResultPagedScrollResultLotteryOrderSimpleListDto {
  /** @format int32 */
  code?: number;
  data?: PagedScrollResultLotteryOrderSimpleListDto;
  msg?: string;
}

export interface JsonResultPageInfoTopicVO {
  /** @format int32 */
  code?: number;
  data?: PageInfoTopicVO;
  msg?: string;
}

export interface JsonResultPageInfoTopicFollowVO {
  /** @format int32 */
  code?: number;
  data?: PageInfoTopicFollowVO;
  msg?: string;
}

export interface JsonResultPageInfoPostsDetailVO {
  /** @format int32 */
  code?: number;
  data?: PageInfoPostsDetailVO;
  msg?: string;
}

export interface JsonResultPageInfoPostsCommentVO {
  /** @format int32 */
  code?: number;
  data?: PageInfoPostsCommentVO;
  msg?: string;
}

export interface JsonResultPageInfoMsgVO {
  /** @format int32 */
  code?: number;
  data?: PageInfoMsgVO;
  msg?: string;
}

export interface JsonResultPageInfoMiniGroupMineVO {
  /** @format int32 */
  code?: number;
  data?: PageInfoMiniGroupMineVO;
  msg?: string;
}

export interface JsonResultPageInfoGroupSimpleVO {
  /** @format int32 */
  code?: number;
  data?: PageInfoGroupSimpleVO;
  msg?: string;
}

export interface JsonResultPageInfoGroupMemberDetailVO {
  /** @format int32 */
  code?: number;
  data?: PageInfoGroupMemberDetailVO;
  msg?: string;
}

export interface JsonResultPageInfoFollowUserVO {
  /** @format int32 */
  code?: number;
  data?: PageInfoFollowUserVO;
  msg?: string;
}

export interface JsonResultPageInfoFollowGroupVO {
  /** @format int32 */
  code?: number;
  data?: PageInfoFollowGroupVO;
  msg?: string;
}

export interface JsonResultMsgNumVO {
  /** @format int32 */
  code?: number;
  data?: MsgNumVO;
  msg?: string;
}

export interface JsonResultMiniPostsRecommendVO {
  /** @format int32 */
  code?: number;
  data?: MiniPostsRecommendVO;
  msg?: string;
}

export interface JsonResultMiniPostsDetailVO {
  /** @format int32 */
  code?: number;
  data?: MiniPostsDetailVO;
  msg?: string;
}

export interface JsonResultMiniGroupVO {
  /** @format int32 */
  code?: number;
  data?: MiniGroupVO;
  msg?: string;
}

export interface JsonResultMiniGroupListDetailVO {
  /** @format int32 */
  code?: number;
  data?: MiniGroupListDetailVO;
  msg?: string;
}

export interface JsonResultLotteryHelpfulShareDetailDto {
  /** @format int32 */
  code?: number;
  data?: LotteryHelpfulShareDetailDto;
  msg?: string;
}

export interface JsonResultLotteryHelpfulRewardDto {
  /** @format int32 */
  code?: number;
  data?: LotteryHelpfulRewardDto;
  msg?: string;
}

export interface JsonResultLotteryGridRewardPrizeDto {
  /** @format int32 */
  code?: number;
  data?: LotteryGridRewardPrizeDto;
  msg?: string;
}

export interface JsonResultLotteryGridDto {
  /** @format int32 */
  code?: number;
  data?: LotteryGridDto;
  msg?: string;
}

export interface JsonResultLivePageDto {
  /** @format int32 */
  code?: number;
  data?: LivePageDto;
  msg?: string;
}

export interface JsonResultListTreeLong {
  /** @format int32 */
  code?: number;
  data?: TreeLong[];
  msg?: string;
}

export interface JsonResultListTopicVO {
  /** @format int32 */
  code?: number;
  data?: TopicVO[];
  msg?: string;
}

export interface JsonResultListPostsDetailVO {
  /** @format int32 */
  code?: number;
  data?: PostsDetailVO[];
  msg?: string;
}

export interface JsonResultListLotterySimpleListDto {
  /** @format int32 */
  code?: number;
  data?: LotterySimpleListDto[];
  msg?: string;
}

export interface JsonResultListLiveDto {
  /** @format int32 */
  code?: number;
  data?: LiveDto[];
  msg?: string;
}

export interface JsonResultListGroupVO {
  /** @format int32 */
  code?: number;
  data?: GroupVO[];
  msg?: string;
}

export interface JsonResultListGroupSimpleVO {
  /** @format int32 */
  code?: number;
  data?: GroupSimpleVO[];
  msg?: string;
}

export interface JsonResultListGroupMuteWordVO {
  /** @format int32 */
  code?: number;
  data?: GroupMuteWordVO[];
  msg?: string;
}

export interface JsonResultListGroupMineVO {
  /** @format int32 */
  code?: number;
  data?: GroupMineVO[];
  msg?: string;
}

export interface JsonResultListGroupClassifyVO {
  /** @format int32 */
  code?: number;
  data?: GroupClassifyVO[];
  msg?: string;
}

export interface JsonResultGroupMemberVO {
  /** @format int32 */
  code?: number;
  data?: GroupMemberVO;
  msg?: string;
}

export type ComparableObject = object;

export interface JsonResultObject {
  /** @format int32 */
  code?: number;
  data?: object;
  msg?: string;
}

export interface JsonResultLivePage {
  /** @format int32 */
  code?: number;
  data?: LivePage;
  msg?: string;
}

export interface JsonResultListStatisticsCountOutputDto {
  /** @format int32 */
  code?: number;
  data?: StatisticsCountOutputDto[];
  msg?: string;
}

export interface JsonResultLive {
  /** @format int32 */
  code?: number;
  data?: Live;
  msg?: string;
}

export interface JsonResultListLive {
  /** @format int32 */
  code?: number;
  data?: Live[];
  msg?: string;
}

export interface PagedResultLiveStatistics {
  list?: LiveStatistics[];

  /** @format int64 */
  total?: number;
}

export interface JsonResultPagedResultLiveStatistics {
  /** @format int32 */
  code?: number;
  data?: PagedResultLiveStatistics;
  msg?: string;
}

export interface PagedResultLivePage {
  list?: LivePage[];

  /** @format int64 */
  total?: number;
}

export interface JsonResultPagedResultLivePage {
  /** @format int32 */
  code?: number;
  data?: PagedResultLivePage;
  msg?: string;
}

export interface JsonResultBigdecimal {
  /** @format int32 */
  code?: number;
  data?: number;
  msg?: string;
}

export interface JsonResultSigninSimpleOutputDto {
  /** @format int32 */
  code?: number;
  data?: SigninSimpleOutputDto;
  msg?: string;
}

export interface PagedResultOperateLogsDto {
  list?: OperateLogsDto[];

  /** @format int64 */
  total?: number;
}

export interface JsonResultPagedResultOperateLogsDto {
  /** @format int32 */
  code?: number;
  data?: PagedResultOperateLogsDto;
  msg?: string;
}

export interface JsonResultPageInfo {
  /** @format int32 */
  code?: number;
  data?: PageInfo;
  msg?: string;
}

export interface PagedResultUserAgreeRecordDto {
  list?: UserAgreeRecordDto[];

  /** @format int64 */
  total?: number;
}

export interface JsonResultPagedResultUserAgreeRecordDto {
  /** @format int32 */
  code?: number;
  data?: PagedResultUserAgreeRecordDto;
  msg?: string;
}

export interface JsonResultListInt {
  /** @format int32 */
  code?: number;
  data?: number[];
  msg?: string;
}

export interface JsonResultUserAgreementRecordDto {
  /** @format int32 */
  code?: number;
  data?: UserAgreementRecordDto;
  msg?: string;
}

export interface PagedResultUserAgreementRecordDto {
  list?: UserAgreementRecordDto[];

  /** @format int64 */
  total?: number;
}

export interface JsonResultPagedResultUserAgreementRecordDto {
  /** @format int32 */
  code?: number;
  data?: PagedResultUserAgreementRecordDto;
  msg?: string;
}

export interface PagedResultMemCardRelationDto {
  list?: MemCardRelationDto[];

  /** @format int64 */
  total?: number;
}

export interface JsonResultPagedResultMemCardRelationDto {
  /** @format int32 */
  code?: number;
  data?: PagedResultMemCardRelationDto;
  msg?: string;
}

export interface PagedResultCouponCodeOutputDto {
  list?: CouponCodeOutputDto[];

  /** @format int64 */
  total?: number;
}

export interface PagedResultCouponCodeDetailOutputDto {
  list?: CouponCodeDetailOutputDto[];

  /** @format int64 */
  total?: number;
}

export interface JsonResultPagedResultCouponCodeOutputDto {
  /** @format int32 */
  code?: number;
  data?: PagedResultCouponCodeOutputDto;
  msg?: string;
}

export interface JsonResultPagedResultCouponCodeDetailOutputDto {
  /** @format int32 */
  code?: number;
  data?: PagedResultCouponCodeDetailOutputDto;
  msg?: string;
}

export interface JsonResultSigninDetailOutputDto {
  /** @format int32 */
  code?: number;
  data?: SigninDetailOutputDto;
  msg?: string;
}

export interface JsonResultSigninInfoOutputDto {
  /** @format int32 */
  code?: number;
  data?: SigninInfoOutputDto;
  msg?: string;
}

export interface JsonResultListString {
  /** @format int32 */
  code?: number;
  data?: string[];
  msg?: string;
}

export interface JsonResultSigninOutputDto {
  /** @format int32 */
  code?: number;
  data?: SigninOutputDto;
  msg?: string;
}

export interface JsonResultMapStringBoolean {
  /** @format int32 */
  code?: number;
  data?: Record<string, boolean>;
  msg?: string;
}

export interface JsonResultSigninTaskOutputDto {
  /** @format int32 */
  code?: number;
  data?: SigninTaskOutputDto;
  msg?: string;
}

export interface JsonResultMemCardRelationDto {
  /** @format int32 */
  code?: number;
  data?: MemCardRelationDto;
  msg?: string;
}

export interface JsonResultMemStatisticsDto {
  /** @format int32 */
  code?: number;
  data?: MemStatisticsDto;
  msg?: string;
}

export interface PagedScrollResultMemCardDto {
  isLastPage?: boolean;
  list?: MemCardDto[];

  /** @format int64 */
  nextToken?: number;
}

export interface JsonResultPagedScrollResultMemCardDto {
  /** @format int32 */
  code?: number;
  data?: PagedScrollResultMemCardDto;
  msg?: string;
}

export interface PagedResultMemCardDto {
  list?: MemCardDto[];

  /** @format int64 */
  total?: number;
}

export interface JsonResultPagedResultMemCardDto {
  /** @format int32 */
  code?: number;
  data?: PagedResultMemCardDto;
  msg?: string;
}

export interface JsonResultMemCardDto {
  /** @format int32 */
  code?: number;
  data?: MemCardDto;
  msg?: string;
}

export interface PagedScrollResultMallConfUserTaskDTO {
  isLastPage?: boolean;
  list?: MallConfUserTaskDTO[];

  /** @format int64 */
  nextToken?: number;
}

export interface JsonResultPagedScrollResultMallConfUserTaskDTO {
  /** @format int32 */
  code?: number;
  data?: PagedScrollResultMallConfUserTaskDTO;
  msg?: string;
}

export interface PagedResultMallConfUserTaskDTO {
  list?: MallConfUserTaskDTO[];

  /** @format int64 */
  total?: number;
}

export interface JsonResultPagedResultMallConfUserTaskDTO {
  /** @format int32 */
  code?: number;
  data?: PagedResultMallConfUserTaskDTO;
  msg?: string;
}

export interface PagedScrollResultRefundMasterDto {
  isLastPage?: boolean;
  list?: RefundMasterDto[];

  /** @format int64 */
  nextToken?: number;
}

export interface PagedScrollResultMarketingActivityGoodsVo {
  isLastPage?: boolean;
  list?: MarketingActivityGoodsVo[];

  /** @format int64 */
  nextToken?: number;
}

export interface JsonResultWxMpUser {
  /** @format int32 */
  code?: number;
  data?: WxMpUser;
  msg?: string;
}

export interface JsonResultPagedScrollResultRefundMasterDto {
  /** @format int32 */
  code?: number;
  data?: PagedScrollResultRefundMasterDto;
  msg?: string;
}

export interface JsonResultPagedScrollResultMarketingActivityGoodsVo {
  /** @format int32 */
  code?: number;
  data?: PagedScrollResultMarketingActivityGoodsVo;
  msg?: string;
}

export interface JsonResultMapStringString {
  /** @format int32 */
  code?: number;
  data?: Record<string, string>;
  msg?: string;
}

export interface JsonResultListRechargeAmount {
  /** @format int32 */
  code?: number;
  data?: RechargeAmount[];
  msg?: string;
}

export interface PagedResultMemberDetailOutputDto {
  list?: MemberDetailOutputDto[];

  /** @format int64 */
  total?: number;
}

export interface JsonResultStatisticsGraphOutputDto {
  /** @format int32 */
  code?: number;
  data?: StatisticsGraphOutputDto;
  msg?: string;
}

export interface JsonResultStatisticsCountOutputDto {
  /** @format int32 */
  code?: number;
  data?: StatisticsCountOutputDto;
  msg?: string;
}

export interface JsonResultPagedResultMemberDetailOutputDto {
  /** @format int32 */
  code?: number;
  data?: PagedResultMemberDetailOutputDto;
  msg?: string;
}

export interface JsonResultMemberDetailOutputDto {
  /** @format int32 */
  code?: number;
  data?: MemberDetailOutputDto;
  msg?: string;
}

export interface PagedScrollResultIntegralGoodsVO {
  isLastPage?: boolean;
  list?: IntegralGoodsVO[];
}

export interface JsonResultPagedScrollResultIntegralGoodsVO {
  /** @format int32 */
  code?: number;
  data?: PagedScrollResultIntegralGoodsVO;
  msg?: string;
}

export interface JsonResultIntegralGoodsSkuStockAndPriceVo {
  /** @format int32 */
  code?: number;
  data?: IntegralGoodsSkuStockAndPriceVo;
  msg?: string;
}

export interface PagedResultIntegralGoodsVO {
  list?: IntegralGoodsVO[];

  /** @format int64 */
  total?: number;
}

export interface PagedResultIntegralGoodsSpecOutputDto {
  list?: IntegralGoodsSpecOutputDto[];

  /** @format int64 */
  total?: number;
}

export interface JsonResultPagedResultIntegralGoodsSpecOutputDto {
  /** @format int32 */
  code?: number;
  data?: PagedResultIntegralGoodsSpecOutputDto;
  msg?: string;
}

export interface JsonResultPagedResultIntegralGoodsVO {
  /** @format int32 */
  code?: number;
  data?: PagedResultIntegralGoodsVO;
  msg?: string;
}

export interface JsonResultIntegralGoodsVO {
  /** @format int32 */
  code?: number;
  data?: IntegralGoodsVO;
  msg?: string;
}

export interface JsonResultIntegralGoodsSpecOutputDto {
  /** @format int32 */
  code?: number;
  data?: IntegralGoodsSpecOutputDto;
  msg?: string;
}

export interface JsonResultIntegralGoodsClassifyOutputDto {
  /** @format int32 */
  code?: number;
  data?: IntegralGoodsClassifyOutputDto;
  msg?: string;
}

export interface PagedResultScoreFlowOutputDto {
  list?: ScoreFlowOutputDto[];

  /** @format int64 */
  total?: number;
}

export interface PagedResultBalanceFlowOutputDto {
  list?: BalanceFlowOutputDto[];

  /** @format int64 */
  total?: number;
}

export interface JsonResultPagedResultScoreFlowOutputDto {
  /** @format int32 */
  code?: number;
  data?: PagedResultScoreFlowOutputDto;
  msg?: string;
}

export interface JsonResultPagedResultBalanceFlowOutputDto {
  /** @format int32 */
  code?: number;
  data?: PagedResultBalanceFlowOutputDto;
  msg?: string;
}

export interface PagedScrollResultScoreFlowOutputDto {
  isLastPage?: boolean;
  list?: ScoreFlowOutputDto[];

  /** @format int64 */
  nextToken?: number;
}

export interface PagedScrollResultBalanceFlowOutputDto {
  isLastPage?: boolean;
  list?: BalanceFlowOutputDto[];

  /** @format int64 */
  nextToken?: number;
}

export interface JsonResultPagedScrollResultScoreFlowOutputDto {
  /** @format int32 */
  code?: number;
  data?: PagedScrollResultScoreFlowOutputDto;
  msg?: string;
}

export interface JsonResultPagedScrollResultBalanceFlowOutputDto {
  /** @format int32 */
  code?: number;
  data?: PagedScrollResultBalanceFlowOutputDto;
  msg?: string;
}

export interface JsonResultBalanceGetOutputDto {
  /** @format int32 */
  code?: number;
  data?: BalanceGetOutputDto;
  msg?: string;
}

export interface JsonResultJoinPromotionOutputDto {
  /** @format int32 */
  code?: number;
  data?: JoinPromotionOutputDto;
  msg?: string;
}

export interface JsonResultListPopupAdsDto {
  /** @format int32 */
  code?: number;
  data?: PopupAdsDto[];
  msg?: string;
}

export interface PagedResultPopupAdsDto {
  list?: PopupAdsDto[];

  /** @format int64 */
  total?: number;
}

export interface JsonResultPopupAdsDto {
  /** @format int32 */
  code?: number;
  data?: PopupAdsDto;
  msg?: string;
}

export interface JsonResultPagedResultPopupAdsDto {
  /** @format int32 */
  code?: number;
  data?: PagedResultPopupAdsDto;
  msg?: string;
}

export interface PagedScrollResultOrderVO {
  isLastPage?: boolean;
  list?: OrderVO[];

  /** @format int64 */
  nextToken?: number;
}

export interface JsonResultPagedScrollResultOrderVO {
  /** @format int32 */
  code?: number;
  data?: PagedScrollResultOrderVO;
  msg?: string;
}

export interface PagedScrollResultMarketingActivityDto {
  isLastPage?: boolean;
  list?: MarketingActivityDto[];

  /** @format int64 */
  nextToken?: number;
}

export interface JsonResultPagedScrollResultMarketingActivityDto {
  /** @format int32 */
  code?: number;
  data?: PagedScrollResultMarketingActivityDto;
  msg?: string;
}

export interface PagedScrollResultMarketingActivityWebResultVo {
  isLastPage?: boolean;
  list?: MarketingActivityWebResultVo[];

  /** @format int64 */
  nextToken?: number;
}

export interface JsonResultPagedScrollResultMarketingActivityWebResultVo {
  /** @format int32 */
  code?: number;
  data?: PagedScrollResultMarketingActivityWebResultVo;
  msg?: string;
}

export interface PagedScrollResultMarketingActivityVo {
  isLastPage?: boolean;
  list?: MarketingActivityVo[];
}

export interface JsonResultPagedScrollResultMarketingActivityVo {
  /** @format int32 */
  code?: number;
  data?: PagedScrollResultMarketingActivityVo;
  msg?: string;
}

export interface PagedResultHotKeywordDto {
  list?: HotKeywordDto[];

  /** @format int64 */
  total?: number;
}

export interface JsonResultPagedResultHotKeywordDto {
  /** @format int32 */
  code?: number;
  data?: PagedResultHotKeywordDto;
  msg?: string;
}

export interface JsonResultListHotKeywordDto {
  /** @format int32 */
  code?: number;
  data?: HotKeywordDto[];
  msg?: string;
}

export interface JsonResultHotKeywordDto {
  /** @format int32 */
  code?: number;
  data?: HotKeywordDto;
  msg?: string;
}

export interface JsonResultNewcomerGiftOutputDto {
  /** @format int32 */
  code?: number;
  data?: NewcomerGiftOutputDto;
  msg?: string;
}

export interface JsonResultScoreGetOutputDto {
  /** @format int32 */
  code?: number;
  data?: ScoreGetOutputDto;
  msg?: string;
}

export interface PagedResultScoreFlowDto {
  list?: ScoreFlowDto[];

  /** @format int64 */
  total?: number;
}

export interface JsonResultPagedResultScoreFlowDto {
  /** @format int32 */
  code?: number;
  data?: PagedResultScoreFlowDto;
  msg?: string;
}

export interface PagedScrollResultScoreFlowDto {
  isLastPage?: boolean;
  list?: ScoreFlowDto[];
}

export interface JsonResultPagedScrollResultScoreFlowDto {
  /** @format int32 */
  code?: number;
  data?: PagedScrollResultScoreFlowDto;
  msg?: string;
}

export interface PagedResultSysUserVo {
  list?: SysUserVo[];

  /** @format int64 */
  total?: number;
}

export interface PagedResultSysDeptVo {
  list?: SysDeptVo[];

  /** @format int64 */
  total?: number;
}

export interface PagedResultSysRoleOutputDto {
  list?: SysRoleOutputDto[];

  /** @format int64 */
  total?: number;
}

export interface PagedResultSysResource {
  list?: SysResource[];

  /** @format int64 */
  total?: number;
}

export interface PagedResultRefundMasterDto {
  list?: RefundMasterDto[];

  /** @format int64 */
  total?: number;
}

export interface PagedResultEventTypesVo {
  list?: EventTypeDto[];

  /** @format int64 */
  total?: number;
}

export interface PagedResultMarketingActivityVo {
  list?: MarketingActivityVo[];

  /** @format int64 */
  total?: number;
}

export interface PagedResultMemberInfoPageVo {
  list?: MemberInfoPageVo[];

  /** @format int64 */
  total?: number;
}

export interface PagedResultOrderVO {
  list?: OrderVO[];

  /** @format int64 */
  total?: number;
}

export interface PagedResultMallConfPageOutputDto {
  list?: MallConfPageOutputDto[];

  /** @format int64 */
  total?: number;
}

export interface PagedResultMemCouponRecordVo {
  list?: MemCouponRecordVo[];

  /** @format int64 */
  total?: number;
}

export interface PagedResultMaterialVo {
  list?: MaterialVo[];

  /** @format int64 */
  total?: number;
}

export interface PagedResultKeywordDto {
  list?: KeywordDto[];

  /** @format int64 */
  total?: number;
}

export interface PagedResultGoodsVO {
  list?: GoodsVO[];

  /** @format int64 */
  total?: number;
}

export interface PagedResultExpressTemplateListOutputDto {
  list?: ExpressTemplateListOutputDto[];

  /** @format int64 */
  total?: number;
}

export interface PagedResultGoodsSpecOutputDto {
  list?: GoodsSpecOutputDto[];

  /** @format int64 */
  total?: number;
}

export interface PagedResultCouponRecordOutputDto {
  list?: CouponRecordOutputDto[];

  /** @format int64 */
  total?: number;
}

export interface PagedResultCouponTemplateVo {
  list?: CouponTemplateVo[];

  /** @format int64 */
  total?: number;
}

export interface PagedResultCouponRecordDetailOutputDto {
  list?: CouponRecordDetailOutputDto[];

  /** @format int64 */
  total?: number;
}

export interface PagedResultCommentsVO {
  list?: CommentsVO[];

  /** @format int64 */
  total?: number;
}

export interface PagedResultCommentsHeadImgOutputDto {
  list?: CommentsHeadImgOutputDto[];

  /** @format int64 */
  total?: number;
}

export interface PagedResultBannerOutputDto {
  list?: BannerOutputDto[];

  /** @format int64 */
  total?: number;
}

export interface JsonResultResourceDetailVo {
  /** @format int32 */
  code?: number;
  data?: ResourceDetailVo;
  msg?: string;
}

export interface JsonResultSysRoleDetailOutputDto {
  /** @format int32 */
  code?: number;
  data?: SysRoleDetailOutputDto;
  msg?: string;
}

export interface JsonResultSysAuthVo {
  /** @format int32 */
  code?: number;
  data?: SysAuthVo;
  msg?: string;
}

export interface JsonResultSysResource {
  /** @format int32 */
  code?: number;
  data?: SysResourceRes;
  msg?: string;
}

export interface JsonResultPagedResultSysUserVo {
  /** @format int32 */
  code?: number;
  data?: PagedResultSysUserVo;
  msg?: string;
}

export interface JsonResultPagedResultSysResource {
  /** @format int32 */
  code?: number;
  data?: PagedResultSysResource;
  msg?: string;
}

export interface JsonResultPagedResultSysRoleOutputDto {
  /** @format int32 */
  code?: number;
  data?: PagedResultSysRoleOutputDto;
  msg?: string;
}

export interface JsonResultPagedResultSysDeptVo {
  /** @format int32 */
  code?: number;
  data?: PagedResultSysDeptVo;
  msg?: string;
}

export interface JsonResultPagedResultRefundMasterDto {
  /** @format int32 */
  code?: number;
  data?: PagedResultRefundMasterDto;
  msg?: string;
}

export interface JsonResultPagedResultOrderVO {
  /** @format int32 */
  code?: number;
  data?: PagedResultOrderVO;
  msg?: string;
}

export interface JsonResultPagedResultMemCouponRecordVo {
  /** @format int32 */
  code?: number;
  data?: PagedResultMemCouponRecordVo;
  msg?: string;
}

export interface JsonResultPagedResultMemberInfoPageVo {
  /** @format int32 */
  code?: number;
  data?: PagedResultMemberInfoPageVo;
  msg?: string;
}

export interface JsonResultPagedResultMaterialVo {
  /** @format int32 */
  code?: number;
  data?: PagedResultMaterialVo;
  msg?: string;
}

export interface JsonResultPagedResultEventTypesVo {
  /** @format int32 */
  code?: number;
  data?: EventTypeDto[];
  msg?: string;
}

export interface JsonResultPagedResultMarketingActivityVo {
  /** @format int32 */
  code?: number;
  data?: PagedResultMarketingActivityVo;
  msg?: string;
}

export interface JsonResultPagedResultMallConfPageOutputDto {
  /** @format int32 */
  code?: number;
  data?: PagedResultMallConfPageOutputDto;
  msg?: string;
}

export interface JsonResultPagedResultKeywordDto {
  /** @format int32 */
  code?: number;
  data?: PagedResultKeywordDto;
  msg?: string;
}

export interface JsonResultPagedResultGoodsVO {
  /** @format int32 */
  code?: number;
  data?: PagedResultGoodsVO;
  msg?: string;
}

export interface JsonResultPagedResultGoodsSpecOutputDto {
  /** @format int32 */
  code?: number;
  data?: PagedResultGoodsSpecOutputDto;
  msg?: string;
}

export interface JsonResultPagedResultExpressTemplateListOutputDto {
  /** @format int32 */
  code?: number;
  data?: PagedResultExpressTemplateListOutputDto;
  msg?: string;
}

export interface JsonResultPagedResultCouponTemplateVo {
  /** @format int32 */
  code?: number;
  data?: PagedResultCouponTemplateVo;
  msg?: string;
}

export interface JsonResultPagedResultCouponRecordOutputDto {
  /** @format int32 */
  code?: number;
  data?: PagedResultCouponRecordOutputDto;
  msg?: string;
}

export interface JsonResultPagedResultBannerOutputDto {
  /** @format int32 */
  code?: number;
  data?: PagedResultBannerOutputDto;
  msg?: string;
}

export interface JsonResultPagedResultCouponRecordDetailOutputDto {
  /** @format int32 */
  code?: number;
  data?: PagedResultCouponRecordDetailOutputDto;
  msg?: string;
}

export interface JsonResultPagedResultCommentsHeadImgOutputDto {
  /** @format int32 */
  code?: number;
  data?: PagedResultCommentsHeadImgOutputDto;
  msg?: string;
}

export interface JsonResultPagedResultCommentsVO {
  /** @format int32 */
  code?: number;
  data?: PagedResultCommentsVO;
  msg?: string;
}

export interface JsonResultMemberInfoPageVo {
  /** @format int32 */
  code?: number;
  data?: MemberInfoPageVo;
  msg?: string;
}

export interface JsonResultMemCouponVo {
  /** @format int32 */
  code?: number;
  data?: MemCouponVo;
  msg?: string;
}

export interface JsonResultMallConfPageOutputDto {
  /** @format int32 */
  code?: number;
  data?: MallConfPageOutputDto;
  msg?: string;
}

export interface JsonResultLoginOutputDto {
  /** @format int32 */
  code?: number;
  data?: LoginOutputDto;
  msg?: string;
}

export interface JsonResultListSysRole {
  /** @format int32 */
  code?: number;
  data?: SysRole[];
  msg?: string;
}

export interface JsonResultListTreeResourceVo {
  /** @format int32 */
  code?: number;
  data?: TreeResourceVo[];
  msg?: string;
}

export interface JsonResultListSysRoleSelectOutputDto {
  /** @format int32 */
  code?: number;
  data?: SysRoleSelectOutputDto[];
  msg?: string;
}

export interface JsonResultListSysResource {
  /** @format int32 */
  code?: number;
  data?: SysResource[];
  msg?: string;
}

export interface JsonResultListSysApi {
  /** @format int32 */
  code?: number;
  data?: SysApi[];
  msg?: string;
}

export interface JsonResultListMaterialGroupVo {
  /** @format int32 */
  code?: number;
  data?: MaterialGroupVo[];
  msg?: string;
}

export interface JsonResultListMallConfPageOutputDto {
  /** @format int32 */
  code?: number;
  data?: MallConfPageOutputDto[];
  msg?: string;
}

export interface JsonResultListConfConfigOutputDto {
  /** @format int32 */
  code?: number;
  data?: ConfConfigOutputDto[];
  msg?: string;
}

export interface JsonResultKeywordDto {
  /** @format int32 */
  code?: number;
  data?: KeywordDto;
  msg?: string;
}

export interface JsonResultGoodsSpecOutputDto {
  /** @format int32 */
  code?: number;
  data?: GoodsSpecOutputDto;
  msg?: string;
}

export interface JsonResultListAddressOutputDto {
  /** @format int32 */
  code?: number;
  data?: AddressOutputDto[];
  msg?: string;
}

export interface JsonResultGoodsClassifyOutputDto {
  /** @format int32 */
  code?: number;
  data?: GoodsClassifyOutputDto;
  msg?: string;
}

export interface JsonResultExpressTemplateDetailOutputDto {
  /** @format int32 */
  code?: number;
  data?: ExpressTemplateDetailOutputDto;
  msg?: string;
}

export interface JsonResultBannerOutputDto {
  /** @format int32 */
  code?: number;
  data?: BannerOutputDto;
  msg?: string;
}

export interface JsonResultAddressOutputDto {
  /** @format int32 */
  code?: number;
  data?: AddressOutputDto;
  msg?: string;
}

export interface JsonResultCouponTemplateVo {
  /** @format int32 */
  code?: number;
  data?: CouponTemplateVo;
  msg?: string;
}

export interface PagedScrollResultUserAddressOutPutDto {
  isLastPage?: boolean;
  list?: UserAddressOutPutDto[];

  /** @format int64 */
  nextToken?: number;
}

export interface PagedScrollResultGoodsVO {
  isLastPage?: boolean;
  list?: GoodsVO[];

  /** @format int64 */
  nextToken?: number;
}

export interface PagedScrollResultMemCouponVo {
  isLastPage?: boolean;
  list?: MemCouponVo[];

  /** @format int64 */
  nextToken?: number;
}

export interface PagedScrollResultCouponTemplateVo {
  isLastPage?: boolean;
  list?: CouponTemplateVo[];

  /** @format int64 */
  nextToken?: number;
}

export interface PagedScrollResultCommentsVO {
  isLastPage?: boolean;
  list?: CommentsVO[];

  /** @format int64 */
  nextToken?: number;
}

export interface PagedScrollResultCollectionVo {
  isLastPage?: boolean;
  list?: CollectionVo[];

  /** @format int64 */
  nextToken?: number;
}

export interface PageInfoRefundMasterDto {
  /** @format int32 */
  endRow?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  list?: RefundMasterDto[];

  /** @format int32 */
  navigateFirstPage?: number;

  /** @format int32 */
  navigateLastPage?: number;

  /** @format int32 */
  navigatePages?: number;
  navigatepageNums?: number[];

  /** @format int32 */
  nextPage?: number;

  /** @format int32 */
  pageNum?: number;

  /** @format int32 */
  pageSize?: number;

  /** @format int32 */
  pages?: number;

  /** @format int32 */
  prePage?: number;

  /** @format int32 */
  size?: number;

  /** @format int32 */
  startRow?: number;

  /** @format int64 */
  total?: number;
}

export interface PageInfoOrderVO {
  /** @format int32 */
  endRow?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  list?: OrderVO[];

  /** @format int32 */
  navigateFirstPage?: number;

  /** @format int32 */
  navigateLastPage?: number;

  /** @format int32 */
  navigatePages?: number;
  navigatepageNums?: number[];

  /** @format int32 */
  nextPage?: number;

  /** @format int32 */
  pageNum?: number;

  /** @format int32 */
  pageSize?: number;

  /** @format int32 */
  pages?: number;

  /** @format int32 */
  prePage?: number;

  /** @format int32 */
  size?: number;

  /** @format int32 */
  startRow?: number;

  /** @format int64 */
  total?: number;
}

export interface PageInfoMarketingActivityGoodsVo {
  /** @format int32 */
  endRow?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  list?: MarketingActivityGoodsVo[];

  /** @format int32 */
  navigateFirstPage?: number;

  /** @format int32 */
  navigateLastPage?: number;

  /** @format int32 */
  navigatePages?: number;
  navigatepageNums?: number[];

  /** @format int32 */
  nextPage?: number;

  /** @format int32 */
  pageNum?: number;

  /** @format int32 */
  pageSize?: number;

  /** @format int32 */
  pages?: number;

  /** @format int32 */
  prePage?: number;

  /** @format int32 */
  size?: number;

  /** @format int32 */
  startRow?: number;

  /** @format int64 */
  total?: number;
}

export interface JsonResultString {
  /** @format int32 */
  code?: number;
  data?: string;
  msg?: string;
}

export interface JsonResultLong {
  /** @format int32 */
  code?: number;

  /** @format int64 */
  data?: number;
  msg?: string;
}

export interface JsonResultBoolean {
  /** @format int32 */
  code?: number;
  data?: boolean;
  msg?: string;
}

export interface JsonResultUserAddressOutPutDto {
  /** @format int32 */
  code?: number;
  data?: UserAddressOutPutDto;
  msg?: string;
}

export interface JsonResultInt {
  /** @format int32 */
  code?: number;

  /** @format int32 */
  data?: number;
  msg?: string;
}

export interface JsonResultVoid {
  /** @format int32 */
  code?: number;
  msg?: string;
}

export interface JsonResultPagedScrollResultMemCouponVo {
  /** @format int32 */
  code?: number;
  data?: PagedScrollResultMemCouponVo;
  msg?: string;
}

export interface JsonResultRefundMasterDto {
  /** @format int32 */
  code?: number;
  data?: RefundMasterDto;
  msg?: string;
}

export interface JsonResultPagedScrollResultUserAddressOutPutDto {
  /** @format int32 */
  code?: number;
  data?: PagedScrollResultUserAddressOutPutDto;
  msg?: string;
}

export interface JsonResultPagedScrollResultGoodsVO {
  /** @format int32 */
  code?: number;
  data?: PagedScrollResultGoodsVO;
  msg?: string;
}

export interface JsonResultPagedScrollResultCouponTemplateVo {
  /** @format int32 */
  code?: number;
  data?: PagedScrollResultCouponTemplateVo;
  msg?: string;
}

export interface JsonResultPagedScrollResultCommentsVO {
  /** @format int32 */
  code?: number;
  data?: PagedScrollResultCommentsVO;
  msg?: string;
}

export interface JsonResultPageInfoRefundMasterDto {
  /** @format int32 */
  code?: number;
  data?: PageInfoRefundMasterDto;
  msg?: string;
}

export interface JsonResultPageInfoMarketingActivityGoodsVo {
  /** @format int32 */
  code?: number;
  data?: PageInfoMarketingActivityGoodsVo;
  msg?: string;
}

export interface JsonResultPagedScrollResultCollectionVo {
  /** @format int32 */
  code?: number;
  data?: PagedScrollResultCollectionVo;
  msg?: string;
}

export interface JsonResultPageInfoOrderVO {
  /** @format int32 */
  code?: number;
  data?: PageInfoOrderVO;
  msg?: string;
}

export interface JsonResultOrderVO {
  /** @format int32 */
  code?: number;
  data?: OrderVO;
  msg?: string;
}

export interface JsonResultOrderCountVO {
  /** @format int32 */
  code?: number;
  data?: OrderCountVO;
  msg?: string;
}

export interface JsonResultOrderPayDTO {
  /** @format int32 */
  code?: number;
  data?: OrderPayDTO;
  msg?: string;
}

export interface JsonResultMemberOutputDto {
  /** @format int32 */
  code?: number;
  data?: MemberOutputDto;
  msg?: string;
}

export interface JsonResultOrderCalculateResponse {
  /** @format int32 */
  code?: number;
  data?: OrderCalculateResponse;
  msg?: string;
}

export interface JsonResultMarketingActivityDto {
  /** @format int32 */
  code?: number;
  data?: MarketingActivityDto;
  msg?: string;
}

export interface JsonResultMallConfPageSimpleOutputDto {
  /** @format int32 */
  code?: number;
  data?: MallConfPageSimpleOutputDto;
  msg?: string;
}

export interface JsonResultMapStringObject {
  /** @format int32 */
  code?: number;
  data?: object;
  msg?: string;
}

export interface JsonResultListShopCartVO {
  /** @format int32 */
  code?: number;
  data?: ShopCartVO[];
  msg?: string;
}

export interface JsonResultListRefundReasonOutputDto {
  /** @format int32 */
  code?: number;
  data?: RefundReasonOutputDto[];
  msg?: string;
}

export interface JsonResultListKeywordDto {
  /** @format int32 */
  code?: number;
  data?: KeywordDto[];
  msg?: string;
}

export interface JsonResultListMallExpressCompanyVo {
  /** @format int32 */
  code?: number;
  data?: MallExpressCompanyVo[];
  msg?: string;
}

export interface JsonResultListMenuTreeOutputDto {
  /** @format int32 */
  code?: number;
  data?: MenuTreeOutputDto[];
  msg?: string;
}

export interface JsonResultListCouponTemplateVo {
  /** @format int32 */
  code?: number;
  data?: CouponTemplateVo[];
  msg?: string;
}

export interface JsonResultListBannerPositionOutputDto {
  /** @format int32 */
  code?: number;
  data?: BannerPositionOutputDto[];
  msg?: string;
}

export interface JsonResultExpressTrackRespDto {
  /** @format int32 */
  code?: number;
  data?: ExpressTrackRespDto;
  msg?: string;
}

export interface JsonResultGoodsVO {
  /** @format int32 */
  code?: number;
  data?: GoodsVO;
  msg?: string;
}

export interface JsonResultCouponAvailableGoodsOutputDto {
  /** @format int32 */
  code?: number;
  data?: CouponAvailableGoodsOutputDto;
  msg?: string;
}

export interface JsonResultGoodsSkuStockAndPriceVo {
  /** @format int32 */
  code?: number;
  data?: GoodsSkuStockAndPriceVo;
  msg?: string;
}

export interface AdminActivityClassifyGetParams {
  /**
   * 开始时间
   */
  beginTime?: string;
  /**
   * 结束时间
   */
  endTime?: string;
  /**
   * 主键
   */
  id?: number;
  /**
   * 姓名/手机号
   */
  name?: string;
  /**
   * nextToken
   */
  nextToken?: number;
  /**
   * 当前页码
   */
  pageNum?: number;
  /**
   * 每页数据量
   */
  pageSize?: number;
  [property: string]: any;
}

export interface AdminActivityFlashSaleGetParams {
  /** 活动名称 */
  activityName?: string;

  /** 活动编号 */
  activityNo?: string;

  /** 活动状态 0：未启用 1：启用 2：结束 3：待审核 4：审核失败 */
  activityStatus?: number;

  /** 活动状态列表 0：未启用 1：启用 2：结束 3：待审核 4：审核失败 */
  activityStatusList?: string[];

  /** 活动类型 0：拼团 1：预售 2：限时抢购 3:满减 4:满折 5:满赠 */
  activityType?: number;

  /** 活动类型列表 0：拼团 1：预售 2：限时抢购 3:满减 4:满折 5:满赠 */
  activityTypeList?: string[];

  /** 开始时间 */
  beginTime?: string;

  /** 创建结束时间(报名日期) */
  endGmtCreated?: string;

  /** 活动开始结束时间 */
  endStartTime?: string;

  /** 结束时间 */
  endTime?: string;

  /** 主键 */
  id?: number;

  /** 当前页码 */
  pageNum?: number;

  /** 每页数据量 */
  pageSize?: number;

  /** 创建开始时间(报名日期) */
  startGmtCreated?: string;

  /** 活动开始时间 */
  startStartTime?: string;
}

export interface AdminApiMallConfMaterialGroupQueryListAllGetParams {
  /** 分组名称 */
  name?: string;

  /** 分组类型 0图片 1视频 */
  type?: number;
}

export interface AdminApiMallConfMaterialGroupDeleteDeleteParams {
  /** id */
  id: number;
}

export interface AdminApiMemberExportGetParams {
  /** 开始时间 */
  beginTime?: string;

  /** 结束时间 */
  endTime?: string;

  /** 主键 */
  id?: number;

  /** 会员类型 1 普通用户 2 会员用户 */
  memberType?: number;

  /** 当前页码 */
  pageNum?: number;

  /** 每页数据量 */
  pageSize?: number;

  /** 用户名称/手机号/id */
  searchString?: string;

  /** 状态 1：正常 0：禁用 */
  status?: number;
  idInList?: string[];
  idNotInList?: string[];
}

export interface AdminApiMemberQueryGetParams {
  /** 开始时间 */
  beginTime?: string;

  /** 结束时间 */
  endTime?: string;

  /** 主键 */
  id?: number;

  /** 会员类型 1 普通用户 2 会员用户 */
  memberType?: number;

  /** 当前页码 */
  pageNum?: number;

  /** 每页数据量 */
  pageSize?: number;

  /** 用户名称/手机号/id */
  searchString?: string;

  /** 状态 1：正常 0：禁用 */
  status?: number;
  idInList?: string[];
  idNotInList?: string[];
}

export interface AdminApiSmsSendCodeGetParams {
  /** mobile */
  mobile?: string;

  /** scene */
  scene?: string;
}

export interface AdminApiSysResourceGetParams {
  /** 开始时间 */
  beginTime?: string;

  /** 结束时间 */
  endTime?: string;

  /** 主键 */
  id?: number;

  /** 资源名称 */
  name?: string;

  /** 当前页码 */
  pageNum?: number;

  /** 每页数据量 */
  pageSize?: number;

  /** 父级菜单ID */
  parentId?: number;

  /** 资源类型 */
  type?: string;
}

export interface AdminApiSysDeptQueryGetParams {
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
   * 部门名称
   * @example
   */
  name?: string;

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
}

export interface AdminApiSysDeptDeleteDeleteParams {
  /**
   * 部门id
   * @example
   */
  id?: number;
}

export interface AdminApiSysResourceTreeGetParams {
  /** 资源名称 */
  name?: string;

  /** 父级ID */
  parentId?: number;

  /** 资源类型 */
  type?: string;
}

export interface AdminApiSysRoleDeleteDeleteParams {
  /** 角色id */
  id?: string;
}

export interface AdminApiSysRoleQueryGetParams {
  /** 开始时间 */
  beginTime?: string;

  /** 结束时间 */
  endTime?: string;

  /** 主键 */
  id?: number;

  /** 角色名称 */
  name?: string;

  /** 当前页码 */
  pageNum?: number;

  /** 每页数据量 */
  pageSize?: number;
}

export interface AdminApiSysUserDeleteDeleteParams {
  /** 员工id */
  id?: string;
}

export interface AdminApiSysUserExportGetParams {
  /** 开始时间 */
  beginTime?: string;

  /** 结束时间 */
  endTime?: string;

  /** 主键 */
  id?: number;

  /** 当前页码 */
  pageNum?: number;

  /** 每页数据量 */
  pageSize?: number;

  /** 员工名称 */
  username?: string;
}

export interface AdminApiSysUserQueryGetParams {
  /** 开始时间 */
  beginTime?: string;

  /** 结束时间 */
  endTime?: string;

  /** 主键 */
  id?: number;

  /** 当前页码 */
  pageNum?: number;

  /** 每页数据量 */
  pageSize?: number;

  /** 员工名称 */
  username?: string;
}

export interface AdminApiSysUserResetDefaultDeleteParams {
  /** 员工id */
  id?: string;
}

export interface AdminCommentsExportGetParams {
  /** 开始时间 */
  beginTime?: string;

  /** 条件 */
  condition?: string;

  /** 结束时间 */
  endTime?: string;

  /** 来源 1：后台评价 2：用户添加 */
  fromType?: number;

  /** 主键 */
  id?: number;

  /** 当前页码 */
  pageNum?: number;

  /** 每页数据量 */
  pageSize?: number;
}

export interface AdminCommentsGetParams {
  /** 开始时间 */
  beginTime?: string;

  /** 条件 */
  condition?: string;

  /** 结束时间 */
  endTime?: string;

  /** 来源 1：后台评价 2：用户添加 */
  fromType?: number;

  /** 主键 */
  id?: number;

  /** 当前页码 */
  pageNum?: number;

  /** 每页数据量 */
  pageSize?: number;
}

export interface AdminGoodsGetParams {
  /** 开始时间 */
  beginTime?: string;

  /** 末级分类id */
  classifyId?: string;

  /** 分类父id1（末级的上一级） */
  classifyPid1?: string;

  /** 分类父id2（分类父id1的上一级） */
  classifyPid2?: string;

  /** 结束时间 */
  endTime?: string;

  /** 前台是否可见 */
  frontShow?: boolean;

  /** 商品名称 */
  goodsName?: string;

  /** 商品编号 */
  goodsNo?: string;

  /** 商品编号列表 */
  goodsNoList?: string[];

  /** 商品类型 0 普通商品 1 积分商品 */
  goodsType?: number;

  /** 主键 */
  id?: number;

  /** 当前页码 */
  pageNum?: number;

  /** 每页数据量 */
  pageSize?: number;

  /** 是否推荐 0 否 1 是 */
  recommendStatus?: boolean;

  /** 排序类型 1:sort 2:实际销量倒序 3:实际销量正序 4:价格倒序 5:价格正序 6：上架时间倒序 7：上架时间正序 8：兑换积分倒序 9：兑换积分正序,10:创建时间倒序 */
  selectSortType?: number;

  /** 是否上架 0 否 1 是 */
  shelved?: boolean;
}

export interface AdminMallAddressQueryListAllGetParams {
  /** isDefault */
  isDefault?: string[];
}

export interface AdminMallBannerQueryListGetParams {
  /** 开始时间 */
  beginTime?: string;

  /** 结束时间 */
  endTime?: string;

  /** 主键 */
  id?: number;

  /** 名称 */
  name?: string;

  /** 当前页码 */
  pageNum?: number;

  /** 每页数据量 */
  pageSize?: number;

  /** 显示状态 1显示0不显示 */
  showStatus?: number;
}

export interface AdminMallClassifyTreeGetParams {
  /** 前端是否展示 */
  frontShow?: boolean;

  /** 商品类型 0 普通商品 1 积分商品 */
  goodsType?: number;
}

export interface AdminMallCommentsHeadImgListGetParams {
  /** 开始时间 */
  beginTime?: string;

  /** 结束时间 */
  endTime?: string;

  /** 主键 */
  id?: number;

  /** 当前页码 */
  pageNum?: number;

  /** 每页数据量 */
  pageSize?: number;
}

export interface AdminMallConfigQueryByKeyGetParams {
  /** key */
  key?: string;
}

export interface AdminMallCouponExportGetParams {
  /** 开始时间 */
  beginTime?: string;

  /** 礼券记录id */
  couponId?: number;

  /** 结束时间 */
  endTime?: string;

  /** 主键 */
  id?: number;

  /** 手机号 */
  mobile?: string;

  /** 当前页码 */
  pageNum?: number;

  /** 每页数据量 */
  pageSize?: number;

  /** 状态 0 失败 1 成功 */
  status?: number;
}

export interface AdminMallExpressQueryGetParams {
  /** 开始时间 */
  beginTime?: string;

  /** 结束时间 */
  endTime?: string;

  /** 主键 */
  id?: number;

  /** 当前页码 */
  pageNum?: number;

  /** 每页数据量 */
  pageSize?: number;
  name?: string;
}

export interface AdminMallPageQueryGetParams {
  /** 开始时间 */
  beginTime?: string;

  /** 条件 */
  condition?: string;

  /** 结束时间 */
  endTime?: string;

  /** 主键 */
  id?: number;

  /** 当前页码 */
  pageNum?: number;

  /** 每页数据量 */
  pageSize?: number;
}

export interface AdminMallPageDetailGetParams {
  /** 自定义页面id */
  id?: string;
}

export interface AdminMallPageDeleteDeleteParams {
  /** 自定义页面id */
  id?: string;
}

export interface AdminMallCouponTemplateDeleteDeleteParams {
  /** 优惠劵id */
  id?: string;
}

export interface AdminMallCouponTemplateDetailGetParams {
  /** 优惠劵id */
  id?: string;
}

export interface AdminMallCouponTemplateQueryListGetParams {
  /** 开始时间 */
  beginTime?: string;

  /** 优惠劵类型 0 抵扣 1 折扣 2 赠品 3 兑换 4 包邮 */
  couponType?: number;

  /** 结束时间 */
  endTime?: string;

  /** 主键 */
  id?: number;

  /** 名称 */
  name?: string;

  /** 当前页码 */
  pageNum?: number;

  /** 每页数据量 */
  pageSize?: number;

  /** 优惠劵状态 0 已作废 3 生效中 4 未生效 5 已过期 */
  status?: number;

  /** 是否有库存，只对 true 生效 */
  stock?: boolean;

  /** 优惠劵编号 */
  templateNo?: string;
}

export interface AdminMemCouponDetailGetParams {
  /** 优惠劵id */
  id?: string;
}

export interface AdminMemCouponExportGetParams {
  /** 开始时间 */
  beginTime?: string;

  /** 结束时间 */
  endTime?: string;

  /** 主键 */
  id?: number;

  /** 当前页码 */
  pageNum?: number;

  /** 每页数据量 */
  pageSize?: number;

  /** 用户昵称/手机号/优惠券名称 */
  searchString?: string;

  /** 状态 0 未使用 1 已使用 2 已过期 3已作废 */
  useStatus?: number;
}

export interface AdminMemCouponQueryListGetParams {
  /** 开始时间 */
  beginTime?: string;

  /** 结束时间 */
  endTime?: string;

  /** 主键 */
  id?: number;

  /** 当前页码 */
  pageNum?: number;

  /** 每页数据量 */
  pageSize?: number;

  /** 用户昵称/手机号/优惠券名称 */
  searchString?: string;

  /** 状态 0 未使用 1 已使用 2 已过期 3已作废 */
  useStatus?: number;
}

export interface AdminOrdersGetParams {
  /** 开始时间 */
  beginTime?: string;

  /** 结束时间 */
  endTime?: string;

  /** 商品名称 */
  goodsName?: string;

  /** 主键 */
  id?: number;

  /** 订单渠道 */
  orderChannelType?: string;

  /** 订单编号 */
  orderNo?: string;

  /** 订单状态 */
  orderStatus?: number;

  /** 订单类型 */
  orderType?: number;

  /** 当前页码 */
  pageNum?: number;

  /** 每页数据量 */
  pageSize?: number;

  /** 查询类型 0：全部 1：待付款 2：待发货 3：待收货 4：待评价 5：交易完成 6：交易关闭 */
  queryType?: number;

  /** 收件人手机号 */
  shippingMobile?: string;

  /** 收件人姓名 */
  shippingName?: string;
}

export interface AdminOrdersExportGetParams {
  /** 开始时间 */
  beginTime?: string;

  /** 结束时间 */
  endTime?: string;

  /** 商品名称 */
  goodsName?: string;

  /** 主键 */
  id?: number;

  /** 订单渠道 */
  orderChannelType?: string;

  /** 订单编号 */
  orderNo?: string;

  /** 订单状态 */
  orderStatus?: number;

  /** 订单类型 */
  orderType?: number;

  /** 当前页码 */
  pageNum?: number;

  /** 每页数据量 */
  pageSize?: number;

  /** 查询类型 0：全部 1：待付款 2：待发货 3：待收货 4：待评价 5：交易完成 6：交易关闭 */
  queryType?: number;

  /** 收件人手机号 */
  shippingMobile?: string;

  /** 收件人姓名 */
  shippingName?: string;
}

export interface AdminRefundListGetParams {
  /** 开始时间 */
  beginTime?: string;

  /** 条件 */
  condition?: string;

  /** 结束时间 */
  endTime?: string;

  /** 主键 */
  id?: number;

  /** 当前页码 */
  pageNum?: number;

  /** 每页数据量 */
  pageSize?: number;

  /** 售后状态 */
  refundStatus?: number;

  /** 售后类型 0：退款 1：退货退款 */
  refundType?: number;
}

export interface AdminRefundInfoGetParams {
  /** refundNo */
  refundNo?: string;
}

export interface AdminRefundReRefundPutParams {
  /**
   * refundNo
   * @example
   */
  refundNo?: string;
}

export interface AdminRichtextGetParams {
  /** id */
  id?: string;
}

export interface AdminHotKeywordGetParams {
  /** 开始时间 */
  beginTime?: string;

  /** 结束时间 */
  endTime?: string;

  /** 热词 */
  hotKeyword?: string;

  /** 主键 */
  id?: number;

  /** 当前页码 */
  pageNum?: number;

  /** 每页数据量 */
  pageSize?: number;
}

export interface AdminActivityFullGetParams {
  /** 活动名称 */
  activityName?: string;

  /** 活动编号 */
  activityNo?: string;

  /** 活动状态 0：未启用 1：启用 2：结束 3：待审核 4：审核失败 */
  activityStatus?: number;

  /** 活动状态列表 0：未启用 1：启用 2：结束 3：待审核 4：审核失败 */
  activityStatusList?: string[];

  /** 活动类型 0：拼团 1：预售 2：限时抢购 3:满减 4:满折 5:满赠 */
  activityType?: number;

  /** 活动类型列表 0：拼团 1：预售 2：限时抢购 3:满减 4:满折 5:满赠 */
  activityTypeList?: string[];

  /** 开始时间 */
  beginTime?: string;

  /** 创建结束时间(报名日期) */
  endGmtCreated?: string;

  /** 活动开始结束时间 */
  endStartTime?: string;

  /** 结束时间 */
  endTime?: string;

  /** 主键 */
  id?: number;

  /** 当前页码 */
  pageNum?: number;

  /** 每页数据量 */
  pageSize?: number;

  /** 创建开始时间(报名日期) */
  startGmtCreated?: string;

  /** 活动开始时间 */
  startStartTime?: string;
}

export interface AdminPopupAdsGetParams {
  /** 开始时间 */
  beginTime?: string;

  /** 结束时间 */
  endTime?: string;

  /** 到期时间 */
  expirationTime?: string;

  /** 主键 */
  id?: number;

  /** 当前页码 */
  pageNum?: number;

  /** 每页数据量 */
  pageSize?: number;

  /** 标题 */
  title?: string;
}

export interface AdminMallBalanceGetGetParams {
  /**
   * userId
   * @example
   */
  userId?: number;
}

export interface AdminMallBalanceQueryUserIdGetParams {
  /** 开始时间 */
  beginTime?: string;

  /** 结束时间 */
  endTime?: string;

  /** 主键 */
  id?: number;

  /** 当前页码 */
  pageNum?: number;

  /** 每页数据量 */
  pageSize?: number;

  /** 余额增加类型 */
  plusType?: number;

  /** 余额扣减类型 */
  subtractType?: number;

  /**
   * userId
   * @example
   */
  userId: number;
}

export interface AdminMallConfigQueryByMultipleKeyGetParams {
  /** key */
  key?: string;
}

export interface AdminMallUserTaskConfigGetParams {
  /** 开始时间 */
  beginTime?: string;

  /** 是否启用 0 否 1是 */
  enabled?: boolean;

  /** 结束时间 */
  endTime?: string;

  /** id */
  id?: number;

  /** 任务名称 */
  name?: string;

  /** 当前页码 */
  pageNum?: number;

  /** 每页数据量 */
  pageSize?: number;

  /** 任务key */
  taskKey?: string;

  /** 用户id */
  userId?: number;
}

export interface AdminMallMemberCardGetParams {
  /** 获得方式 1：自动发放 2：用户领取 3：后台发放 4：付费 */
  acquisitionType?: number;

  /** 开始时间 */
  beginTime?: string;

  /** 结束时间 */
  endTime?: string;

  /** id */
  id?: number;

  /** 会员卡名称 */
  name?: string;

  /** 当前页码 */
  pageNum?: number;

  /** 每页数据量 */
  pageSize?: number;
}

export interface AdminApiMallConfMaterialDeleteDeleteParams {
  /** ids */
  ids: string;
}

export interface AdminApiMallConfMaterialQueryListGetParams {
  /** 开始时间 */
  beginTime?: string;

  /** 结束时间 */
  endTime?: string;

  /** 分组id */
  groupId?: number;

  /** 主键 */
  id?: number;

  /** 名称 */
  name?: string;

  /** 当前页码 */
  pageNum?: number;

  /** 每页数据量 */
  pageSize?: number;

  /** 类型 0 图片 1 视频 */
  type?: number;
}

export interface AdminMallCouponCodeGetParams {
  /** 开始时间 */
  beginTime?: string;

  /** 礼券名称 */
  couponName?: string;

  /** 结束时间 */
  endTime?: string;

  /** 主键 */
  id?: number;

  /** 当前页码 */
  pageNum?: number;

  /** 每页数据量 */
  pageSize?: number;
}

export interface AdminMallCouponCodeDetailGetParams {
  /** 开始时间 */
  beginTime?: string;

  /** 绑定状态 1：未兑换 2：已兑换 4：过期未兑换 */
  bindStatus?: number;

  /** 结束时间 */
  endTime?: string;

  /** 主键 */
  id?: number;

  /** 核销用户昵称 */
  nickName?: string;

  /** 当前页码 */
  pageNum?: number;

  /** 每页数据量 */
  pageSize?: number;

  /** 核销用户电话 */
  userMobile?: string;
}

export interface AdminActivityPresaleGetParams {
  /** 活动名称 */
  activityName?: string;

  /** 活动编号 */
  activityNo?: string;

  /** 活动状态 0：未启用 1：启用 2：结束 3：待审核 4：审核失败 */
  activityStatus?: number;

  /** 活动状态列表 0：未启用 1：启用 2：结束 3：待审核 4：审核失败 */
  activityStatusList?: string[];

  /** 活动类型 0：拼团 1：预售 2：限时抢购 3:满减 4:满折 5:满赠 */
  activityType?: number;

  /** 活动类型列表 0：拼团 1：预售 2：限时抢购 3:满减 4:满折 5:满赠 */
  activityTypeList?: string[];

  /** 开始时间 */
  beginTime?: string;

  /** 创建结束时间(报名日期) */
  endGmtCreated?: string;

  /** 活动开始结束时间 */
  endStartTime?: string;

  /** 结束时间 */
  endTime?: string;

  /** 主键 */
  id?: number;

  /** 当前页码 */
  pageNum?: number;

  /** 每页数据量 */
  pageSize?: number;

  /** 创建开始时间(报名日期) */
  startGmtCreated?: string;

  /** 活动开始时间 */
  startStartTime?: string;
}

export interface AdminMallMemberCardMemberUserIdGetParams {
  /** 开始时间 */
  beginTime?: string;

  /** 结束时间 */
  endTime?: string;

  /** 主键 */
  id?: number;

  /** 当前页码 */
  pageNum?: number;

  /** 每页数据量 */
  pageSize?: number;

  /**
   * userId
   * @example
   */
  userId: number;
}

export interface AdminUserAgreementUserAgreementRecordGetParams {
  /** 协议编号 */
  agreementNo?: string;

  /** 开始时间 */
  beginTime?: string;

  /** 操作人 */
  createUser?: string;

  /** 结束时间 */
  endTime?: string;

  /** 主键 */
  id?: number;

  /** 手机号 */
  mobile?: string;

  /** 当前页码 */
  pageNum?: number;

  /** 每页数据量 */
  pageSize?: number;

  /** 用户协议类型 1：用户协议 2：会员协议 */
  type?: number;
}

export interface AdminUserAgreementUserAgreeRecordGetParams {
  /** 同意开始时间 */
  agreeBeginTime?: string;

  /** 同意结束时间 */
  agreeEndTime?: string;

  /** 协议编号 */
  agreementNo?: string;

  /** 开始时间 */
  beginTime?: string;

  /** 结束时间 */
  endTime?: string;

  /** 主键 */
  id?: number;

  /** 当前页码 */
  pageNum?: number;

  /** 每页数据量 */
  pageSize?: number;

  /** 用户协议类型 1：用户协议 2：会员协议 */
  type?: number;

  /** 更新开始时间 */
  updateBeginTime?: string;

  /** 更新结束时间 */
  updateEndTime?: string;

  /** 用户id */
  userId?: number;
}

export interface AdminActivityFreeShippingGetParams {
  /** 活动名称 */
  activityName?: string;

  /** 活动编号 */
  activityNo?: string;

  /** 活动状态 0：未启用 1：启用 2：结束 3：待审核 4：审核失败 */
  activityStatus?: number;

  /** 活动状态列表 0：未启用 1：启用 2：结束 3：待审核 4：审核失败 */
  activityStatusList?: string[];

  /** 活动类型 0：拼团 1：预售 2：限时抢购 3:满减 4:满折 5:满赠 */
  activityType?: number;

  /** 活动类型列表 0：拼团 1：预售 2：限时抢购 3:满减 4:满折 5:满赠 */
  activityTypeList?: string[];

  /** 开始时间 */
  beginTime?: string;

  /** 创建结束时间(报名日期) */
  endGmtCreated?: string;

  /** 活动开始结束时间 */
  endStartTime?: string;

  /** 结束时间 */
  endTime?: string;

  /** 主键 */
  id?: number;

  /** 当前页码 */
  pageNum?: number;

  /** 每页数据量 */
  pageSize?: number;

  /** 创建开始时间(报名日期) */
  startGmtCreated?: string;

  /** 活动开始时间 */
  startStartTime?: string;
}

export interface AdminScoreOrdersGetParams {
  /** 开始时间 */
  beginTime?: string;

  /** 结束时间 */
  endTime?: string;

  /** 商品名称 */
  goodsName?: string;

  /** 主键 */
  id?: number;

  /** 订单渠道 */
  orderChannelType?: string;

  /** 订单编号 */
  orderNo?: string;

  /** 订单状态 */
  orderStatus?: number;

  /** 订单类型 */
  orderType?: number;

  /** 当前页码 */
  pageNum?: number;

  /** 每页数据量 */
  pageSize?: number;

  /** 查询类型 0：全部 1：待付款 2：待发货 3：待收货 4：待评价 5：交易完成 6：交易关闭 */
  queryType?: number;

  /** 收件人手机号 */
  shippingMobile?: string;

  /** 收件人姓名 */
  shippingName?: string;
}

export interface AdminScoreOrdersExportGetParams {
  /** 开始时间 */
  beginTime?: string;

  /** 结束时间 */
  endTime?: string;

  /** 商品名称 */
  goodsName?: string;

  /** 主键 */
  id?: number;

  /** 订单渠道 */
  orderChannelType?: string;

  /** 订单编号 */
  orderNo?: string;

  /** 订单状态 */
  orderStatus?: number;

  /** 订单类型 */
  orderType?: number;

  /** 当前页码 */
  pageNum?: number;

  /** 每页数据量 */
  pageSize?: number;

  /** 查询类型 0：全部 1：待付款 2：待发货 3：待收货 4：待评价 5：交易完成 6：交易关闭 */
  queryType?: number;

  /** 收件人手机号 */
  shippingMobile?: string;

  /** 收件人姓名 */
  shippingName?: string;
}

export interface AdminActivityGetParams {
  /** 活动名称 */
  activityName?: string;

  /** 活动编号 */
  activityNo?: string;

  /** 活动状态 0：未启用 1：启用 2：结束 3：待审核 4：审核失败 */
  activityStatus?: number;

  /** 活动状态列表 0：未启用 1：启用 2：结束 3：待审核 4：审核失败 */
  activityStatusList?: string[];

  /** 活动类型 0：拼团 1：预售 2：限时抢购 3:满减 4:满折 5:满赠 */
  activityType?: number;

  /** 活动类型列表 0：拼团 1：预售 2：限时抢购 3:满减 4:满折 5:满赠 */
  activityTypeList?: string[];

  /** 开始时间 */
  beginTime?: string;

  /** 创建结束时间(报名日期) */
  endGmtCreated?: string;

  /** 活动开始结束时间 */
  endStartTime?: string;

  /** 结束时间 */
  endTime?: string;

  /** 主键 */
  id?: number;

  /** 当前页码 */
  pageNum?: number;

  /** 每页数据量 */
  pageSize?: number;

  /** 创建开始时间(报名日期) */
  startGmtCreated?: string;

  /** 活动开始时间 */
  startStartTime?: string;
}

export interface AdminMallScoreQueryUserIdGetParams {
  /** 开始时间 */
  beginTime?: string;

  /** 结束时间 */
  endTime?: string;

  /** 主键 */
  id?: number;

  /** 当前页码 */
  pageNum?: number;

  /** 每页数据量 */
  pageSize?: number;

  /**
   * userId
   * @example
   */
  userId: number;
}

export interface AdminMallSpecQueryGetParams {
  /** 开始时间 */
  beginTime?: string;

  /** 结束时间 */
  endTime?: string;

  /** 主键 */
  id?: number;

  /** 当前页码 */
  pageNum?: number;

  /** 每页数据量 */
  pageSize?: number;
  pid?: number;
  specName?: string;
}

export interface AdminMallStatisticsExportOrderDetailsStatisticsGetParams {
  /** 开始时间 */
  beginTime?: string;

  /** 结束时间 */
  endTime?: string;

  /** 主键 */
  id?: number;

  /** 渠道类型 */
  orderChannelType?: string;

  /** 当前页码 */
  pageNum?: number;

  /** 每页数据量 */
  pageSize?: number;
}

export interface AdminMallStatisticsGraphOrderCountStatisticsGetParams {
  /** 开始时间 */
  beginTime?: string;

  /** 结束时间 */
  endTime?: string;

  /** 主键 */
  id?: number;

  /** 渠道类型 */
  orderChannelType?: string;

  /** 当前页码 */
  pageNum?: number;

  /** 每页数据量 */
  pageSize?: number;
}

export interface AdminMallStatisticsGraphSaleAmountStatisticsGetParams {
  /** 开始时间 */
  beginTime?: string;

  /** 结束时间 */
  endTime?: string;

  /** 主键 */
  id?: number;

  /** 渠道类型 */
  orderChannelType?: string;

  /** 当前页码 */
  pageNum?: number;

  /** 每页数据量 */
  pageSize?: number;
}

export interface AdminMallStatisticsGraphUserCountStatisticsGetParams {
  /** 开始时间 */
  beginTime?: string;

  /** 结束时间 */
  endTime?: string;

  /** 主键 */
  id?: number;

  /** 渠道类型 */
  orderChannelType?: string;

  /** 当前页码 */
  pageNum?: number;

  /** 每页数据量 */
  pageSize?: number;
}

export interface AdminMallStatisticsOrderDetailsStatisticsGetParams {
  /** 开始时间 */
  beginTime?: string;

  /** 结束时间 */
  endTime?: string;

  /** 主键 */
  id?: number;

  /** 渠道类型 */
  orderChannelType?: string;

  /** 当前页码 */
  pageNum?: number;

  /** 每页数据量 */
  pageSize?: number;
}

export interface AdminOperateLogsGetParams {
  /** 开始时间 */
  beginTime?: string;

  /** 业务id */
  bizNo?: string;

  /** 结束时间 */
  endTime?: string;

  /** 主键 */
  id?: number;

  /** 电话 */
  mobile?: string;

  /** 模块 */
  module?: string;

  /** 操作类型 */
  operateType?: string;

  /** 操作者 */
  operator?: string;

  /** 操作者名称 */
  operatorName?: string;

  /** 当前页码 */
  pageNum?: number;

  /** 每页数据量 */
  pageSize?: number;

  /** 平台 */
  platform?: string;

  /** 租户 */
  tenant?: string;
}

export interface AdminOperateLogsExportGetParams {
  /** 开始时间 */
  beginTime?: string;

  /** 业务id */
  bizNo?: string;

  /** 结束时间 */
  endTime?: string;

  /** 主键 */
  id?: number;

  /** 电话 */
  mobile?: string;

  /** 模块 */
  module?: string;

  /** 操作类型 */
  operateType?: string;

  /** 操作者 */
  operator?: string;

  /** 操作者名称 */
  operatorName?: string;

  /** 当前页码 */
  pageNum?: number;

  /** 每页数据量 */
  pageSize?: number;

  /** 平台 */
  platform?: string;

  /** 租户 */
  tenant?: string;
}

export interface AdminCacheGetParams {
  /**
   * key
   * @example
   */
  key?: string;
}

export interface AdminOrdersListGetParams {
  /** 开始时间 */
  beginTime?: string;

  /** 结束时间 */
  endTime?: string;

  /** 商品名称 */
  goodsName?: string;

  /** 主键 */
  id?: number;

  /** 订单渠道 */
  orderChannelType?: string;

  /** 订单编号 */
  orderNo?: string;

  /** 订单状态 */
  orderStatus?: number;

  /** 订单类型 */
  orderType?: number;

  /** 当前页码 */
  pageNum?: number;

  /** 每页数据量 */
  pageSize?: number;

  /** 查询类型 0：全部 1：待付款 2：待发货 3：待收货 4：待评价 5：交易完成 6：交易关闭 */
  queryType?: number;

  /** 收件人手机号 */
  shippingMobile?: string;

  /** 收件人姓名 */
  shippingName?: string;
}

export interface AdminLivePageGetParams {
  /** 开始时间 */
  beginTime?: string;

  /** 结束时间 */
  endTime?: string;

  /** 主键 */
  id?: number;

  /** 页面名称 */
  name?: string;

  /** 当前页码 */
  pageNum?: number;

  /** 每页数据量 */
  pageSize?: number;
}

export interface AdminLiveStatisticsGetParams {
  /** 开始时间 */
  beginTime?: string;

  /** 结束时间 */
  endTime?: string;

  /** 商品编号/商品名称/规格编号 */
  goodsKeyword?: string;

  /** 主键 */
  id?: number;

  /** 直播间ID/直播名称 */
  liveKeyword?: string;

  /** 当前页码 */
  pageNum?: number;

  /** 每页数据量 */
  pageSize?: number;
}

export interface AdminLiveGetParams {
  /** 直播ids集合 */
  ids?: string[];
}

export interface AdminLiveStatisticsExportGetParams {
  /** 开始时间 */
  beginTime?: string;

  /** 结束时间 */
  endTime?: string;

  /** 商品编号/商品名称/规格编号 */
  goodsKeyword?: string;

  /** 主键 */
  id?: number;

  /** 直播间ID/直播名称 */
  liveKeyword?: string;

  /** 当前页码 */
  pageNum?: number;

  /** 每页数据量 */
  pageSize?: number;
}

export interface AdminLiveUpdateGetParams {
  activityID?: string;
  announcement?: string;
  coverImage?: string;
  eventType?: string;
  liveStatus?: string;
  liveTime?: string;
  liveTimeDate?: string;
  name?: string;
  sign?: string;
  status?: string;
  timestamp?: string;
  viewUrl?: string;
}

export interface AdminApiQrCodeGenerateUrlLinkPostParams {
  /**
   * path
   * @example
   */
  path: string;

  /**
   * query
   * @example
   */
  query: string;
}

export interface AdminMallExpressCallbackPostParams {
  dataSign?: string;
  requestData?: string;
  requestType?: number;
}
