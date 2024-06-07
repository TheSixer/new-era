import { IOriginalTree } from './types'

/**
 * 将树状数据进行摊平
 * @param data
 * @param result
 * @returns
 */
export default function flatTreeData<T extends IOriginalTree, R = Omit<T, 'children'>>(data: T[] = [], result: R[] = []) {
  return data.reduce((total, item) => {
    const { children = [], ...rest } = item
    total.push(rest as any)
    if (children.length) {
      total = flatTreeData(children, total)
    }
    return total
  }, result)
}
