export default [
  {
    name: '商城管理',
    path: '/mallManagement',
    routes: [
      {
        name: '运费模板',
        path: '/mallManagement/freight/list',
        component: './mallManagement/freight/list'
      },
      {
        name: '新增/编辑模版',
        hideInMenu: true,
        path: '/mallManagement/freight/list/detail',
        component: './mallManagement/freight/detail',
        layout: {
          hideFooter: true
        }
      },
      {
        name: '会员列表',
        path: '/mallManagement/customer',
        component: './mallManagement/customer/list'
      },
      {
        name: '会员详情',
        hideInMenu: true,
        path: '/mallManagement/customer/detail',
        component: './mallManagement/customer/detail'
      },
      {
        name: '会员权益',
        path: '/mallManagement/memberRights/list/create',
        component: './mallManagement/memberRights/create'
      },
      {
        name: '地址库',
        path: '/mallManagement/addressList',
        component: './mallManagement/addressList'
      },

      { redirect: '/mallManagement/freight/list' }
    ]
  }
]
