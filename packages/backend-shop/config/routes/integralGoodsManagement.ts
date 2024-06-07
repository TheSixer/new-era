export default [
  {
    name: '积分商品管理',
    path: '/integralGoodsManagement',
    routes: [
      {
        name: '分类管理',
        path: '/integralGoodsManagement/goodsClassify',
        component: './integralGoodsManagement/goodsClassify'
      },
      {
        name: '商品列表',
        path: '/integralGoodsManagement/goodsList',
        component: './integralGoodsManagement/goodsList'
      },
      {
        name: '商品编辑',
        path: '/integralGoodsManagement/goodsList/goodsCreate',
        component: './integralGoodsManagement/goodsCreate',
        hideInMenu: true
      },
      {
        name: '商品详情',
        path: '/integralGoodsManagement/goodsList/goodsDetail',
        component: './integralGoodsManagement/goodsDetail',
        hideInMenu: true
      },
      {
        name: '商品库存',
        path: '/integralGoodsManagement/goodsList/goodsStock',
        component: './integralGoodsManagement/goodsStock',
        hideInMenu: true
      },
      { redirect: '/integralGoodsManagement/goodsClassify' }
    ]
  }
]
