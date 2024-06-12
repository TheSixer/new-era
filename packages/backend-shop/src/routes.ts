
/**
 * 页面路由映射.
 * 请不要在此文件添加任何代码。因为生成后会全量覆盖
 * 运行 npm run route 或者 yarn route 自动生成
 */

export const routeNames = {
  /** 登录 */
  login: '/login',
  /** 首页 */
  home: '/home',
  /** 用户设置 */
  userSetting: '/user/setting',
  /** 消息中心 */
  userNotices: '/user/notices',
  /** 用户列表 */
  customerManagementList: '/customerManagement/list',
  /** 用户详情 */
  customerManagementDetail: '/customerManagement/detail',
  /** 标签管理 */
  customerManagementTags: '/customerManagement/tags',
  /** 活动核销人员 */
  customerManagementCheckUser: '/customerManagement/checkUser',
  /** 活动类型 */
  eventsManagementEventTypes: '/eventsManagement/eventTypes',
  /** 活动列表 */
  eventsManagementEvents: '/eventsManagement/events',
  /** 活动管理新增编辑 */
  eventsManagementEventsCreate: '/eventsManagement/events/create',
  /** 报名列表 */
  eventsManagementActivityOrders: '/eventsManagement/activityOrders',
  /** 白名单 */
  eventsManagementWhiteList: '/eventsManagement/whiteList',
  /** 商城基础设置 */
  basicSettingSetting: '/basicSetting/setting',
  /** 用户协议记录 */
  basicSettingSettingAgreementLogs: '/basicSetting/setting/agreementLogs',
  /** 隐私政策记录 */
  basicSettingSettingPrivacyLogs: '/basicSetting/setting/privacyLogs',
  /** 素材库 */
  basicSettingMaterialLibrary: '/basicSetting/materialLibrary',
  /** 广告位 */
  basicSettingAdvertisingSpace: '/basicSetting/advertisingSpace',
  /** 广告位编辑新增 */
  basicSettingAdvertisingSpaceAdd: '/basicSetting/advertisingSpace/add',
  /** 首页弹窗 */
  basicSettingPopupAds: '/basicSetting/popupAds',
  /** 页面管理 */
  decorationSettingDecorationList: '/decorationSetting/decorationList',
  /** 页面详情 */
  decorationSettingDecorationListDetail: '/decorationSetting/decorationList/detail',
  /** 首页配置 */
  decorationSettingHomePageSetting: '/decorationSetting/homePageSetting',
  /** 运费模板 */
  mallManagementFreightList: '/mallManagement/freight/list',
  /** 新增/编辑模版 */
  mallManagementFreightListDetail: '/mallManagement/freight/list/detail',
  /** 会员列表 */
  mallManagementCustomer: '/mallManagement/customer',
  /** 会员详情 */
  mallManagementCustomerDetail: '/mallManagement/customer/detail',
  /** 会员权益 */
  mallManagementMemberRightsListCreate: '/mallManagement/memberRights/list/create',
  /** 地址库 */
  mallManagementAddressList: '/mallManagement/addressList',
  /** 分类管理 */
  goodsManagementGoodsClassify: '/goodsManagement/goodsClassify',
  /** 规格管理 */
  goodsManagementGoodSkuList: '/goodsManagement/goodSkuList',
  /** 子规格管理 */
  goodsManagementGoodSkuListGoodSkuListChild: '/goodsManagement/goodSkuList/goodSkuListChild',
  /** 商品管理 */
  goodsManagementGoodsList: '/goodsManagement/goodsList',
  /** 商品编辑 */
  goodsManagementGoodsListGoodsCreate: '/goodsManagement/goodsList/goodsCreate',
  /** 商品详情 */
  goodsManagementGoodsListGoodsDetail: '/goodsManagement/goodsList/goodsDetail',
  /** 库存管理 */
  goodsManagementGoodsListGoodsStock: '/goodsManagement/goodsList/goodsStock',
  /** 评价管理 */
  goodsManagementGoodsComments: '/goodsManagement/goodsComments',
  /** 评价头像管理 */
  goodsManagementAvatarManagement: '/goodsManagement/avatarManagement',
  /** 分类管理 */
  integralGoodsManagementGoodsClassify: '/integralGoodsManagement/goodsClassify',
  /** 商品列表 */
  integralGoodsManagementGoodsList: '/integralGoodsManagement/goodsList',
  /** 商品编辑 */
  integralGoodsManagementGoodsListGoodsCreate: '/integralGoodsManagement/goodsList/goodsCreate',
  /** 商品详情 */
  integralGoodsManagementGoodsListGoodsDetail: '/integralGoodsManagement/goodsList/goodsDetail',
  /** 商品库存 */
  integralGoodsManagementGoodsListGoodsStock: '/integralGoodsManagement/goodsList/goodsStock',
  /** 订单管理 */
  orderManagementOrderList: '/orderManagement/orderList',
  /** 订单详情 */
  orderManagementOrderListOrderDetail: '/orderManagement/orderList/orderDetail',
  /** 积分商品订单管理 */
  orderManagementIntegralGoodsOrder: '/orderManagement/integralGoodsOrder',
  /** 积分商品订单详情 */
  orderManagementIntegralGoodsOrderDetail: '/orderManagement/integralGoodsOrder/detail',
  /** 售后管理 */
  orderManagementAftersaleList: '/orderManagement/aftersaleList',
  /** 售后详情 */
  orderManagementAftersaleListAfterDetail: '/orderManagement/aftersaleList/afterDetail',
  /** 优惠券列表 */
  couponManagementList: '/couponManagement/list',
  /** 优惠券新增编辑 */
  couponManagementListAdd: '/couponManagement/list/add',
  /** 优惠券详情 */
  couponManagementListDetail: '/couponManagement/list/detail',
  /** 优惠券领用记录 */
  couponManagementReceiveList: '/couponManagement/receiveList',
  /** 优惠券发放 */
  couponManagementGrant: '/couponManagement/grant',
  /** 发放详情 */
  couponManagementGrantDetail: '/couponManagement/grant/detail',
  /** 优惠码管理 */
  couponManagementCode: '/couponManagement/code',
  /** 优惠码详情 */
  couponManagementCodeDetail: '/couponManagement/code/detail',
  /** 任务中心 */
  marketingActivityTaskCenter: '/marketingActivity/taskCenter',
  /** 活动管理 */
  marketingActivityActivitys: '/marketingActivity/activitys',
  /** 活动管理新增编辑 */
  marketingActivityActivitysCreate: '/marketingActivity/activitys/create',
  /** 限时抢购 */
  marketingActivityTimeBuy: '/marketingActivity/timeBuy',
  /** 限时抢购新增编辑 */
  marketingActivityTimeBuyCreate: '/marketingActivity/timeBuy/create',
  /** 预售活动 */
  marketingActivityPreSale: '/marketingActivity/preSale',
  /** 预售活动新增编辑 */
  marketingActivityPreSaleCreate: '/marketingActivity/preSale/create',
  /** 包邮活动 */
  marketingActivityFreeShipping: '/marketingActivity/freeShipping',
  /** 包邮活动新增编辑 */
  marketingActivityFreeShippingCreate: '/marketingActivity/freeShipping/create',
  /** 热词维护 */
  marketingActivityHotKeyword: '/marketingActivity/hotKeyword',
  /** 直播页面管理 */
  liveBroadcastManagementList: '/liveBroadcastManagement/list',
  /** 首屏设置 */
  sysSettingInitScreen: '/sysSetting/initScreen',
  /** 人员管理 */
  sysSettingEmployeeManagement: '/sysSetting/employeeManagement',
  /** 角色管理 */
  sysSettingRoleManagement: '/sysSetting/roleManagement',
  /** 操作日志 */
  sysSettingOperationLog: '/sysSetting/operationLog',
  /** 资源管理 */
  sysSettingResourcesManagement: '/sysSetting/resourcesManagement'
}

