import { CSSProperties } from 'react'

export enum EPosterDrawType {
  /** 文本 */
  text = 'text',

  /** 列表 */
  list = 'list',

  /** 图片 */
  image = 'image',

  /** 矩形 */
  rect = 'rect'
}

export interface IMMPosterProps {
  /**
   * 画布样式
   */
  canvasStyle: {
    /**
     * 画布宽度
     */
    width: number

    /**
     * 画布高度
     */
    height: number
  }

  /**
   * 绘制画布属性
   *
   * @description 你可以通过此配置设置画布的初始属性
   * 比如 背景色或者是圆角属性
   */
  canvasSetting?: ICanvasSetting
}

export interface MMCCanvasPosterRectData {
  style: {
    left: number
    top: number
    width: number
    height: number
    backgroundColor?: string
    backgroundImage?: string
    borderRadius?: number
    borderWidth?: number
    borderColor?: string
  }
}

export interface MMCCanvasPosterTextData {
  value: string
  style: {
    left?: number
    top: number
    right?: number
    width?: number
    lineHeight?: number
    fontSize?: number
    color?: string
    fontWeight?: 'normal' | 'bold'
    textOverflow?: 'initial' | 'ellipsis'
  }
  background?: MMCCanvasPosterRectData
}

export interface MMCCanvasPosterListData {
  value: MMPosterData[]
  style: {
    left: number
    top: number
    color?: string
    fontSize?: number
    fontWeight?: 'normal' | 'bold'
  }
}

export interface MMCCanvasPosterImageData {
  value: string
  style: {
    left: number
    top: number
    width: number
    height: number
    borderRadius?: number
  }
}

export type MMPosterData =
  | (MMCCanvasPosterTextData & { type: EPosterDrawType.text | 'text' })
  | (MMCCanvasPosterImageData & { type: EPosterDrawType.image | 'image' })
  | (MMCCanvasPosterListData & { type: EPosterDrawType.list | 'list' })
  | (MMCCanvasPosterRectData & { type: EPosterDrawType.rect | 'rect' })

export type MMPosterDataArray = MMPosterData[]

/**
 * 绘制画布属性
 *
 * 可以设置画布的背景色或者是圆角属性
 */
export interface ICanvasSetting {
  /**
   * 圆角
   */
  borderRadius?: number

  /**
   * 背景
   */
  backgroundColor?: CSSProperties['backgroundColor']

  /**
   * 背景图片
   * 指定画布背景图片。可以是本地或者网络资源
   */
  backgroundImage?: CSSProperties['backgroundImage']

  /**
   * 边框宽度
   */
  borderWidth?: number

  /**
   * 边框颜色
   */
  borderColor?: CSSProperties['borderColor']
}
