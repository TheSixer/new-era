import Taro from '@tarojs/taro'
import { useLayoutEffect } from 'react'
import URLSearchParams from 'url-search-params'

/**
 * 复写跳转方法 能够携带params
 *
 * 覆写 navigateTo、redirectTo、reLaunch方法。支持携带params
 * 并且会对参数值进行URLSearchParams
 * @export
 */
export default function useOverrideNav() {
  function extendTaroNavigate() {
    function getExtendFuntion(oldFunction, setParams = true) {
      return function extendFunction(parameter) {
        if (setParams && parameter.params) {
          parameter.url += '?' + new URLSearchParams(parameter.params).toString()
        }

        // 用户禁用跳到授权页面
        // if (disableStatus && parameter.url.indexOf(routeNames.auth) === -1) {
        //   return Taro.redirectTo({ url: '' })
        // }
        // eslint-disable-next-line @typescript-eslint/no-invalid-this
        return oldFunction.bind(this)(parameter)
      }
    }

    Taro.navigateTo = getExtendFuntion(Taro.navigateTo)
    Taro.redirectTo = getExtendFuntion(Taro.redirectTo)
    Taro.reLaunch = getExtendFuntion(Taro.reLaunch)
  }

  useLayoutEffect(() => {
    extendTaroNavigate()
  }, [])
}
