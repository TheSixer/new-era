export const isWeapp = process.env.TARO_ENV === 'weapp' // 是不是小程序环境
export const isH5 = process.env.TARO_ENV === 'h5' // 是不是h5
export const isWeixin = isH5 && window && window.navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1 // 微信浏览器环境

export const isDev = REACT_APP_ENV === 'dev' // 开发环境
export const isUat = REACT_APP_ENV === 'uat' // 测试环境
export const isPrd = !isDev && !isUat // 生产环境
