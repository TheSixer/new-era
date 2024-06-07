export default [
  {
    name: '商品管理',
    path: '/goodsManagement',
    routes: [
      {
        name: '分类管理',
        path: '/goodsManagement/goodsClassify',
        component: './goodsManagement/goodsClassify'
      },
      {
        name: '规格管理',
        path: '/goodsManagement/goodSkuList',
        component: './goodsManagement/goodSkuList'
      },
      {
        name: '子规格管理',
        path: '/goodsManagement/goodSkuList/goodSkuListChild',
        component: './goodsManagement/goodSkuListChild',
        hideInMenu: true
      },
      {
        name: '商品管理',
        path: '/goodsManagement/goodsList',
        component: './goodsManagement/goodsList'
      },
      {
        name: '商品编辑',
        path: '/goodsManagement/goodsList/goodsCreate',
        component: './goodsManagement/goodsCreate',
        hideInMenu: true
      },
      {
        name: '商品详情',
        path: '/goodsManagement/goodsList/goodsDetail',
        component: './goodsManagement/goodsDetail',
        hideInMenu: true
      },
      {
        name: '库存管理',
        path: '/goodsManagement/goodsList/goodsStock',
        component: './goodsManagement/goodsStock',
        hideInMenu: true
      },

      {
        name: '评价管理',
        path: '/goodsManagement/goodsComments',
        component: './goodsManagement/goodsComments'
      },
      {
        name: '评价头像管理',
        path: '/goodsManagement/avatarManagement',
        component: './goodsManagement/avatarManagement'
      },
      { redirect: '/goodsManagement/goodsList' }
    ]
  }
]
