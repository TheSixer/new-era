export default defineAppConfig({
  pages: [
    'pages/tabBar/home/index', // 首页
    'pages/tabBar/mine/index', // 我的
    // 'pages/live/index', // 直播页面
    'pages/webPage/index', // 自定义H5链接页面
    // 'pages/liveList/index', // 直播列表
    // 'pages/index/index', // 首页
    // 'pages/noConsent/index', // 空白页
    // 'pages/customerService/index',
    // 'pages/system/index', // 调试页面

    // 'pages/tabBar/categorys/index', // 分类
    // 'pages/tabBar/shopCart/index', // 购物车
    'pages/auth/index', // 授权
    'pages/webAuth/index' // h5登录页

    // 'pages/signingCenter/index', // 签到中心
    // 'pages/groupSpell/index', // 我的拼团
    // 'pages/groupSpellDetail/index', // 拼团详情
  ],
  subPackages: [
    {
      // 我的
      root: 'pages/mine',
      pages: [
        'userAgreement/index', // 用户协议
        // 'address/addressManagement/index', // 收货地址
        'events/list/index',  //  我的活动预约
        'events/detail/index',  //  我的活动详情
        'verify/detail/index',  //  我的活动详情
        'verify/checkList/index',  //  我的活动详情
        'verify/verifycode/index',  //  我的活动详情
        // 'address/addressList/index', // 收货地址列表
        'alter/index', // 个人信息修改
        'personal/index' // 个人中心 个人信息
        // 'myCollection/index', // 我的收藏
        // 'scoreRecord/index' // 我的积分记录
      ]
    },
    {
      // 活动
      root: 'pages/decoration',
      pages: [
        'index'
      ]
    },
    {
      // 活动
      root: 'pages/events',
      pages: [
        'prefecture/index',  //  活动预约
        'signUp/index',  //  填写个人信息
        'detail/index',  //  活动详情
        'cities/index'  //  城市选择
      ]
    }
    // {
    //   // committedState
    //   root: 'pages/committedState',
    //   pages: [
    //     'paySuccess/index',  //  支付成功
    //     'commentSuccess/index',  //  评价成功
    //     'afterSaleSuccess/index'  //  售后申请成功
    //   ]
    // },
    // {
    //   // 商品
    //   root: 'pages/goods',
    //   pages: [
    //     'goodsList/index', // 商品列表
    //     'goodDetail/index', // 商品详情
    //     'search/index', // 商品搜索
    //     'goodComments/index' // 商品评论
    //   ]
    // },
    // {
    //   // 积分商品
    //   root: 'pages/integralGoods',
    //   pages: [
    //     'list/index', // 积分商品列表
    //     'confirm/index', // 确认积分订单
    //     'paySuccess/index', // 支付成功
    //     'detail/index' // 积分商品详情
    //   ]
    // },
    // {
    //   // 订单
    //   root: 'pages/order',
    //   pages: [
    //     'confirmOrder/index', // 确认订单
    //     'myOrder/index', // 我的订单
    //     'orderDetail/index', // 订单详情
    //     'aftesalesList/index', // 退款/售后
    //     'aftesalesAdd/index', // 申请售后
    //     'afterRefund/index', // 申请退款
    //     'aftersalesDetail/index', // 售后详情
    //     'logistics/index', // 物流信息
    //     'splitLogistics/index', // 分批发货物流信息
    //     'commentCenter/index', // 评价中心
    //     'commentAdd/index' // 评价新增
    //   ]
    // },
    // {
    //   // 优惠券
    //   root: 'pages/coupons',
    //   pages: [
    //     'list/index', // 列表
    //     'history/index', // 历史优惠券
    //     'couponCenter/index', // 领券中心
    //     'couponGoods/index', // 适用商品列表
    //     'couponCodeExchange/index' // 优惠码兑换
    //   ]
    // },
    // {
    //   // 活动
    //   root: 'pages/activity',
    //   pages: [
    //     'prefecture/index', // 活动专区（满减满折满赠）
    //     'flashSale/index', // 限时抢购
    //     'flashSaleDetail/index', // 限时抢购详情
    //     'preSale/index', // 预售活动
    //     'preSaleDetail/index', // 预售活动详情
    //     'freeShipping/index', // 包邮活动专区
    //     // 'fullMinusDiscount/index', // 满减满折
    //     'goodsList/index' // 满减满折满赠活动详情
    //   ]
    // },
    // {
    //   // 任务中心
    //   root: 'pages/taskCenter',
    //   pages: [
    //     'list/index', // 任务列表
    //     'signTask/index', // 签到任务
    //     'signTaskExplain/index' // 签到任务说明
    //   ]
    // },
    // {
    //   // 会员中心
    //   root: 'pages/member',
    //   pages: [
    //     'cards/index', // 我的会员卡列表
    //     'detail/index', // 我的会员卡详情
    //     'rightsDescription/index' // 会员卡权益说明
    //   ]
    // }
  ],
  tabBar: {
    custom: true,
    list: [
      // {
      //   pagePath: 'pages/tabBar/categorys/index',
      //   text: '积分'
      // },
      {
        pagePath: 'pages/tabBar/home/index',
        text: ''
      },
      {
        pagePath: 'pages/tabBar/mine/index',
        text: '我的'
      }
    ]
  },
  permission: {
    "scope.userLocation": {
      "desc": "你的位置信息将用于小程序位置接口的效果展示"
    }
  },
  lazyCodeLoading: "requiredComponents",
  // 使用微信地址导入
  requiredPrivateInfos: ['chooseAddress', 'getLocation'],
  window: {
    backgroundTextStyle: 'light',
    backgroundColor: '#0b0404',
    navigationBarTextStyle: 'white',
    navigationBarTitleText: 'NEWERA',
    navigationStyle: 'custom'
  }
})
