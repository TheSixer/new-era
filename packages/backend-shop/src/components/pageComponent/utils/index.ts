import { Key } from 'react'
import { LabeledValue } from 'antd/es/select'

/**
 * 根据服务器下发hashMapList转为antd用标准格式
 */
export function toLabelValue(data?: Record<string, any>[], label = 'value', value = 'key'): LabeledValue[] {
  if (!Array.isArray(data)) {
    return []
  }
  return data.map((item) => ({ label: item[label], value: item[value] }))
}


/**
 * 平铺数据转为树结构
 * 传参例子:
 *  listToTreeNode(
 *    list, [ ['firstCategoryName', 'firstCategoryNo'], ['secondCategoryName', 'secondCategoryNo'] ]
 *  )
 */
export function listToTreeNode(data: Record<string, any>[] | undefined, keyNames: [string, string][]): any[] {
  if (!Array.isArray(data)) {
    return []
  }

  // 递归循环数值
  function recursionArray(keyNames: [string, string][], data: Record<string, any>[], parentValue?: Key, parentKey?: string) {
    if (keyNames.length === 0) {
      return []
    }
    const list: any[] = []
    const key = keyNames[0]
    data.forEach((item) => {
      const label = item[key[0]]
      const value = item[key[1]]
      const isParentChildren = parentKey ? item[parentKey] === parentValue : true
      if (isParentChildren && list.every((li) => li.value !== value)) {
        const children = recursionArray(keyNames.slice(1), data, value, key[1]);
        list.push({ label, value, isLeaf: keyNames.length === 1, children })
      }
    })
    return list
  }

  return recursionArray(keyNames, data)
}
