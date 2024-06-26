export default [
  {
    name: '系统设置',
    path: '/sysSetting',
    routes: [
      {
        name: '首屏设置',
        path: '/sysSetting/initScreen',
        component: './sysSetting/initScreen'
      },
      {
        name: '协议设置',
        path: '/sysSetting/setting',
        component: './basicSetting/setting'
      },
      {
        name: '用户协议记录',
        path: '/sysSetting/setting/agreementLogs',
        component: './basicSetting/agreementLogs',
        hideInMenu: true
      },
      {
        name: '隐私政策记录',
        path: '/sysSetting/setting/privacyLogs',
        component: './basicSetting/agreementLogs',
        hideInMenu: true
      },
      {
        name: '人员管理',
        path: '/sysSetting/employeeManagement',
        component: './sysSetting/employeeManagement'
      },
      // {
      //   name: '部门管理',
      //   path: '/sysSetting/deptManagement',
      //   component: './sysSetting/deptManagement'
      //   // access: 'sys-deptManagement'
      // },
      {
        name: '角色管理',
        path: '/sysSetting/roleManagement',
        component: './sysSetting/roleManagement'
      },
      {
        name: '操作日志',
        path: '/sysSetting/operationLog',
        component: './sysSetting/operationLog'
      },
      {
        name: '资源管理',
        path: '/sysSetting/resourcesManagement',
        component: './sysSetting/resourcesManagement',
        hideInMenu: process.env.REACT_APP_ENV !== 'dev'
      },

      { redirect: '/sysSetting/employeeManagement' }
    ]
  }
]
