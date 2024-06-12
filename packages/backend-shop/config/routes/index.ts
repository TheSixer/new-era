import sysSetting from './sysSetting'
import user from './user'
import decorationSetting from './decorationSetting'
import basicSetting from './basicSetting'
import mallManagement from './mallManagement'
import couponManagement from './couponManagement'
import orderManagement from './orderManagement'
import goodsManagement from './goodsManagement'
import marketingActivity from './marketingActivity'
import integralGoodsManagement from './integralGoodsManagement'
import liveBroadcastManagement from './liveBroadcastManagement'
import eventsManagement from './eventsManagement'
import cumstomerManagement from './cumstomerManagement'

export default [
  { name: '登录', path: '/login', component: './login', layout: false, hideInMenu: true },
  { name: '首页', path: '/home', component: './home' },
  ...user,
  ...cumstomerManagement,
  ...eventsManagement,
  ...basicSetting,
  ...decorationSetting,
  ...mallManagement,
  ...goodsManagement,
  ...integralGoodsManagement,
  ...orderManagement,
  ...couponManagement,
  ...marketingActivity,
  ...liveBroadcastManagement,
  ...sysSetting,
  { path: '/', redirect: '/home' },
  { component: './404' }
]
