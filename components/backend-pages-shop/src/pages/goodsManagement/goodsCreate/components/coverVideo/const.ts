export interface ICoverVideoProps {
  /**
   * 最大文件大小 单位MB
   */
  maxSize?: number
  /**
   * 最大时间 单位秒
   */
  maxDuration?: number
  value?: string
  onChange?(videoUrl: string): void
}
