import { createContext } from 'react'
import { EJumpType } from '@wmeimob-modules/decoration-data/src/enums/EJumpType'

export enum EPageType {
  /** 默认 */
  Default,
  /** 店铺 */
  Shop,
  /** 装修页 */
  Custom
}

export const PageContext = createContext<IPageExtra>({ pageType: EPageType.Default, pageParams: {} })

export interface IPageModulesProps extends Partial<IPageExtra> {
  /**
   * 更新标识
   * @description 由于首页tabbar实例化后从其他页面回来会出现context值没有更新的问题。
   * 所以提供一个标识用于强制更新子组件
   */
  flag?: number

  data: any[]
}

export interface IPageExtra {
  /** 页面跳转类型 */
  pageType: EPageType
  /** 页面跳转参数 */
  pageParams: Record<string, any>
}

/** 跳转信息 */
export type JumpTypeValue =
  | NoneType
  | SystemPageType
  | CustomLinkType
  | DecorationsType
  | GoodCateType
  | GoodDetailType
  | ShopDetailType
  | DefaultNavType
  | RedirectToType
  | LiveType
  | H5LinkType

/** 无 */
export interface NoneType {
  /** 类型 */
  type: EJumpType.None
  /** 内容 */
  content: any
}

/** 系统页面 */
export interface SystemPageType {
  type: EJumpType.SystemPage
  /** 内容 */
  content: {
    /** 路径 */
    path: string
  }
}

export interface GoodCateType {
  /** 分类 */
  type: EJumpType.GoodCate
  /** 内容 */
  content: GoodCatesContent
}

export interface GoodDetailType {
  /** 商品详情 */
  type: EJumpType.GoodDetail
  /** 内容 */
  content: {
    /** 商品id */
    id: number
    /** 商品编号 */
    goodsNo: string
  }
}

export interface LiveType {
  /** 直播页面 */
  type: EJumpType.LivePage
  /** 内容 */
  content: {
    /** 直播ID */
    id: number
    /** 直播ids */
    liveIds: string[]
    /** 直播页面id */
    type: ELivePageType
  }
}

/** 自定义页面 */
export interface CustomLinkType {
  /** 系统链接 */
  type: EJumpType.CustomLink
  /** 内容 */
  content: CustomLinkValue
}

/** 自定义页面 */
export interface H5LinkType {
  /** 系统链接 */
  type: EJumpType.H5Link
  /** 内容 */
  content: H5LinkValue
}

/** 装修 */
export interface DecorationsType {
  /** 类型 */
  type: EJumpType.DecorationPage
  /** 内容 */
  content: {
    /** 装修页面id */
    id: number
  }
}

/** 店铺详情 */
export interface ShopDetailType {
  /** 类型 */
  type: EJumpType.ShopDetail
  /** 内容 */
  content: {
    /** 店铺id */
    id: number
    /** 店铺编号 */
    storeNo: string
  }
}

/** 默认跳转 */
export interface DefaultNavType {
  /** 类型 */
  type: EJumpType.DefaultNav
  /** 内容 */
  content: {
    /** 跳转url */
    url: number
    /** 携带参数 */
    params: Object
  }
}

/** 关闭当前跳转 */
export interface RedirectToType {
  /** 类型 */
  type: EJumpType.RedirectTo
  /** 内容 */
  content: {
    /** 跳转url */
    url: number
    /** 携带参数 */
    params: Object
  }
}

export interface GoodCatesContent {
  /** 分类id */
  categoryNo: string
  /** 分类名称 */
  categoryName: string
  /** 类目层级 */
  level: number
}

export interface CustomLinkValue {
  /** h5链接 */
  h5?: string
  /** appid */
  appId?: string
  /** app页面路径 */
  path?: string
}

export interface CustomLinkValue {
  /** h5链接 */
  h5?: string
  /** appid */
  appId?: string
  /** app页面路径 */
  path?: string
}

export interface H5LinkValue {
  /** h5链接 */
  path?: string
}
/** 直播页面类型 */
export enum ELivePageType {
  Details = 'Details',
  List = 'List'
}
