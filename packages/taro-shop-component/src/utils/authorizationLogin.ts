import Taro from '@tarojs/taro'
import { routeNames, tabbar } from '../routes'
import getParamsUrl from '@wmeimob/taro-utils/src/getParamsUrl'
import { mergeFunction } from '@wmeimob/utils/src/mergeFunction'
import { appAuthUrl, isH5, isWeapp, isWebApp } from '../config'
import URLSearchParams from 'url-search-params'

/**
 * token过期授权登录
 *
 * 需要合并不然多接口会多次请求。然后会先跳到授权页把授权页删了再跳授权页
 */
export const authorizationLogin = mergeFunction((redirect = true) => {
  const { router } = Taro.getCurrentInstance()
  const path = router?.path.replace(/\?.+$/, '')
  const redirectUrl = path + '?' + new URLSearchParams(router?.params).toString()
  const isTabber = isTabar(router?.path)

  if (isWebApp) {
    // 如果已经在授权页面 跳过
    if (path === routeNames.webAuth) {
      return
    }

    window.history.go(-1)
    setTimeout(() => {
      window.location.href = appAuthUrl + '?redirect_url=' + encodeURIComponent(window.location.href)
    }, 100)
  } else if (isWeapp) {
    // 如果已经在授权页面 跳过
    if (path === routeNames.auth) {
      return
    }
    if (redirect && !isTabber) {
      Taro.redirectTo({ url: getParamsUrl(routeNames.auth, { redirectUrl, isTabber }) })
    } else {
      Taro.navigateTo({ url: getParamsUrl(routeNames.auth, { redirectUrl, isTabber }) })
    }
  } else {
    Taro.redirectTo({ url: getParamsUrl(routeNames.webAuth, { redirectUrl, isTabber }) })
  }
})

function isTabar(path = '') {
  return tabbar.map((tab) => tab.url).includes(path)
}
