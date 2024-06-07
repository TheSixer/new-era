export default [
  {
    name: '营销活动',
    path: '/marketingActivity',
    routes: [
      {
        name: '任务中心',
        path: '/marketingActivity/taskCenter',
        // access: 'marketingActivity-hotKeyword',
        component: './marketingActivity/taskCenter'
      },
      {
        name: '活动管理',
        path: '/marketingActivity/activitys',
        component: './marketingActivity/activitys'
      },
      {
        name: '活动管理新增编辑',
        path: '/marketingActivity/activitys/create',
        component: './marketingActivity/activitys/create',
        hideInMenu: true
      },
      {
        name: '限时抢购',
        path: '/marketingActivity/timeBuy',
        component: './marketingActivity/timeBuy'
      },
      {
        name: '限时抢购新增编辑',
        path: '/marketingActivity/timeBuy/create',
        component: './marketingActivity/timeBuy/create',
        hideInMenu: true
      },
      {
        name: '预售活动',
        path: '/marketingActivity/preSale',
        component: './marketingActivity/preSale/list'
      },
      {
        name: '预售活动新增编辑',
        path: '/marketingActivity/preSale/create',
        component: './marketingActivity/preSale/create',
        hideInMenu: true
      },
      {
        name: '包邮活动',
        path: '/marketingActivity/freeShipping',
        component: './marketingActivity/freeShipping/list'
      },
      {
        name: '包邮活动新增编辑',
        path: '/marketingActivity/freeShipping/create',
        component: './marketingActivity/freeShipping/create',
        hideInMenu: true
      },
      {
        name: '热词维护',
        path: '/marketingActivity/hotKeyword',
        component: './marketingActivity/hotKeyword/list'
      },

      { redirect: '/marketingActivity/timeBuy' }
    ]
  }
]
