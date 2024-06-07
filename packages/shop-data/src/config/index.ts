export { default as advertiseConfig } from './advertise'
export { default as goodConfig } from './good'
export { default as decorationConfig } from './decoration'
export { default as scoreConfig } from './score'

export const config = {
  /**
   * 商品分类最大层级
   *
   * 可以设置为2或者3
   * @support taro  backend
   * @default 2
   */
  maxClassifyLevel: 2,

  /**
   * 商品详情 banner 位视频是否启用
   *
   * @support taro  backend
   * @default true
   */
  enableGoodsDetailBannerVideo: true,

  /**
   * 商城是否启用积分功能
   *
   * @support taro  backend
   * @description 影响范围
   * 后台:
   *  基础设置: 积分设置
   *  会员列表: 表格中积分列内容的展示
   *  会员详情: 积分信息 调整积分
   *  商品管理: 开启使用积分 sku奖励积分
   *  商品详情: 同上配置展示
   */
  enableScore: true,

  /**
   * 商城是否启用余额功能
   *
   * @support taro  backend
   * @description 影响范围
   * 后台:
   *  基础设置: 余额充值设置
   *  会员列表: 表格中余额列内容的展示
   *  会员详情: 余额信息 调整余额
   * 前台：
   *  我的：余额信息显示
   *  账户余额：余额信息 充值余额
   *  余额明细：同上配置展示
   */
  enableBalance: true,

  /**
   * 是否启用热词功能
   *
   * @support taro  backend
   * @description 影响范围
   * 前台：
   *  搜索商品页面
   * 后台：
   *  热词管理
   */
  enableHotKeyword: true,

  /**
   * 是否启用积分商品
   *
   * @support taro  backend
   * @description 影响范围
   *
   * 前台：
   *  我的：积分兑换入口
   * 后台：
   *  积分商品列表：路由菜单
   *  积分商品分类：路由菜单
   *  自定义首页配置编辑：积分商品列表跳转配置
   */
  enableIntegralGoods: true,

  /**
   * 是否启用积分商品价格配置
   * @support backend
   * @description 积分商品是否可以配置金额
   * 默认情况下积分商品可以配置为金额 + 积分混合支付的方式。如果设置为false。则表示积分商品只可以使用积分进行下单。
   * 影响的结果为商品相关不显示销售价相关内容
   */
  enableIntegralGoodsPrice: true,

  /**
   * 是否启用消息通知
   * @support backend
   */
  enableNotice: false,

  /**
   * 是否启用用户签到任务
   *
   * @support taro backend
   * @description 影响范围
   *
   * 前台：
   *  我的：用户昵称右侧签到按钮
   *  任务中心：每日任务-签到任务
   *  签到任务页面
   * 后台：
   *  任务中心：签到任务tab
   */
  enableSignTask: true
}
