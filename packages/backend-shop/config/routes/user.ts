export default [
  {
    path: '/user',
    routes: [
      {
        path: '/user',
        routes: [
          { name: '用户设置', path: '/user/setting', component: './user/userSetting' },
          { name: '消息中心', path: '/user/notices', component: './user/notices' }
        ]
      },
      { component: './404' }
    ]
  }
]
