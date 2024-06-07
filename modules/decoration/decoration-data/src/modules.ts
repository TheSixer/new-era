import { CSSProperties } from 'react'
import { EArrangeType } from './enums/EArrangeType'
import { EChooseGoodType } from './enums/EChooseGoodType'
import { EJumpType } from './enums/EJumpType'
import { EModuleSearcType } from './enums/EModuleSearcType'
import { ENavArrangeType } from './enums/ENavArrangeType'
import { EProductDataType } from './enums/EProductDataType'
import { ESliderWithImageMode } from './enums/ESliderWithImageMode'
import { EVideoSource } from './enums/EVideoSource'
import { IComponentStyle } from './interfaces/IComponentStyle'
import { ImageLinkDataDTO } from './interfaces/ImageLinkDataDTO'

/** 搜索框 */
export interface IBasicModuleSearch {
  /** 类型 */
  type: EModuleSearcType

  /** 搜索提示占位文字 */
  placeholder: string

  /** 搜索关键词 */
  keywords: {
    /** 搜索文本 */
    text: string
    /** 是否显示 */
    show: boolean
  }[]

  /** 组件样式 */
  componentStyle: IComponentStyle
}

/** 富文本框 */
export interface IBasicModuleRichText {
  /** 富文本内容 */
  data: string

  /** 组件样式 */
  componentStyle: IComponentStyle
}

/** 图片模块 */
export interface BasicModuleImageDTO {
  /** 排列方式 */
  arrangeType: EArrangeType
  /** 数据 */
  data: ImageLinkDataDTO[]
  /** 内容样式 */
  contentStyle: {
    /** 图片圆角 */
    borderRadius: number
    /** 图片间距 */
    imageMargin: number
  }
  /** 组件样式 */
  componentStyle: IComponentStyle
  /** 网格样式 */
  // /** 图片比例 */
  // proportion: number;
  // /** 图片间隔 */
  // imageInterval: number;
  // /** 图片链接信息 */
  // data: ImageLinkDataDTO[];
}

/** 导航 */
export interface BasicModuleNavigationDTO {
  /** 尺寸 */
  size: 'default' | 'large'
  /** 图片形状 */
  iconShape: 'circle' | 'square'
  /** 图标排列方式 */
  arrangeType: ENavArrangeType
  /** 数据 */
  data: ImageLinkDataDTO[]
  /** 组件样式 */
  componentStyle: IComponentStyle &
    Pick<
      CSSProperties,
      /** 背景色 */
      'backgroundColor'
    >
}

/** 分割线 */
export interface BasicModuleSeparatorDTO {
  /** 高度 */
  height: number
  /** 线高 */
  lineHeight: number
  /** 线类型 */
  borderStyle: 'solid' | 'dashed' | 'dotted'
  /** 组件样式 */
  componentStyle: IComponentStyle
}

/** 轮播图模块 */
export interface BasicModuleSliderDTO {
  /** 轮播间隔 */
  interval: number
  /** 轮播图高度 */
  height: number
  /** 轮播图片数据 */
  data: ImageLinkDataDTO[]
  /** 组件样式 */
  componentStyle: IComponentStyle
}

/** 标题栏模块 */
export interface BasicModuleTitleDTO {
  /** 标题名称 */
  name: string
  /** 标题样式 */
  contentStyle: Pick<CSSProperties, 'fontSize' | 'fontWeight' | 'color' | 'backgroundColor' | 'textAlign'>
  /** 左侧配置 */
  left: {
    /** 是否显示 */
    show?: boolean
    /** 图标 */
    icon: any
    /** 图片 */
    image: string
  }
  /** 右侧配置 */
  right: {
    /** 是否显示箭头 */
    showArrow: boolean
    /** 文本 */
    content: string
  }
  link: {
    /** 链接类型 */
    type: EJumpType
    /** 类型跳转信息 */
    content: string
  }
  /** 组件样式 */
  componentStyle: IComponentStyle
}

/** 产品模块 */
export interface BasicModuleProductDTO {
  /** 产品id信息 */
  /** 类型 */
  type: EProductDataType
  /** 商品分类 */
  classify: string[]
  /** 排序方式 */
  sort?: number
  /** 商品数量 */
  pageSize: number
  /** 商品信息 */
  goods: BasicModuleProductGood[]
  /** 组件样式 */
  componentStyle: IComponentStyle
}

export interface BasicModuleProductGood {
  /** 商品id */
  id: number
  /** 商品编号 */
  goodsNo: string
  /** 商品名称 */
  goodsName: string
  /** 图片封面 */
  coverImg: string
  /** 价格 */
  price: number
  /** 划线价格 */
  marketPrice: number
}

/** 轮播与图片魔方 */
export interface BasicModuleSliderWithImageDTO {
  /** 模式 */
  mode: ESliderWithImageMode
  /** 轮播图片 */
  slider: {
    /** 轮播图间隔 */
    interval: number
    /** 轮播图 */
    data: ImageLinkDataDTO[]
  }
  /** 图片 */
  images: ImageLinkDataDTO[]
  /** 内容样式 */
  contentStyle: {
    /** 图片圆角 */
    borderRadius: number
    /** 图片间距 */
    imageMargin: number
  }
  /** 组件样式 */
  componentStyle: IComponentStyle
}

/** 视频组件 */
export interface IContentModuleVideo {
  /** 视频来源 */
  source: EVideoSource
  /** 视频列表 */
  videos: string[]
  /** 外部视频地址 */
  videoAddress: string
  /** 外部视频封面 */
  videoCoverImg: string
  /** 播放设置 */
  palySetting: {
    /** 是否显示进度条 */
    progress: boolean
    /** 是否自动播放 */
    autoplay: boolean
  }
  /** 组件样式 */
  componentStyle: IComponentStyle
}

/** 直播组件 */
export interface IBasicModuleLiverPlayer {
  /** 直播间信息 */
  data: { id: number; scheduleGroupName: string; scheduleGroupNo: string }[]
  /** 组件样式 */
  componentStyle: IComponentStyle
}

/** 基础活动配置数据 */
export interface IBasicActivityData {
  /** 活动标题 */
  showActivityTitle: string
  /** 商品显示数量 */
  showGoodNum: number
  /** 活动id */
  id: number
  /** 活动名称 */
  activityName: string
  /** 活动编号 */
  activityNo: string
  /** 活动开始事件 */
  startTime: string
  /** 活动结束时间 */
  endTime: string
  /** 类型
   * auto - 自动 manual 手动
   */
  chooseGoodType: EChooseGoodType
  /** 商品 */
  goods: IBasicActivityGood[]
  /** 按钮名称 */
  btnName: string
  [i: string]: any
}

/** 活动商品数据 */
export interface IBasicActivityGood {
  /** 商品id */
  id: number
  /** 商品编号 */
  goodsNo: string
  /** 商品封面 */
  coverImg: string
  /** 商品名称 */
  goodsName: string
  /** 商品价格 */
  price: number
}

/**
 * C端活动商品数据
 * 用户端会通过接口与操作合并扩展数据
 */
export interface IBasicActivityGoodAdvance extends IBasicActivityGood {
  /** 商品划线价 */
  marketPrice?: number
  /** 活动id */
  activityId: number
  /** 活动编号 */
  activityNo: string
}

/** 通用活动组件 */
export interface IBasicModuleActivity {
  /** 活动 */
  data: IBasicActivityData[]
  /** 组件样式 */
  componentStyle: IComponentStyle
}

/** 优惠券模块 */
export interface IBasicModuleCoupon {
  /** 活动 */
  data: any[]
  /** 组件样式 */
  componentStyle: IComponentStyle
}
