import { MallRegionVo } from '~/request/data-contracts'
import { ICityTree, ICityData } from './interface'

function isEmptyArray(arr?: any[]) {
  return !Array.isArray(arr) || arr.length === 0
}

/** 查找树中某个节点 */
export function findTreeItem(treeData: ICityTree[], key: number): ICityTree | undefined {
  if (!Array.isArray(treeData)) {
    return
  }
  for (let i = 0; i < treeData.length; i++) {
    const item = treeData[i]
    if (item.key === key) {
      return item
    } else if (item.children) {
      const find = findTreeItem(item.children, key)
      if (find) {
        return find
      }
    }
  }
}

/**
 * 服务器下发数据转可用数据结构
 */
export function getCityTree(origin?: ICityData[]): ICityTree[] | undefined {
  if (Array.isArray(origin)) {
    return origin.map((item) => {
      return {
        key: item.value!,
        title: item.label!,
        children: getCityTree(item.children)
      }
    })
  }
}

/**
 * 判断若干个城市树结构是否相等
 */
export function isEqualTree(...args: (ICityTree | undefined)[]): boolean {
  if (args.length >= 2) {
    let lastTree = args[0]
    for (let i = 1; i < args.length; i++) {
      const thisTree = args[i]
      if (!lastTree || !thisTree || lastTree.key !== thisTree.key) {
        return false
      }

      if (isEmptyArray(lastTree.children) && isEmptyArray(thisTree.children)) {
        return true
      }

      if (lastTree.children?.length !== thisTree.children?.length) {
        return false
      }
      const thisChildren = thisTree.children ? thisTree.children : []
      const isEqualChildren = lastTree.children?.every((lastItem) => {
        const thisItem = thisChildren.find((item) => lastItem.key === item.key)
        if (thisItem) {
          return isEqualTree(lastItem, thisItem)
        }
        return false
      })
      if (!isEqualChildren) {
        return false
      }
    }
  }
  return true
}

/**
 * 将数字id区域转为服务器要的 10/1000/10001 字符串格式
 */
export function mergeAllArea(areas?: ICityTree[]): string {
  // 根据key扁平化树为数组
  function flatTreeKeys(treeData: ICityTree[] | undefined, parentKeys: number[] = []): number[][] {
    const result: number[][] = []
    if (Array.isArray(treeData)) {
      for (let i = 0; i < treeData.length; i++) {
        const item = treeData[i]
        const keys = [...parentKeys, item.key]
        if (item.children && item.children.length > 0) {
          result.push(...flatTreeKeys(item.children, keys))
        } else {
          result.push(keys.slice(0))
        }
      }
    }
    return result
  }
  // 递归拼装为后端要的字符串形式
  const allAreas = flatTreeKeys(areas || [])
  return allAreas.length > 0 ? allAreas.map((item) => item.join('/')).join(',') : '0'
}

/**
 * 将服务器下发的 10/1000/10001 字符串格式转换为 tree格式
 */
export function translateAllArea(origin: MallRegionVo[], areas?: string): ICityTree[] | undefined {
  const result: ICityTree[] = []
  const areaKeys = (areas || '').split(/[,/]/).map((item) => item)

  // debugger
  function eachTreeItem(origin: MallRegionVo[], parentKey = 0) {
    for (let i = 0; i < origin.length; i++) {
      const item = origin[i]
      if (!areaKeys.includes(item.value!)) {
        continue
      }
      const find = parentKey ? findTreeItem(result, parentKey) : undefined
      const newItem: ICityTree = { key: item.value!, title: item.label! }
      if (find) {
        find.children = (find.children || []).concat([newItem])
      } else {
        result.push(newItem)
      }
      if (item.children && item.children.length > 0) {
        eachTreeItem(item.children, item.value)
      }
    }
  }
  eachTreeItem(origin)
  return result
}

/**
 * 比对返回选择的城市名称
 */
export function getUnlikeName(treeData: ICityTree[], selected: ICityTree[]): string[] {
  function getSelectTreeName(parentTree: ICityTree[], selected: ICityTree[], level: number): string[] {
    if (Array.isArray(selected)) {
      const names = selected.map((item) => {
        const find = findTreeItem(parentTree, item.key)
        if (find) {
          if (!isEmptyArray(find.children) && !isEmptyArray(item.children)) {
            const childrenNames = getSelectTreeName(find.children!, item.children!, level + 1)
            if (childrenNames.length > 0) {
              return level === 0 ? `${item.title}(${childrenNames.join('、')})` : item.title + childrenNames.join('、')
            }
          }
        }
        return item.title
      })
      // 如果全部选择则不显示下级 所以返回空
      return names.join('-') === parentTree.map(item => item.title).join('-') ? [] : names
    }
    return []
  }

  const treeNames = getSelectTreeName(treeData, selected, 0)
  if (treeNames.length === 0) {
    return selected.map(item => item.title)
  }
  return treeNames
}
