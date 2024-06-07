import { IOriginalTree } from './types'

/**
 *  根据层级切割树数据
 */
export default function sliceTree(data: IOriginalTree, level: number) {
  function innerSliceTree(data: IOriginalTree, level: number, innerLevel = 1) {
    const isLast = innerLevel >= level
    return data.map((item) => {
      let { children, ...rest } = item
      if (isLast) {
        return rest
      }

      children = innerSliceTree(children, level, innerLevel + 1)
      return { ...rest, children }
    })
  }

  return innerSliceTree(data, level)
}
