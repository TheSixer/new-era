import { IOriginalTree } from './types'

/**
 * 将嵌套级别的tree打平为单级的下拉选中型数据
 * @param data
 * @param result
 * @returns
 */
export default function optionTree<T extends IOriginalTree>(data: T[] = [], keyMap?: ConvertData2TreeKeyMap) {
  const kmap: Required<ConvertData2TreeKeyMap> = { label: 'label', value: 'value', children: 'children', ...keyMap }

  function recursion<T extends IOriginalTree>(innerData: T[], result: { label: string; value: string }[] = [], parentInfo: string[] = []) {
    return innerData.reduce((total, item) => {
      const { children = [] } = item
      let [label, value] = parentInfo
      label = label ? `${label},${item[kmap.label]}` : item[kmap.label]
      value = value ? `${value},${item[kmap.value]}` : item[kmap.value]
      // 继续下一级别的处理
      if (children.length) {
        recursion(children, total, [label, value])
      } else {
        total.push({ label, value })
      }
      return total
    }, result)
  }

  return recursion(data)
}

interface ConvertData2TreeKeyMap {
  /** 级联选择标题 */
  label?: string
  /** 值 */
  value?: string
  /** 下一级 */
  children?: string
}
