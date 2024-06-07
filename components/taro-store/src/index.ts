import Taro, { useError, useRouter } from '@tarojs/taro'
import { api, MemberOutputDto, UserAddressOutPutDto } from '@wmeimob/taro-api/src/request'
import { atom, useAtom } from 'jotai'
import { useEffect } from 'react'

// 用户信息
export const userAtom = atom<MemberOutputDto>({
  nickName: '',
  mobile: '',
  headImg: ''
})

/**
 * 是否已经登录
 * @description 判断用户是否存在手机号
 */
export const isLoginAtom = atom(false)

// 项目信息
export const appInfoAtom = atom({
  name: '美萌软件'
})

// 生成订单信息
export const orderParamAtom = atom([
  {
    buyCounts: 0,
    goodsId: 0,
    skuId: 0
  }
])

// 订单商品信息
export const orderGoodsListAtom = atom([] as any)

// 渠道id= 直播id
export const channelIdAtom = atom('')

// 选用的地址
export const chooseAddressAtom = atom<UserAddressOutPutDto>({})

/** 用户是否禁用 */
export let disableUser = false // 用户是否禁用

/** 用户是否有手机号 */
export let hasMobile = false

/** 检查用户是否禁用 */
export function useCheckUserStatus() {
  function check(msg = '当前用户已禁用') {
    if (disableUser) {
      Taro.showToast({ icon: 'none', title: msg })
      return Promise.reject(new Error(msg))
    }

    return Promise.resolve()
  }

  return { check }
}

/**
 * 全局状态管理钩子
 *
 * @export
 * @return {*}
 */
export function useGlobalStore(authorizationRequired?: boolean) {
  const [user, setUser] = useAtom(userAtom)
  const [appInfo, setAppInfo] = useAtom(appInfoAtom)
  const [isLogin, setIsLogin] = useAtom(isLoginAtom)
  const [orderParam, setOrderParam] = useAtom(orderParamAtom)
  const [orderGoodsList, setOrderGoodsList] = useAtom(orderGoodsListAtom)
  const [chooseAddress, setChooseAddress] = useAtom(chooseAddressAtom)

  /**
   * 获取用户信息
   */
  async function getUserAction() {
    const { data = {} } = await api['/wechat/web/member/getUserInfo_GET']()
    setUser({ ...data })
    setIsLogin(true)
    // FIXME: 接口兼容。小程序过审后除去
    disableUser = data.disableStatus !== undefined ? !!data.disableStatus : !data.status
    // disableUser = !data.status
    hasMobile = !!data.mobile
    if (disableUser) {
      Taro.showToast({ icon: 'none', title: '账户被禁用' })
    }
    return data
  }

  useEffect(() => {
    if (authorizationRequired && !isLogin) {
      getUserAction()
    }
  }, [authorizationRequired])

  return {
    user,
    isLogin,
    getUserAction,
    appInfo,
    setAppInfo,
    orderParam,
    setOrderParam,
    orderGoodsList,
    setOrderGoodsList,
    chooseAddress,
    setChooseAddress
  }
}
