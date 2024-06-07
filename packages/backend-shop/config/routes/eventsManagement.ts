export default [
  {
    name: '活动管理',
    path: '/eventsManagement',
    routes: [
      // {
      //   name: '任务中心',
      //   path: '/marketingActivity/taskCenter',
      //   // access: 'marketingActivity-hotKeyword',
      //   component: './marketingActivity/taskCenter'
      // },
      {
        name: '活动类型',
        path: '/eventsManagement/eventTypes',
        component: './eventsManagement/eventTypes'
      },
      {
        name: '活动管理',
        path: '/eventsManagement/events',
        component: './eventsManagement/events'
      },
      {
        name: '活动管理新增编辑',
        path: '/eventsManagement/events/create',
        component: './eventsManagement/events/create',
        hideInMenu: true
      },

      { redirect: '/eventsManagement/events' }
    ]
  }
]
