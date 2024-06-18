export default [
  {
    name: '基础设置',
    path: '/basicSetting',
    routes: [
      // {
      //   name: '基础设置',
      //   path: '/basicSetting/setting',
      //   component: './basicSetting/setting'
      // },
      // {
      //   name: '用户协议记录',
      //   path: '/basicSetting/setting/agreementLogs',
      //   component: './basicSetting/agreementLogs',
      //   hideInMenu: true
      // },
      // {
      //   name: '隐私政策记录',
      //   path: '/basicSetting/setting/privacyLogs',
      //   component: './basicSetting/agreementLogs',
      //   hideInMenu: true
      // },

      {
        name: '素材库',
        path: '/basicSetting/materialLibrary',
        component: './basicSetting/materialLibrary'
      },
      // {
      //   name: '广告位',
      //   path: '/basicSetting/advertisingSpace',
      //   component: './basicSetting/advertisingSpace'
      // },
      // {
      //   name: '广告位编辑新增',
      //   path: '/basicSetting/advertisingSpace/add',
      //   component: './basicSetting/advertisingSpace/add',
      //   hideInMenu: true
      // },
      // {
      //   name: '首页弹窗',
      //   path: '/basicSetting/popupAds',
      //   component: './basicSetting/popupAds/list'
      // },
      { redirect: '/basicSetting/materialLibrary' }
    ]
  }
]
