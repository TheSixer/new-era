import { ImageProps } from 'antd'

export interface IAlbumColumnProps extends ImageProps {
  /**
   * 值
   * 字符串支持逗号分隔
   */
  value: string | string[]

  /**
   * 显示模式
   *
   * album- 相册模式。从一张图片点开切换
   * list - 全部显示
   * @default 'album'
   * @description 表格建议使用album
   */
  mode?: 'album' | 'list'
}
