import { IToolbarConfig } from '@wangeditor/editor'

export interface IMMRichTextProps {
  /** 富文本内容 */
  value?: string

  /** 工具栏配置 */
  toolbarConfig?: Partial<IToolbarConfig>

  /**
   * 是否朴素模式
   * 由于小程序富文本自身机制问题。所以很多富文本效果实现存在很多问题
   * 所以富文本默认提供最基础功能
   *
   * 富文本还提供一种极简模式。改模式下只保留基础文本编辑功能
   * @default true
   *
   */
  plain?: boolean | 'minimalism'

  /**
   * 是否只读，只读将直接渲染 innerHtml
   * @default false
   */
  readonly?: boolean

  uploadImageConfig?: any

  /** 涉及上传文件时需提供阿里云 upload 方法 */
  fileUpload: (file: File[]) => Promise<string[]>

  /**
   * 文本框内容变化时事件
   * @param value
   */
  onChange?(value: string): void
}

export type InsertFnType = (url: string, alt?: string, href?: string) => void

/**
 * 图片默认上传配置
 *
 * @description 详细配置参考 https://www.wangeditor.com/v5/menu-config.html#%E5%9F%BA%E6%9C%AC%E9%85%8D%E7%BD%AE
 */
export const defaultUploadImage = {
  // 单个文件的最大体积限制，默认为 2M
  maxFileSize: 10 * 1024 * 1024, // 10M
  // 最多可上传几个文件，默认为 100
  maxNumberOfFiles: 100,
  // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
  allowedFileTypes: ['image/*'],
  // 小于该值就插入 base64 格式（而不上传），默认为 0
  base64LimitSize: 5 * 1024 // 5kb
}

/**
 * 视频上传默认配置
 *
 * @description 详细配置参考 https://www.wangeditor.com/v5/menu-config.html#%E5%9F%BA%E6%9C%AC%E9%85%8D%E7%BD%AE-1
 */
export const defaultUploadVideo = {
  // 单个文件的最大体积限制，默认为 10M
  maxFileSize: 20 * 1024 * 1024, // 50M
  // 最多可上传几个文件，默认为 5
  // maxNumberOfFiles: 5,
  // 选择文件时的类型限制，默认为 ['video/*'] 。如不想限制，则设置为 []
  allowedFileTypes: ['video/*']
  // 超时时间，默认为 30 秒
  // timeout: 30 * 1000, // 15 秒
}
