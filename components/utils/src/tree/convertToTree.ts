import { ICoventTree, IOriginalTree } from './types'

/**
 * 将嵌套结构的数据转换成antd支持的树结构数据
 *
 * 同时支持Tree组件与TreeSelect组件
 * @export
 * @param {Record<string, any>[]} data
 * @param {ConvertData2TreeKeyMap} [keyMap] 转换的key值映射
 * @return {*}
 */
export default function convertToTree<D extends IOriginalTree>(data: D[], keyMap?: ConvertData2TreeKeyMap<D>): ICoventTree[] {
  const kmap: Required<ConvertData2TreeKeyMap<D>> = { label: 'label', title: 'title', value: 'value', children: 'children', ...keyMap }

  function innerConvert(data: D[], treeLevel = 1, parentValue = 0) {
    return data.map(item => {
      const value = typeof kmap.value === 'string' ? item[kmap.value] : kmap.value(item)

      return {
        title: item[kmap.title],
        label: item[kmap.title],
        value,
        key: value,
        treeLevel,
        parentValue,
        origin: { ...item },
        children: innerConvert(item[kmap.children] || [], treeLevel + 1, value)
      }
    })
  }

  return innerConvert(data)
}

/** 转换map */
interface ConvertData2TreeKeyMap<D> {
  /** tree 标题 */
  title?: string
  /** 级联选择标题 */
  label?: string
  /** 值 */
  value?: string | ((item: D) => string | number)
  /** 下一级 */
  children?: string
}
