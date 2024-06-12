export default [
    {
      name: '用户管理',
      path: '/customerManagement',
      routes: [
        {
          name: '用户列表',
          path: '/customerManagement/list',
          component: './customerManagement/customer/list'
        },
        {
          name: '用户详情',
          hideInMenu: true,
          path: '/customerManagement/detail',
          component: './customerManagement/customer/detail'
        },
        {
          name: '标签管理',
          path: '/customerManagement/tags',
          component: './customerManagement/tags'
        },
        {
          name: '活动核销人员',
          path: '/customerManagement/checkUser',
          component: './customerManagement/checkUser'
        },
        { redirect: '/customerManagement/list' }
      ]
    }
  ]
  