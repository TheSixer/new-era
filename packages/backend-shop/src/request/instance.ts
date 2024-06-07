import { apiUrl } from '~/config'
import { history } from 'umi'
import Request, { takeTokenRequestInterceptor, requestInterceptorHanlder } from '@wmeimob/request/src/index'
import { message, notification } from 'antd'
import { routeNames } from '~/routes'

const instance = Request.create({ baseUrl: apiUrl })

// 请求拦截器
instance.requestInterceptors.use((config) => {
  return takeTokenRequestInterceptor(config)
})

// 响应拦截器
instance.responseInterceptors.use((res) => {
  return requestInterceptorHanlder(res, { message, notification, history, loginUrl: routeNames.login })
})

export default instance
