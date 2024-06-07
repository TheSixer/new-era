export interface ISortsProps<T extends string | number = string> {
  /**
   * 排序数据
   */
  data: ISortData<T>[]

  /**
   * 排序变化事件
   * @param data
   * @param value
   * @param sort
   */
  onSortChange?(data: ISortData<T>, value: T, sort?: TSort): void
}

export type TSort = 'asc' | 'desc'

export interface ISortData<T extends string | number = string> {
  /** 标题 */
  label: string
  /** 对应值 */
  value: T
  /**
   * 排序方式
   * 不传递没有排序值
   * asc 先升序后降序
   * desc 先降序后升序
   */
  sort?: TSort

  /** 扩展对象 */
  [i: string]: any
}
