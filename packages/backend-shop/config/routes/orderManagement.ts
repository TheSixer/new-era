export default [
  {
    name: '订单管理',
    path: '/orderManagement',
    routes: [
      {
        name: '订单管理',
        path: '/orderManagement/orderList',
        component: './orderManagement/orderList'
      },
      {
        name: '订单详情',
        path: '/orderManagement/orderList/orderDetail',
        component: './orderManagement/orderDetail',
        hideInMenu: true
      },
      {
        name: '积分商品订单管理',
        path: '/orderManagement/integralGoodsOrder',
        component: './orderManagement/integralGoodsOrder/list'
      },
      {
        name: '积分商品订单详情',
        path: '/orderManagement/integralGoodsOrder/detail',
        component: './orderManagement/integralGoodsOrder/detail',
        hideInMenu: true
      },
      {
        name: '售后管理',
        path: '/orderManagement/aftersaleList',
        component: './orderManagement/aftersaleList'
      },
      {
        name: '售后详情',
        path: '/orderManagement/aftersaleList/afterDetail',
        component: './orderManagement/afterDetail',
        hideInMenu: true
      },
      { redirect: '/orderManagementList' }
    ]
  }
]
