import Taro, { getCurrentPages, useRouter } from '@tarojs/taro'
import { setGlobalData } from '@wmeimob/taro-global-data'
import useOverrideNav from '@wmeimob/taro-utils/src/hooks/useOverrideNav'
import useWeAppUpdate from '@wmeimob/taro-utils/src/hooks/useWeAppUpdate'
import { useAtom } from 'jotai'
import { useLayoutEffect, useRef, useState } from 'react'
import './app.less'
import { isWeapp, noLoginRoutes } from './config'
import { tabbarData, tabbarIndex } from './custom-tab-bar/store'
import { useGlobalStore } from './globalStore'
import instance from './request/instance'

setGlobalData({
  instance
})

export default (props) => {
  useOverrideNav()
  useApp()
  useWeAppUpdate(isWeapp)
  useAuthorization()

  return props.children
}

/**
 * 程序开启的时候 页面的接口是否走静默授权，走授权自动获取用户信息。
 * 授权流程设计文档 https://qqhzoxx99g.feishu.cn/docx/Tnpgd209NoFYV2xtxEbctDXSnVb
 */
function useAuthorization() {
  const { params, path } = useRouter()
  // 判断URL是否带token 自动注入token
  if (params.token) {
    Taro.setStorageSync('token', params.token)
  }

  // 判断是否需要走授权
  function getAuthorizationRequired() {
    const pages = getCurrentPages() || []
    // getCurrentPages() 初始化的时候是 undefined path 才可以获得， path路由切换 不会改变！
    let currentRoute = pages[pages.length - 1]?.route?.split('?')[0] || path
    if (isWeapp) {
      currentRoute = '/' + currentRoute
    }
    return !noLoginRoutes.includes(currentRoute!) || !!Taro.getStorageSync('token')
  }
  const [authorizationRequired, setAuthorizationRequired] = useState(getAuthorizationRequired())
  useGlobalStore(authorizationRequired)

  /**
   * 路由发生改变的时候会运行，小程序的路由监听和h5的路由监听和getCurrentPages有个调用前后问题不要用
   */
  setTimeout(() => {
    setAuthorizationRequired(getAuthorizationRequired())
  }, 100)
}

/**
 * 小程序启动时主体逻辑
 */
function useApp() {
  const [data] = useAtom(tabbarData)
  const [current, setCurrent] = useAtom(tabbarIndex)
  const oldSwitch = useRef(Taro.switchTab)

  /** 复写switchTabbar */
  useLayoutEffect(() => {
    function getExtendSwitchFuntion() {
      return function extendFunction(parameter) {
        const index = data.findIndex((it) => it.url === parameter.url)
        if (index !== -1 && current !== index) {
          setCurrent(index)
        }
        // eslint-disable-next-line @typescript-eslint/no-invalid-this
        return oldSwitch.current.bind(this)(parameter)
      }
    }

    Taro.switchTab = getExtendSwitchFuntion()
  }, [current, data])
}
