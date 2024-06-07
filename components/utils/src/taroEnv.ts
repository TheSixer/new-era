import Taro from '@tarojs/taro'

/**
 *  获取taro当前环境变量
 *
 */
export const getTaroEnv = (env) => {
  // return ENV_TYPE.WEBAPP
  if (env === ENV_TYPE.WEB) {
    if (window && window.navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1) return ENV_TYPE.WEIXIN

    if (window && window.navigator.userAgent.toLowerCase().indexOf('from 1905 app') !== -1) return ENV_TYPE.WEBAPP
  }

  return env
}

export enum ENV_TYPE {
  WEAPP = 'WEAPP', // 小程序
  WEB = 'WEB', // h5
  RN = 'RN',
  SWAN = 'SWAN',
  ALIPAY = 'ALIPAY',
  TT = 'TT',
  QQ = 'QQ',
  JD = 'JD',
  WEIXIN = 'WEIXIN', // 微信环境
  WEBAPP = 'WEBAPP' // 嵌套h5
}
