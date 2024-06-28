import { defineShopConfig } from '@wmeimob/shop-data'
import { setGlobalData } from '@wmeimob/backend-store'

export const isDev = REACT_APP_ENV === 'dev' // 开发环境
export const isUat = REACT_APP_ENV === 'uat' // 测试环境
export const isPrd = !isDev && !isUat // 生产环境

// TODO shop：接口域名修改
// const baseUrl = 'https://shopapi.t5.wmeimob.cn'
// const baseUrl = 'http://miniprogram.neweracap.cn'
const baseUrl = ''
// TODO shop：h5页面根路径
export const rootUrl = 'http://test.web.shop.wmeimob.cn'

export let apiUrl =
  API_URL ||
  {
    dev: `${baseUrl}/dev`,
    uat: `${baseUrl}/test`,
    prd: `${baseUrl}`
  }[REACT_APP_ENV || 'prd']

export const publicPath = PUBLIC_PATH

export const applicationName = 'NEWERA'

export const defaultAccount = 19999999999 // 默认账号
export const defaultPwd = 'ocj123456' // 默认密码

export const loginPath = '/login'

/**
 * 系统配置项
 * 你可以根据项目实际情况进行合并覆盖配置
 */
export const systemConfig = defineShopConfig({})

setGlobalData({
  isDev,
  isUat,
  isPrd,
  baseUrl,
  apiUrl,
  publicPath,
  applicationName,
  defaultAccount,
  defaultPwd,
  loginPath,
  systemConfig
})
