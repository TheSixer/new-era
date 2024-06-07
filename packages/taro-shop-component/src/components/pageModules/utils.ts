/* eslint-disable complexity */
import Taro from '@tarojs/taro'
import { CSSProperties } from 'react'
import { guid } from '@wmeimob/utils/src/guid'
import { ELivePageType, JumpTypeValue } from './const'
import { EJumpLinkMode } from '@wmeimob-modules/decoration-data/src/enums/EJumpLinkMode'
import { EJumpType } from '@wmeimob-modules/decoration-data/src/enums/EJumpType'
import { IComponentStyle, ImageLinkDataDTO } from '@wmeimob-modules/decoration-data'
import { routeNames, tabbar } from '../../routes'
import { api } from '@wmeimob/taro-api'
import { systemConfig } from '../../config'
import getParamsUrl from '@wmeimob/taro-utils/src/getParamsUrl'

const { config } = systemConfig

/**
 * 自定义页面链接跳转
 * @param type
 * @param content
 * @param pageType 页面类型
 */
export async function navByLink(type: EJumpType, content: string | Record<string, any>, otherParams: Record<string, any> = {}) {
  const value: JumpTypeValue = {
    type,
    // eslint-disable-next-line no-nested-ternary
    content: !content ? {} : typeof content === 'string' ? JSON.parse(content) : content
  }

  const params: Record<string, any> = {
    ...otherParams
  }
  switch (value.type) {
    case EJumpType.SystemPage: {
      const { path } = value.content
      if (isTabar(path)) {
        Taro.switchTab({ url: path })
      } else {
        Taro.navigateTo({ url: getParamsUrl(path, params) })
      }
      break
    }

    case EJumpType.GoodCate: {
      const { categoryNo, level } = value.content
      params[level === config.maxClassifyLevel - 1 ? 'classifyPid' : 'classifyId'] = categoryNo

      try {
        const { data } = await api['/wechat/goods/classifyExists/{id}_GET'](categoryNo)
        if (data === true) {
          Taro.navigateTo({ url: getParamsUrl(routeNames.goodsGoodsList, params) })
        } else {
          Taro.showToast({ icon: 'none', title: '当前分类不存在' })
        }
      } catch (error) {}
      break
    }

    case EJumpType.GoodDetail: {
      const { goodsNo } = value.content
      params.goodsNo = goodsNo
      Taro.navigateTo({ url: getParamsUrl(routeNames.goodsGoodDetail, params) })
      break
    }

    case EJumpType.LivePage: {
      const { id, type } = value.content
      if (type === ELivePageType.List) {
        Taro.navigateTo({ url: `${routeNames.liveList}?id=${id}` })
      } else {
        const { data } = await api['/wechat/livePage/{id}_GET'](id)
        const { liveIds } = data!
        if (data?.id) {
          params.liveId = liveIds![0]
          Taro.navigateTo({ url: getParamsUrl(routeNames.live, params) })
        } else {
          Taro.showToast({ icon: 'none', title: '当前直播不存在!' })
        }
      }
      break
    }

    case EJumpType.ShopDetail: {
      const { storeNo, id } = value.content
      params.id = id
      params.storeNo = storeNo
      /*
       *TODO: 页面缺少  暂时未用到这个枚举
       * */
      Taro.navigateTo({ url: getParamsUrl('', params) })
      break
    }

    case EJumpType.DecorationPage: {
      const { id } = value.content
      params.id = id
      Taro.navigateTo({ url: getParamsUrl(routeNames.decoration, params) })
      break
    }

    case EJumpType.CustomLink: {
      const { appId, path, h5 } = value.content
      const env = Taro.getEnv()
      if (env === Taro.ENV_TYPE.WEAPP) {
        if (appId) {
          Taro.navigateToMiniProgram({ appId, path })
        }
      } else if (h5) {
        window.location.href = h5
      }
      break
    }
    case EJumpType.H5Link: {
      const { path } = value.content
      const env = Taro.getEnv()
      if (path) {
        if (env === Taro.ENV_TYPE.WEAPP) {
          params.url = path
          Taro.navigateTo({ url: `${routeNames.webPage}?url=${path}` })
        } else {
          window.location.href = path
        }
      }
      break
    }
    case EJumpType.DefaultNav: {
      const { url, params: param } = value.content
      Taro.navigateTo({ url: getParamsUrl(url, param) })
      break
    }
    case EJumpType.RedirectTo: {
      const { url, params: param } = value.content
      Taro.redirectTo({ url: getParamsUrl(url, param) })
      break
    }
  }
}

export function getDefaultImageLink(url = ''): ImageLinkDataDTO {
  return {
    name: '',
    key: guid(),
    url,
    jumpMode: EJumpLinkMode.Link,
    link: {
      type: EJumpType.None,
      content: ''
    }
  }
}

/** 获取样式设置-组件样式默认值 */
export function getDefaultComponetStyle<T extends CSSProperties>(data: Partial<IComponentStyle> = {}, extra?: T): IComponentStyle & T {
  return {
    pagePadding: 15,
    paddingTop: 0,
    paddingBottom: 0,
    ...data,
    ...(extra as any)
  }
}

function isTabar(path = '') {
  return tabbar.map((tab) => tab.url).includes(path)
}

/**
 * 获取最大的屏幕宽度
 * 默认直接获取.最大768px
 */
export function getMaxScreenWitdh() {
  const { screenWidth } = Taro.getSystemInfoSync()
  return screenWidth >= 768 ? 768 : screenWidth
}
