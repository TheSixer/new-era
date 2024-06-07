import { ReactNode } from 'react'
import { IMMPopupProps } from '@wmeimob/taro-design/src/components/popup/const'

export interface IShareProps extends IMMPopupProps {
  /** 分享选项 */
  options: IShareOption[]

  /**
   * 是否显示取消
   * @default true
   */
  cancel?: boolean

  /**
   * 一行显示几个
   *
   * 可以理解为一行最多放置的个数
   * 如果大于此数量会换行
   * 如果小于此数量会均分
   * @default 4 默认四个
   */
  column?: number

  /**
   * 是否设置为一行显示
   * 超出为滚动显示
   *
   * @default fasle
   */
  scroll?: boolean

  /**
   * 点击
   */
  onClick?: (option: IShareOption, index: number) => void
}

/**
 * 内置分享方式
 */
export enum EShareType {
  /** 微信分享 */
  wechat = 'wechat',

  /** 海报 */
  poster = 'poster',

  /** 链接 */
  link = 'link'
}

export interface IShareOption {
  /** 唯一key */
  key: string

  /** 使用内置类型 */
  type?: EShareType | keyof typeof EShareType

  /** 文本标题 */
  title?: ReactNode

  /**
   * 自定义图片
   *
   * 图片优先级高于type
   */
  img?: string
}
