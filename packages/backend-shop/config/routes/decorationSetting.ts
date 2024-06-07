export default [
  {
    name: '自定义页面',
    path: '/decorationSetting',
    routes: [
      {
        name: '页面管理',
        path: '/decorationSetting/decorationList',
        component: './decorationSetting/decorationList'
      },
      {
        name: '页面详情',
        hideInMenu: true,
        path: '/decorationSetting/decorationList/detail',
        component: './decorationSetting/decorationDetail',
        layout: {
          hideFooter: true
        }
      },
      { redirect: '/decorationSetting/decorationList' }
    ]
  }
]
