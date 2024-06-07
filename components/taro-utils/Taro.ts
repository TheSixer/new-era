import Taro from '@tarojs/taro'

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
extendTaroNavigate()

export default Taro
