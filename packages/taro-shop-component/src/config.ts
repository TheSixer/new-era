/* eslint-disable no-nested-ternary */
import { defineShopConfig } from '@wmeimob/shop-data'
import { setGlobalData } from '@wmeimob/taro-global-data'
import { routeNames } from './routes'
import Taro from '@tarojs/taro'
import { DEV_TOOLS_API_STORAGE_KEY } from '@wmeimob/taro-dev-tools/src/components/devTools/const'
import { ENV_TYPE, getTaroEnv } from '@wmeimob/utils/src/taroEnv'

let env: ENV_TYPE = Taro.getEnv()!

// 是不是小程序环境
export const isWeapp = env === ENV_TYPE.WEAPP
export const isH5 = env === ENV_TYPE.WEB // 是不是h5

// isH5为true的情况下，判断是微信浏览器还是APP内嵌h5
env = getTaroEnv(env)
export const isWeixin = env === ENV_TYPE.WEIXIN // 微信环境
export const isWebApp = env === ENV_TYPE.WEBAPP // 嵌套h5
// export const isWebApp = true // 嵌套h5

export const isDev = REACT_APP_ENV === 'dev' // 开发环境
export const isUat = REACT_APP_ENV === 'uat' // 测试环境
export const isPrd = !isDev && !isUat // 生产环境

// 小程序原始id。用于APP分享
export const appName = 'gh_9dd2bef92699'

// h5实际网址域名
export const rootUrl = ''

// 不需要获取登录的页面
export const noLoginRoutes = [
  routeNames.mineUserAgreement,
  routeNames.goodsSearch,
  routeNames.goodsGoodDetail,
  routeNames.goodsGoodsList,
  routeNames.integralGoodsList,
  routeNames.auth,
  routeNames.webAuth,
  routeNames.tabBarHome,
  routeNames.tabBarCategorys,
  routeNames.tabBarMine,
  routeNames.minePersonal,
  routeNames.eventsPrefecture,
  routeNames.eventsCities,
  routeNames.eventsDetail,
  routeNames.eventsSignUp
]

export const apiUrl = (() => {
  if (isPrd) {
    return process.env.TARO_APP_API_URL
  }

  const url: string = Taro.getStorageSync(DEV_TOOLS_API_STORAGE_KEY)
  return url || process.env.TARO_APP_API_URL
})()

// 没有token时候跳转的页面。
export const loginUrl = IS_WEAPP ? routeNames.auth : routeNames.webAuth

// 是否开启自定义客户 不开启用小程序客服 开启后用 /pages/customerService/index
export const openCustomerService = false

// 静默授权
export const silentAuthorizatin = true
export const silentAuthorizationUrl = '/wechat/auth/token'

// app内嵌h5授权页面
export const appAuthUrl = 'https://mapps.m1905.cn/middle/callback_shop_order'

// 无状态栏模式
export const isNoStatusBar = !isWeapp

// 直播页面
export const liveUrlBase = 'http://test.web.shop.wmeimob.cn/live.html'

/**
 * 系统配置项
 * 你可以根据项目实际情况进行合并覆盖配置
 */
export const systemConfig = defineShopConfig({})

setGlobalData({
  isWeapp,
  isH5,
  isWeixin,
  isDev,
  isUat,
  isPrd,
  apiUrl,
  loginUrl,
  silentAuthorizationUrl,
  systemConfig,
  isNoStatusBar
})
