/**
 * 原始数据
 *
 * 必须要包含children嵌套结构
 */
export interface IOriginalTree extends Record<string, any> {
  /** 儿子 */
  children?: IOriginalTree[]
}

/**
 * 被转换过后的树状数据
 */
export interface ICoventTree<T = any> {
  /** 标题 */
  title: string
  /** 值 */
  value: string
  /** 值 */
  key: string
  /** 树的级别 */
  treeLevel: number
  /** 父value */
  parentValue?: string
  /** 原始数据 */
  origin: T
  /** 子级 */
  children?: ICoventTree<T>[]
}
