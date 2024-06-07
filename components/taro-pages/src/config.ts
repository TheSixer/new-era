import { ENV_TYPE, getTaroEnv } from '@wmeimob/utils/src/taroEnv'
import Taro from '@tarojs/taro'

const env = getTaroEnv(Taro.getEnv()!)
export const isWeapp = env === ENV_TYPE.WEAPP // 是不是小程序环境
export const isH5 = env === ENV_TYPE.WEB || env === ENV_TYPE.WEIXIN || env === ENV_TYPE.WEBAPP//  h5  微信环境也是h5  内嵌app也是h5
export const isWeixin = env === ENV_TYPE.WEIXIN // 微信环境
export const isWebApp = env === ENV_TYPE.WEBAPP // 嵌套h5
// export const isWebApp = true // 嵌套h5

export const isDev = REACT_APP_ENV === 'dev' // 开发环境
export const isUat = REACT_APP_ENV === 'uat' // 测试环境
export const isPrd = !isDev && !isUat // 生产环境
