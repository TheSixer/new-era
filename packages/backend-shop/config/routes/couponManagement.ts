export default [
  {
    name: '优惠券',
    path: '/couponManagement',
    routes: [
      {
        name: '优惠券列表',
        path: '/couponManagement/list',
        component: './couponManagement/list'
      },
      {
        name: '优惠券新增编辑',
        path: '/couponManagement/list/add',
        component: './couponManagement/add',
        hideInMenu: true
      },
      {
        name: '优惠券详情',
        path: '/couponManagement/list/detail',
        component: './couponManagement/detail',
        hideInMenu: true
      },
      {
        name: '优惠券领用记录',
        path: '/couponManagement/receiveList',
        component: './couponManagement/receiveList'
      },
      {
        name: '优惠券发放',
        path: '/couponManagement/grant',
        component: './couponManagement/grant'
      },
      {
        name: '发放详情',
        path: '/couponManagement/grant/detail',
        component: './couponManagement/grantDetail',
        hideInMenu: true
      },
      {
        name: '优惠码管理',
        path: '/couponManagement/code',
        component: './couponManagement/code'
      },
      {
        name: '优惠码详情',
        path: '/couponManagement/code/detail',
        component: './couponManagement/codeDetail',
        hideInMenu: true
      }
    ]
  }
]
