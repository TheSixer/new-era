import { UploadProps } from 'antd'
import { UploadFile } from 'antd/lib/upload/interface'
import { ReactNode } from 'react'

export interface IVideoUploadProps
  extends Omit<UploadProps, 'value' | 'itemRender' | 'fileList' | 'listType' | 'beforeUpload' | 'onChange' | 'onPreview' | 'onRemove'> {
  /** 值 */
  value?: UploadFile[]
  /** 建议上传尺寸 */
  measure?: number | [number, number]
  /** 自定义提示文本 */
  extra?: ReactNode
  /** 倍率, 默认为两倍图 */
  ratio?: number
  /** 文件上传方法 */
  upload(fileList: File[]): Promise<string[]>
  /** 当图片发生变化时 */
  onChange?(files: UploadFile[]): void
}
