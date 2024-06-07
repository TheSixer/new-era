import { apiUrl, loginUrl, silentAuthorizatin, silentAuthorizationUrl, isUat, isWeapp } from '../config'
import Request, { takeTokenRequestInterceptor, requestInterceptorHanlder } from '@wmeimob/request/src/index.taro'
import { authorizationLogin } from '../utils/authorizationLogin'

const instance = Request.create({ baseUrl: apiUrl })

let silentAuthorization = false
export function setSilentAuthorization(bl: boolean) {
  // 小程序才能开启静默授权
  if (isWeapp && silentAuthorizatin) {
    silentAuthorization = bl
  }
}

// 请求拦截器
instance.requestInterceptors.use((requestConfig) => {
  return takeTokenRequestInterceptor(requestConfig, { silentAuthorization, silentAuthorizationUrl })
})

// 响应拦截器
instance.responseInterceptors.use((res) => {
  return requestInterceptorHanlder(res, {
    log: isUat,
    silentAuthorization,
    loginUrl,
    instance,
    authorizationLogin
  })
})

export default instance
